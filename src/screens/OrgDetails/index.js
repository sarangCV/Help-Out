/* ------------------------------ *
 *   Author: Harish               *
 * ------------------------------ */
import React from "react";
import moment from "moment";
import {
    View,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Dimensions,
    Text,
    ImageBackground,
    StatusBar,
    Animated,
    Easing,
    Platform,
    Linking,
    TextInput, Keyboard,
    ToastAndroid
} from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {contViewed, getOrganisationDetails, reportOrg} from "../../api/utils";
import InternetConnection from "../../components/Info/InternetConnection";

import {bookMarkOrg} from "../../api/utils";
import {getToken} from "../../asy-store";
import Modal from './components/modal'

moment.locale("en-IN");
const d = Dimensions.get("window");

export const OPEN_ANIM_DURATION = 225;
export const CLOSE_ANIM_DURATION = 195;

const OrgDetails = ({navigation}) => {

    const [data, setData] = React.useState();
    const [userData, setUserData] = React.useState();
    const scaleAnim = React.useRef(new Animated.Value(0.1)).current;
    const [modalActive, setModalActive] = React.useState(false)
    const [formModal, setFormModal] = React.useState(false)
    const [fabActive, setFabActive] = React.useState(false);
    const [btns, setBtns] = React.useState(true);
    const [reason, setReason] = React.useState();
    const [authToken, setAuthToken] = React.useState();
    const [orgId, setOrgId] = React.useState();
    // const [notify, setNotify] = React.useState();


    React.useEffect(() => {
        const {orgId, authToken} = navigation.state.params;
        setAuthToken(authToken)
        setOrgId(orgId)
        // setNotify(true)
        getOrganisationDetails(authToken, orgId).then(res => {
            console.log(res)
            if (res.success) {
                setData(res.data)
            } else {
                alert(res.message)
            }
        })
        getToken('userData').then(res => {
            console.log(res)
            setUserData(JSON.parse(res));
        })
        Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
        Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

        return () => {
            Keyboard.removeListener("keyboardDidShow", _keyboardDidShow)
            Keyboard.removeListener("keyboardDidHide", _keyboardDidHide)
        }

    }, []);

    React.useEffect(() => {
        !formModal && Keyboard.dismiss();
    }, [formModal])

    const _saveOrg = () => {
        setFabActive(!fabActive)
        bookMarkOrg(authToken, orgId).then(res => {
            console.log(res)
            if (res.success){
                _showToast(res.messages)
            }
            else _showToast(res.message)
        })
    }


    const _showToast = (title) => {
        ToastAndroid.showWithGravityAndOffset(
            title,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
        );
    };

    const _keyboardDidShow = () => setBtns(false)

    const _keyboardDidHide = () => setBtns(true)

    const _showForm = () => {
        setFormModal(true)
        setFabActive(!fabActive)
    }

    const _showContacts = () => {
        if (data && data.orgAddress.length > 0) {
            contViewed(authToken, {
                orgId: orgId,
                timestamp: new Date().toISOString()
            }).then(res => {
                console.log(res)
                if (res.success) {
                    setModalActive(true)
                }
                else {
                    _showToast('No Contacts Found')
                }
            })
        } else {
            _showToast('No Contacts Found')
        }
    }

    const _callNumber = phone => {
        if (Platform.OS !== 'android') {
            Linking.openURL(`telprompt:${phone}`)
        } else {
            Linking.openURL(`tel:${phone}`)
        }
    }


    React.useEffect(() => {
        Animated.timing(scaleAnim, {
            duration: fabActive ? OPEN_ANIM_DURATION : CLOSE_ANIM_DURATION,
            toValue: fabActive ? 1 : 0,
            easing: fabActive ? Easing.out(Easing.cubic) : Easing.in(Easing.cubic),
            useNativeDriver: true,
        }).start();
    }, [fabActive])


    const _reportOrg = () => {
        Keyboard.dismiss()
        if (!reason) {
            alert('please enter details');
            return false
        }
        reportOrg(authToken, {
            orgId: orgId,
            reason: reason,
            timestamp: new Date().toISOString(),
        }).then(res => {
            console.log(res)
            setFormModal(false)
            if (res.success) _showToast(res.message)
            else _showToast(res.message)
        })
    }


    const scaleMenu = {
        transform: [{scale: scaleAnim}],
        opacity: scaleAnim,
    };

    const spin = scaleAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '45deg']
    })


    return (
        <React.Fragment>
            {/*<Notification toggle={notify} hideNotify={t => setNotify(t)}/>*/}
        <View style={styles.container}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="rgba(255,255,255,0)"
                translucent={true}
            />
            <ScrollView style={styles.scrollView}>

                <View style={styles.top}>
                    <ImageBackground
                        resizeMode="cover"
                        source={{
                            uri: data && data.ogIcons,
                            method: "get",
                            headers: {Pragma: "no-cache"},
                            body: "title",
                        }}
                        style={styles.images}
                    >
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => navigation.goBack()}
                        >
                            <Icon name="chevron-left" size={33} color={"#fff"}/>
                        </TouchableOpacity>
                    </ImageBackground>
                </View>

                <View style={styles.bottom}>

                    <View style={styles.row}>

                        <View style={styles.containerTitle}>
                            <Text style={styles.titleText}>
                                {data && data.orgName}
                            </Text>
                        </View>

                        {userData && userData.isOrganization ? null : (
                            <TouchableOpacity style={[styles.fab, {marginTop: 10}]}
                                              onPress={() => setFabActive(!fabActive)}>
                                <Animated.View style={{transform: [{rotate: spin}]}} pointerEvents="box-none">
                                    <Icon name="plus" size={25} color={'#fff'}/>
                                </Animated.View>
                            </TouchableOpacity>
                        )}

                    </View>

                    {/*------- Start Fab Buttons ------*/}

                    <Animated.View style={[styles.animated, scaleMenu]} pointerEvents="box-none">
                        <View style={styles.options}>

                            <View style={styles.fabRow}>
                                <Text style={styles.fabTxt}>Save Organisation</Text>
                                <TouchableOpacity style={[styles.fab, {marginBottom: 5, backgroundColor: '#198828'}]}
                                                  onPress={_saveOrg}>
                                    <Icon name="heart" size={18} color={'#fff'}/>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.fabRow}>
                                <Text style={styles.fabTxt}>Report</Text>
                                <TouchableOpacity style={[styles.fab, {backgroundColor: '#ef2f5a'}]}
                                                  onPress={_showForm}>
                                    <Icon name="block-helper" size={18} color={'#fff'}/>
                                </TouchableOpacity>

                            </View>

                        </View>
                    </Animated.View>

                    {/*------- End Fab Buttons ------*/}

                    {data && data.orgAddress.length > 0 && data.orgAddress.map((item, i) => (
                        <View style={styles.containerAddress} key={i}>
                            <View style={styles.circle}>
                                <Icon name="map-marker-outline" size={20} color={"#fff"}/>
                            </View>
                            <View>
                                <Text
                                    style={styles.addressText}>{item.address}, {item.city}, {item.city}, {item.state}, {item.zipcode}</Text>
                                {/*<Text/>*/}
                                {item.numbers.length && item.numbers.map((n, i) => (
                                    <Text key={i} style={styles.addressText}>phone: {n}</Text>
                                ))}
                            </View>
                        </View>

                    ))}
                    {data && data.orgCertification.length > 0 &&
                    <View style={styles.containerAddress}>

                        <View style={styles.circle}>
                            <Icon name="certificate" size={20} color={"#fff"}/>
                        </View>

                        {data.orgCertification.map((item, i) => (
                            <View key={i}>
                                <Text style={styles.addressText}>{item}</Text>
                            </View>
                        ))}
                    </View>}
                    <Text style={styles.detailsTitle}>Categories</Text>
                    {data && data.orgCategories.length > 0 &&
                    data.orgCategories.map((item, i) => (
                        <Text key={i} style={styles.detailsText}>{item}</Text>
                    ))}
                </View>
            </ScrollView>

            {userData && userData.isOrganization ? null : (

                btns && <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, {backgroundColor: "#3b52d4"}]}
                        onPress={_showContacts}>
                        <Text style={[styles.buttonText, {color: "#fff"}]}>
                            Call / Donate
                        </Text>
                    </TouchableOpacity>
                </View>

            )}

            <InternetConnection />

        </View>

            {/*------ Modal  ------*/}

            <Modal toggle={formModal} hideModal={event => setFormModal(event)} header={true}>
                <View style={styles.formBox}>
                    <TextInput
                        style={styles.textArea}
                        placeholder="Description"
                        placeholderTextColor={'#a4a4a4'}
                        onChangeText={text => setReason(text)}/>

                        <View style={styles.contEnd}>
                            <TouchableOpacity style={styles.btnGrey} onPress={() => setFormModal(false)}>
                                <Text style={styles.btnGreyTxt}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnSm} onPress={_reportOrg}>
                                <Text style={styles.btnSmTxt}>Submit</Text>
                            </TouchableOpacity>
                        </View>


                </View>
            </Modal>

            {/*------ End Modal  ------*/}

            {/*------ Modal  ------*/}

            <Modal toggle={modalActive} hideModal={event => setModalActive(event)}>
                <View styles={styles.modalBody}>
                {data && data.orgAddress.length > 0 && data.orgAddress.map(item => (
                    item.numbers.length && item.numbers.map(n => (
                            <TouchableOpacity style={styles.btnDefault} onPress={() => _callNumber(n)}>
                                <Text style={styles.btnDefaultText}>{n}</Text>
                            </TouchableOpacity>
                    ))
                ))}

                </View>
                <View style={styles.rightAction}>
                    <TouchableOpacity style={styles.btnd} onPress={() => setModalActive(false)}>
                        <Text style={styles.btndTxt}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            {/*------ End Modal  ------*/}


        </React.Fragment>

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
        backgroundColor: "pink",
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
        left: 20,
        top: 60,
        backgroundColor: "rgba(64,64,64,0.36)",
        height: 45,
        width: 45,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    /* ---------- Title ------------- */
    titleText: {
        paddingTop: 5,
        color: "#4a4a4a",
        fontSize: 18,
        fontFamily: "NanumGothic-Bold",
    },
    orgText: {
        paddingTop: 3,
        color: "#aaaaaa",
        fontSize: 13,
        fontFamily: "NanumGothic-Regular",
    },
    /* ---------- Address ------------- */
    containerAddress: {
        flexDirection: "row",
        width: "100%",
        // minHeight: 50,
        marginBottom: 15,
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
        paddingRight: 15,
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
        fontSize: 18,
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
        fontSize: 18,
        fontFamily: "NanumGothic-Bold",
    },
    detailsText: {
        paddingTop: 10,
        color: "#aeaeae",
        fontSize: 14,
        fontFamily: "NanumGothic-Regular",
    },
    /* ---------- Bottom Button  -------- */
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
        width: "100%",
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
    animated: {
        position: 'absolute',
        top: 50,
        right: 10,
        left: 0,
        padding: 10,
        zIndex: 10,
    },
    options: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        backgroundColor: '#fff',
    },
    fabRow: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        backgroundColor: '#fff',
        // alignItems: 'flex-end',
    },
    fabTxt: {
        fontSize: 14,
        fontFamily: "NanumGothic-Regular",
        marginTop: 15,
        marginRight: 15,
        color: "#aeaeae"
    },
    row: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        maxHeight: 70,
        // flexWrap: 'wrap',
    },
    btnRow: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    containerTitle: {
        width: "70%",
        paddingVertical: 15,
        justifyContent: "center",
    },
    fab: {
        width: 45,
        height: 45,
        backgroundColor: "#3b52d4",
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnBlock: {
        backgroundColor: "#3b52d4",
        width: '100%',
        height: 50,
        marginTop: 15,
        // padding: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnBlockTxt: {
        fontFamily: 'NanumGothic-Bold',
        color: '#ffffff',
        fontSize: 16,
    },
    modalBody: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // margin: 15,
        // padding: 20,
    },
    btnDefault: {
        width: '100%',
        paddingVertical: 20,
        paddingHorizontal: 0,
        borderBottomColor: '#eee',
        // marginLeft: "5%",
        // marginRight: 20,
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        borderBottomWidth: 1,
    },
    btnDefaultText: {
        fontFamily: 'NanumGothic-Regular',
        color: '#333',
        fontSize: 16,
        marginRight: 5,
    },
    formBox: {
        width: '100%',
        // height: 150,
    },
    textArea: {
        width: '100%',
        height: 120,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        textAlignVertical: 'top',
        borderColor: '#d5d5df',
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        fontFamily: 'NanumGothic-Regular',
        fontSize: 16
    },
    rightAction: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        paddingTop: 20,
    },
    btndTxt: {
        fontFamily: 'NanumGothic-Bold',
        fontSize: 16,
        color: '#a4a4a4'
    },
    contEnd: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginTop: 10,
        flexDirection: 'row',
    },
    btnGreyTxt: {
        fontFamily: 'NanumGothic-Bold',
        fontSize: 14,
        color: '#a4a4a4',
        padding: 10,
    },
    btnSmTxt:{
        fontFamily: 'NanumGothic-Bold',
        fontSize: 14,
        color: '#3b52d4',
        padding: 10,
    }
});


export default OrgDetails;
