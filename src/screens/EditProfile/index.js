import React, { Component } from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, Keyboard, View, TouchableOpacity} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import ImageResizer from 'react-native-image-resizer';

import Header from '../../components/Header';
import Loading from '../../components/Loading';

import EditUser from './components/EditUser';
import Inputs from './components/TextInput';

// import Geolocation from 'react-native-geolocation-service';


import {updateUserPhoto, updateUserName, updateUserEmail, getUserDetails} from '../../api/utils';

import {checkMobileAuth} from '../../api/auth';
import InternetConnection from "../../components/Info/InternetConnection";


export default class EditProfile extends Component {

    state = {
        userData: null,
        authToken: null,
        name: null,
        email: null,
        phone: null,
        password: null,
        isEditingField: null,
        loading: false,
        nameErr: null,
        emailErr: null,
        phoneErr: null,
        coordinate: null
    };
    

    componentDidMount() {
        const {token} = this.props.navigation.state.params;
        this.setState({authToken: token}, ()=> this._fetchUserData(token));
    };


  _fetchUserData = (token) => {
    getUserDetails(token).then(res => {
        console.log(res)
        if (res.success) {
            this.setState({userData: res})
            if(res.isOrganization) {
                alert('Please contact customer support to update profile')
            }
        }else{
            alert(res.message)
        }
    })
  };


    _handleFocus = text => {
        console.log(text);
        this.setState({isEditingField:text})
        if(text === 'name'){
            this._name.focus();
        }else if(text === 'email'){
            this._email.focus();
        }else if(text === 'phone'){
            this._phone.focus();
        }
    };


    _selectImage = () => {
        const {authToken} = this.state;
        ImagePicker.clean().then(() => {
            console.log('removed tmp images from tmp directory');
          }).catch(e => {
            console.log(e);
          });      
        ImagePicker.openPicker({
            width: 200,
            height: 200,
            cropping: true,
            compressImageQuality: 1,
          }).then(image => {
              console.log(image)
            this._toggleLoading(true);

            ImageResizer.createResizedImage(image.path, 200, 200, 'JPEG', 100)
            .then(({uri}) => {
                const data = new FormData();
                const d = new Date();

                console.log(uri);
    
                data.append("userAvatar", {
                    uri: uri,
                    type: image.mime,
                    name: `userAvatar${(d.getSeconds()+d.getMilliseconds()).toString()}.jpeg`,
                });

                updateUserPhoto(authToken, data).then(res => {
                    this._toggleLoading(false);
                    if (res.success) {
                        this._fetchUserData(authToken)
                    }else{
                        alert(res.message)
                    }
                })

            })
            .catch(err => {
              console.log(err);
              return alert('Unable to resize the photo');
            });           
        }).catch(e => alert(e));   
    };

    _handleUpdate = val =>{
        const {name, email, phone, authToken, coordinate, userData} = this.state;
        Keyboard.dismiss();
        if (val === 'name') {
            if(!name){
                this.setState({nameErr: 'Name should not be blank', isEditingField:null});
            }else{
                this.setState({nameErr:null, isEditingField:null})
                this._toggleLoading(true)
                updateUserName(authToken, {newName:name}).then(res => {
                    console.log(res);
                    this._toggleLoading(false)
                    if (res.success) {
                        this._fetchUserData(authToken)
                    }else{
                        alert(res.message)
                    }
                })
            }
        }else if (val === 'email') {
            console.log(email);
            let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            if (!email) {
                this.setState({emailErr: 'Email should not be blank', isEditingField:null});
            }else if (!reg.test(email)) {
                this.setState({emailErr: 'Invalid Email', isEditingField:null});
            }else{
                this.setState({emailErr:null, isEditingField:null})
                this._toggleLoading(true)
                updateUserEmail(authToken, {userEmail:email}).then(res => {
                    this._toggleLoading(false)
                    if (res.success) {
                        alert(res.message)
                        this._fetchUserData(authToken)
                    }else{
                        alert(res.message)
                    }
                })
            }
        }else if (val === 'phone') {
            if (!phone) {
                this.setState({phoneErr: 'Phone should not be blank'});
                return false;
              } else if (phone.length < 10 || isNaN(phone)) {
                this.setState({phoneErr: 'Invalid Phone Number'});
                return false;
              } else {
                this.setState({emailErr:null, isEditingField:null})
                let data = {
                  contactNumber: phone,
                  coordinate: coordinate,
                };
                this._toggleLoading(true)
                checkMobileAuth(data).then(res => {
                    this._toggleLoading(false)
                    if (res.success) {
                        this.props.navigation.navigate('ValidateOtp', {
                            otpReference: res.otpReference,
                            otp: res.otp,
                            authToken: authToken,
                            oldNumber: userData.userContactNo,
                            phone: phone,
                        })
                    }else{
                        alert(res.message)
                    }
                })
              }
        }
    };

