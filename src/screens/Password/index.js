'use strict';
import React from 'react';
import {View, Text, TextInput, TouchableOpacity, BackHandler} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {getManufacturer} from 'react-native-device-info';
import Icon from 'react-native-vector-icons/Ionicons';
//Components
import NewHeader from '../../components/NewHeader'
import Loading from "../../components/Loading";
//API
import {validatePassword, resetPassword, storeDevice} from "../../api/auth";
//Async Store
import {saveToken} from "../../asy-store";
//Styles
import styles from './styles';
import InternetConnection from "../../components/Info/InternetConnection";

class Password extends React.Component {

  state = {
    password: null,
    secure: true,
      deviceInfo: null,
      deviceInfoAsync: null,
      loading: false,
      data: null,
      phone: null,
  }

    componentDidMount() {
      const {data, phone} = this.props.navigation.state.params;
      this.setState({data, phone})
        this._getConstantDeviceInfo();
        this._getConstantDeviceInfoAsync();
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.navigation.navigate('SignUp')
            return true;
        });
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }


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



    _togglePassword = () => {
    this.setState({secure: !this.state.secure});
  };


    _handleSubmit = () => {
        const {data, password} = this.state;
        let dataToSend = {
            otpReference: data.otpReference,
            password: password,
        };
        let deviceInfo = {
            ...this.state.deviceInfo,
            ...this.state.deviceInfoAsync,
        };
        if (!password) {
            this.setState({errMsg: 'Please enter password'});
        } else {
            this.setState({ errMsg: null, loading:true });
            validatePassword(dataToSend).then(res => {
                console.log(res);
                let token = res.token;
                if (res.success) {
                    saveToken('userData', res).then(() => {
                        saveToken('authToken', res.token).then(() => {
                            storeDevice(token, deviceInfo).then(res => {
                                console.log(res);
                                this.setState({loading: false});
                                if (res.success) {
                                    this.props.navigation.navigate('App');
                                } else {
                                    alert(res.message);
                                }
                            });
                        })
                    });
                } else {
                    this.setState({loading: false});
                    alert(res.message);
                }
            });
        }
    };

    _Reset = () => {
        this.setState({loading: true})
        resetPassword({contactNumber:this.state.phone}).then(res => {
            this.setState({loading: false})
            // console.log(res)
            if (res.success) alert(res.message)
            else alert(res.message)
        })
    }


    render() {

    const {password, secure, loading, errMsg} = this.state;

    return (
      <View style={styles.baseContainer}>
          <NewHeader showBack={true} title={'Password'} navigation={() => this.props.navigation.navigate('SignUp')} />
          <Loading loading={loading}/>

          <View style={styles.topContCenter}>
            <Text style={styles.titleBold}>Enter Password</Text>
          </View>

          <View style={styles.formContainer}>



            <TextInput
              placeholder="Password"
              placeholderTextColor={'#d5d5df'}
              style={styles.input}
              onChangeText={password => this.setState({password})}
              value={password}
              secureTextEntry={secure}
            />

              <TouchableOpacity
                  style={styles.passBtn}
                  onPress={this._togglePassword}>
                  <Icon
                      name={secure ? 'md-eye-off' : 'md-eye'}
                      color={'#cacaca'}
                      size={25}
                  />
              </TouchableOpacity>

            <Text style={styles.errLabel}>{errMsg && errMsg}</Text>


              <View style={styles.txtRow}>
                  <Text style={styles.txtLeft}>Forgot Password?</Text>
                  <TouchableOpacity style={styles.btnLink} onPress={this._Reset}>
                      <Text style={styles.btnLinkTxt}>Reset</Text>
                  </TouchableOpacity>
              </View>



              <TouchableOpacity style={styles.navBtn} onPress={this._handleSubmit}>
              <Text style={styles.btnText}>Done</Text>
              {/* <IonIcon name="md-arrow-forward" color={'#fff'} size={25} /> */}
            </TouchableOpacity>

          </View>

          <InternetConnection />

      </View>
    );
  }
}

export default Password;
