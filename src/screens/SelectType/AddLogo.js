'use strict';
import React from 'react';
import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';

// import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker';
// import Loading from '../../../components/Loading';
// import FadeInView from '../../../components/Animation';
import Loading from "../../components/Loading";

import NewHeader from '../../components/NewHeader'

import styles from './styles';

// const height = Dimensions.get('window').height;

import {addOrgLogo} from '../../api/auth';

import {getToken} from '../../asy-store';
import InternetConnection from "../../components/Info/InternetConnection";

class AddLogo extends React.Component {

    state = {
        orgLogo: null,
        userData: null,
        loading: false,
    };

    componentDidMount() {
        // const {data} = this.props.navigation.state.params;
        // console.log(data);
        getToken('userData').then(res => {
            this.setState({userData: JSON.parse(res)});
        })
    }


    _openImageLibrary = () => {
        ImagePicker.openPicker({
            width: 200,
            height: 200,
            cropping: true,
            compressImageQuality: 1,
            compressImageMaxWidth: 1000,
            compressImageMaxHeight: 1000,
            // compressImageQuality: 1,
            includeExif: true,
        }).then(image => {
            console.log(image)
            this.setState({
                orgLogo: image.path,
            });
        }).catch(e => alert(e));
    };

    _handleAddLogo = () => {
        const {orgLogo, userData} = this.state;

        console.log(userData);

        if (!orgLogo){
            alert('Please select organisation logo')
        }

        const data = new FormData();
        const d = new Date();

        data.append("orgIcon", {
            uri: orgLogo,
            type: 'image/jpeg',
            name: `orgIcon${(d.getSeconds()+d.getMilliseconds()).toString()}.jpeg`,
        });

        this.setState({loading: true})

        addOrgLogo(userData.userId, userData.token, data).then(res => {
            this.setState({loading: false})
            console.log(res);
            if (res.success) {
                ImagePicker.clean().then(() => {
                    console.log('removed tmp images from tmp directory');
                }).catch(e => {
                    console.log(e);
                });
                // alert(res.message)
                this.props.navigation.navigate('Home')
            }else {
                alert(res.message)
            }
            // console.log(res);
        });

    };


  render() {

    const {orgLogo, loading} = this.state;

    return (
      <View style={styles.baseContainer}>
        {/* <Loading loading={this.props.loading} /> */}

            <NewHeader showBack={true} title={'Add Organisation Logo'} navigation={() => this.props.navigation.goBack()} />

            <Loading loading={loading} />

            <ScrollView style={styles.baseContainer}>

                <View style={styles.logoContainer}>

                    <TouchableOpacity style={styles.thumbView} onPress={this._openImageLibrary}>
                        {orgLogo ? <Image source={{uri: orgLogo}} style={styles.orgLogo}/>  :
                            <Text style={styles.logoTxt}> Logo </Text> }

                        <View style={styles.iconFt}>
                            <Icon name="plus-circle-outline" color={'#9d9d9d'} size={25} />
                        </View>

                    </TouchableOpacity>



                </View>

            </ScrollView>

          <View style={styles.btmBtns}>

              <TouchableOpacity style={styles.btnOutLine} onPress={()=> this.props.navigation.navigate('Home')}>
                  <Text style={styles.outTxt}>Skip</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.btnFill} onPress={this._handleAddLogo}>
                  <Text style={styles.fillTxt}>Next</Text>
              </TouchableOpacity>

              {/*<Button title={'Next'} onPress={this._handleCreateOrg} />*/}

          </View>

          <InternetConnection />

      </View>
    );
  }
}

export default AddLogo;
