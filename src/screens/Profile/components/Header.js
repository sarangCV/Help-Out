import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Image, Picker, Modal, FlatList } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import {saveToken, getToken} from "../../../asy-store";


export default Header = props => {

    const [city, setCity] = React.useState(null)
    const [pickCity, setPickCity] = React.useState(false)
    const {cities} = props
    console.log('cities are::----:::', cities)

    React.useEffect(() => {
        getToken('userCity').then(res => {
            const resp = JSON.parse(res)
            // console.log(resp)
            if (resp) setCity(resp.city)
        })
    }, [])

    const _setCity = idx => {
        // console.log(cities)
        cities.map( (v,i)=> {
            if (i === idx) {
                saveToken('userCity', {city: cities[idx].city, id: cities[idx].id})
                    .then(() => setCity(cities[idx].city))
            }
        });
    }
    const cityHandler = (city) => {
        setCity(city)
        setPickCity(false)
    };

    const cityItem =({item}) => {
        return(
            <TouchableOpacity style={styles.cityItem}
                onPress={() => cityHandler(item.city)}>
                <Text style={{ fontSize: 14, color: '#5f6368', fontFamily: 'NanumGothic-Regular', }}>{item.city}</Text>
                {/* <Icon name="chevron-right" color={'#333'} size={25} /> */}
            </TouchableOpacity>
            
        );
    };

    return (
        <View style={styles.header}>
            <StatusBar barStyle='dark-content' backgroundColor='rgba(255,255,255,0)' translucent={true}/>

            <View style={styles.headerTop}>
                <TouchableOpacity style={styles.backBtn} onPress={props.navigate}>
                    <Icon name="chevron-left" color={'#333'} size={25} />
                </TouchableOpacity>

                <Text style={styles.headerTextLeft}>Settings</Text>

                <TouchableOpacity style={styles.btnPrimary} onPress={props.edit}>
                    <Icon name="square-edit-outline" color={'#333'} size={25}/>
                </TouchableOpacity>

            </View>

            <View style={styles.profileDetails}>
                <Image style={styles.avatar} source={{uri: props.uri}} />
                <Text style={styles.name}>{props.name}</Text>

                {/* <Picker
                    style={styles.picker}
                    selectedValue = {city ? city : 'Select City'}
                    textStyle= {{
                        fontFamily: 'NanumGothic-Regular'
                    }}
                    onValueChange = {(itemValue, itemIndex) => _setCity(itemIndex)}>

                    {cities && cities.map((item) => (
                        <Picker.Item label ={item.city} value ={item.city} style={{fontFamily: 'NanumGothic-Regular'}}  />
                    ))}
                </Picker> */}
                
                <TouchableOpacity style={styles.cityPicker} onPress={() => setPickCity(!pickCity)}>
                    <View style={{ marginRight: 5 }}>
                        <Icon name="city" color={'gray'} size={25}/>
                    </View>
                    <Text style={{ color: '#505050'}}>{city ? city : 'Choose a city'}</Text>
                </TouchableOpacity>


                {/* City pop-up */}
                <Modal
                    animationType="none"
                    transparent={true}
                    visible={pickCity}
                    onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    }}
                >   
                    <View style={{ flex: 1, backgroundColor: '#fff' }}>
                    <StatusBar barStyle='dark-content' backgroundColor='#fff' translucent={true}/>
                        <View style={ styles.cityOverlayContent }>
                            <View style={styles.cityHeader}>
                                <Text style={ styles.cityText }>Select a city</Text>
                            </View>
                            <View style={styles.cityContent}>
                                <View style={styles.cityContentInner}>
                                    <FlatList data={cities} renderItem={cityItem} keyExtractor={(item) => item.id}/>
                                </View>
                            </View>
                            <View style={styles.cityFooter}>
                                <View style={styles.cityButtonView}>
                                    <TouchableOpacity
                                    style={[ styles.cityOverlayButton, {backgroundColor: '#3b52d4'} ]}
                                    onPress={() => {
                                        setPickCity(false)
                                    }}
                                    >
                                        <Text style={[ styles.cityButtonText, {color: '#fff'} ]}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
                {/* City pop-up */}

            </View>

        </View>
    );
}



