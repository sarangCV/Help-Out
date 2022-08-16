import React, { Component } from 'react';
import {Animated, StatusBar, View, StyleSheet, PermissionsAndroid, Easing, SafeAreaView} from 'react-native';

import DeviceInfo from 'react-native-device-info';
import Geolocation from 'react-native-geolocation-service';

import imageSource from '../../assets/images/logo.png';

import { saveToken, getToken, removeToken } from '../../asy-store';

import { onLaunchAuth } from '../../api/auth';
import InternetConnection from "../../components/Info/InternetConnection";


export default class Splash extends Component {

  state = {
    loadingProgress: new Animated.Value(0),
    animationDone: false,
    authToken: null,
    coordinate: null,
    deviceInfo: null,
  };

  componentDidMount() {
    this._requestPermission().then(() => this._getCurrentLocation())
    this._getDeviceInfo();
    this._animate();
  }

/*---------------------------------------------------------------*
 *                   Animate Splash Screen                       *
 *---------------------------------------------------------------*/

  _animate = () => {
      Animated.timing(this.state.loadingProgress, {
        toValue: 1,
        duration: 2000,
        Easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start(() => this._onAuthComplete());
    }


  _requestPermission = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([ PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION]
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
    }
  };


/*---------------------------------------------------------------*
 *                   Update Location Coordinates                 *
 *---------------------------------------------------------------*/

  _getCurrentLocation = async() => {
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
        console.log('Unable to find your location, please check your location Settings.')
      },
      { showLocationDialog: true, enableHighAccuracy: true }
    );
  };

/*---------------------------------------------------------------*
 *                   Get Device Info                             *
 *---------------------------------------------------------------*/

  _getDeviceInfo = () => {
    let deviceJSON = {};
    deviceJSON.device_id = DeviceInfo.getDeviceId();
    deviceJSON.device_unique_id = DeviceInfo.getUniqueId();
    this.setState({ deviceInfo: deviceJSON })
  };


/*---------------------------------------------------------------------------*
 *               Check token with api token valid or not                     *
 *---------------------------------------------------------------------------*/

  _onAuthComplete = () => {
    const { deviceInfo, coordinate, city } = this.state;
    getToken('authToken').then(res => {
      console.log(res);
      const resp = JSON.parse(res)
      if(!resp) {
      getToken('savedDevice').then(res => {
        console.log(res)
        if (!JSON.parse(res)) {
          this.props.navigation.navigate('Onboarding')
        }else {
          this.props.navigation.navigate('Onboarding')
        }
      })
      }else{
        let data = {
          appVersion: 1.11,
          ...deviceInfo,
          coordinate: coordinate,
          authToken: resp
        }
        // console.log(data)
        onLaunchAuth(resp, data).then(res => {
          console.log(res);
          if (res.success) {
            saveToken('authToken', res.token).then(() => {
                  this.props.navigation.navigate('App');
            })
          } else {
            removeToken('authToken').then(() => {
              removeToken('userData').then(() => {
                this.props.navigation.navigate('Onboarding')
              })
            })
            // clear().then(() => this.props.navigation.navigate('SignUp'));
          }
        });
      }
    })
  };


/*------------------------------------------------------*
 *               Start render block                     *
 *------------------------------------------------------*/

  render() {

    // const imageScale = {
    //   transform: [
    //     {
    //       scale: this.state.loadingProgress.interpolate({
    //         inputRange: [0, 10, 100],
    //         outputRange: [1, 2.5, 5],
    //       }),
    //     },
    //   ],
    // };

    // console.log('hello')
    return (
      <View style={styles.fullScreen}>
        <StatusBar backgroundColor="#3b52d4" transcluent={true} />
        {/*<Provider data={this.state.data}/>*/}
        <View style={styles.center}>
          <Animated.View style={[styles.centeredFullScreen]}>
            <Animated.Text style={styles.logoFont}>helpOUT</Animated.Text>
          </Animated.View>
        </View>
        <InternetConnection />
      </View>
    );

  }


/*------------------------------------------------------*
 *               End Start render block                 *
 *------------------------------------------------------*/

}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: '#514fe1',
    height: "100%",
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#514fe1',
  },
  centeredFullScreen: {
    // width: 250,
    // height: 300,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#514fe1'
    // backgroundColor: '#f84964',
  },
  maskImageStyle: {
    height: 96,
    width: 241,
    zIndex: 100,
    backgroundColor: '#514fe1'
  },
  logoFont: {
    fontSize: 60,
    fontFamily: 'Proxima-Nova-Bold',
    color: '#fff',
  }
});
