import React from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
moment.locale('en');

const postCard = (props) => {
    const {data} = props
    return (
        <View style={styles.card}>
            <View style={styles.cardBody}>
                <View style={styles.cardInner}>
                    <View style={styles.cardLeft}>
                        <Image source={{ uri: data.interestImage }} style={styles.cardImage} />
                    </View>
                    <View style={styles.cardRight}>
                        <Text style={styles.textSM}>{data.supportType}</Text>
                        <Text style={styles.textSM}>{data.supportDetails}</Text>
                        <Text style={styles.textSM}>{moment(data.supportRequestedAt).format('MMMM Do YYYY, h:mm a')}</Text>
                    </View>
                </View>
                {/*<View style={styles.cardFooter}>*/}
                {/*    <View style={styles.iconRowFooter}>*/}
                {/*        /!*<Icon name="heart" color={'#585858'} size={20} />*!/*/}
                {/*        /!*<Text style={styles.iconTxt}>350 Likes</Text>*!/*/}
                {/*    </View>*/}
                {/*    <TouchableOpacity style={styles.iconRowFooterRight} onPress={props.sharePost}>*/}
                {/*        <Text style={styles.iconTxt}>Share</Text>*/}
                {/*        <Icon name="share" color={'#585858'} size={20} />*/}
                {/*    </TouchableOpacity>*/}
                {/*</View>*/}
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
        backgroundColor: '#eaeaea',
    },
    cardBody: {
        width: '100%',
        minHeight: 150,
        backgroundColor: '#fff',
        shadowColor: "#eee",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 1,
        borderRadius: 5,
        marginBottom: 10,
    },
    cardInner: {
        flex: 1,
        flexDirection: 'row',
        // flexWrap: 'wrap',
        // backgroundColor: '#fff',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    cardLeft: {
        width: '30%',
        padding: 10,
    },
    cardRight: {
        width: '70%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 10,
    },
    cardImage: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
    textSM: {
        fontFamily: 'Montserrat-Regular',
        // fontWeight: '400',
        fontSize: 14,
        marginBottom: 5,
        color: '#585858',
    },
    cardFooter: {
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexDirection: 'row',
        borderTopColor: '#eee',
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderBottomStartRadius: 5,
        borderBottomEndRadius: 5,
        // marginTop: 10,
        // paddingTop: 8,
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    iconRowFooter: {
        flex: 0.5,
        flexDirection: 'row',
    },
    iconRowFooterRight: {
        flex: 0.5,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        // alignItems: 'flex-end',
    },
    iconTxt: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 12,
        color: '#585858',
        // marginRight: 5,
        marginLeft: 5,
        marginTop: 3,
        // textAlign: 'right'
    }
})



