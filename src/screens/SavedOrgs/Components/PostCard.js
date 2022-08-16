import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
// moment.locale('en');

const postCard = (props) => {
    const {data} = props
    return (
        <View style={styles.card}>
            <View style={styles.cardBody}>
                <View style={styles.cardInner}>
                    <View style={styles.cardLeft}>
                        <Image source={{ uri: data.orgImage }} style={styles.cardImage} resizeMode="contain" />
                    </View>
                    <View style={styles.cardRight}>
                        <Text numberOfLines={2} ellipsizeMode={'tail'} style={styles.title}>{data.orgName}</Text>
                    </View>
                    <View style={styles.cardEnd}>
                        <TouchableOpacity style={styles.delBtn} onPress={props.delete.bind(null, data.orgId)}>
                            <Icon name="trash" color={'#fff'} size={20} />
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </View>
    );
}


export default postCard


const styles = StyleSheet.create({
    card: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 10,
        backgroundColor: '#f8f8f8',
    },
    cardBody: {
        width: '100%',
        height: 90,
        backgroundColor: '#fff',
        shadowColor: "#eee",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 2,
        borderRadius: 5,
        marginBottom: 10,
    },
    cardInner: {
        flex: 1,
        flexDirection: 'row',
        // backgroundColor: '#fff',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    cardLeft: {
        width: "20%",
        // height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    cardRight: {
        width: "60%",
        height: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 15,
        // marginTop: 20,
    },
    cardEnd: {
        width: "20%",
        justifyContent: 'center',
        alignItems: 'center',
    },
    delBtn: {
        backgroundColor: '#f66f74',
        padding: 8,
        borderRadius: 4,
        marginTop: 25,
    },
    cardImage: {
        width: "100%",
        height: "100%",
    },
    title: {
        fontFamily: 'NanumGothic-Regular',
        // fontWeight: '400',
        fontSize: 14,
        // marginBottom: 25,
        color: '#585858',
    }
})



