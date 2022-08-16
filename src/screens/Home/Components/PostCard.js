/*---------------------------------------------------------------*
 *   @author: Prashant Gaurav                                    *
 *   @licence: Copyright, All Rights Reserved to Ajnasoft        *
 *   @flow                                                       *
 *---------------------------------------------------------------*/
import React, { useState } from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
// import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
// // import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
moment.locale('en');



const postCard = (props: any) => {

    // const [isTruncated, setTruncated] = useState(true);

    // const _renderLayout = data => {
    //     if (data.length === 1) {
    //         return (
    //             <View style={{ flex: 1 }}>
    //                 <TouchableOpacity onPress={() => props.renderGallery(props.postData.postID)}>
    //                     <Image
    //                         resizeMethod={'resize'}
    //                         fadeDuration={500}
    //                         progressiveRenderingEnabled={true}
    //                         style={{ width: '100%', height: 150, borderRadius: 4 }}
    //                         source={{ uri: props.imageBaseUrl + 'posts/' + props.postData.postImages[0] }}
    //                     />
    //                 </TouchableOpacity>
    //             </View>
    //         )
    //     } else if (data.length === 2) {
    //         return (
    //             <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
    //                 <TouchableOpacity style={{ flex: 0.49 }} onPress={() => props.renderGallery(props.postData.postID)}>
    //                     <Image
    //                         resizeMethod={'resize'}
    //                         fadeDuration={500}
    //                         progressiveRenderingEnabled={true}
    //                         style={{ width: '100%', height: 150, borderRadius: 4 }}
    //                         source={{ uri: props.imageBaseUrl + 'posts/' + props.postData.postImages[0] }}
    //                     />
    //                 </TouchableOpacity>
    //                 <TouchableOpacity style={{ flex: 0.49, }} onPress={() => props.renderGallery(props.postData.postID)}>
    //                     <Image
    //                         resizeMethod={'resize'}
    //                         fadeDuration={500}
    //                         progressiveRenderingEnabled={true}
    //                         style={{ width: '100%', height: 150, borderRadius: 4 }}
    //                         source={{ uri: props.imageBaseUrl + 'posts/' + props.postData.postImages[1] }}
    //                     />
    //                 </TouchableOpacity>
    //             </View>
    //         )
    //     } else {
    //         return (
    //             <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
    //                 <TouchableOpacity style={{ flex: 0.496 }} onPress={() => props.renderGallery(props.postData.postID)}>
    //                     <Image
    //                         resizeMethod={'resize'}
    //                         fadeDuration={500}
    //                         progressiveRenderingEnabled={true}
    //                         style={{ width: '100%', height: 150, borderRadius: 4 }}
    //                         source={{ uri: props.imageBaseUrl + 'posts/' + props.postData.postImages[0] }}
    //                     />
    //                 </TouchableOpacity>
    //                 <View style={{ flex: 0.496, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
    //                     <TouchableOpacity style={{ height: '50%', width: '100%' }} onPress={() => props.renderGallery(props.postData.postID)}>
    //                         <Image
    //                             resizeMethod={'resize'}
    //                             fadeDuration={500}
    //                             progressiveRenderingEnabled={true}
    //                             style={{ width: '100%', height: '97%', borderRadius: 4, marginBottom: 5 }}
    //                             source={{ uri: props.imageBaseUrl + 'posts/' + props.postData.postImages[1] }}
    //                         />
    //                     </TouchableOpacity>
    //                     <TouchableOpacity style={{ height: '50%', width: '100%' }} onPress={() => props.renderGallery(props.postData.postID)}>
    //                         <Image
    //                             resizeMethod={'resize'}
    //                             fadeDuration={500}
    //                             progressiveRenderingEnabled={true}
    //                             style={{ width: '100%', height: '97%', borderRadius: 4 }}
    //                             source={{ uri: props.imageBaseUrl + 'posts/' + props.postData.postImages[2] }}
    //                         />
    //                         {data.length > 3 && (
    //                             <View style={styles.cover}>
    //                                 <Text style={styles.coverTxt}>{'+' + (data.length - 3).toString() + ' More'}</Text>
    //                             </View>
    //                         )}

    //                     </TouchableOpacity>
    //                 </View>
    //             </View>
    //         )
    //     }
    // }

    return (

        <View style={styles.card}>

            <View style={styles.cardBody}>
                
                <View style={styles.cardInner}>

                    <View style={styles.cardLeft}>
                        <Image source={{ uri: 'https://images.theconversation.com/files/225416/original/file-20180628-117382-1ndv5qh.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=496&fit=clip' }} style={styles.cardImage} />
                    </View>

                    <View style={styles.cardRight}>
                        <Text style={styles.title}>Beach Volley Bball</Text>

                        <View style={styles.iconRow}>
                            <Icon name="calendar-month-outline" color={'#ccc'} size={20} />
                            <Text style={styles.greyTxt}>13/02/2020 02:00 PM</Text>
                        </View>

                        <View style={styles.iconRow}>
                            <Icon name="map-marker-outline" color={'#ccc'} size={20} />
                            <Text style={styles.greyTxt}>BBMP Park, 805/1, 76th...</Text>
                        </View>

                        <View style={styles.prRow}>
                            <Image source={require('../../../assets/images/img-01.jpg')} style={{ width: 30, height: 30, borderRadius: 100 }} />
                            <TouchableOpacity style={styles.btnBorder} onPress={props.onClick}>
                                <Text style={styles.btnTxt}>Know More</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>

                <View style={styles.cardFooter}>
                    <View style={styles.iconRowFooter}>
                        <Icon name="heart-outline" color={'#585858'} size={20} />
                        <Text style={styles.iconTxt}>350 Likes</Text>
                    </View>
                    <View style={styles.iconRowFooterRight}>
                        <Text style={styles.iconTxt}>Share</Text>
                        <Icon name="share" color={'#585858'} size={20} />
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
        backgroundColor: '#eaeaea',
    },
    cardBody: {
        width: '100%',
        height: 180,
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
        // backgroundColor: '#fff',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    cardLeft: {
        flex: 0.4,
        padding: 10,
    },
    cardRight: {
        flex: 0.6,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 10,
    },
    cardImage: {
        width: '100%',
        height: '100%',
        // borderBottomStartRadius: 16,
        // borderTopStartRadius: 16,
        borderRadius: 8,
        // borderBottomLeftRadius: 5,
        // borderRadius: 16,
    },
    title: {
        fontFamily: 'Montserrat-Regular',
        // fontWeight: '400',
        fontSize: 18,
        marginBottom: 5,
        color: '#585858',
    },
    iconRow: {
        width: '100%',
        flexDirection: 'row',
        marginTop: 5,
    },
    greyTxt: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 12,
        color: '#8f8f8f',
        textAlignVertical: 'center'
    },
    prRow: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    btnBorder: {
        borderWidth: 0.5,
        borderColor: '#1da1f2',
        // padding: 0,
        paddingHorizontal: 10,
        justifyContent: 'center',
        borderRadius: 5,
    },
    btnTxt: {
        color: '#00aeef',
        fontSize: 12,
        lineHeight: 14,
        fontFamily: 'Montserrat-Regular',
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
        marginRight: 5,
        marginLeft: 5,
        // textAlign: 'right'
    }
})



