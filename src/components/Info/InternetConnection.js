/*-------------------------------------------------------------------*
 *   @ Author  : Prashant Gaurav                                     *
 *   @ Version : 1.0                                                 *
 *   @ Copyright, all rights reserved to ajnasoft                    *
 *-------------------------------------------------------------------*/
import React, {Component} from 'react'
import {View, Text, StyleSheet, Image, Animated, Dimensions, Button} from 'react-native'
import {noInternet} from '../../assets/images/images.json'
import NetInfo from '@react-native-community/netinfo'

const screen = Dimensions.get('window')
export default class InternetConnection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            animation: new Animated.Value(250),
            isConnected: true,      // Connection Status true || false
            isSlowConnection: false,// if Connection type is 2g, isSlowConnection is true
        }
        // this.unsubscribe;
    }

    /* -------------------------------------------------------------- *
     *                      CHECK INTERNET CONNECTION                 *
     * -------------------------------------------------------------- */
    componentDidMount() {
        const unsubscribe = NetInfo.addEventListener(state => {
            this.setState({
                type: state.type,
                isConnected: state.isConnected,
                isSlowConnection: state.type == "cellular" ? state.details.cellularGeneration == '2g' ? true : false : false
            }, () => {
                this._animation()
                this._hideSlowConnection()
            })
        });
    }

    /* -------------------------------------------------------------- *
     *                      BOX ANIMATION                             *
     * -------------------------------------------------------------- */
    _animation() {
        Animated.timing(this.state.animation, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
        }).start(() => {
            this.state.animation.setValue(0)
        });
    };

    _hideSlowConnection = () => {
        setTimeout(() => {
            this.setState({
                isSlowConnection: false
            })
        }, 3000); //time in ms
    };

    render() {
        let animatedStyles = {transform: [{translateY: this.state.animation}]}
        const {isConnected, isSlowConnection} = this.state
        if (isConnected) {
            if (isSlowConnection) {
                return (
                    <View style={styles.connectionSpeed}>
                        <View style={styles.connectionSpeedView}>
                            <Text style={styles.connectionText}>Poor Connectivity : Response might be slow</Text>
                        </View>
                    </View>
                )
            } else {
                return null
            }
        } else {
            return (
                <View style={styles.container}>
                    <View style={styles.topSection}/>
                    <Animated.View style={[styles.animationBox, animatedStyles]}>
                        <Image style={{height: '70%', width: '58%'}} source={{uri: noInternet}}/>
                    </Animated.View>
                </View>
            )
        }
    }
}
const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.4)',
        zIndex: 100,
    },
    topSection: {
        height: (screen.height) - 300,
        width: '100%',
        zIndex: 100,
    },
    animationBox: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 290,
        maxHeight:300,
        width: '100%',
        backgroundColor: '#f7f7f7',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
    connectionSpeed: {
        position: 'absolute',
        top: 50,
        left: '20%',
        right: 0,
        height: 50,
        width: '80%',
    },
    connectionSpeedView: {
        flex: 1,
        flexDirection: 'row',
        height: '100%',
        width: '100%',
        backgroundColor: '#f7f7f7',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderWidth: 1,
        borderColor: '#808aff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    connectionText: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 14,
    }
})

