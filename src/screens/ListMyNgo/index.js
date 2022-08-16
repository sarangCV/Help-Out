import React from 'react';
import {
    Text,
    View,
    TextInput,
    SafeAreaView,
    ScrollView,
    StyleSheet
} from 'react-native';

//Components
import Header from "../../components/Header";
import Loading from "../../components/Loading";
import Button from "../../components/Button";

//API
import {orgRequest} from "../../api/utils"
import InternetConnection from "../../components/Info/InternetConnection";

// const token = "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ0MCwiaXNPcmciOmZhbHNlLCJ0b2tlbiI6Ik5GbUNZU3I3WWU3N055UHdDb0FjMmc0R1BjT2t5SEdJZHBhNzV0a3JqYnprM0dLaEhsIiwiaWF0IjoxNTk1MDY0MzQ1LCJleHAiOjE1OTc2NTYzNDUsImF1ZCI6Imh0dHA6Ly9wcmFzaGFudC53b3JrLyIsImlzcyI6IlByYXNoYW50IEdhdXJhdiIsInN1YiI6InBnZGV2MjVAZ21haWwuY29tIn0.TnGpZMcupQtAPSvPqi1z8ULdcKFEKzOkv-S1FNoe9-EMOtQ7wOpvv22_CQjLdn2GANQYmo8U1b5T-0M_uRwjJD2vvnUMw1ez_C5-xjh6K__WrZRxyKYZdPNdaTDxSggz4RMQ1qDrXynACf8ncOKp-U95A8pa35ZwrcsrShp-2KU";

export default ListMyNgo = ({navigation}) => {
    const {authToken} = navigation.state.params;
    const [loading, setLoading] = React.useState()
    const [error, setError] = React.useState()
    const [formFields, setFormFields] = React.useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            orgName: "",
            contact: "",
            email: "",
            about: ""
        }
    );

    const _listOrg = () => {
        let errors = {};
        if (!formFields.orgName) {
            errors.orgName = 'Please enter organisation name';
        }else if (!formFields.contact) {
            errors.phone = 'Please enter phone number';
        } else if (formFields.contact < 10 || isNaN(formFields.contact)) {
            errors.phone = 'Invalid phone number';
        } else if (!formFields.email) {
            errors.email = 'Please enter email';
        } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formFields.email)) {
            errors.email = 'Invalid Email';
        }else {
            setLoading(true)
            orgRequest(authToken, formFields).then(res=> {
                setLoading(false)
                setFormFields({
                    ['orgName']: null,
                    ['contact']: null,
                    ['email']: null,
                    ['about']: null,
                })
                if(res.success) alert(res.messages)
                else alert(res.message)
            })
        }
        setError(errors)
    }

    return(
        <SafeAreaView style={styles.container}>
            <Header navigation={() => navigation.goBack()} title={'List My NGO'} isBackBtn={true} />
            <Loading loading={loading} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.formContainer}>
                    <TextInput
                        placeholder="Organisation Name"
                        placeholderTextColor={'#d5d5df'}
                        style={styles.input}
                        value={formFields.orgName}
                        onChangeText={text => setFormFields({['orgName']: text})}
                    />
                    <Text style={styles.errLabel}>{error && error.orgName} </Text>
                    <TextInput
                        placeholder="Phone Number"
                        keyboardType={'phone-pad'}
                        placeholderTextColor={'#d5d5df'}
                        style={styles.input}
                        maxLength={10}
                        value={formFields.contact}
                        onChangeText={text => setFormFields({['contact']: text})}
                    />
                    <Text style={styles.errLabel}>{error && error.phone} </Text>
                    <TextInput
                        placeholder="Email"
                        keyboardType={'email-address'}
                        placeholderTextColor={'#d5d5df'}
                        style={styles.input}
                        value={formFields.email}
                        onChangeText={text => setFormFields({['email']: text})}
                    />
                    <Text style={styles.errLabel}>{error && error.email} </Text>
                    {/*<TextInput*/}
                    {/*    placeholder="About Organisation"*/}
                    {/*    multiline={true}*/}
                    {/*    numberOfLines={5}*/}
                    {/*    placeholderTextColor={'#d5d5df'}*/}
                    {/*    style={styles.input}*/}
                    {/*    value={formFields.about}*/}
                    {/*    onChangeText={text => setFormFields({['about']: text})}*/}
                    {/*/>*/}
                </View>
            </ScrollView>

            <Button title={'Submit'} onPress={_listOrg}/>

            <InternetConnection />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff'
    },
    formContainer: {
        flex: 1,
        paddingHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 100,
        paddingTop: 100,
        // height: '100%',
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#d5d5df',
        borderWidth: 1,
        borderRadius: 4,
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
})
