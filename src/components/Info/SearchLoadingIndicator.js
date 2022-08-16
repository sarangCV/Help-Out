/*---------------------------------------------------------------*
 *   Author: Prashant Gaurav                                     *
 *   Licence: Copyright, All Rights Reserved to Ajnasoft         *
 *---------------------------------------------------------------*/
import React, {Component} from 'react'
import {View, Animated, StyleSheet, Dimensions} from 'react-native'
const screen = Dimensions.get('window')
export default class SearchLoadingIndicator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animation: new Animated.Value(0),
        }
    }

    /*---------------------------------------------------------------*
     *   ON LOAD ANIMATION WILL START                                *
     *---------------------------------------------------------------*/
    componentWillMount() {
        this.setState({
            interval: setInterval(() => {
                Animated.timing(this.state.animation, {
                    toValue: screen.width-70,
                    duration: 600
                }).start(() => {
                    this.state.animation.setValue(0);
                });
            }, 600)
        });
    }

    /*---------------------------------------------------------------*
     *   ON REMOVE ANIMATION WILL STOP                               *
     *---------------------------------------------------------------*/
    componentWillUnmount() {
        clearInterval(this.state.interval);
    }

    /*---------------------------------------------------------------*
     *   VIEW SECTION                                                *
     *---------------------------------------------------------------*/
    render() {
        const animatedStyles = {transform: [{translateX: this.state.animation}]}
        return (
            <View style={styles.animationBox}>
                <Animated.View style={[styles.box, animatedStyles]}/>
            </View>
        );
    }
}
/*---------------------------------------------------------------*
 *   ANIMATION VIEW STYLE                                        *
 *---------------------------------------------------------------*/
const styles = StyleSheet.create({
    animationBox: {
        height: 2,
        width: '100%',
        backgroundColor: 'white'
    },
    box: {
        width: 30,
        height: 3,
        backgroundColor: '#f84964',
        borderRadius: 100,
    }
});
