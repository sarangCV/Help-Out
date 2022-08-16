import React, { Component } from 'react'
import { StyleSheet, View, SafeAreaView, StatusBar } from 'react-native'
import WebView from 'react-native-webview';
import Header from '../../components/Header'

import LicencesHTML from './Licences';

export default class Licences extends Component {
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar barStyle='dark-content' backgroundColor='rgba(255,255,255,0)' translucent={true} />
                <View style={styles.container}>
                    {/* -------------- HEADERS  -------------- */}
                    <Header navigation={() => this.props.navigation.goBack()} title={'Licences'} isBackBtn={true} />
                        <View style={styles.innerContent}>
                            <WebView
                                originWhitelist={['*']}
                                source={{html:LicencesHTML.htmlContent}}
                                domStorageEnabled={true}
                                allowUniversalAccessFromFileURLs={true}
                                allowFileAccessFromFileURLs={true}
                                mixedContentMode="always"
                                allowFileAccess={true} 
                                injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
                                scalesPageToFit={false}
                                />
                        </View>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        width: '100%',
    },
    innerContent:{
        flex:1,
        // marginTop: 100,
    }
})
