/*---------------------------------------------------------------*
 *   Author: Prashant Gaurav                                     *
 *   Licence: Copyright, All Rights Reserved to Ajnasoft         *
 *---------------------------------------------------------------*/
import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
const screen = Dimensions.get('window')
const NoSearchResult = (props) => {
    return (
        <View style={{width: '100%', height: screen.height/2, justifyContent: 'center', alignItems: 'center', padding:30}}>
            <Ionicons name='ios-warning' color={'rgba(0,0,0,0.44)'} size={60}/>
            <Text style={{fontSize: 18, color: 'rgba(0,0,0,0.63)', fontFamily: 'OpenSans-Regularr', marginTop: 10}}>No result found.</Text>
            <Text style={{fontSize: 12, color: 'rgba(0,0,0,0.46)', fontFamily: 'OpenSans-Regular',marginTop:10,textAlign:'center'}}>
                Sorry, we are unable to find what you looking for, Please check for spelling errors.
            </Text>
        </View>
    );
}
export default NoSearchResult
