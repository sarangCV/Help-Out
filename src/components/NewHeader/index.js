import React from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';


export default NewHeader = props => (
    <View style={styles.header}>
        <StatusBar barStyle='dark-content' backgroundColor='rgba(255,255,255,0)' translucent={true}/>

        <View style={styles.headerCont}>

           {props.showBack && <TouchableOpacity onPress={props.navigation} style={styles.absBtn}>
                <Icon name="arrow-left" color={'#333'} size={20} />
            </TouchableOpacity>}
            <View style={styles.headerTop}>
                <Text style={styles.headerTextLeft}>{props.title}</Text>
            </View>

        </View>



    </View>
);


const styles = StyleSheet.create({
    header:{
       width: '100%',
       minHeight: 80,
       paddingHorizontal: 10,
       paddingTop: 30,
       paddingBottom: 20,
       backgroundColor: '#fff',
       borderBottomColor: '#e7e9ec',
       borderBottomWidth: 1,
    },
    headerCont:{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTextLeft:{
        fontFamily: 'NanumGothic-Bold',
        color:'#333',
        fontSize: 18,
        marginTop: 10,
    },
    absBtn: {
        position: 'absolute',
        left: 0,
        top: 6,
        zIndex: 99,
        width: 50,
        padding:0,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
