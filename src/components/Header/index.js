import React from 'react';
import {StatusBar, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';

const Header = props => {
    return (
        <View style={styles.inline}>
            <StatusBar barStyle='dark-content' backgroundColor='rgba(255,255,255,0)' translucent={true}/>
            {props.isBackBtn ? (
                <TouchableOpacity style={styles.back_button} onPress={props.navigation}>
                    <Icon name="chevron-left" size={30} color={'#333'}/>
                </TouchableOpacity>
            ) : null}
            <View style={[styles.page_title, props.spacing && {paddingLeft: 12}]}>
                <Text style={styles.title_style}>{props.title}</Text>
            </View>
            <View style={styles.headerRight}>
                {props.headerRight ? (
                    <TouchableOpacity style={styles.btnHead} onPress={props.onSubmit}>
                        <Text style={styles.btnHeadTxt}>Submit</Text>
                    </TouchableOpacity>
                ) : null}
            </View>
        </View>
    );
};

export default Header;
