'use strict';
import React from 'react';
import {View, Text, TextInput, TouchableOpacity, Image, ScrollView, Picker} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
// import Loading from '../../../components/Loading';
// import FadeInView from '../../../components/Animation';

import NewHeader from '../../components/NewHeader'

import styles from './styles';

import {getCities, getCountries, getStates} from '../../api/auth';
import Button from '../../components/Button';
import InternetConnection from "../../components/Info/InternetConnection";
import {getToken} from "../../asy-store";

class AddAddress extends React.Component {

    state = {
        phone: null,
        landline: null,
        address: null,
        pin: null,
        countries: null,
        states: null,
        cities: null,
        selectedState: null,
        selectedCity: null,
        phoneErr: null,
        addrErr: null,
        countErr: null,
        stateErr: null,
        cityErr: null,
        pinErr: null,
        isMobile: true,
        data: null
    };


  componentDidMount() {

      const {data} = this.props.navigation.state.params;
      this.setState({data:data})
      console.log(data);

      getToken('userData').then(res => console.log(JSON.parse(res)))

      getCountries().then(res => {
          if(res.success) {
              this.setState({countries: res.data})
          }else{
              alert(res.message);
          }
      });

      getStates(101).then(res => {
          console.log(res)
          if (res.success){
              console.log(res.data)
              this.setState({states: res.data})
          }else {
              alert(res.message);
          }
      });

      getCities(17).then(res => {
          console.log(res)
        if (res.success){
            console.log(res.data)
            this.setState({cities: res.data})
        }else {
            alert(res.message);
        }
      });

  };

    _stateChange = index => {
        console.log(index)
        this.state.states.map( (v,i)=>{
            if( index === i ){
                console.log(this.state.states[index].id);
                getCities(this.state.states[index].id).then(res => {
                    console.log(res)
                    if (res.success){
                        console.log(res.data)
                        this.setState({
                            cities: res.data,
                            selectedState: {
                                id: this.state.states[index].id,
                                state: this.state.states[index].state
                            }
                        })
                    }else {
                        alert(res.message);
                    }
                });
            }
        })
    };

    _cityChange = index => {
        this.state.cities.map( (v,i)=>{
            if( index === i ){
                // console.log(this.state.cities[index].id);
                this.setState({
                    selectedCity: {
                        id: this.state.cities[index].id,
                        city: this.state.cities[index].city,
                    },
                })
            }
        })
    }

    _toggleInput = () => {
        this.setState({isMobile: !this.state.isMobile})
    }

    _handleAddress = () => {
        const {data, phone, landline, address, selectedState, selectedCity, pin, isMobile} = this.state;
        if (!phone) {
            this.setState({phoneErr: 'please enter phone number'})
        }else if (phone.length < 10 || isNaN(phone)) {
            this.setState({phoneErr: 'Invalid Phone Number'});
        }else if (!address) {
            this.setState({addrErr: 'please enter your address'});
        }else if (address.length < 10) {
            this.setState({addrErr: 'Address must be 10 minimum characters '});
        }else if (!selectedState) {
            this.setState({stateErr: 'Please select a state'});
        }else if (!selectedCity) {
            this.setState({countErr: 'Please select a city'});
        }else if (!pin) {
            this.setState({pinErr: 'Please enter pin number'});
        } else if (pin.length < 5 || isNaN(pin)) {
            this.setState({pinErr: 'Invalid pin number'});
        }else {

            this.setState({phoneErr:null, addrErr:null, stateErr:null, countErr:null, pinErr:null})

            let dataTosend = {
                organizationId: data.userId,
                address: address,
                country: 101,
                state: selectedState.id,
                city: selectedCity.id,
                zip: pin,
                contact: [
                    {
                        number: phone,
                        isMobile: !!isMobile,
                    },
                    {
                        number: landline,
                        isMobile: false,
                    }
                ],
            };

            console.log(dataTosend);

            this.props.navigation.navigate('LocationSelect', {
                data: dataTosend,
            });

        }
    }



