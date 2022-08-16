'use strict';
//React
import React from 'react';

//React Native
import {View, Text, TextInput, TouchableOpacity, SafeAreaView} from 'react-native';

//Modules
import DeviceInfo from 'react-native-device-info';
import Geolocation from "react-native-geolocation-service";

//API
import {checkMobileAuth, validateOtp} from "../../api/auth";

//Async Store
import {saveToken} from "../../asy-store";

//Components
import Loading from "../../components/Loading";
import Button from "../../components/Button";
import NewHeader from '../../components/NewHeader'
import InternetConnection from "../../components/Info/InternetConnection";

//Styles
import styles from './styles';
import {NavigationEvents} from "react-navigation";


class OTP extends React.Component {

    state = {
        phone: null,
        data: null,
        loading: false,
        coordinate: null,
        otpCode: null,
        deviceInfo: null,
        errMsg: null,
    };

    componentDidMount() {
        this._focus();
    }

    _focus = () => {
        this._getConstantDeviceInfo();
        const {data} = this.props.navigation.state.params;
        console.log(data);
        alert(data.otp)
        this.setState({data, phone: data.phone});
        this._getCurrentLocation();
    }

    _handleOtp = () => {
        const {deviceInfo, data, otpCode} = this.state;
        if (!otpCode) {
            this.setState({errMsg: 'Please enter 4 digit otp code'})
            return false
        }
        let otpData = {
            otpReference: data.otpReference,
            otp: otpCode,
            ...deviceInfo,
        }
        this.setState({errMsg: null})
        this._setLoading(true);
        validateOtp(otpData).then(res => {
            this._setLoading(false);
            console.log('OTP response data: --- ', res)
            if (res.success) {
                if (res.isNewUser) {
                    // this.setState({ data: res });
                    this.props.navigation.navigate('SelectType', {
                        data: res,
                    });
                    // _clearOTP(true)
                } else if (!res.isNewDevice && !res.isNewUser) {
                    console.log(res)
                    saveToken('userData', res).then(() => {
                        saveToken('authToken', res.token).then(() => {
                            this.props.navigation.navigate('App');
                        })
                    });
                } else if (res.isNewDevice && !res.isNewUser) {
                    this.props.navigation.navigate('Password', {
                        data: res,
                        phone: this.state.phone
                    });
                }
            } else {
                this.setState({otpCode: null})
                alert(res.message);
            }
        });
    };

    _ResendOtp = () => {
        let dataTOSend = {
            contactNumber: this.state.phone,
            coordinate: this.state.coordinate,
        };
        console.log(dataTOSend)
        this._setLoading(true);
        checkMobileAuth(dataTOSend).then(res => {
            console.log(res)
            if (res.success) {
                this._setLoading(false);
                this.setState({
                    data: res,
                });
                // alert(res.otp);
            } else {
                this._setLoading(false);
                alert(res.message);
            }
        });
    };


    _getConstantDeviceInfo = () => {
        let deviceJSON = {};
        deviceJSON.device_id = DeviceInfo.getDeviceId();
        deviceJSON.device_unique_id = DeviceInfo.getUniqueId();
        this.setState({deviceInfo: deviceJSON});
    };

    _setLoading = loading => {
        this.setState({loading});
    };

    /*---------------------------------------------------------------*
     *                   Update Location Coordinates                 *
     *---------------------------------------------------------------*/
    _getCurrentLocation = async () => {
        await Geolocation.getCurrentPosition(
            (position) => {
                console.log(position);
                this.setState({
                    coordinate: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    }
                })
            }, (error) => {
                console.log(error)
            },
            {showLocationDialog: true, enableHighAccuracy: true}
        );
    };


    render() {
        const {loading, data, errMsg, otpCode, phone} = this.state;
        return (
            <SafeAreaView style={styles.baseContainer}>

                <Loading loading={loading}/>

                <NewHeader navigation={() => this.props.navigation.goBack()} showBack={true} />




                <View style={styles.formContainer}>
                    <View style={styles.topContCenter}>
                        <Text style={styles.titleBold}>Verify Code</Text>
                        <Text style={styles.titleGreyBold}>Check your SMS messages, we have sent you the code at <Text style={styles.bold}> {phone && phone} </Text> </Text>
                    </View>

                    <View style={styles.inputWrapper}>

                        {/*<Text style={styles.code}>{data && data.otp}</Text>*/}

                        <TextInput
                            style={styles.inputs}
                           autoCapitalize='none'
                           autoCorrect={false}
                           autoFocus={true}
                           maxLength={4}
                           keyboardType='numeric'
                           returnKeyType='done'
                           placeholder='_ _ _ _'
                           placeholderTextColor='#333'
                            value={otpCode}
                           onChangeText={text => this.setState({otpCode: text})}
                        />
                        <Text style={styles.errLabel}> {errMsg && errMsg} </Text>
                    </View>
                    <View style={styles.txtRow}>
                        <Text style={styles.txtLeft}>Didn't received?</Text>
                        <TouchableOpacity style={styles.btnLink} onPress={this._ResendOtp}>
                            <Text style={styles.btnLinkTxt}>Resend</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Button title={'Next'} onPress={this._handleOtp}/>
                <NavigationEvents
                    onDidFocus={this._focus}
                />
                <InternetConnection/>
            </SafeAreaView>
        );
    }
}

export default OTP;
