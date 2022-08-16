/*---------------------------------------------------------------*
 *   @author: Prashant Gaurav                                    *
 *   @licence: Copyright, All Rights Reserved to Ajnasoft        *
 *   @flow                                                       *
 *---------------------------------------------------------------*/
import React, { useState } from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
moment.locale('en');



const postCard = (props: any) => {

    const [isTruncated, setTruncated] = useState(true);

    const _renderLayout = data => {
        if (data.length === 1) {
            return (
                <View style={{ flex: 1 }}>
                    <TouchableOpacity onPress={() => props.renderGallery(props.postData.postID)}>
                        <Image
                            resizeMethod={'resize'}
                            fadeDuration={500}
                            progressiveRenderingEnabled={true}
                            style={{ width: '100%', height: 150, borderRadius: 4 }}
                            source={{ uri: props.imageBaseUrl + 'posts/' + props.postData.postImages[0] }}
                        />
                    </TouchableOpacity>
                </View>
            )
        } else if (data.length === 2) {
            return (
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity style={{ flex: 0.49 }} onPress={() => props.renderGallery(props.postData.postID)}>
                        <Image
                            resizeMethod={'resize'}
                            fadeDuration={500}
                            progressiveRenderingEnabled={true}
                            style={{ width: '100%', height: 150, borderRadius: 4 }}
                            source={{ uri: props.imageBaseUrl + 'posts/' + props.postData.postImages[0] }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 0.49, }} onPress={() => props.renderGallery(props.postData.postID)}>
                        <Image
                            resizeMethod={'resize'}
                            fadeDuration={500}
                            progressiveRenderingEnabled={true}
                            style={{ width: '100%', height: 150, borderRadius: 4 }}
                            source={{ uri: props.imageBaseUrl + 'posts/' + props.postData.postImages[1] }}
                        />
                    </TouchableOpacity>
                </View>
            )
        } else {
            return (
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity style={{ flex: 0.496 }} onPress={() => props.renderGallery(props.postData.postID)}>
                        <Image
                            resizeMethod={'resize'}
                            fadeDuration={500}
                            progressiveRenderingEnabled={true}
                            style={{ width: '100%', height: 150, borderRadius: 4 }}
                            source={{ uri: props.imageBaseUrl + 'posts/' + props.postData.postImages[0] }}
                        />
                    </TouchableOpacity>
                    <View style={{ flex: 0.496, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                        <TouchableOpacity style={{ height: '50%', width: '100%' }} onPress={() => props.renderGallery(props.postData.postID)}>
                            <Image
                                resizeMethod={'resize'}
                                fadeDuration={500}
                                progressiveRenderingEnabled={true}
                                style={{ width: '100%', height: '97%', borderRadius: 4, marginBottom: 5 }}
                                source={{ uri: props.imageBaseUrl + 'posts/' + props.postData.postImages[1] }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ height: '50%', width: '100%' }} onPress={() => props.renderGallery(props.postData.postID)}>
                            <Image
                                resizeMethod={'resize'}
                                fadeDuration={500}
                                progressiveRenderingEnabled={true}
                                style={{ width: '100%', height: '97%', borderRadius: 4 }}
                                source={{ uri: props.imageBaseUrl + 'posts/' + props.postData.postImages[2] }}
                            />
                            {data.length > 3 && (
                                <View style={styles.cover}>
                                    <Text style={styles.coverTxt}>{'+' + (data.length - 3).toString() + ' More'}</Text>
                                </View>
                            )}

                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
    }

    return (
        <View>

            <View style={styles.card}>

                <View style={styles.cardInner}>

                    <View style={styles.cardHeader}>
                        <View style={styles.headerLeft}>
                            <Image style={{ width: 50, height: 50, borderRadius: 4 }} source={{ uri: props.postData.posterImage }} resizeMethod={'resize'} />
                        </View>
                        <View style={styles.headerLeftCont}>
                            <Text style={styles.titleText}>{props.postData.postedBy}</Text>
                            <Text style={styles.postedAt}> {moment(props.postData.postedAt).fromNow()}</Text>
                        </View>
                        <View style={styles.headerRightOpts}>
                            <TouchableOpacity style={styles.btnIcon} onPress={() => props.blockId({ posterUserId: props.postData.posterUserId, postID: props.postData.postID })}>
                                <Icon name="dots-vertical" size={25} color={'#bbb'} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/*  ------------- CARD BODY ------------- */}
                    <View style={styles.cardBody}>

                        {props.postData.postImages.length > 0 ? (_renderLayout(props.postData.postImages)) : null}

                        <View style={styles.contentLeft}>
                            <Text numberOfLines={isTruncated ? 2 : 0} ellipsizeMode={'tail'} style={styles.postText}>{props.isLiked}
                                {props.postData.postDetails}
                            </Text>
                            <TouchableOpacity style={styles.btnLink} onPress={() => setTruncated(!isTruncated)}>
                                <Text style={styles.btnLinkText}>{isTruncated ? 'Read More' : 'Read Less'}</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                    {/*  ------------- CARD FOOTER ------------- */}

                    <View style={styles.cardFooter}>
                        <TouchableOpacity style={styles.footerItem} onPress={() => (props.likePost(props.postData.postID))}>
                            <Icon name={props.postData.isLiked ? 'cards-heart' : 'heart-outline'} color={'gray'} size={22} />
                            <Text style={styles.footerText}>{'  '}{props.postData.likeCount}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.footerItem} onPress={() => (props.directMessage(props.postData.postID))}>
                            <Icon name='message-outline' color={'gray'} size={22} />
                            <Text style={styles.footerText}>{'  '}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.footerItem} onPress={() => (props.sharePost(props.postData))}>
                            <Text style={styles.footerText}>{'share'}</Text>
                            <Icon name='share-outline' color={'gray'} size={22} />
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
        width: '100%',
        alignItems: 'center',
        marginBottom: 10,
    },
    cardInner: {
        width: '94%',
        backgroundColor: '#fff',
        borderRadius: 4,
        padding: 10,
        shadowColor: "#eee",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 1,
    },
    cardHeader: {
        width: '100%',
        flexDirection: 'row',
        marginBottom: 5,
        justifyContent: 'space-between',
    },
    headerLeft: {
        flex: 0.2,
    },
    headerLeftCont: {
        flex: 0.6,
        paddingTop: 5,
    },
    headerRightOpts: {
        flex: 0.2,
        paddingTop: 10,
        // justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    titleText: {
        fontSize: 15,
        color: '#888',
        fontFamily: 'Montserrat-Bold',
    },
    postedAt: {
        fontSize: 14,
        color: '#333',
        fontFamily: 'Montserrat-Regular',
    },
    postText: {
        fontSize: 14,
        color: '#333',
        fontFamily: 'Montserrat-Regular',
    },
    cardBody: {
        flex: 1,
        paddingTop: 5
    },
    cardFooter: {
        flex: 1,
        width: '100%',
        // paddingVertical: 10,
        paddingTop: 10,
        paddingHorizontal: 5,
        flexDirection: 'row',
        // borderTopWidth: 1,
        // borderTopColor: '#eee',
        justifyContent: 'space-between',
    },
    footerItem: {
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    footerText: {
        fontSize: 16,
        color: 'gray',
        fontFamily: 'Montserrat-Regular'
    },
    btnLink: {
        paddingTop: 5,
        paddingBottom: 10,
    },
    btnLinkText: {
        color: '#005cc5',
        fontSize: 16,
        fontFamily: 'Montserrat-Regular'
    },
    cover: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
        borderRadius: 4,
        backgroundColor: '#333333d4'
    },
    coverTxt: {
        fontSize: 16,
        color: 'gray',
        fontFamily: 'Montserrat-Bold'
    },
    contentLeft: {
        flex: 1,
        marginTop: 5,
    }
})



