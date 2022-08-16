import React from 'react'
import { SafeAreaView, StatusBar, View, Text, TouchableOpacity, StyleSheet, TextInput, Image, ScrollView } from 'react-native';
import Header from '../../components/Header';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import {reportIssue} from '../../api/utils'
import {getToken} from '../../asy-store'
import Loading from "../../components/Loading";
import InternetConnection from "../../components/Info/InternetConnection";



export default class Feedback extends React.Component {

    state = {
        message: null,
        image: null,
        disbled: true,
        authToken: null,
        loading: false,
    }

    componentDidMount(){
        getToken('authToken').then(res => this.setState({authToken: JSON.parse(res)}))
    }

    _selectImage = () => {
        ImagePicker.clean().then(() => {
            console.log('removed tmp images from tmp directory');
        }).catch(e => {
            alert(e);
        });
        ImagePicker.openPicker({
            compressImageMaxWidth: 1000,
            compressImageMaxHeight: 1000,
            compressImageQuality: 1,
        }).then(image => {
            console.log(image)
            this.setState({ disbled: false, image: {uri: image.path, name: 'image.jpeg', type: 'image/jpeg'} })
        }).catch(e => alert(e));
    };

    _handleSubmit = () => {
        const {message, image, authToken} = this.state;

        let formData = new FormData();

        formData.append("reportDetails", message)
        formData.append("reportImage", image)
        formData.append("reportTime", `${new Date().toISOString()}`)
        this.setState({loading: true})
        reportIssue(authToken, formData).then(res => {
            this.setState({loading: false})
            if(res.success){
                alert(res.message)
                this.setState({image: null, message: null, disbled:true})
            }else{
                alert(res.message);
            }
        })

    };


    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar barStyle='dark-content' backgroundColor='rgba(255,255,255,0)' translucent={true} />
                <View style={styles.container}>
                    {/* -------------- HEADERS  -------------- */}
                    <Header navigation={() => this.props.navigation.goBack()} title={'Report an Issue'} isBackBtn={true} />

                    <Loading loading={this.state.loading}/>

                    <ScrollView>
                        <View style={styles.innerContent}>

                            <View style={styles.formGroup}>
                                {/*<Text style={styles.label}>Description</Text>*/}

                                <TextInput
                                    multiline={true}
                                    numberOfLines={6}
                                    value={this.state.message}
                                    style={styles.textArea}
                                    placeholder="Description"
                                    placeholdercolor={'#d5d5df'}
                                    onChangeText={message => this.setState({message})} />

                            </View>

                            <View style={[styles.formGroup, { height: 150 }]}>
                                <Text style={styles.label}>Attach Screenshot</Text>
                                <TouchableOpacity onPress={this._selectImage} style={styles.thumb}>
                                    {!this.state.image ? <Icon name="plus" color={'#ccc'} size={25} /> : <Image source={{ uri: this.state.image.uri }} style={styles.imgThumb} />}
                                </TouchableOpacity>
                            </View>



                        </View>
                    </ScrollView>

                    <View style={styles.btnBtm}>
                        <TouchableOpacity style={[styles.btnPrimary, this.state.disbled &&  styles.disabled]} disabled={this.state.disbled} activeOpacity={1} onPress={this._handleSubmit}>
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
        padding: 15,
        // marginTop: 100,
    },
    formGroup: {
        width: '100%',
        marginBottom: 15,
    },
    label: {
        color: '#333',
        fontFamily: 'NanumGothic-Regular',
        fontSize: 14,
        marginBottom: 5,
        marginLeft: 5,
    },
    textArea: {
        width: '100%',
        height: 120,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        textAlignVertical: 'top',
        borderColor: '#d5d5df',
        borderWidth: 1,
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
        fontFamily: 'NanumGothic-Regular',
        fontSize: 16,
        marginBottom: 5,
    },
    btnBtm: {
        position: 'absolute',
        right: 0,
        left: 0,
        bottom: 20,
        paddingTop: 20,
        paddingHorizontal: 10,
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
        fontFamily: 'NanumGothic-Bold',
        color: '#fff',
        fontSize: 14,
    },
    orText: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 15,
    }
})
