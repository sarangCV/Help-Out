/* ------------------------------ *
 *   Author: Prashant Gaurav      *
 * ------------------------------ */
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {View, TouchableOpacity, Text, StatusBar, StyleSheet} from 'react-native'


const Header = (props) => {
    return (
        <View style={styles.container}>
            {/*<StatusBar barStyle='dark-content' backgroundColor='#fff'/>*/}
            <StatusBar barStyle="dark-content" backgroundColor='rgba(255,255,255,0)' translucent={true}/>

            <View style={{flex: 1, flexDirection: 'row'}}>

                <TouchableOpacity style={[styles.itemLeft]} onPress={props.nav}>
                    <Icon name='chevron-back' size={20} style={styles.icons}/>
                </TouchableOpacity>

                <View style={styles.itemRight}>
                    <Text style={styles.title}>Events</Text>
                </View>

            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        zIndex: 100,
        maxHeight: 80,
        minHeight:75,
        paddingTop:35,
        // paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },
    itemLeft: {
        // width: '15%',
        paddingHorizontal: 15,
        alignItems: 'center',
        height: '100%',
    },
    itemRight: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        height: '100%',
    },
    title: {
        color: '#4a4a4a',
        fontSize: 20,
        paddingLeft: 20,
        fontFamily: 'NanumGothic-Regular'
    }
})
export default Header
