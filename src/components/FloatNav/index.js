import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const FloatNav = props => {
    return (
        <View style={styles.floatNav}>
            <View style={styles.btnRow}>
                <TouchableOpacity
                    style={styles.btnLeft}
                    onPress={props.navScreen.bind(null, 'home')}
                >
                    <Icon name="home" color={props.activeScreen == 'home' ? '#514fe1' : '#9b9b9b'}
                          size={props.activeScreen == 'home' ? 27 : 27}/>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.btnRight}
                    onPress={props.navScreen.bind(null, 'event')}
                >
                    <Icon name="plus" color={props.activeScreen == 'event' ? '#514fe1' : '#9b9b9b'}
                          size={props.activeScreen == 'event' ? 27 : 27}/>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btnRight}
                    onPress={props.navScreen.bind(null, 'search')}
                >
                    <Icon name="magnify" color={props.activeScreen == 'search' ? '#514fe1' : '#9b9b9b'}
                          size={props.activeScreen == 'search' ? 27 : 27}/>
                </TouchableOpacity>
            </View>
        </View>
    )
};


export default FloatNav;

const styles = StyleSheet.create({
    floatNav: {
        width: '100%',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 25,
        height: 60,
        zIndex: 1,
    },
    btnRow: {
        width: '60%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        alignItems: 'center',
        height: '100%',
        borderRadius: 32,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        zIndex: 3,
    },
    btnLeft: {
        justifyContent: "center",
        alignItems: 'center',
        height: '100%',
        paddingHorizontal: 25,
    },
    btnRight: {
        justifyContent: "center",
        alignItems: 'center',
        height: '100%',
        paddingRight: 25,
        paddingLeft: 20,
    }
})
