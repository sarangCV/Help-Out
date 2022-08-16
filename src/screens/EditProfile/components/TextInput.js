import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default Inputs = props => (

    <>

    {props.isOrg ? (
        <View style={styles.inputContainer}>
            <View style={styles.formGroup}>

                <Text style={styles.label}>{props.label}</Text>

                <TextInput
                    pointerEvents="none"
                    value={props.value}
                    onFocus={props.onFocus}
                    placeholder={props.placeholder}
                    placeholderTextColor={'#888'}
                    style={styles.input}
                    editable={false}
                    secureTextEntry={props.secure}
                    maxLength={props.maxLength}
                />

            </View>
        </View>
    ) : (


        <TouchableOpacity style={styles.inputContainer} onPress={props.handleEdit} activeOpacity={0.8}>
            <View style={styles.formGroup}>

                <Text style={styles.label}>{props.label}</Text>

                <TextInput
                    pointerEvents="none"
                    value={props.value}
                    onFocus={props.onFocus}
                    placeholder={props.placeholder}
                    placeholderTextColor={'#888'}
                    onChangeText={props.onChange}
                    style={[styles.input, props.activeStyles]}
                    editable={props.editable}
                    secureTextEntry={props.secure}
                    ref={props.inputRef}
                    maxLength={props.maxLength}
                    onSubmitEditing={props.onSubmit}
                    keyboardType={props.keyboardType}
                />

                {props.isEditing ? (
                        <TouchableOpacity style={styles.IconRight} onPress={props.onUpdate}>
                            <Text style={styles.btnTxt}>Update</Text>
                        </TouchableOpacity>) :
                    (<TouchableOpacity style={styles.IconRight} onPress={props.onEdit}>
                        <Text style={styles.btnTxt}>Edit</Text>
                    </TouchableOpacity>)}

                {props.showPassBtn && (<TouchableOpacity style={styles.IconRight} onPress={props.toggleIcon}>{props.secure ? <Icon name="md-eye-off" color={'#333'}  size={25} />:<Icon name="md-eye" color={'#333'}  size={25} />}</TouchableOpacity>)}

            </View>
        </TouchableOpacity>

    )}

    </>



);

const styles = StyleSheet.create({
    inputContainer:{
        flex:1,
        width: '100%',
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    formGroup:{
        flex: 1,
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'column',
        // minHeight: 70,
        // backgroundColor: '#eee'
        // paddingVertical: 10,
    },
    label:{
        fontFamily: 'Montserrat-Bold',
        color:'#888',
        fontSize: 14,
    },
    input: {
        width:'100%',
        height: 50,
        // backgroundColor: '#fff',
        // borderBottomWidth: 1,
        fontFamily: 'Montserrat-Bold',
        color:'#888',
        fontSize: 14,
    },
    IconRight:{
        position: 'absolute',
        right: 10,
        top: 25,
        backgroundColor: '#3b52d4',
        borderRadius: 4,
        padding: 8,
    },
    btnTxt:{
        fontFamily: 'Montserrat-Regular',
        color:'#fff',
        fontSize: 14,
    }
})
