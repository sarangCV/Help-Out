import React from 'react'
import { SafeAreaView, StatusBar, View, Text, TouchableOpacity, StyleSheet, TextInput,  ScrollView } from 'react-native';
import Header from '../../components/Header';

import {feedBackUser} from '../../api/utils'
import {getToken} from '../../asy-store'
import Loading from "../../components/Loading";
import InternetConnection from "../../components/Info/InternetConnection";



export default class Contact extends React.Component {

    state = {
        subject: null,
        message: null,
        authToken: null,
        loading: false,
    }

    componentDidMount(){
        getToken('authToken').then(res => this.setState({authToken: JSON.parse(res)}))
    }


    _handleSubmit = () => {
        const {message, subject, authToken} = this.state;
        this.setState({loading: true})
        feedBackUser(authToken, {
            subject: subject,
            feedback: message
        }).then(res => {
            this.setState({loading: false})
            if(res.success){
                alert(res.message)
                this.setState({message:null, subject: null})
                this.props.navigation.navigate('Profile')
            }else{
                alert(res.message)
            }
        })

    };


    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar barStyle='dark-content' backgroundColor='rgba(255,255,255,0)' translucent={true} />
                <Header navigation={() => this.props.navigation.goBack()} title={'Contact'} isBackBtn={true} />
                <Loading loading={this.state.loading}/>

                <View style={styles.container}>
                    {/* -------------- HEADERS  -------------- */}

                    <ScrollView style={styles.innerContent}>

                        <View style={styles.formGroup}>
                            {/*<Text style={styles.label}>Description</Text>*/}

                            <TextInput
                                placeholder="Subject"
                                value={this.state.subject}
                                // keyboardType={'phone-pad'}
                                // placeholderTextColor={'#d5d5df'}
                                style={styles.input}
                                maxLength={10}
                                onChangeText={text => this.setState({subject: text})}
                            />

                            <TextInput
                                multiline={true}
                                numberOfLines={6}
                                value={this.state.message}
                                style={styles.textArea}
                                placeholder="Message"
                                // placeholderTextColor={'#d5d5df'}
                                onChangeText={text => this.setState({message: text})} />

                        </View>

                    </ScrollView>

                    <View style={styles.btnBtm}>
                        <TouchableOpacity
                            style={[styles.btnPrimary, !this.state.message && !this.state.subject &&  styles.disabled]}
                            disabled={this.state.message === null}
                            activeOpacity={1}
                            onPress={this._handleSubmit}>
                            <Text style={styles.btnText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <InternetConnection />
            </SafeAreaView>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    innerContent: {
        flex: 1,
        padding: 20,
        // marginTop: 100,
    },
    formGroup: {
        width: '100%',
        marginBottom: 15,
        paddingBottom: 100,
    },
    label: {
        color: '#333',
        fontFamily: 'Montserrat-Regular',
        fontSize: 16,
        marginBottom: 5,
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
        marginVertical: 15,
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
        fontFamily: 'NanumGothic-Regular',
        fontSize: 16,
        padding: 10,
    },
    thumb: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#d5d5df',
        borderWidth: 1,
        borderRadius: 4,
        // backgroundColor: '#eee'
    },
    imgThumb: {
        width: '100%',
        height: '100%',
    },
    textInfo: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
    },
    info: {
        color: '#333',
        fontFamily: 'Montserrat-Regular',
        fontSize: 16,
        marginBottom: 5,
    },
    btnBtm: {
        position: 'absolute',
        right: 0,
        left: 0,
        bottom: 20,
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    btnPrimary: {
        width: '100%',
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3b52d4',
        marginVertical: 15,
        borderRadius: 4,
    },
    disabled: {
        backgroundColor: '#ddd',
    },
    btnText: {
        fontFamily: 'Montserrat-Bold',
        color: '#fff',
        fontSize: 14,
    }
})
