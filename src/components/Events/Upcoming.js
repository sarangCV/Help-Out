/* ------------------------------ *
 *   Author: Prashant Gaurav      *
 * ------------------------------ */
import React from 'react';
import moment from 'moment';

import {View, Text, ImageBackground, TouchableOpacity, StyleSheet, ScrollView} from 'react-native'

moment.locale('en-IN');

const Upcoming = (props) => {
    const {title, data, imageUrl} = props;
    // console.log(data)
    return (
        <>
            <View style={styles.btnRow}>
                <Text
                    style={styles.headTitle}>{title}</Text>
                <TouchableOpacity style={styles.btn} onPress={props.navToList}>
                    <Text style={styles.btnText}>View all</Text>
                </TouchableOpacity>
            </View>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{flex: 1}}
            >
                {data.map((item, i) => (
                    <TouchableOpacity key={i} style={styles.container} onPress={() =>  props.navigate(item.id, item.category)}>
                        <View style={styles.left}>
                            <ImageBackground resizeMode='cover' imageStyle={{borderTopRightRadius: 5, borderTopLeftRadius: 5}}  source={{
                                uri: imageUrl + item.images[0],
                                method: 'get',
                                headers: {Pragma: 'no-cache'},
                            }} style={styles.image} />
                        </View>
                        <View style={styles.center}>
                            <Text style={styles.category}>{moment(item.timing).format('ddd, Do MMM')}</Text>
                        </View>
                        <View style={styles.bottom}>
                            <Text numberOfLines={2} ellipsizeMode={'tail'} style={styles.title}>{item.title}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </>

    );
}
const styles = StyleSheet.create({
    container: {
        width: 100,
        flexDirection: 'column',
        marginTop: 5,
        // backgroundColor: '#fff',
        marginLeft: 10,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        // backgroundColor: 'blue',
        borderRadius: 8
    },
    left: {
        width: '100%',
        padding: 0,
        height: 150,
        // backgroundColor: 'transparent',
        // borderTopRightRadius: 8,
        // borderTopLeftRadius: 8
    },
    image: {
        width: '100%',
        height: 150
    },
    center: {
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 7,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        backgroundColor: 'black'
    },
    bottom: {
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        // backgroundColor: 'black'
    },
    title: {
        color: 'gray',
        fontSize: 13,
        fontFamily: 'NanumGothic-Regular',
        marginBottom: 5,
        marginTop: 5,
    },
    date: {
        position: 'absolute',
        bottom: 10,
        left: 3,
        backgroundColor: '#212435',
        padding: 5,
        borderRadius: 4,
        zIndex: 10,
        fontSize: 9,
        color: '#fff',
        fontFamily: 'NanumGothic-Regular'
    },
    category: {
        fontSize: 10,
        fontFamily: 'NanumGothic-Regular',
        color: '#fff'
    },
    likes: {
        position: 'absolute',
        bottom: 10,
    },
    btnRow: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 50,
        paddingHorizontal: 15,
        paddingTop: 15,
        marginBottom: 10,
        // backgroundColor: 'green'
    },
    headTitle: {
        color: '#505050',
        fontSize: 17,
        fontFamily: 'Montserrat-SemiBold',
        marginTop: 5,
    },
    btn: {
        padding: 5,
    },
    btnText: {
        color: '#868686',
        marginTop: 7,
        fontFamily: 'NanumGothic-Regular',
        fontSize: 12,
    },
})
export default Upcoming
