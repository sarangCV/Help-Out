/*---------------------------------------------------------------*
 *   Author: Prashant Gaurav                                     *
 *   Licence: Copyright, All Rights Reserved to Ajnasoft         *
 *---------------------------------------------------------------*/

import React from 'react';
import {View, TextInput, StyleSheet, StatusBar, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Header = (props) => (
        <View style={styles.header}>
            <StatusBar barStyle='dark-content' backgroundColor='rgba(255,255,255,0)' translucent={true}/>
            <View style={styles.inputView}>
                <Icon name="md-search" color={'#a6a6a6'} size={20} style={styles.iconLeft}/>
                <TextInput placeholderTextColor={'#a6a6a6'} style={styles.searchInput} placeholder="Find an NGO" onChangeText={props.onChange} onEndEditing={props.onEnd} />
            </View>
            <TouchableOpacity style={styles.filter} onPress={props.onPressFilter}>
                <Icon name="md-funnel" color={props.filterColor} size={20} style={styles.iconRight} />
            </TouchableOpacity>
        </View>
);

export default Header

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        height: 80,
        alignItems: 'center',
        backgroundColor: '#fff',
        // borderWidth: 2,
        paddingTop: 25,
        paddingHorizontal: 20
    },
    inputView: {
        flexDirection: 'row',
        flex: 7,
        height: '100%',
        alignItems: 'center'
    },
    searchInput:{
        width: '100%',
        height: '100%',
        paddingLeft: 10,
        fontSize: 18,
        fontFamily: 'Montserrat-SemiBold',
    },
    filter: {
        flex: 1 ,
        height: '100%',
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    btnRightBorder: {
        position: 'absolute',
        top: 44,
        right: 20,
        zIndex: 99
    },
    btnRightBorderLeft: {
        position: 'absolute',
        top: 40,
        right: 50,
        borderRightWidth: 1,
        paddingRight: 5,
        borderRightColor: '#a6a6a6',
        zIndex: 99
    },
    iconLeft: {
    },
    iconRight: {
    }
});



