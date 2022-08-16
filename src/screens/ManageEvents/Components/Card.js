/* ------------------------------ *
 *   Author: Prashant Gaurav      *
 * ------------------------------ */
import React from 'react';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {View, Text, ImageBackground, TouchableOpacity, Share, StyleSheet} from 'react-native'

moment.locale('en-IN');

const Card = (props) => {
    const {eventsId,  date,  image, likeCount, details} = props;
    return (
        <View style={styles.card} >


            <View style={styles.left}>
                <ImageBackground resizeMode='cover' imageStyle={{borderRadius: 20}} source={image} source={{uri: image, method: 'get', headers: {Pragma: 'no-cache',} }} style={styles.image}/>
            </View>

            <View style={styles.center}>

                <View style={styles.right}>
                    <TouchableOpacity style={styles.share} onPress={() => Share.share({message: `url:http://events.justdonate.com/eventsId?${eventsId}`})}>
                        <Icon name='share-social-outline' size={15} color={'#fff'}/>
                    </TouchableOpacity>
                </View>


                <Text numberOfLines={2} ellipsizeMode={'tail'} style={styles.title}>{details}</Text>

                <Text style={styles.date}>{moment(date).format('ddd, MMM Do')} at {moment(date).format('h:mm A')}</Text>

                <View style={styles.row}>

                    <TouchableOpacity style={styles.likes}>
                        <Text style={styles.txt}><FontAwesome name='heart' size={15} color={parseInt(likeCount) > 0 ? 'red' : 'gray'}/> &nbsp; {likeCount} likes</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.delBtn} onPress={() => props.delete(eventsId)}>
                        <Icon name="trash-outline" size={20} color={'#f39a9a'}></Icon>
                        <Text style={styles.delBtnTxt}>Delete</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card:{
      flex: 1,
        flexDirection: 'row',
      justifyContent: 'flex-start',
        alignItems: 'flex-start',
        minHeight: 120,
        marginBottom: 15,
        // padding: 15,
    },
    left: {
        width: "25%",
    },
    center: {
        width: "75%",
        paddingHorizontal: 15,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    right: {
        position:'absolute',
        top: 10,
        right: 10,
    },
    share: {
        width: 30,
        height: 30,
        borderRadius: 100,
        backgroundColor: '#1c32af',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: '#4a4a4a',
        fontSize: 14,
        fontFamily: 'NanumGothic-Regular',
        paddingVertical: 10,
        width: '90%',
    },
    date: {
        fontSize: 14,
        color: '#8086e3',
        fontFamily: 'NanumGothic-Regular'
    },
    row: {
        // flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
    },
    likes: {
      marginTop: 10,
    },
    txt: {
        color: '#4a4a4a',
        fontSize: 14,
        fontFamily: 'NanumGothic-Regular',
    },
    delBtn: {
        padding: 5,
        borderRadius: 4,
        flexDirection: 'row',
        backgroundColor: '#fce2e2'
    },
    delBtnTxt: {
        color: '#f39a9a',
        fontSize: 14,
        marginTop: 5,
        fontFamily: 'NanumGothic-Regular',
    }
})
export default Card
