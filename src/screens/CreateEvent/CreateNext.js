import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Animated,
    Dimensions,
    ScrollView, Easing
} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker';
import {imageUpload, createPost} from '../../api/utils';
import {getToken} from '../../asy-store'
import LinearGradient from 'react-native-linear-gradient';
// import {useCurrentLocation} from "../../hooks"
import Header from './components/Header';
import MapView, {Callout, PROVIDER_GOOGLE} from "react-native-maps";
import Geolocation from "react-native-geolocation-service";
import Loading from "../../components/Loading";

import moment from 'moment'
import InternetConnection from "../../components/Info/InternetConnection";

const height = Dimensions.get('window').height;

export default CreateNext = ({navigation}) => {

    const data = navigation.state.params
    const [errors, setErrors] = React.useState()
    const [authToken, setAuthToken] = React.useState()
    const [modal, setModal] = React.useState(new Animated.Value(height + 50))
    const [curCoords, setCurCoords] = React.useState();
    const [loading, setLoading] = React.useState(false);
    const [cityId, setCityId] = React.useState();

    const [formFields, setFormFields] = React.useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            isUnknown: false,
            contactNo: "",
            emailId: "",
            address: "",
            details: "",
            coordinate: null,
            city: 1558 || cityId,
        }
    );

    React.useEffect(() => {
        getToken('authToken').then(res => {
            setAuthToken(JSON.parse(res))
        })
        _getCurrentLocation();
        getToken('userCity').then(res => {
            const resp = JSON.parse(res)
            if (res){
                setCityId(resp.id)
            }
            // setCityId(resp.id)
        })
    }, [])

    const _showPickerOptions = (active) => {
        Animated.timing(modal, {
            duration: 300,
            toValue: active ? 0 : height +50,
            easing: Easing.linear,
            useNativeDriver: true
        }).start()
    }

    /*----------------------------------------------------------------------------
    *                      ON MAP DRAG START GETTING CALLED                     *
    ----------------------------------------------------------------------------*/

    const _onMapDrag = () => {
        console.warn('map started')
    }

    /*---------------------------------------------------------------------------
    *        ON MAP DRAG END  GETTING CALLED TO UPDATE PICKUP LOCATION          *
    ----------------------------------------------------------------------------*/
    const _onMapDragEnd = (coordinate) => {
        const {latitude, longitude} = coordinate;
        setFormFields({['coordinate']: {latitude: latitude, longitude: longitude}})
    }

    /*----------------------------------------------------------------------------
     *      GET CURRENT LOCATION  FROM GOOGLE LOCATION SERVICE                   *
     ----------------------------------------------------------------------------*/

    const _getCurrentLocation = () => {
        Geolocation.getCurrentPosition(
            position => {
                console.log(position)
                let data = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.009,
                }
                setCurCoords(data)
                setFormFields({
                    ['coordinate']: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    }
                })
            }, (error) => {
                console.log('Unable to find your location, please check your location PERMISSIONS restart application.')
            },
            {showLocationDialog: true, enableHighAccuracy: true}
        );
    };


    const _createPost = () => {
        console.log(formFields)
        let errors = {};
        if (!formFields.contactNo) {
            errors.phone = 'Please enter phone number';
        } else if (formFields.contactNo < 10 || isNaN(formFields.contactNo)) {
            errors.phone = 'Invalid phone number';
        } else if (!formFields.emailId) {
            errors.email = 'Please enter email';
        } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formFields.emailId)) {
            errors.email = 'Invalid Email';
        } else if (!formFields.details) {
            errors.details = 'Please enter details';
        } else if (!formFields.address) {
            errors.address = 'Please enter address';
        } else {
            setErrors(null)
            // alert('submitting')
            setLoading(true)
            imageUpload(authToken, data.postImages).then(res => {
                console.log(res);
                if (res.success) {
                    let newData = data;
                    delete data.postImages;
                    let dataTOSend = {
                        ...formFields,
                        ...newData,
                        postImages: res.postImages
                    }
                    console.log(dataTOSend)
                    createPost(authToken, dataTOSend).then(res => {
                        setLoading(false)
                        ImagePicker.clean().then(() => {
                            console.log('removed tmp images from tmp directory');
                        }).catch(e => {
                            console.log(e);
                        });
                        console.log(res)
                        if (res.success) {
                            // this.setState({details: null, categoryId: null, postImages: []})
                            navigation.navigate('Home')
                            // alert(res.message)
                        } else {
                            alert(res.message)
                        }
                    })
                } else {
                    alert(res.message)
                }
            })
        }
        setErrors(errors)
    }


    return (
        <LinearGradient colors={['#7487f5', '#3c52d4']} style={styles.fullView}>
            {/*{console.log(data)}*/}
            {/*{console.log(moment(data.timing).format())}*/}
            <Header title={'Create Event'} name={'md-arrow-back'} showBack={true}
                    navigation={() => navigation.goBack()}/>
                    <Loading loading={loading} />
            <View style={styles.container}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps='handled'
                    style={{marginBottom: 70}}>
                    <View style={styles.formGroup}>
                        <Text style={[styles.label, {marginLeft: 5, marginBottom: 0}]}>Contact Number</Text>
                        <TextInput
                            placeholder="+91 99999 99999"
                            keyboardType={'phone-pad'}
                            placeholderTextColor="#fff"
                            style={styles.input}
                            autoCorrect={false}
                            maxLength={10}
                            selectionColor='#fff'
                            onChangeText={text => setFormFields({['contactNo']: text})}
                        />
                        <Text style={styles.errLabel}>{errors && errors.phone}</Text>
                    </View>
                    <View style={styles.formGroup}>
                        <Text style={[styles.label, {marginLeft: 5, marginBottom: 0}]}>Email</Text>
                        <TextInput
                            multiline={true}
                            placeholder="example@gmail.com"
                            keyboardType={'email-address'}
                            placeholderTextColor="#fff"
                            style={styles.input}
                            autoCorrect={false}
                            selectionColor='#fff'
                            onChangeText={text => setFormFields({['emailId']: text})}
                        />
                        <Text style={styles.errLabel}>{errors && errors.email}</Text>
                    </View>
                    <View style={styles.formGroup}>
                        <Text style={[styles.label, {marginLeft: 5, marginBottom: 0}]}>Description</Text>
                        <TextInput
                            multiline={true}
                            placeholder="About Event"
                            // keyboardType={'email-address'}
                            placeholderTextColor="#fff"
                            style={styles.textArea}
                            autoCorrect={false}
                            selectionColor='#fff'
                            onChangeText={text => setFormFields({['details']: text})}

                        />
                        <Text style={styles.errLabel}>{errors && errors.description}</Text>
                    </View>
                    <View style={styles.formGroup}>
                        <Text style={[styles.label, {marginLeft: 5, marginBottom: 0}]}>Event Location</Text>
                        <TextInput
                            multiline={true}
                            placeholder="Where event is happening ?"
                            // keyboardType={'email-address'}
                            placeholderTextColor="#fff"
                            style={styles.textArea}
                            autoCorrect={false}
                            selectionColor='#fff'
                            onChangeText={text => setFormFields({['address']: text})}
                        />
                        <Text style={styles.errLabel}>{errors && errors.address}</Text>
                    </View>
                    <TouchableOpacity style={styles.formBtn} onPress={() => _showPickerOptions(true)}>
                        <Icon name="map-marker" color={'#fff'} size={20}/>
                        <Text style={[styles.label, {marginTop: 5, marginLeft: 5}]}>Select on Map</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
            <View style={styles.btnContainer}>
                <TouchableOpacity
                    style={styles.btnLarge}
                    onPress={_createPost}
                    activeOpacity={0.8}>
                    <Text style={styles.btnLargeText}>Create</Text>
                </TouchableOpacity>
            </View>

            {/*------ Image Picker Options  ------*/}

            <Animated.View style={[styles.modalFull, {transform: [{translateY: modal}]}]}>

                <MapView
                    style={styles.map}
                    provider={PROVIDER_GOOGLE}
                    //  customMapStyle={mapStyle}
                    onPanDrag={_onMapDrag} // on drag at will getting called
                    onRegionChangeComplete={(e) => _onMapDragEnd.bind(null, e)}  // on drag complete
                    moveOnMarkerPress={false}
                    showsTraffic={false}
                    showsIndoors={false}
                    initialRegion={curCoords}
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
                />

                <Callout style={styles.confirmLocation}><Icon color={'#808aff'} size={40} name="map-marker"/></Callout>

                <View style={styles.posBtmBtn}>
                    <TouchableOpacity style={styles.navBtn} onPress={() => _showPickerOptions(false)}>
                        <Text style={styles.btnLargeText}>Save</Text>
                    </TouchableOpacity>
                </View>

            </Animated.View>

            {/*------ Image Picker Options  ------*/}

            <InternetConnection />

        </LinearGradient>
    );
}

