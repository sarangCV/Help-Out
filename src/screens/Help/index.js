import React from 'react'
import { SafeAreaView, StatusBar, View, Text, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Header from '../../components/Header';
import InternetConnection from "../../components/Info/InternetConnection";


const urls = {
    faq: 'https://www.ajnasoft.com/contact.html',
    privacy: 'https://www.ajnasoft.com/privacy-policy.html',
};

const _openUri = uri => {
    Linking.canOpenURL(uri).then(supported => {
        if (supported) {
            Linking.openURL(uri);
        } else {
            console.log("Don't know how to open URI: " + url);
        }
    });
};


export default class Help extends React.Component {

    _handleClick = val => {
        if(val === 'Faq'){
            _openUri(urls.faq);
        }else if(val === 'Contact'){
            this.props.navigation.navigate('Contact')
        }else if(val === 'Privacy'){
            _openUri(urls.privacy);
        }else if(val === 'Licences'){
            this.props.navigation.navigate('Licences')
        }
    };

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar barStyle='dark-content' backgroundColor='rgba(255,255,255,0)' translucent={true} />
                <View style={styles.container}>
                    {/* -------------- HEADERS  -------------- */}
                    <Header navigation={() => this.props.navigation.goBack()} title={'Help'} isBackBtn={true} />
    
                    <View style={styles.innerContent}>
    
                        <TouchableOpacity style={styles.btnLinks} onPress={this._handleClick.bind(this, 'Faq')}>
    
                            <View style={styles.iconLeft}>
                                <Icon name="question" color={'#888'} size={20} />
                            </View>
    
                            <View style={styles.contentLeft}>
                                <Text style={styles.btnLinkText}>FAQ</Text>
                            </View>
    
                        </TouchableOpacity>
    
    
                        <TouchableOpacity style={styles.btnLinks} onPress={this._handleClick.bind(this,'Contact')}>
    
                            <View style={styles.iconLeft}>
                                <Icon name="people" color={'#888'} size={20} />
                            </View>
    
                            <View style={styles.contentLeft}>
                                <Text style={styles.btnLinkText}>Contact Us</Text>
                            </View>
    
                        </TouchableOpacity>
    
    
                        <TouchableOpacity style={styles.btnLinks} onPress={this._handleClick.bind(this,'Privacy')}>
    
                            <View style={styles.iconLeft}>
                                <Icon name="lock" color={'#888'} size={20} />
                            </View>
    
                            <View style={styles.contentLeft}>
                                <Text style={styles.btnLinkText}>Terms &amp; Privacy Policy</Text>
                            </View>
    
                        </TouchableOpacity>
    
                        <TouchableOpacity style={styles.btnLinks} onPress={this._handleClick.bind(this,'Licences')}>
    
                            <View style={styles.iconLeft}>
                                <Icon name="book-open" color={'#888'} size={20} />
                            </View>
    
                            <View style={styles.contentLeft}>
                                <Text style={styles.btnLinkText}>Licences</Text>
                            </View>
    
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
        width: '100%',
        justifyContent: 'flex-start',
        paddingHorizontal: 20,
        // padding: 20,
        // marginTop: 80,
    },
    btnLinks: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingVertical: 25,
    },
    iconLeft: {
        marginRight: 15,
    },
    btnLinkText: {
        color: '#838383',
        fontFamily: 'NanumGothic-Regular',
        fontSize: 18,
        marginTop: 2,
    }
})