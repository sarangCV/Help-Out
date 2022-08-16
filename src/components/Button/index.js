/**
 * @flow
 */
import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";


export  default Button = props => (
    <TouchableOpacity style={styles.navBtn} onPress={props.onPress} activeOpacity={0.8}>
        <Text style={styles.btnText}>{props.title}</Text>
        <Icon name="chevron-right" color={'#fff'} size={25} />
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    navBtn: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        height: 55,
        flexDirection: 'row',
        backgroundColor: '#3b52d4',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        fontFamily: 'NanumGothic-Bold',
        fontSize: 14,
        color: '#fff',
        marginRight: 5,
    },
});