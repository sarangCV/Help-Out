import React, { Component } from 'react';
import { StyleSheet, Share, SafeAreaView, View, Animated, Dimensions, Alert } from 'react-native';

import {
  PanGestureHandler,
  NativeViewGestureHandler,
  State,
  TapGestureHandler
} from 'react-native-gesture-handler';

import {StackActions} from 'react-navigation';
import {getCities} from '../../api/utils';

import { getToken, removeToken } from "../../asy-store";
import Header from './components/Header';
import ProfileInfo from './components/ProfileInfo';
import Loading from '../../components/Loading';
import InternetConnection from "../../components/Info/InternetConnection";

const HEADER_HEIGHT = 30;
const windowHeight = Dimensions.get('window').height;
const SNAP_POINTS_FROM_TOP = [0,  windowHeight * 0.8];

const START = SNAP_POINTS_FROM_TOP[0];
const END = windowHeight/2;

export default class profile extends Component {
  masterdrawer = React.createRef();
  drawer = React.createRef();
  drawerheader = React.createRef();
  scroll = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      lastSnap: END + 70,
      userData: null,
      authToken: null,
      loading: false,
      cities:null,
    };

    this._lastScrollYValue = 0;
    this._lastScrollY = new Animated.Value(0);
    this._onRegisterLastScroll = Animated.event(
      [{ nativeEvent: { contentOffset: { y: this._lastScrollY } } }],
      { useNativeDriver: true }
    );
    this._lastScrollY.addListener(({ value }) => {
      this._lastScrollYValue = value;
    });

    this._dragY = new Animated.Value(0);
    this._onGestureEvent = Animated.event(
      [{ nativeEvent: { translationY: this._dragY } }],
      { useNativeDriver: true }
    );

    this._reverseLastScrollY = Animated.multiply(
      new Animated.Value(-1),
      this._lastScrollY
    );

    this._translateYOffset = new Animated.Value(END);
    this._translateY = Animated.add(
      this._translateYOffset,
      Animated.add(this._dragY, this._reverseLastScrollY)
    ).interpolate({
      inputRange: [START, END],
      outputRange: [START, END],
      extrapolate: 'clamp',
    });
  }

  componentDidMount() {
      getToken('authToken').then(res => {
        this.setState({authToken: JSON.parse(res)})
      })
      getToken('userData').then(res => {
        console.log(res)
        this.setState({userData: JSON.parse(res)})
      })
      this._fetchCities();
  }

  _fetchCities = () => {
    getCities(17).then(res => {
      // console.log(res)
      if(res.success){
        this.setState({cities: res.data})
      }else{
        alert(res.message)
      }
    })
  }

  _onHeaderHandlerStateChange = ({ nativeEvent }) => {
    if (nativeEvent.oldState === State.BEGAN) {
      this._lastScrollY.setValue(0);
    }
    this._onHandlerStateChange({ nativeEvent });
  };

  _onHandlerStateChange = ({ nativeEvent }) => {
    if (nativeEvent.oldState === State.ACTIVE) {
      let { velocityY, translationY } = nativeEvent;
      translationY -= this._lastScrollYValue;
      const dragToss = 0.05;
      const endOffsetY =
        this.state.lastSnap + translationY + dragToss * velocityY;

      let destSnapPoint = SNAP_POINTS_FROM_TOP[0];
      for (let i = 0; i < SNAP_POINTS_FROM_TOP.length; i++) {
        const snapPoint = SNAP_POINTS_FROM_TOP[i];
        const distFromSnap = Math.abs(snapPoint - endOffsetY);
        if (distFromSnap < Math.abs(destSnapPoint - endOffsetY)) {
          destSnapPoint = snapPoint;
        }
      }

      this.setState({ lastSnap: destSnapPoint });
      this._translateYOffset.extractOffset();
      this._translateYOffset.setValue(translationY);
      this._translateYOffset.flattenOffset();

      this._dragY.setValue(0);
      Animated.spring(this._translateYOffset, {
        velocity: velocityY,
        tension: 68,
        friction: 12,
        toValue: destSnapPoint,
        useNativeDriver: true,
      }).start();
    }
  };

  _logOut = () => {
    StackActions.reset({key: null,index: 0});
    removeToken('authToken').then(() => {
      removeToken('userData').then(() => {
        this.props.navigation.navigate('Onboarding')
      })
    })
  }


  _handleNav = params => {
    console.log(params);
    if(params === 'Manage Events'){
      this.props.navigation.navigate('ManageEvents', {
        authToken: this.state.authToken,
      });
    }else if(params === 'Help'){
      this.props.navigation.navigate('Help');
    }else if(params === 'Blocked users'){
      this.props.navigation.navigate('BlockedUsers');
    }else if(params === 'Report an Issue'){
      this.props.navigation.navigate('Feedback',{
        authToken: this.state.authToken,
      });
    } else if(params === 'Saved Organisations'){
      this.props.navigation.navigate('SavedOrgs',{
        authToken: this.state.authToken,
      });
    }else if(params === 'Reported Issues'){
      this.props.navigation.navigate('ReportedIssues',{
        authToken: this.state.authToken,
      });
    } else if(params === 'List My Event'){
      this.props.navigation.navigate('ListMyEvent',{
        authToken: this.state.authToken,
      });
    } else if(params === 'List My NGO'){
      this.props.navigation.navigate('ListMyNgo',{
        authToken: this.state.authToken,
      });
    }else if (params === 'Refer') {
      Share.share({
        message: 'Invite your friends to join PMIT and help us grow our community https://pmit.tech',
        url: 'https://pmit.tech',
        title: 'JOIN PMIT'
      }, {
        // Android only:
        dialogTitle: 'JOIN PMIT',
        // iOS only:
        excludedActivityTypes: [
          'com.apple.UIKit.activity.PostToTwitter'
        ]
      })
    }else if (params === 'Logout') {
      Alert.alert(
        'Logout',
        'Are you sure you want to Logout ?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {text: 'OK', onPress: () => this._logOut()},
        ],
        {cancelable: false},
    );
    }
  }



  render() {

    const {userData, authToken, loading, cities} = this.state;

    return (
      <SafeAreaView style={styles.container}>

        <Loading loading={loading} />

      <Header
          edit={() => this.props.navigation.navigate('EditProfile', {
            token: authToken,
          })}
          navigate={() => this.props.navigation.goBack()}
          uri={userData && userData.userAvatar}
          name ={userData && userData.userName}
          cities={cities && cities}
        />

      <TapGestureHandler
        maxDurationMs={100000}
        ref={this.masterdrawer}
        maxDeltaY={this.state.lastSnap - SNAP_POINTS_FROM_TOP[0]}>
        <View style={styles.viewBox} pointerEvents="box-none">
          <Animated.View
            style={[
              StyleSheet.absoluteFillObject,
              {
                transform: [{ translateY: this._translateY }],
              },
            ]}>
            <PanGestureHandler
              ref={this.drawerheader}
              simultaneousHandlers={[this.scroll, this.masterdrawer]}
              shouldCancelWhenOutside={false}
              onGestureEvent={this._onGestureEvent}
              onHandlerStateChange={this._onHeaderHandlerStateChange}>
              <Animated.View style={styles.header}>
                <Animated.View style={[
                  styles.divider,
                  {
                    opacity: this._translateY.interpolate({
                      inputRange: [START, END],
                      outputRange: [0, 1],
                    })
                  },
                ]}/>
              </Animated.View>
            </PanGestureHandler>
            <PanGestureHandler
              ref={this.drawer}
              simultaneousHandlers={[this.scroll, this.masterdrawer]}
              shouldCancelWhenOutside={false}
              onGestureEvent={this._onGestureEvent}
              onHandlerStateChange={this._onHandlerStateChange}>
              <Animated.View style={styles.container}>
                <NativeViewGestureHandler
                  ref={this.scroll}
                  waitFor={this.masterdrawer}
                  simultaneousHandlers={this.drawer}>
                  <Animated.ScrollView
                    style={[
                      styles.scrollView,
                      { marginBottom: SNAP_POINTS_FROM_TOP[0] },
                    ]}
                    bounces={false}
                    onScrollBeginDrag={this._onRegisterLastScroll}
                    scrollEventThrottle={1}>
                    <ProfileInfo isOrg={userData && userData.isOrganization} navAction={this._handleNav}/>
                  </Animated.ScrollView>
                </NativeViewGestureHandler>
              </Animated.View>
            </PanGestureHandler>
          </Animated.View>
        </View>
      </TapGestureHandler>
        <InternetConnection />
      </SafeAreaView>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  viewBox:{
    ...StyleSheet.absoluteFill,
  },
  header: {
    height: HEADER_HEIGHT,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
  },
  divider:{
    width: 60,
    height: 5,
    borderRadius: 30,
    backgroundColor: '#ddd',
  }
});