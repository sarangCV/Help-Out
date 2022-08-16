/*---------------------------------------------------------------*
 *   @author: Prashant Gaurav                                    *
 *   @licence: Copyright, All Rights Reserved to Ajnasoft        *
 *   @flow                                                       *
 *---------------------------------------------------------------*/
import React from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
moment.locale('en');

const searchCard = (props) => {
    return (
        <View style={styles.card}>
            <View style={styles.postIcons}>
                <ImageBackground imageStyle={{borderRadius: 5}} style={{width: 80, height: 80}} source={{uri: 'https://i.ibb.co/L6HzGtQ/Screen-Shot-2019-06-14-at-3-13-16-PM.png'}}/>
            </View>
            <View style={{flex:5}}>
                <Text numberOfLines={1} ellipsizeMode={'tail'} style={[styles.postText,{ fontSize: 18, color: '#616161'}]}>{props.details}</Text>
                <Text numberOfLines={1} ellipsizeMode={'tail'} style={[styles.postText,{ fontSize: 12,}]}><Ionicons name={'md-time'} color={'rgba(248,73,100,0.56)'} size={12}/>{'  '}{moment(props.posted_at).fromNow()}</Text>
            </View>
        </View>
    );
}
export default searchCard

const styles = StyleSheet.create({
    card: {
        padding:20,
        height: 140,
        flexDirection:'row',
        alignItems: 'center',
        borderWidth:0.4,
        borderColor:'#919191',
        backgroundColor: '#e8e8e8',
        borderRadius:10
    },
    postText: {
        color: '#c0c0c0',
        fontFamily: 'OpenSans-Regular',
        padding:6
    },
    postIcons:{
        flex:2,
        justifyContent:'center'
    }
})