  render() {
    const {countries, states, cities, selectedState, selectedCity, phoneErr, addrErr, countErr, stateErr, cityErr, pinErr, isMobile} = this.state;
    return (
      <View style={styles.baseContainer}>
        {/* <Loading loading={this.props.loading} /> */}

            <NewHeader showBack={true} title={'SignUp'} navigation={() => this.props.navigation.goBack()} />

            <ScrollView style={styles.baseContainer}>

                <View style={styles.contLeft}>

                    <View style={styles.widthFull}>

                        <TouchableOpacity
                            style={styles.passBtn}
                            onPress={this._toggleInput}>
                            <Icon
                                name={isMobile ? 'phone' : 'phone-classic'}
                                color={'#cacaca'}
                                size={25}
                            />
                        </TouchableOpacity>

                        <TextInput
                            placeholder="Phone"
                            keyboardType="number-pad"
                            maxLength={10}
                            placeholderTextColor={'#cacaca'}
                            onChangeText={phone => this.setState({phone})}
                            // value={password}
                            style={styles.input}
                            // secureTextEntry={secure}
                        />

                        <Text style={styles.errLabel}>{phoneErr && phoneErr} </Text>

                    </View>

                        {!isMobile && (
                            <TextInput
                                placeholder="Landline Number"
                                keyboardType="number-pad"
                                maxLength={15}
                                placeholderTextColor={'#cacaca'}
                                onChangeText={landline => this.setState({landline})}
                                // value={password}
                                style={styles.input}
                                // secureTextEntry={secure}
                            />
                        )}


                        <TextInput
                            placeholder="Formatted Address"
                            placeholderTextColor={'#d5d5df'}
                            style={styles.textArea}
                            returnKeyType="next"
                            onChangeText={address => this.setState({address})}
                            // value={phone}
                        />

                        <Text style={styles.errLabel}>{addrErr && addrErr} </Text>



                        <Picker
                            selectedValue={this.state.city}
                            style={styles.picker}>
                            {countries && countries.map((c) => (
                                 <Picker.Item label={c.country} value={c.country} />
                            ))}
                        </Picker>

                        <Text style={styles.errLabel}>{countErr && countErr} </Text>





                        <Picker
                            selectedValue={selectedState && selectedState.state}
                            style={styles.picker}
                            onValueChange={(itemValue, itemIndex) =>
                                this._stateChange(itemIndex)
                            }>

                            {states && states.map((s) => (
                                 <Picker.Item label={s.state} value={s.state} />
                                ))}

                            {/*<Picker.Item label="JavaScript" value="js" />*/}
                        </Picker>

                        <Text style={styles.errLabel}>{stateErr && stateErr} </Text>





                        <Picker
                            selectedValue={selectedCity && selectedCity.city}
                            style={styles.picker}
                            onValueChange={(itemValue, itemIndex) =>
                                this._cityChange(itemIndex)
                            }>

                            {cities && cities.map((c) => (
                                 <Picker.Item label={c.city} value={c.city} />
                                 ))}

                            {/*<Picker.Item label="JavaScript" value="js" />*/}
                        </Picker>


                        <Text style={styles.errLabel}>{cityErr && cityErr} </Text>





                        <TextInput
                            placeholder="Pincode"
                            maxLength={6}
                            placeholderTextColor={'#d5d5df'}
                            keyboardType="number-pad"
                            style={styles.input}
                            returnKeyType="next"
                            onChangeText={pin => this.setState({pin})}
                            // value={phone}
                        />

                        <Text style={styles.errLabel}>{pinErr && pinErr} </Text>




                </View>

                <View style={styles.spacing}/>

            </ScrollView>

          <View style={styles.btmBtns}>

              <TouchableOpacity style={styles.btnOutLine} onPress={()=> this.props.navigation.navigate('LocationSelect')}>
                  <Text style={styles.outTxt}>Skip</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.btnFill} onPress={this._handleAddress}>
                  <Text style={styles.fillTxt}>Next</Text>
              </TouchableOpacity>

              {/*<Button title={'Next'} onPress={this._handleCreateOrg} />*/}

          </View>

          <InternetConnection />



      </View>
    );
  }
}

export default AddAddress;
