/*---------------------------------------------------------------*
 *   @author: Prashant Gaurav                                    *
 *   @licence: Copyright, All Rights Reserved to Ajnasoft        *
 *   @flow                                                       *
 *---------------------------------------------------------------*/
import React, {Component} from 'react';
import {StyleSheet, Text, View, StatusBar, TouchableOpacity, ScrollView, ImageBackground} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ResultCard from './ResultCard'
import InternetConnection from './../../components/Info/InternetConnection'
import NoSearchResult from "../../components/Info/NoSearchResult";
import SearchCard from "./SearchCard";

export default class SearchResult extends Component {
    state = {
        searchResult: null,
        searchText:null,
        authToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YThlOTFmMy0yN2ZkLTRhZTItYmU3ZS02MGYyNTU3NmM5M2EiLCJ0b2tlbiI6InhZc0pkbzBoZ2xST0J2QThsNW9KSHpaS1NNTjJkYUlvWU5WeDY4S1dhazBpcm1aM2lJSElISHdCMDh6aTk2YjI4VldlYVNVamxOWnRHdEhIekd1U3FXT3I4bTdacTdvMTVUa2UiLCJpYXQiOjE1NzM2MjkyODEsImV4cCI6MTU3NDQ5MzI4MX0.Xj_0AHOCQgug5xzhuDNugfWdpB8FNQQ-Soyy8YnDbA0',
    }




    async UNSAFE_componentWillMount() {
        const data = this.props.navigation.state.params
        if (data) {
            this.setState({
                searchResult: data.searchSuggestion,
                searchText:data.searchText
            })
        } else {
            alert('no data from navigation')
        }
    }




    /*---------------------------------------------------------------*
     *               BACK TO SEARCH PAGE                             *
     *---------------------------------------------------------------*/
    _backToSearch = () => {

this.props.navigation.goBack()
    }


    /*---------------------------------------------------------------*
     *               SHOW POST DETAILS                               *
     *---------------------------------------------------------------*/
    _showSelectedPost = (postId: string) => {

    }

    render() {
        const {searchText,  searchResult} = this.state;
        console.log(searchResult)
        return (
            <View style={styles.container}>
                <StatusBar barStyle='dark-content' backgroundColor='rgba(255,255,255,0)' translucent={true}/>
                <View style={[styles.searchBox]}>
                        <TouchableOpacity style={[styles.inputBox,{flex: 1, justifyContent: 'flex-start'}]} onPress={this._backToSearch}>
                        <Ionicons name={'md-arrow-back'} color={'#f84964'} size={30}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.inputBox,{flex: 9,backgroundColor: '#c7c7c7'}]} onPress={this._backToSearch}>
                        <Text style={styles.searchText}>{searchText}</Text>
                        <TouchableOpacity disabled={!searchText} style={{paddingRight: 10}} onPress={this._clearSearchText}>
                            <Ionicons name={'ios-search'} color={'#fff'} size={23}/>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </View>
                {/* ---------------------------------- SEARCH SUGGESTION ---------------------------------- */}
                <ScrollView style={{backgroundColor: '#fff', marginTop: 8}}>
                    {searchResult ? searchResult.map((data, i) => (
                        <TouchableOpacity style={{paddingRight: 20, paddingLeft: 20,paddingTop:10}} key={i} onPress={() => (this._showSelectedPost.bind(this))(data.postID)}>
                            <ResultCard details={data.postDetails} posted_at={data.postedAt}/>
                        </TouchableOpacity>
                    )) : null}
                </ScrollView>
                <InternetConnection/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4'
    },
    searchBox: {
        paddingTop: 50,
        paddingRight: 20,
        paddingLeft: 20,
        height: 100,
        width: '100%',
        backgroundColor: '#fff',
        flexDirection: 'row'
    },
    inputBox: {
        maxHeight: 40,
        minHeight: 39,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.4,
        borderColor: '#eeeef0',
        borderRadius: 5,
        marginBottom: 10
    },
    inputTitle: {
        padding: 10,
        fontSize: 16,
        fontFamily: 'Montserrat-Regular',
    },
    searchText: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        color: '#fff',
        fontSize: 16,
        fontWeight: '100',
        fontFamily: 'Montserrat-Regular',
    },
});
