/*---------------------------------------------------------------*
 *   Author: Prashant Gaurav                                     *
 *   Licence: Copyright, All Rights Reserved to Ajnasoft         *
 *---------------------------------------------------------------*/
import React from 'react';
import {View, Text, StyleSheet, Image,TouchableOpacity } from 'react-native';

const SearchCard = props => (
    <TouchableOpacity style={styles.card} onPress={props.navigate}>
        <View style={{paddingHorizontal: 10}}>
            <Image source={{uri: props.orgImage, method: 'get', headers: {Pragma: 'no-cache'}}} style={styles.cardImg} resizeMode="contain" />
        </View>
        <View style={styles.btmFooter}>
            <Text numberOfLines={2} ellipsizeMode={'tail'} style={styles.title}>{props.orgName}</Text>
        </View>
    </TouchableOpacity>
);

export default SearchCard

const styles = StyleSheet.create({
    card: {
        width: '48.5%',
        backgroundColor: '#fff',
        borderRadius: 5,
        marginBottom: 13,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 1,
    },
    title: {
        fontFamily: 'NanumGothic-Regular',
        fontSize: 14,
        color: '#fff'
    },
    btmFooter:{
        paddingHorizontal: 10,
        justifyContent: 'center',
        height: 45,
        flex:1,
        borderBottomEndRadius: 5,
        borderBottomStartRadius: 5,
        backgroundColor: 'black',
    },
    cardImg: {
        width: '100%',
        height: 150,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
    }
})



