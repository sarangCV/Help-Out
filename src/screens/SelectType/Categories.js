'use strict';
import React from 'react';
import {View, Text, TextInput, TouchableOpacity, Image, ScrollView} from 'react-native';

// import Icon from 'react-native-vector-icons/SimpleLineIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
// import Loading from '../../../components/Loading';
// import FadeInView from '../../../components/Animation';

import NewHeader from '../../components/NewHeader'

import styles from './styles';

import {fetchInterests} from "../../api/utils";

import {createOrg, storeDevice} from "../../api/auth";

import Loading from '../../components/Loading';
import Button from "../../components/Button";
import {saveToken} from '../../asy-store';
import DeviceInfo, {getManufacturer} from "react-native-device-info";
import InternetConnection from "../../components/Info/InternetConnection";



class Categories extends React.Component {

   state = {
       orgURL: null,
      categories: null,
       data: null,
       orgCategory: null,
       categoryErr: null,
       orgUrlErr: null,
       loading: false,
       deviceInfo: null,
       deviceInfoAsync: null,
   };


   componentDidMount() {
       const {data} = this.props.navigation.state.params;
       console.log(data)

       this.setState({data: data});

       fetchInterests().then(res => {
           if(res.success){
               let data = res.data;
               data.forEach(function (ele) {
                   ele.checked = false;
               });
               this.setState({categories: data})
           }else {
               alert(res.message)
           }
       });
       this._getConstantDeviceInfo();
       this._getConstantDeviceInfoAsync();
   };

    _filterCategory = (id) => {
        const {categories} = this.state;
        const selectedCats =  categories.map(cat => ({
            ...cat,
            checked: cat.interestId === id ? cat.checked = !cat.checked : cat.checked
        }))
        const chkId = selectedCats.filter(t => t.checked).map(d => d.interestId)
        this.setState({categories: selectedCats, orgCategory: chkId} )
    }


    _handleCreateOrg = () => {
        const {orgCategory, orgURL, data}  = this.state;

        // console.log(data);

        // let re=/^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;

        if(!orgCategory.length > 0) {
            this.setState({categoryErr: 'Please Select category'})
        }
        // else if(!orgURL){
        //     this.setState({orgUrlErr: 'Please Enter Organisation Url'})
        // }else if(!re.test(orgURL)){
        //     this.setState({orgUrlErr: 'Please Enter Valid Organisation Url'})
        // }
        else {
            let orgData = {
                ...data,
                orgCategory: orgCategory,
                orgUrl: orgURL,
            };
            console.log(orgData);
            this.setState({loading: true, categoryErr: null, orgUrlErr: null})
            createOrg(orgData).then(res => {
                console.log(res);
                let orgData = res;
                if (res.success){
                    let deviceInfo = {
                        ...this.state.deviceInfo,
                        ...this.state.deviceInfoAsync,
                    };
                    saveToken('userData', res).then(() => {
                        saveToken('authToken', res.token).then(() => {
                            storeDevice(res.token, deviceInfo).then(res => {
                                this.setState({ loading:false });
                                console.log(res);
                                // this.setState({loading: false});
                                if (res.success) {
                                    this.props.navigation.navigate('AddAddress', {
                                        data: orgData
                                    })
                                } else {
                                    alert(res.message);
                                }
                            });
                        });
                    });
                }else {
                    alert(res.message)
                }
            });
        }
    };


    _getConstantDeviceInfo = () => {
        let deviceJSON = {};
        deviceJSON.device_unique_id = DeviceInfo.getUniqueId();
        deviceJSON.device_model = DeviceInfo.getModel();
        deviceJSON.device_id = DeviceInfo.getDeviceId();
        deviceJSON.device_system_name = DeviceInfo.getSystemName();
        deviceJSON.device_system_version = DeviceInfo.getSystemVersion();
        deviceJSON.device_bundle_id = DeviceInfo.getBundleId();
        deviceJSON.device_build_number = DeviceInfo.getBuildNumber();
        deviceJSON.device_readable_version = DeviceInfo.getReadableVersion();
        deviceJSON.device_locale = null;
        deviceJSON.device_country = null;
        deviceJSON.device_name = null;
        this.setState({deviceInfo: deviceJSON});
        console.log(deviceJSON);
    };

    _getConstantDeviceInfoAsync = async () => {
        let deviceJSON = {};
        deviceJSON.manufacturer = await getManufacturer();
        deviceJSON.device_user_agent = await DeviceInfo.getUserAgent();
        this.setState({deviceInfoAsync: deviceJSON});
        console.log(deviceJSON);
    };



    render() {
    const {loading, categories,  orgUrlErr, categoryErr} = this.state;
    return (
      <View style={styles.baseContainer}>

            <NewHeader showBack={true} title={'SignUp'} navigation={() => this.props.navigation.goBack()} />

            <Loading loading={loading}  />

            <ScrollView style={styles.baseContainer}>

                <View style={styles.formContainer}>

                    <View style={styles.txtView}>
                        <Text style={styles.labelCats}>Select Categories</Text>
                    </View>

                    <View style={styles.catRow}>
                      {categories && categories !== null && categories.map((item) => {
                        return (
                            <TouchableOpacity key={item.interestId} style={[styles.btnCats, item.checked  && {backgroundColor: '#7d7d7d'}]} onPress={this._filterCategory.bind(this, item.interestId)}>
                                <Text style={[styles.btnCatTxt, item.checked && styles.selectedColor]}>{item.interestTitle}</Text>
                            </TouchableOpacity>
                        )
                      })}
                    </View>

                    <Text style={styles.errLabel}>{categoryErr && categoryErr} </Text>

                    <TextInput
                        placeholder="Organisation URL"
                        keyboardType={'url'}
                        placeholderTextColor={'#d5d5df'}
                        style={styles.input}
                        onChangeText={orgURL => this.setState({orgURL})}
                        // value={phone}
                    />

                    {/*<Text style={styles.errLabel}>{orgUrlErr && orgUrlErr} </Text>*/}




                </View>

                <View style={styles.spacing}/>

            </ScrollView>

          <Button title={'Next'} onPress={this._handleCreateOrg} />

          <InternetConnection />

      </View>
    );
  }
}

export default Categories;
