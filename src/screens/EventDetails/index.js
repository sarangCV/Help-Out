/* ------------------------------ *
 *   Author: Prashant Gaurav      *
 * ------------------------------ */
import React from "react";
import moment from "moment";
import {
    Animated,
    Dimensions,
    ImageBackground,
    Linking,
    Platform,
    ProgressBarAndroid,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from "react-native";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import {eventDetails, likeEvents} from "../../api/events";
import {contViewed} from "../../api/utils";
import InternetConnection from "../../components/Info/InternetConnection";
import helper from "immutability-helper";
moment.locale("en-IN");
const d = Dimensions.get("window");

const EventDetailsScreen = ({navigation}) => {

    const [isLoading, setIsLoading] = React.useState(false);
    const [imageBaseUrl, setImageBaseUrl] = React.useState();
    const [eventsDetails, setEventsDetails] = React.useState();
    const [token, setAuthToken] = React.useState();
    const [height, setHeight] = React.useState();
    const [category, setCategory] = React.useState();

    const scrollX = React.useRef(new Animated.Value(0)).current;
    const {width: windowWidth} = useWindowDimensions();

    /* --------------------------------------------- *
     *             Set layout height                 *
     * --------------------------------------------- */
    const _measureView = e => {
        const {height} = e.nativeEvent.layout;
        setHeight(height)
    }


    React.useEffect(() => {
        const {postId, authToken, category} = navigation.state.params;
        setAuthToken(authToken)
        setCategory(category)
        eventsDetail(authToken, {postId: postId, category: category}).then((r) =>
            console.log("Events detail fetched")
        );
    }, []);


    /* --------------------------------------------- *
     *             Get Event Details                 *
     * --------------------------------------------- */

    const eventsDetail = async (token, eventsId) => {
        await eventDetails(token, eventsId).then(
            (d) => {
                console.log(d);
                if (d.success) {
                    console.log(d);
                    setImageBaseUrl(d.imageBaseUrl);
                    setEventsDetails(d.data);
                    // imageIndexChanger(d.data[0].eventsImages);
                }
            },
            (error) => {
                console.log(error);
            }
        );
    };

    /* --------------------------------------------- *
     *             Open Dialer with Number           *
     * --------------------------------------------- */

    const _navigateCall = () => {
        if (eventsDetails && eventsDetails[0].eventsContactNumber) {
            contViewed(token, {
                orgId: eventsDetails[0].organisationId,
                timestamp: new Date().toISOString()
            }).then(res => {
                console.log(res)
                if (res.success) {
                    if (Platform.OS !== 'android') {
                        Linking.openURL(`telprompt:${eventsDetails.eventsContactNumber}`)
                    } else {
                        Linking.openURL(`tel:${eventsDetails.eventsContactNumber}`)
                    }
                }
            })
        } else {
            alert('Contact Number not found')
        }
    }

    /* ------------------------------------------- *
     *           Open Coordinate with Maps         *
     * ------------------------------------------- */

    const _navigateMaps = () => {
        if (eventsDetails && eventsDetails[0].eventsCoordinates) {
            Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${eventsDetails[0].eventsCoordinates.latitude},${eventsDetails[0].eventsCoordinates.longitude}`)
        } else {
            alert('Location not found')
        }
    }


    /* ------------------------------------- *
     *           LIKE AND UNLIKE EVENTS      *
     * ------------------------------------- */

    const likeEventTapped = React.useMemo(() => (eventsId = null, isLiked = false, likes = 0) => {
        const eventsIndex = eventsDetails.findIndex(
            (p) => p.eventsId === eventsId
        );
        const updatedEvents = helper(eventsDetails[eventsIndex], {
            likeCount: {$set: !isLiked ? parseInt(likes) + 1 : parseInt(likes) - 1},
            isLiked: {$set: !isLiked},
        });
        const newData = helper(eventsDetails, {
            $splice: [[eventsIndex, 1, updatedEvents]],
        });
        setEventsDetails(newData);
        likeEvents(token, eventsId).then(res => {
            console.log(res)
            if (res.success) {
                const updatedEvents = helper(eventsDetails[eventsIndex], {
                    likeCount: {$set: res.likes},
                    isLiked: {$set: res.isLiked},
                });
                const newData = helper(eventsDetails, {
                    $splice: [[eventsIndex, 1, updatedEvents]],
                });
                setEventsDetails(newData);
            } else {
                console.warn(res.message);
            }
        })
    }, [eventsDetails])

    return (

        <View style={styles.container}>
            {console.log(eventsDetails)}

            <StatusBar
                barStyle="dark-content"
                backgroundColor="rgba(255,255,255,0)"
                translucent={true}
            />

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>

                <View style={styles.top} onLayout={(event) => _measureView(event)}>

                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}>
                        <Icon name="arrow-left" size={20} color={"#fff"}/>
                    </TouchableOpacity>

                    <ScrollView
                        horizontal={true}
                        style={styles.top}
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        onScroll={Animated.event([
                                // null,
                                {
                                    nativeEvent: {
                                        contentOffset: {
                                            x: scrollX
                                        }
                                    }
                                },
                            ]
                        )}
                        scrollEventThrottle={1}
                    >

                        {eventsDetails && eventsDetails[0].eventsImages.map((image, imageIndex) => {
                            // console.log(imageBaseUrl + image)
                            return (
                                <View key={imageIndex} style={{height: height, width: windowWidth}}>
                                    {/*<Text>Hello</Text>*/}
                                    <ImageBackground
                                        resizeMode="cover"
                                        source={{
                                            uri: imageBaseUrl + image,
                                            method: "get",
                                            headers: {Pragma: "no-cache"},
                                            body: "title",
                                        }}
                                        style={{height: height, width: windowWidth}}
                                    />
                                </View>
                            );
                        })}

                    </ScrollView>

                    <View style={styles.indicatorContainer}>
                        {eventsDetails && eventsDetails[0].eventsImages.map((image, imageIndex) => {
                            console.log(imageIndex)
                            const width = scrollX.interpolate({
                                inputRange: [
                                    windowWidth * (imageIndex - 1),
                                    windowWidth * imageIndex,
                                    windowWidth * (imageIndex + 1)
                                ],
                                outputRange: [8, 16, 8],
                                extrapolate: "clamp"
                            });
                            return (
                                <Animated.View
                                    key={imageIndex}
                                    style={[styles.normalDot, {width}]}
                                />
                            );
                        })}
                    </View>

                </View>

                {eventsDetails ? (
                    <View style={styles.bottom}>

                        <View style={styles.row}>

                            <View style={[styles.containerTitle, {flex: 0.8}]}>
                                <Text style={styles.titleText}>
                                    {eventsDetails[0].eventsTitle}
                                </Text>
                                <Text style={styles.orgText}>
                                    {eventsDetails[0].eventsCategory} By:{" "}
                                    {eventsDetails[0].eventsOrgniser}
                                </Text>
                            </View>

                            <View style={styles.rightCont}>
                                <TouchableOpacity style={[{marginTop: 10}]} onPress={() => likeEventTapped(eventsDetails[0].eventsId, eventsDetails[0].isLiked, eventsDetails[0].likeCount)}>
                                    {eventsDetails[0].isLiked ?
                                        <Icon name="heart" size={22} color={'#f33535'}/> :
                                        <Icon name="heart" size={22} color={'#aaaaaa'}/>}
                                </TouchableOpacity>
                                <Text style={styles.orgText}>{eventsDetails[0].likeCount} Likes</Text>
                            </View>

                        </View>

                        {eventsDetails && eventsDetails[0].category === 3 ? (
                            <View style={styles.progressBar}>
                                <Text style={styles.amtLarge}>&#8377; 1,00,000</Text>
                                <Text style={styles.txtSmGry}>raised of <Text
                                    style={styles.black}> &#8377; 4,00,000 </Text> goal </Text>
                                <ProgressBarAndroid
                                    styleAttr="Horizontal"
                                    indeterminate={false}
                                    progress={0.5}
                                    color={'#16c455'}
                                    Large
                                    style={{width: '100%'}}
                                />
                                <View style={styles.progressRow}>
                                    <Text style={styles.pLeftTxt}> <Text
                                        style={styles.black}>47</Text> supporters</Text>
                                    <Text style={styles.pRightTxt}> <Text style={styles.black}>60</Text> days
                                        left</Text>
                                </View>
                            </View>
                        ) : (

                            <View style={styles.containerAddress}>
                                <View style={styles.circle}>
                                    <Icon name="location-pin" size={20} color={"#fff"}/>
                                </View>
                                <Text style={styles.addressText}>
                                    {eventsDetails[0].eventsAddress}
                                </Text>
                            </View>

                        )}

                        <View style={styles.containerDate}>
                            <View style={styles.box}>
                                <Text style={styles.boxTitle}>Start Time</Text>
                                <Text style={styles.boxDetails}>
                                    {}
                                    {moment(eventsDetails && eventsDetails[0].eventsAt).format("hh:mm A")}
                                </Text>
                            </View>
                            <View style={styles.box}>
                                <Text style={styles.boxTitle}>Date</Text>
                                <Text style={styles.boxDetails}>
                                    {moment(eventsDetails && eventsDetails[0].eventsAt).format("Do MMM")}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.containerDetails}>
                            <Text style={styles.detailsTitle}>Category</Text>
                            <Text style={styles.detailsText}>
                                * {eventsDetails[0].eventsCategory}
                            </Text>
                        </View>
                        <View style={styles.containerDetails}>
                            <Text style={styles.detailsTitle}>Details</Text>
                            <Text style={styles.detailsText}>{eventsDetails[0].eventsDetails}</Text>
                        </View>
                    </View>
                ) : null}
            </ScrollView>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, {backgroundColor: "#fff"}]} onPress={_navigateCall}>
                    <Text style={[styles.buttonText, {color: "#3b52d4"}]}>
                        Contact Details
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, {backgroundColor: "#3b52d4"}]}
                    onPress={_navigateMaps}
                >
                    <Text style={[styles.buttonText, {color: "#fff"}]}>
                        See on Map
                    </Text>
                </TouchableOpacity>

            </View>
            <InternetConnection/>
        </View>
    );
};
const styles = StyleSheet.create({
    /* -------- Main Container ----------- */
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
    },
    /* ------- Container Scroll view ------ */
    scrollView: {
        flex: 1,
        width: "100%",
    },
    /* ---------- Top Section ------------- */
    top: {
        flex: 1,
        height: d.height / 2,
        width: d.width,
        // backgroundColor: "pink",
    },
    /* ---------- Bottom Section ---------- */
    bottom: {
        flex: 1,
        top: -20,
        minHeight: d.height / 2 + 150,
        width: d.width,
        backgroundColor: "#fff",
        borderTopEndRadius: 20,
        borderTopLeftRadius: 20,
        paddingHorizontal: 20,
    },
    /* ---------- Background images ------- */
    images: {
        height: "100%",
        width: "100%",
    },
    /* ---------- Back Button ------------- */
    backButton: {
        position: "absolute",
        zIndex: 100,
        left: 20,
        top: 40,
        backgroundColor: "rgba(64,64,64,0.49)",
        height: 45,
        width: 45,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    /* ---------- Title ------------- */
    containerTitle: {
        width: "100%",
        minHeight: 70,
        paddingVertical: 15,
        justifyContent: "center",
    },
    titleText: {
        paddingTop: 5,
        color: "#4a4a4a",
        fontSize: 16,
        fontFamily: "NanumGothic-Bold",
    },
    orgText: {
        paddingTop: 3,
        color: "#aaaaaa",
        fontSize: 13,
        fontFamily: "NanumGothic-Regular",
    },
    /*---------- ProgressBar ---------- */
    progressBar: {
        // flexDirection: "row",
        width: "100%",
        justifyContent: 'flex-start',
        alignItems: "flex-start",
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        // marginBottom: 15,
        marginVertical: 15,
    },
    amtLarge: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 26,
        color: '#333',
        marginBottom: 10,
    },
    txtSmGry: {
        color: "#aaaaaa",
        fontSize: 14,
        fontFamily: "NanumGothic-Regular",
        marginBottom: 10,
    },
    progressRow: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 8,
        // paddingVertical: 5,
    },
    pLeftTxt: {
        color: "#aaaaaa",
        fontSize: 14,
        fontFamily: "NanumGothic-Bold",
    },
    pRightTxt: {
        color: "#aaaaaa",
        fontSize: 14,
        fontFamily: "NanumGothic-Bold",
    },
    black: {
        color: '#333',
    },
    /* ---------- Address ------------- */
    containerAddress: {
        flexDirection: "row",
        width: "100%",
        minHeight: 50,
        alignItems: "center",
    },
    circle: {
        height: 35,
        width: 35,
        borderRadius: 100,
        backgroundColor: "#1c32af",
        alignItems: "center",
        justifyContent: "center",
    },
    addressText: {
        marginHorizontal: 10,
        color: "#aaaaaa",
        fontSize: 14,
        fontFamily: "NanumGothic-Regular",
    },
    /* --------Date Time ------------- */
    containerDate: {
        width: "100%",
        minHeight: 115,
        flexDirection: "row",
        alignItems: "center",
    },
    box: {
        height: 70,
        width: 120,
        borderRadius: 15,
        backgroundColor: "#f4f3f1",
        marginRight: 15,
        padding: 12,
    },
    boxTitle: {
        color: "#a99592",
        fontSize: 13,
        fontFamily: "NanumGothic-Regular",
    },
    boxDetails: {
        paddingTop: 10,
        color: "#a99592",
        fontSize: 13,
        fontFamily: "NanumGothic-Bold",
    },
    /* ---------- Details ----------- */
    containerDetails: {
        width: "100%",
        minHeight: 100,
    },
    detailsTitle: {
        paddingTop: 10,
        color: "#555",
        fontSize: 16,
        fontFamily: "NanumGothic-Bold",
    },
    detailsText: {
        paddingTop: 10,
        color: "#aeaeae",
        fontSize: 14,
        fontFamily: "NanumGothic-Regular",
    },
    /* ---------- Bottom Button  -------- */
    buttonContainer: {
        width: "100%",
        height: 60,
        justifyContent: "center",
        flexDirection: "row",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
        // marginHorizontal: "2%",
    },
    button: {
        width: "50%",
        height: '100%',
        // borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
        // borderColor: "#3b52d4",
        // borderWidth: 1.5,
    },
    buttonText: {
        fontSize: 14,
        fontFamily: "NanumGothic-Bold",
    },
    indicatorContainer: {
        position: 'absolute',
        bottom: 40,
        right: 0,
        left: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 99,
    },
    normalDot: {
        height: 8,
        width: 8,
        borderRadius: 4,
        backgroundColor: '#eeeeee',
        marginHorizontal: 4
    },
    row: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        maxHeight: 70,
        // flexWrap: 'wrap',
    },
    rightCont: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fab: {
        width: 45,
        height: 45,
        backgroundColor: "#3b52d4",
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
});
export default EventDetailsScreen;
