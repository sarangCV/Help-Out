import {Text, View, StyleSheet, Image} from "react-native";
import React from "react";

export default NoResults = () => (
    <View style={styles.center}>
        <Text style={styles.centerTxt}>No Results Found</Text>
        <Image source={require('../../assets/images/no-results.png')} resizeMode={'contain'} style={styles.image}/>
    </View>
)

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
        // backgroundColor: 'green',
        marginTop: '50%'
    },
    centerTxt: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 22,
        color: '#1c1c1c',
    },
    image: {
        marginTop: 10,
        height: 100,
        width: 150
    }
})