const styles = StyleSheet.create({
    header:{
       flex: 1,
       minHeight: 100,
       paddingHorizontal: 10,
       paddingTop: 30,
       backgroundColor: '#fbfbfb',
    },
    headerTop:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
},
    backBtn : {
        width: '15%',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    headerTextLeft:{
        fontFamily: 'Montserrat-Regular',
        color:'#333',
        fontSize: 22,
        marginTop: 3,
    },
    btnCog:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 30,
        backgroundColor: '#ffdbd3',
    },
    btnText:{
        color: '#ea2d01',
        marginLeft: 5,
    },
    profileDetails:{
        paddingVertical: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatar:{
        height: 150,
        width: 150,
        borderRadius: 100,
    },
    name:{
        fontFamily: 'Montserrat-Regular',
        color:'#333',
        fontSize: 18,
        // paddingVertical: 5,
    },
    smText:{
        fontFamily: 'Montserrat-Regular',
        color:'#333',
        fontSize: 16,
        paddingVertical: 0,
    },
    btnPrimary: {
        width: 60,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        // backgroundColor: '#eeeeee',
        // borderRadius: 4,
    },
    picker: {
        width:'60%',
        height: 50,
        justifyContent: 'center',
        alignItems:'center',
        textAlign: 'center',
        fontFamily: 'NanumGothic-Regular',
        fontSize: 14,
    },
    cityPicker: {
        flexDirection: 'row',
        height: 35,
        paddingHorizontal: 10,
        marginTop: 10,
        borderWidth: 0.3,
        borderRadius: 3,
        borderColor: 'gray',
        alignItems: 'center',
        justifyContent: 'center'
    },


// Modal overlay styles

    cityOverlayContent: {
        height: '100%',
        // backgroundColor: 'red',
    },
    cityItem: {
        height: 45, 
        borderBottomWidth: .3, 
        borderColor: 'gray', 
        paddingVertical: 10, 
        marginVertical: 5, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        paddingHorizontal: 5
    },
    cityHeader: {
        flexDirection: 'row',
        height: '7%',
        alignItems: 'center',
        // backgroundColor: 'blue',
        // borderWidth: 2,
        // paddingTop: 20,
        marginTop: 0,
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    cityText: {
        fontFamily: 'NanumGothic-Regular',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#505050'
    },
    cityContent: {
        backgroundColor: '#f4f4f4',
        // elevation: 5,
        // paddingBottom: 20,
        // paddingTop: 10,
        width: '100%',
        height: '86%',
        // borderRadius: 5,
        // alignItems: 'flex-start'
    },
    cityContentInner: {
        paddingHorizontal: 0,
        paddingVertical: 10,
        borderBottomColor: '#5f6368',
        marginHorizontal: 15,
    },
    cityFooter: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f4f4f4',
        // justifyContent: 'center',
        height: '7%',
        // backgroundColor: 'green',

    },
    cityButtonView: {
        flexDirection: 'row',
        // marginTop: 20,
        width: '100%',
        height: '100%',
        // paddingVertical: 5,
        
        backgroundColor: 'blue'
    },
    cityOverlayButton: {
        backgroundColor: "#514fe1",
        flex: 1,
        height: 45,
        justifyContent: 'center',
        // width: 80,
        // borderRadius: 5,
        // paddingVertical: 10,
        // padding: 10,
        height: '100%',
        // margin: 10,
        // marginRight: 5,
        alignItems: 'center'
    },
    cityButtonText: {
        // color: '#fff',
        fontFamily: 'NanumGothic-Regular',
        fontSize: 14
    },
})
