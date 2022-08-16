import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/SimpleLineIcons'

const _links = [
    // { icon: 'basket-loaded', title: 'Received Donations' },
    { icon: 'calendar', title: 'Manage Events' },
    // { icon: 'calendar', title: 'List My Event' },
    // { icon: 'organization', title: 'List My NGO' },
    // { icon: 'basket-loaded', title: 'View Donations' },
    // { icon: 'list', title: 'List My Event' },
    { icon: 'heart', title: 'Saved Organisations' },
    // { icon: 'ban', title: 'Blocked Organisations' },
    { icon: 'speech', title: 'Report an Issue' },
    { icon: 'question', title: 'Help' },
    // { icon: 'book-open', title: 'Reported Issues' },
    { icon: 'share', title: 'Share this app' },
    // { icon: 'user-follow', title: 'Share this app' },
    { icon: 'power', title: 'Logout' }
];


export default ProfileInfo = props => (
    <View style={styles.body}>
        {console.log(props)}
        {props.isOrg ?
            _links.filter(o =>  o.title !== 'Saved Organisations').map((item, index) => {
                    return (<TouchableOpacity key={index} style={styles.btnRow} onPress={() => props.navAction(item.title)}>
                        <View style={styles.btnOptionIcon}><Icon name={item.icon} color={'#514fe1'} size={20} /></View>
                        <View style={styles.btnOptionText}><Text style={styles.title}>{item.title}</Text></View>
                        {/*<View style={styles.btnOptionRight}><Icon style={styles.mt} name="arrow-right" color={'#d4d4d4'} size={15} /></View>*/}
                    </TouchableOpacity>)
                })
        :
            _links.filter(o =>  o.title !== 'Manage Events').map((item, index) => {
                    return (<TouchableOpacity key={index} style={styles.btnRow} onPress={() => props.navAction(item.title)}>
                        <View style={styles.btnOptionIcon}><Icon name={item.icon} color={'#514fe1'} size={20} /></View>
                        <View style={styles.btnOptionText}><Text style={styles.title}>{item.title}</Text></View>
                        {/*<View style={styles.btnOptionRight}><Icon style={styles.mt} name="arrow-right" color={'#d4d4d4'} size={15} /></View>*/}
                    </TouchableOpacity>)
                })
        }

            {/*<Text style={styles.version}>Version 1.0.0</Text>*/}
    </View>
);


const styles = StyleSheet.create({
    body: {
        flex: 1,
        height: '100%',
        backgroundColor: '#fff',
        padding: 10,
    },
    center:{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    divider:{
        width: 30,
        height: 5,
        borderRadius: 16,
        backgroundColor: '#dedede',
    },
    btnRow:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingHorizontal: 20,
        paddingVertical: 12,
    },
    btnOptionIcon:{
        flex: 0.1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginRight:10
    },
    btnOptionText:{
        flex: 0.9,
        justifyContent: 'flex-start'
    },
    title:{
        marginTop: 3,
        fontFamily: 'NanumGothic-Regular',
        color:'#333',
        fontSize: 16,
    },
    btnOptionRight:{
        flex: 0.2,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    mt:{
        marginTop: 10,
    },
    version:{
        textAlign:'center',
        fontFamily: 'Montserrat-Bold',
        color:'#a9a9a9',
        fontSize: 14,
        marginTop: 15,
    }
})

