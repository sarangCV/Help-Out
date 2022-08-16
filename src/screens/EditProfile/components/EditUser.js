import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export default EditUser = props => (
    <View style={styles.container}> 
    
        <View style={styles.imgContainer}>
            {props.isOrg ? <Image source={{uri: props.uri}}  style={styles.roundedAvatar} />
            :
                <TouchableOpacity onPress={props.changeImage} activeOpacity={0.8}>
                <Image source={{uri: props.uri}}  style={styles.roundedAvatar} />

                <Icon name="square-edit-outline" color={'#8a8a8a'} size={20} style={styles.iconBtm}/>
            </TouchableOpacity>}

        </View>

        {props.children}

        {/* <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.btnPrimary} onPress={props.update} activeOpacity={0.8}>
                <Text style={styles.btnText}>Update</Text>
            </TouchableOpacity>
        </View> */}

    </View>
    
);

const styles = StyleSheet.create({
    container:{
        flex:1,
        // marginTop: 80,
    },
    imgContainer:{
        width: '100%',
        minHeight: 200,
        paddingTop: 15,
        paddingBottom: 15,
        justifyContent: 'center',
        alignItems: 'center',
        // borderBottomWidth: 1,
        // borderBottomColor: '#ddd',
        backgroundColor: '#fffcfc',
    },
    roundedAvatar:{
        width: 150,
        height: 150,
        borderRadius: 100,
        borderWidth: 5,
        borderColor: '#e6e6e6',
    },
    iconBtm:{
        position: 'absolute',
        bottom: 0,
        height: 30,
        width: 30,
        textAlign: 'center',
        lineHeight: 30,
        borderRadius: 100,
        left: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e6e6e6',
    },
    btnContainer:{
        flex: 1,
        padding: 15,
    },
    btnPrimary: {
        width: '100%',
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f84964',
        marginVertical: 15,
        borderRadius: 4,
    }, 
    btnText:{
        fontFamily: 'Montserrat-Bold',
        color:'#fff',
        fontSize: 14,
    }
})
