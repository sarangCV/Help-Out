import React from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


export default Header = ({navigation, name, title, showBack}) => (
    <View style={styles.header}>
        <StatusBar barStyle='light-content' backgroundColor='transparent' translucent={true}/>

        <View style={styles.headerCont}>

           {showBack && <TouchableOpacity onPress={navigation} style={styles.absBtn}>
                <Icon name={name} color={'#fff'} size={25} />
            </TouchableOpacity>} 

            <View style={styles.headerTop}>
                <Text style={styles.headerTextLeft}>{title}</Text>
            </View>

        </View>

        

    </View>
);


const styles = StyleSheet.create({
    header:{
       width: '100%',
       minHeight: 70,
       paddingHorizontal: 10,
       paddingTop: 30,
       paddingBottom: 20,
    },
    headerCont:{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTextLeft:{
        fontFamily: 'Montserrat-Regular',
        color:'#fff',
        fontSize: 22,
        marginTop: 3,
    },
    absBtn: {
        position: 'absolute',
        left: 0,
        top: 7,
        zIndex: 99,
        width: 50,
        padding:0,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