    _toggleLoading = bool => this.setState({loading:bool});

    render() {
        const {userData, isEditingField, loading, nameErr, emailErr, phoneErr, name, email, phone} = this.state;
        console.log(isEditingField);
        // userName={userData && userData.userName}
        // email={userData && userData.userEmail}
        // phone={userData && userData.userContactNo}
        // password={'12345678'}
        return (
            <SafeAreaView style={styles.container}>
                <Loading loading={loading} />
                <Header navigation={() => this.props.navigation.goBack()} title={'Edit Profile'} isBackBtn={true} />

                <ScrollView showsVerticalScrollIndicator={false}>

                    <EditUser 
                        changeImage={this._selectImage}
                        uri={userData && userData.userAvatar}
                        isOrg={userData && userData.isOrganization}
                    >

                        <Inputs 
                            label={userData && userData.isOrganization ? 'Organization Name' : 'Name'}
                            onEdit={()=> this._handleFocus('name')}
                            onUpdate={this._handleUpdate.bind(this, 'name')}
                            placeholder={userData && userData.userName}
                            value={name}
                            onFocus={() => this._handleFocus('name')}
                            onChange={name => this.setState({name})}
                            inputRef={component => this._name = component}
                            editable={true}
                            isEditing={isEditingField === 'name'}
                            activeStyles={isEditingField === 'name' && styles.activeInput}
                            isOrg={userData && userData.isOrganization}
                        />

                        {nameErr && <Text style={styles.errLbl}>{nameErr}</Text>}

                        <Inputs 
                            label={'Email'}
                            onEdit={()=> this._handleFocus('email')}
                            onUpdate={this._handleUpdate.bind(this, 'email')}
                            placeholder={userData && userData.userEmail}
                            onFocus={() => this._handleFocus('email')}
                            value={email}
                            onChange={(email) => this.setState({email})}
                            inputRef={component => this._email = component}
                            editable={true}
                            isEditing={isEditingField === 'email'}
                            activeStyles={isEditingField === 'email' && styles.activeInput}
                            isOrg={userData && userData.isOrganization}
                        />

                        {emailErr && <Text style={styles.errLbl}>{emailErr}</Text>}


                        <Inputs 
                            label={'Phone'}
                            onEdit={()=> this._handleFocus('phone')}
                            onUpdate={this._handleUpdate.bind(this, 'phone')}
                            placeholder={userData && userData.userContactNo}
                            onFocus={() => this._handleFocus('phone')}
                            value={phone}
                            onChange={(phone) => this.setState({phone})}
                            inputRef={component => this._phone = component}
                            isEditing={true}
                            keyboardType="phone-pad"
                            isEditing={isEditingField === 'phone'}
                            activeStyles={isEditingField === 'phone' && styles.activeInput}
                            editable={true}
                            maxLength={10}
                            isOrg={userData && userData.isOrganization}
                        />

                        {phoneErr && <Text style={styles.errLbl}>{phoneErr}</Text>}




                    </EditUser>
                </ScrollView>

                { userData && userData.isOrganization && <View style={styles.btnBtm}>
                    <TouchableOpacity
                        style={styles.btnPrimary}
                        activeOpacity={1}
                        onPress={()=> this.props.navigation.navigate('OrgDetails', {
                            orgId: userData && userData.organizationId,
                            authToken: this.state.authToken,
                            // isOrg: userData && userData.isOrganization
                        })}>
                        <Text style={styles.btnText}>More Details</Text>
                    </TouchableOpacity>
                </View> }

                <InternetConnection />

            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    activeInput:{
        borderBottomColor: '#333',
        borderBottomWidth: 1,
    },
    errLbl:{
        fontFamily: 'Montserrat-Regular',
        color:'#f44336',
        fontSize: 14,
        paddingLeft: 20,
    },
    btnBtm: {
        position: 'absolute',
        right: 0,
        left: 0,
        bottom: 0,
        paddingTop: 20,
        paddingHorizontal: 10,
    },
    btnPrimary: {
        width: '100%',
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginVertical: 15,
        borderRadius: 4,
    },
    btnText: {
        fontFamily: 'Montserrat-Bold',
        color: '#007bff',
        fontSize: 14,
    }
})
