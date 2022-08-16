/*---------------------------------------------------------------*
 *   Author: Harish Kumar                                        *
 *   application : ZipDriver                                     *
 *   licence: copyright, all rights reserved to ajnasoft         *
 *---------------------------------------------------------------*/
'use strict';
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import {updateUserPhone} from '../../api/utils'

import Header from '../../components/Header';
import OTPInputs from '../../components/OTPInputs';
import Loading from '../../components/Loading';
import InternetConnection from "../../components/Info/InternetConnection";


class ValidateOtp extends Component {
    state = {
        otpReference: null,
        otp: null,
        oldNumber: null,
        authToken: null,
        phone: null,
        loading: false,
    };

    componentDidMount() {
        const { otpReference, otp, oldNumber, authToken, phone } = this.props.navigation.state.params;
        this.setState({ otpReference, otp, oldNumber, authToken, phone })
        alert(otp);
        console.log(otpReference, otp, oldNumber, authToken, phone)
    }

    /*----------------------------------
     *          Validate Otp           *
     ----------------------------------*/

    _onFulfill = code => {
        console.log('event');
        const { otpReference, oldNumber, authToken } = this.state;
        let dataToSend = {
            otpReference: otpReference,
            otp: parseInt(code),
            oldNumber: parseInt(oldNumber),
        };
        this.setState({loading:true});
        updateUserPhone(authToken, dataToSend).then(res => {
            console.log(res)
            this.setState({loading:false});
            if(res.success){
                alert(res.message);
                this.props.navigation.navigate('EditProfile')
            }else{
                alert(res.message);
                this.refs.codeInputRef1._clear();
            }
        })
    };

    _resendOTP = () => {
        this.props.resendOtp();
    };

    render() {
        const { phone, loading } = this.state;
        return (
            <SafeAreaView style={styles.container}>
            <View style={styles.container}>
               <Loading loading={loading} />
                <Header navigation={() => this.props.navigation.goBack()} title={'Verify OTP'} isBackBtn={true} />

                <View style={styles.innerContainer}>

                    <View style={styles.headerTitle}>
                        <Text style={styles.headerText}>
                            Please enter OTP Sent to 
                            {phone && <Text style={styles.fontBold}> {phone} </Text>}
                        </Text>
                    </View>


                  {/*------------------------------------
                    *         OTP Inputs Component      *
                    ------------------------------------*/}

                    <View style={styles.inputWrapper}>
                        <OTPInputs
                            ref="codeInputRef1"
                            keyboardType="numeric"
                            onFulfill={code => this._onFulfill(code)}
                        />
                    </View>

                </View>

            </View>
                <InternetConnection />
            </SafeAreaView>
        );
    }
}

export default ValidateOtp;


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    innerContainer:{
        flex: 1,
        padding: 20,
        marginTop: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        marginTop: 10,
    },
    headerText: {
        fontSize: 18,
        color: '#7e7e7e',
        textAlign: 'center',
        marginBottom: 30,
        lineHeight: 30,
    },
    inputWrapper: {
        width: '80%',
        marginTop: 30,
        height: 150,
    },
    defaultBtn: {
        padding: 15,
    },
    defaultTxt: {
        fontWeight: '600',
        fontSize: 16,
    },
    fontBold: {
        fontWeight: '600',
    },
});