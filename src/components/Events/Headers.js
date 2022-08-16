/* ------------------------------ *
 *   Author: Prashant Gaurav      *
 * ------------------------------ */
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {View, TouchableOpacity, Text, StatusBar, StyleSheet} from 'react-native'


const Header = (props) => {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor='#514fe1' translucent={true}/>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={[styles.itemLeft]}>
                    <Text style={styles.title}>helpOUT</Text>
                </View>
                <View style={styles.itemRight}>
                    <TouchableOpacity style={styles.circle} onPress={props.onPress}>
                        <Icon name='settings-outline' size={25} style={styles.icons}/>
                    </TouchableOpacity>
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
        paddingTop:20,
        paddingHorizontal: 20,
        backgroundColor: '#514fe1',
    },
    itemLeft: {
        flexDirection: 'row',
        width: '90%',
        alignItems: 'center',
        height: '100%',
    },
    itemRight: {
        flexDirection: 'row',
        width: '10%',
        height: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    circle: {
        height: 40,
        width: 40,
        borderRadius: 100,
        // backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icons: {
        color: '#fff'
    },
    title: {
        color: '#fff',
        fontSize: 23,
        paddingLeft: 0,
        fontFamily: 'Proxima-Nova-Bold'
    }
})
export default Header