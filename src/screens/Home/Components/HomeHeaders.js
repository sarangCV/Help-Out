/*---------------------------------------------------------------*
 *   @author: Prashant Gaurav                                    *
 *   @licence: Copyright, All Rights Reserved to Ajnasoft        *
 *   @flow                                                       *
 *---------------------------------------------------------------*/
import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

const HomeHeaders = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.leftBox}>
                <Text style={styles.title}>Feeds</Text>
            </View>
            <TouchableOpacity style={styles.rightBox} onPress={props.nav}>
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>5</Text>
                </View>
                <Icon name="bell" color={'gray'} size={20}/>
            </TouchableOpacity>
        </View>
    );
}
export default HomeHeaders

const styles = StyleSheet.create({
    container: {
        maxHeight: 80,
        minHeight: 79,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        backgroundColor: '#fff',
        paddingTop: 30,
        paddingLeft: 15,
        paddingRight: 15,
    },
    leftBox: {},
    rightBox: {
        position: 'relative',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    badge: {
        position: 'absolute',
        right: 6,
        top: 6,
        backgroundColor: '#f84a65',
        width: 18,
        height: 18,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        zIndex: 10,
    },
    badgeText: {
        fontFamily: 'OpenSans-Regular',
        color: '#fff',
        fontSize: 12,
    },
    title: {
        fontFamily: 'OpenSans-Bold',
        color: '#222',
        fontWeight: '400',
        fontSize: 25
    }
})
