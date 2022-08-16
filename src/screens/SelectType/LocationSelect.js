'use strict';
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

// import Icon from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
// import Loading from '../../../components/Loading';
// import FadeInView from '../../../components/Animation';

import NewHeader from '../../components/NewHeader'

import MapView, {PROVIDER_GOOGLE, Callout} from 'react-native-maps';
import styles from './styles';

import Geolocation from 'react-native-geolocation-service';

import {addOrgAddr} from '../../api/auth';

import {getToken} from '../../asy-store';
import Loading from "../../components/Loading";
import InternetConnection from "../../components/Info/InternetConnection";


// import NewHeader from '../../components/NewHeader'

// import styles from './styles';

export default class LocationSelect extends React.Component {

    state = {
            data: null,
            coordinate: null,
            selectedCoordinate: null,
            userData: null,
            loading: false,
        }


   componentDidMount() {
       const {data} = this.props.navigation.state.params;
       this.setState({data: data})
       console.log(data);
       // console.log('hello')
       getToken('userData').then(res => {
           console.log(res);
           this.setState({userData: JSON.parse(res)});
       });
       this._getCurrentLocation();
   }


    /*----------------------------------------------------------------------------
    *                      ON MAP DRAG START GETTING CALLED                     *
    ----------------------------------------------------------------------------*/

     _onMapDrag = () => {
        console.warn('map started')
     }

      /*---------------------------------------------------------------------------
      *        ON MAP DRAG END  GETTING CALLED TO UPDATE PICKUP LOCATION          *
      ----------------------------------------------------------------------------*/
     _onMapDragEnd = (coordinate) => {
        const {latitude, longitude} = coordinate;
        this.setState({selectedCoordinate:{
            latitude: latitude,
            longitude: longitude,
        }})
     }

    /*----------------------------------------------------------------------------
     *      GET CURRENT LOCATION  FROM GOOGLE LOCATION SERVICE                   *
     ----------------------------------------------------------------------------*/

    _getCurrentLocation = () => {
        Geolocation.getCurrentPosition(
            position => {
                console.log(position)
                let data = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.009,
                }
                this.setState({
                    coordinate: data,
                }, () => this.mapView.animateToRegion(data, 0))

            }, (error) => {
                console.log('Unable to find your location, please check your location PERMISSIONS restart application.')
            },
            {showLocationDialog: true, enableHighAccuracy: true}
        );
    };

    _handleUpdateData = () => {
        const {selectedCoordinate, data, userData} = this.state;
        if (!selectedCoordinate) {
            alert('Please darg map to select location')
        }else{
            let dataTOsend = {
                ...data,
                coordinate: selectedCoordinate,
            };
            this.setState({loading: true})
            addOrgAddr(userData.token, dataTOsend).then(res => {
                this.setState({loading: false})
                console.log(res)
                if (res.success){
                    console.log(res);
                    alert(res.message)
                    this.props.navigation.navigate('AddLogo');
                }else{
                    alert(res.message);
                }
            });

        }
    };


    render() {
        const {coordinate, loading} = this.state;
        return(
            <View style={styles.baseContainer}>
            {/* <Loading loading={this.props.loading} /> */}

                <NewHeader showBack={true} title={'Select Location'} navigation={() => this.props.navigation.goBack()} />

                <Loading loading={loading} />

                <View style={styles.stickyCont}>
                    <Text style={styles.stickyTxt}>Drag map to select location</Text>
                </View>

                <MapView
                    style={styles.map}
                    provider={PROVIDER_GOOGLE}
                    //  customMapStyle={mapStyle}
                    onPanDrag={this._onMapDrag} // on drag at will getting called
                    onRegionChangeComplete={(e) => (this._onMapDragEnd.bind(this))(e)}  // on drag complete
                    moveOnMarkerPress={false}
                    showsTraffic={false}
                    showsIndoors={false}
                    initialRegion={coordinate}
                    showsUserLocation={true}
                    maxZoomLevel={20}
                    minZoomLevel={10}
                    showsCompass={false}
                    showsMyLocationButton={false}
                    zoomTapEnabled={false}
                    zoomControlEnabled={false}
                    toolbarEnabled={false}
                    loadingEnabled={false}
                    rotateEnabled={false}
                    pitchEnabled={false}
                    cacheEnabled={false}
                    showsUserLocation={true}
                    paddingAdjustmentBehavior={'always'}
                    ref={c => this.mapView = c}
                />

                <Callout style={styles.confirmLocation}><MaterialIcon color={'#808aff'} size={40} name="location-on" /></Callout>

                <View style={styles.btmBtns}>

                    <TouchableOpacity style={styles.btnOutLine} onPress={()=> this.props.navigation.navigate('AddLogo')}>
                        <Text style={styles.outTxt}>Skip</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btnFill} onPress={this._handleUpdateData}>
                        <Text style={styles.fillTxt}>Next</Text>
                    </TouchableOpacity>

                    {/*<Button title={'Next'} onPress={this._handleCreateOrg} />*/}

                </View>

                <InternetConnection />

            </View>
        )
    }

}

