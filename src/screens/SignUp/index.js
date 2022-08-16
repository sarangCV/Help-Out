'use strict';
import React from 'react';
import {
    View,
    Text,
    TextInput,
    SafeAreaView,
    ScrollView,
    Image,
    StatusBar,
    Picker,
    TouchableOpacity
} from 'react-native';

//Modules
import Geolocation from "react-native-geolocation-service";

//Components
import Loading from "../../components/Loading";
import Button from '../../components/Button';
import InternetConnection from "../../components/Info/InternetConnection";

//APIS
import {checkMobileAuth, getCountries} from "../../api/auth";

//Styles
import styles from './styles';


class SignUp extends React.Component {

    state = {
        phone: null,
        errMsg: null,
        loading: false,
        coordinate: null,
        countries: null,
        // page: 'register',
    };

    componentDidMount() {
        this._getCurrentLocation();
        getCountries().then(res => {
            // console.log(res)
            if (res.success) {
                this.setState({countries: res.data})
            } else {
                alert(res.message)
            }
        })

    }


    _handlePhone = () => {
        const {phone} = this.state;
        // console.log('phone:' + phone);
        if (!phone) {
            this.setState({errMsg: 'Please Enter Phone Number'});
            return false;
        } else if (phone.length < 10 || isNaN(phone)) {
            this.setState({errMsg: 'Invalid Phone Number'});
            return false;
        } else {
            this.setState({errMsg: ''});
            let dataTOSend = {
                contactNumber: phone,
                coordinate: this.state.coordinate,
            };
            this._setLoading(true);
            checkMobileAuth(dataTOSend).then(res => {
                console.log('data after entering mobile number',res);
                if (res.success) {
                    this._setLoading(false);
                    this.props.navigation.navigate('OTP', {
                        data: {
                            ...res,
                            phone: phone,
                        }
                    })
                } else {
                    this._setLoading(false);
                    alert(res.message);
                }
            });
        }
    };

    _setLoading = loading => {
        this.setState({loading});
    }

    /*---------------------------------------------------------------*
     *                   Update Location Coordinates                 *
     *---------------------------------------------------------------*/

    _getCurrentLocation = async () => {
        await Geolocation.getCurrentPosition(
            (position) => {
                // console.log(position);
                this.setState({
                    coordinate: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    }
                })
            }, (error) => {
                // alert('Unable to find your location, please check your location Settings.')
            },
            {showLocationDialog: true, enableHighAccuracy: true}
        );
    };

    render() {
        const {errMsg, phone, loading, countries} = this.state;
        return (
            <SafeAreaView style={styles.baseContainer}>
                <StatusBar barStyle="light-content" backgroundColor="#514fe1" transcluent={true}/>



                <View style={styles.formContainer}>

                    <View style={styles.logoFont}>
                        <Text style={styles.logoTxt}>helpOUT</Text>
                    </View>


                    <View style={styles.absContainer}>

                            <View style={styles.topContCenter}>
                                {/*<Image source={require('../../assets/images/logo1.png')} style={styles.logo}/>*/}
                                <Text style={styles.titleBold}>Start helping out</Text>
                                {/*<Text style={styles.titleGreyBold}>Start helping out</Text>*/}
                            </View>
                            <View style={[styles.row, {flexWrap: 'wrap'}]}>
                                <View style={styles.flexLeft}>
                                        {/* <Picker
                                            style={styles.picker}
                                            selectedValue={"hello"}
                                            onValueChange={(itemValue, itemIndex) => console.log(itemIndex)}>
                                            {countries && countries.map((item) => {
                                                return (
                                                    <Picker.Item label={item.code} value={item.code}/>
                                                )
                                            })}
                                        </Picker> */}
                                        <Text>+91</Text>
                                    
                                </View>
                                <TextInput
                                    placeholder="Phone"
                                    keyboardType={'number-pad'}
                                    maxLength={10}
                                    placeholderTextColor={'#d5d5df'}
                                    style={styles.input}
                                    onChangeText={phone => this.setState({phone: phone})}
                                    value={phone}
                                />

                                <View style={{width: '100%'}}>
                                    <Text style={styles.errLabel}> {errMsg && errMsg} </Text>
                                    <View style={styles.space}/>
                                </View>

                            </View>

                        {/*<TouchableOpacity style={styles.navBtn} onPress={this._handlePhone}>*/}
                        {/*    <Text style={styles.btnText}>Next</Text>*/}
                        {/*    /!* <IonIcon name="md-arrow-forward" color={'#fff'} size={25} /> *!/*/}
                        {/*</TouchableOpacity>*/}

                    </View>

                </View>

                <Button title={'Get Started'} onPress={this._handlePhone}/>
                <InternetConnection/>

                <Loading loading={loading}/>

            </SafeAreaView>
        );
    }
}

export default SignUp;
