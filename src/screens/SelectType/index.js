'use strict';
import React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    Platform,
    ProgressBarAndroid,
    ProgressViewIOS,
    KeyboardAvoidingView,
    ScrollView,
    Linking,
    Keyboard,
    BackHandler,
} from 'react-native';
import DeviceInfo, {getManufacturer} from "react-native-device-info";

//Icons
import Icon from 'react-native-vector-icons/Ionicons';

//Components
import NewHeader from '../../components/NewHeader'
import Loading from '../../components/Loading';
import InternetConnection from "../../components/Info/InternetConnection";
import Button from "../../components/Button";

//APIS
import {registerUser, storeDevice} from "../../api/auth";

//Asyncstore
import {saveToken} from "../../asy-store";

//styles
import styles from './styles';


class SelectType extends React.Component {

    state = {
        name: null,
        email: null,
        password: null,
        nameErr: null,
        emailErr: null,
        passErr: null,
        tcErr: null,
        data: null,
        ProgressValue: null,
        deviceInfo: null,
        deviceInfoAsync: null,
        loading: false,
        checked: false,
        page: 'register',
    };


    componentDidMount() {
        const {data} = this.props.navigation.state.params;
        this.setState({data: data});
        this._getConstantDeviceInfo();
        this._getConstantDeviceInfoAsync();
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            if (this.state.page === 'register') {
                this.props.navigation.navigate('SignUp')
                return true;
            }
            return false;
        });
        Keyboard.addListener("keyboardDidShow", this._keyboardDidShow);
        Keyboard.addListener("keyboardDidHide", this._keyboardDidHide);
    }


    componentWillUnmount() {
        Keyboard.removeListener("keyboardDidShow", this._keyboardDidShow);
        Keyboard.removeListener("keyboardDidHide", this._keyboardDidHide);
        this.backHandler.remove();
    }


    _keyboardDidShow = () => {
        this.scrollview_ref.scrollTo({
            x: 0,
            y: 100,
            animated: true,
        });
    };

    _keyboardDidHide = () => {
        this.scrollview_ref.scrollTo({
            x: 0,
            y: 0,
            animated: true,
        });
    };


    _handleUser = () => {
        const {name, email, password, data, passwordStrength, checked} = this.state;
        let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (!name) {
            this.setState({nameErr: 'Please enter your name'});
        } else if (!email) {
            this.setState({emailErr: 'Please enter your email'});
            return false;
        } else if (!reg.test(email)) {
            this.setState({emailErr: 'Invalid Email'});
            return false;
        } else if (!passwordStrength === 'Good' || !passwordStrength === 'Strong') {
            this.setState({passErr: 'Please choose strong or good password.'});
        } else if (!checked) {
            this.setState({tcErr: 'Please accept terms & conditions'});
        }else {
            this.setState({nameErr: null, emailErr: null, passErr: null})

            let userData = {
                // registrationToken: data.registrationToken
                registrationToken: data.registrationToken,
                otpReference: data.registrationToken.sessionToken,
                userName: name,
                userEmail: email,
                userPassword: password,
            };

            let deviceInfo = Object.assign({}, this.state.deviceInfo, this.state.deviceInfoAsync);

            console.log(userData)
            this.setState({loading: true});
            registerUser(userData).then(res => {
                this.setState({loading: false});
                console.log(res)
                if (res.success) {
                    saveToken('userData', res).then(() => {
                        saveToken('authToken', res.token).then(() => {
                            storeDevice(res.token, deviceInfo).then(res => {
                                console.log(res);
                                if (res.success) {
                                    this.props.navigation.navigate('App');
                                } else {
                                    alert(res.message);
                                }
                            });
                        })
                    });
                } else {
                    alert(res.message);
                };
            });
        };
    };



    _handleChange = text => {
        this.validate(text);
        this.setState({password: text});
    };

    validate = e => {
        let password = e;
        if (password.length < 6) {
            this.setState({
                passwordStrength: null,
                passErr: 'password must be greater than 6 characters',
            });
        } else {
            this.setState({
                passErr: '',
            });
            this.measureStrength(password);
        }
    };

    measureStrength = password => {
        let score = 0;
        let passwordStrength, ProgressValue;
        let regexPositive = ['[A-Z]', '[a-z]', '[0-9]', '\\W'];
        regexPositive.forEach((regex, index) => {
            if (new RegExp(regex).test(password)) {
                score += 1;
            }
        });
        switch (score) {
            case 0:
            case 1:
                passwordStrength = 'Weak';
                ProgressValue = 0.3;
                break;
            case 2:
            case 3:
                passwordStrength = 'Good';
                ProgressValue = 0.5;
                break;
            case 4:
            case 5:
                passwordStrength = 'Strong';
                ProgressValue = 1;
                break;
            default:
                passwordStrength = '';
                break;
        }
        this.setState({
            passwordStrength,
            ProgressValue,
        });
    };

    _getConstantDeviceInfo = () => {
        let deviceJSON = {};
        deviceJSON.device_unique_id = DeviceInfo.getUniqueId();
        deviceJSON.device_model = DeviceInfo.getModel();
        deviceJSON.device_id = DeviceInfo.getDeviceId();
        deviceJSON.device_system_name = DeviceInfo.getSystemName();
        deviceJSON.device_system_version = DeviceInfo.getSystemVersion();
        deviceJSON.device_bundle_id = DeviceInfo.getBundleId();
        deviceJSON.device_build_number = DeviceInfo.getBuildNumber();
        deviceJSON.device_readable_version = DeviceInfo.getReadableVersion();
        deviceJSON.device_locale = null;
        deviceJSON.device_country = null;
        deviceJSON.device_name = null;
        this.setState({deviceInfo: deviceJSON});
        console.log(deviceJSON);
    };

    _getConstantDeviceInfoAsync = async () => {
        let deviceJSON = {};
        deviceJSON.manufacturer = await getManufacturer();
        deviceJSON.device_user_agent = await DeviceInfo.getUserAgent();
        this.setState({deviceInfoAsync: deviceJSON});
        console.log(deviceJSON);
    };


    _setActive = text => {
        this.setState({accType: text})
    };

    _togglePassword = () => {
        this.setState({secure: !this.state.secure});
    };


    render() {
        const {checked, nameErr, emailErr, passErr, tcErr, passwordStrength, ProgressValue, secure, loading} = this.state;
        const _color = val => {
            if (val === 'Weak') {
                return {color: '#ec6611'};
            } else if (val === 'Good') {
                return {color: '#1185ec'};
            } else {
                return {color: '#4CAF50'};
            }
        };
        return (
            <SafeAreaView style={{flex: 1}}>
                <KeyboardAvoidingView style={{flex: 1}}>
                    <NewHeader navigation={() => this.props.navigation.navigate('SignUp')} showBack={true} title={'SignUp'}/>
                    <Loading loading={loading}/>
                    <ScrollView style={{flex: 1}}
                                ref={ref => {
                                    this.scrollview_ref = ref;
                                }}>

                            <View style={styles.formContainer}>
                                <TextInput
                                    placeholder="Name"
                                    placeholderTextColor={'#d5d5df'}
                                    style={styles.input}
                                    onChangeText={name => this.setState({name})}
                                    // value={phone}
                                />
                                <Text style={styles.errLabel}>{nameErr && nameErr} </Text>
                                <TextInput
                                    placeholder="Email"
                                    keyboardType={'email-address'}
                                    placeholderTextColor={'#d5d5df'}
                                    style={styles.input}
                                    onChangeText={email => this.setState({email})}
                                    // value={email}
                                />
                                <Text style={styles.errLabel}>{emailErr && emailErr} </Text>

                                <View style={styles.widthFull}>

                                    <TouchableOpacity
                                        style={styles.passBtn}
                                        onPress={this._togglePassword}>
                                        <Icon
                                            name={secure ? 'md-eye-off' : 'md-eye'}
                                            color={'#cacaca'}
                                            size={25}
                                        />
                                    </TouchableOpacity>

                                    <TextInput
                                        placeholder="Password"
                                        placeholderTextColor={'#cacaca'}
                                        onChangeText={text => this._handleChange(text)}
                                        // value={password}
                                        style={styles.input}
                                        secureTextEntry={secure}
                                    />

                                    {passwordStrength && <View style={styles.passStrng}>
                                        <Text style={[styles.passStrngTxt, styles.flexSm]}>Password Strength: </Text>
                                        <Text style={[styles.passStrngTxt, styles.flexMm, _color(passwordStrength)]}>
                                            {passwordStrength}
                                        </Text>
                                        {passwordStrength ? (
                                            <View style={styles.progressBar}>
                                                {Platform.OS === 'android' ? (
                                                    <ProgressBarAndroid
                                                        styleAttr="Horizontal"
                                                        progress={ProgressValue}
                                                        indeterminate={false}
                                                        color={_color(passwordStrength).color}
                                                        style={{width: '100%'}}
                                                    />
                                                ) : (
                                                    <ProgressViewIOS
                                                        progress={ProgressValue}
                                                        progressTintColor={_color(passwordStrength).color}
                                                    />
                                                )}
                                            </View>
                                        ) : null}
                                    </View> }

                                </View>

                                <Text style={styles.errLabel}>{passErr && passErr} </Text>

                                <View style={styles.row}>
                                    <View style={styles.flexLeft}>
                                        <TouchableOpacity style={styles.checkBox} onPress={()=> this.setState({checked: !checked})}>
                                            {checked && <Icon name="md-checkmark" color={'#3b52d4'} size={20} />}
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.contRight}>
                                        <Text style={styles.txtSm}>By checking "Continue", you agree to the</Text>
                                        <TouchableOpacity style={styles.link} onPress={()=> Linking.openURL('http://helpout.in/terms-conditions.html')}>
                                            <Text style={[styles.linkTxt, {paddingLeft: 5}]}>Terms & Conditions</Text>
                                        </TouchableOpacity >
                                        <Text style={styles.txtSm}>and</Text>
                                        <TouchableOpacity style={styles.link} onPress={()=> Linking.openURL('http://helpout.in/privacy-policy.html')}>
                                            <Text style={styles.linkTxt}>Privacy Policy</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <Text style={styles.errLabel}>{tcErr && tcErr} </Text>

                            </View>

                    </ScrollView>

                     <Button title={'SignUp'} onPress={this._handleUser}/>

                </KeyboardAvoidingView>
                <InternetConnection/>
            </SafeAreaView>
        );
    }
}

export default SelectType;
