import React from 'react';
import {
    Text,
    View,
    TextInput,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    KeyboardAvoidingView,
    TouchableOpacity, Keyboard, Animated
} from 'react-native';

//Components
import Header from "../../components/Header";
import Loading from "../../components/Loading";
import FloatNav from "../../components/FloatNav";
// import Button from "../../components/Button";

//API
import {eventRequest, getEventTypes} from "../../api/utils"
import InternetConnection from "../../components/Info/InternetConnection";

//Icons
import Icon from "react-native-vector-icons/SimpleLineIcons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import {getToken} from "../../asy-store";



export default ListMyEvent = ({navigation}) => {
    const [inputMargin, setInputMargin] = React.useState(0);
    const [authToken, setAuthToken] = React.useState();
    const [userData, setUserData] = React.useState();
    const [loading, setLoading] = React.useState()
    const [error, setError] = React.useState()
    const [isHidden, setIsHidden] = React.useState(true)
    const [formFields, setFormFields] = React.useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            category: "",
            name: "",
            contact: "",
            email: "",
            about: "",
            otherDetails: ""
        }
    );

    React.useEffect(() => {
        getToken('authToken').then(res => {
            const resp = JSON.parse(res)
            setAuthToken(resp)
        });
        getToken('userData').then(res => {
            const resp = JSON.parse(res)
            setUserData(resp)
        })
        // Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
        // Keyboard.addListener("keyboardDidHide", _keyboardDidHide);
        // return () => {
        //     Keyboard.removeListener("keyboardDidShow", _keyboardDidShow)
        //     Keyboard.removeListener("keyboardDidHide", _keyboardDidHide)
        // }
    }, [])

    // const _keyboardDidShow = () => setIsHidden(false)
    // const _keyboardDidHide = () => setIsHidden(true)

    const _listEvent = () => {
        let errors = {};
        if (!formFields.category) {
            errors.category = 'Please select category';
        } else if (!formFields.eventTitle) {
            errors.name = 'Please enter name';
        }else if (!formFields.contact) {
            errors.phone = 'Please enter phone number';
        } else if (formFields.contact.length < 10 || isNaN(formFields.contact)) {
            errors.phone = 'Invalid phone number';
        } else if (!formFields.email) {
            errors.email = 'Please enter email';
        } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formFields.email)) {
            errors.email = 'Invalid Email';
        }else if (!formFields.otherDetails) {
            errors.otherDetails = 'Please enter other details';
        } else {
            setLoading(true)
            setFormFields({
                ['category'] : null,
                ['name']: null,
                ['contact']: null,
                ['email']: null,
                ['about']: null,
            })
            eventRequest(authToken, formFields).then(res=> {
                setLoading(false)
                if(res.success) alert(res.messages)
                else alert(res.message)
            })
        }
        setError(errors)
    }

    return(
        <SafeAreaView style={styles.container}>
            <Header
                title={'Get listed on helpOUT'}
                headerRight={true}
                onSubmit={_listEvent}
                spacing={true}
            />
            <Loading loading={loading} />
            <KeyboardAvoidingView style={{ flex: 1,}} behavior="padding">
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.formContainer}>

                    <View style={styles.card}>
                        <Text style={styles.heading}>Select Category</Text>
                        <View style={styles.cardRow}>
                            <TouchableOpacity
                                onPress={() => setFormFields({['category']: 'NGO'})}
                                style={[styles.btnCat, formFields.category === "NGO" && styles.selectedBtn]}>
                                <Icon name="organization" size={22} color={formFields.category === "NGO" ?'#fff':'#505050'}/>
                                <Text style={[styles.btnCatTxt, formFields.category === "NGO" && styles.selectedBtnTxt]}>NGO</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setFormFields({['category']: 'Volunteer'})}
                                style={[styles.btnCat, formFields.category === "Volunteer" && styles.selectedBtn]}>
                                <Icon name="user" size={22} color={formFields.category === "Volunteer" ?'#fff':'#505050'}/>
                                <Text style={[styles.btnCatTxt, formFields.category === "Volunteer" && styles.selectedBtnTxt]}>Volunteer</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setFormFields({['category']: 'Fundraisers'})}
                                style={[styles.btnCat, formFields.category === "Fundraisers" && styles.selectedBtn]}>
                                <MaterialIcon name="attach-money" size={25} color={formFields.category === "Fundraisers" ? '#fff' : '#505050'}/>
                                <Text style={[styles.btnCatTxt, formFields.category === "Fundraisers" && styles.selectedBtnTxt]}>Fundraisers</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setFormFields({['category']: 'Events'})}
                                style={[styles.btnCat, formFields.category === "Events" && styles.selectedBtn]}>
                                <Icon name="calendar" size={22} color={formFields.category === "Events" ? '#fff' : '#505050'}/>
                                <Text style={[styles.btnCatTxt, formFields.category === "Events" && styles.selectedBtnTxt]}>Events</Text>
                            </TouchableOpacity>
                        </View>
                        {error && error.category && <Text style={styles.errLabel}>{error.category}</Text>}
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.heading}>Contact Details</Text>
                        <TextInput
                            placeholder={userData && userData.userName}
                            placeholderTextColor={'#888'}
                            style={styles.input}
                            onChangeText={text => setFormFields({['eventTitle']: text})}
                        />
                        {error && error.name && <Text style={styles.errLabel}>{error.name}</Text> }
                        <TextInput
                            placeholder={userData && userData.userContactNo}
                            placeholderTextColor={'#888'}
                            keyboardType={'phone-pad'}
                            style={styles.input}
                            maxLength={10}
                            onChangeText={text => setFormFields({['contact']: text})}
                        />
                        {error && error.phone &&  <Text style={styles.errLabel}>{error.phone}</Text>}
                        <TextInput
                            placeholder={userData && userData.userEmail}
                            placeholderTextColor={'#888'}
                            keyboardType={'email-address'}
                            style={styles.input}
                            onChangeText={text => setFormFields({['email']: text})}
                        />
                        {error && error.email && <Text style={styles.errLabel}>{error.email} </Text>}
                        <TextInput
                            style={{ marginBottom: 100 }}
                           placeholder="Other details"
                        //    onFocus={() => setInputMargin(50)}
                           // keyboardType={'email-address'}
                           placeholderTextColor={'#888'}
                           style={styles.input}
                           onChangeText={text => setFormFields({['otherDetails']: text})}
                        />
                        {error && error.otherDetails && <Text style={styles.errLabel}>{error.otherDetails} </Text>}
                    </View>
                    {/*<TextInput*/}
                    {/*    placeholder="About Event"*/}
                    {/*    multiline={true}*/}
                    {/*    numberOfLines={5}*/}
                    {/*    placeholderTextColor={'#d5d5df'}*/}
                    {/*    style={styles.input}*/}
                    {/*    onChangeText={text => setFormFields({['about']: text})}*/}
                    {/*/>*/}
                </View>
            </ScrollView>
            </KeyboardAvoidingView>

            {/*<Button title={'Submit'} onPress={_listEvent}/>*/}


            {/*------ Float Navigation  -------*/}
            {/*<Animated.View style={[{width: '100%', zIndex: 100, right: 0, left: 0, position: 'absolute', bottom: 0}]} >*/}
            {/*    {isHidden && <FloatNav*/}
            {/*        activeScreen={'event'}*/}
            {/*        navSearch={() => navigation.navigate('Search')}*/}
            {/*        navHome={() => navigation.navigate('Home')}/>}*/}
            {/*</Animated.View>*/}

            <InternetConnection />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#f7f6fb'
    },
    formContainer: {
        flex: 1,
        paddingHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 100,
        paddingTop: 20,
        // backgroundColor: 'red'
        // height: '100%',
    },
    card: {
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 15,
        backgroundColor: '#fff',
        borderRadius: 4,
        marginBottom: 10,
        shadowColor: "#f6f6f6",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        // paddingHorizontal: 25,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
        zIndex: 3,
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#b3b3b3',
        borderWidth: 1,
        borderRadius: 6,
        fontFamily: 'NanumGothic-Regular',
        fontSize: 16,
        paddingLeft: 10,
        marginTop: 10,
    },
    errLabel: {
        color: '#ff0d0d',
        fontSize: 14,
        marginTop: 10,
        textAlign: 'left',
        fontFamily: 'NanumGothic-Regular',
    },
    cardRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
    },
    btnCat: {
        width: 70,
        height: 70,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth: 1,
        borderColor: '#999999',
    },
    btnCatTxt: {
        color: '#999999',
        fontSize: 11,
        fontFamily: 'NanumGothic-Regular',
        marginTop: 10,
    },
    heading: {
        color: '#505050',
        fontSize: 16,
        fontFamily: 'NanumGothic-Regular',
        marginBottom: 8,
        marginLeft: 5,
    },
    selectedBtn :{
        borderColor: '#514fe1',
        backgroundColor: '#514fe1'
    },
    selectedBtnTxt: {
        color: '#fff'
    }
})
