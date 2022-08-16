/**
 * @flow
 */
import React  from 'react';
import {View, StatusBar, FlatList, SafeAreaView, ActivityIndicator, Text, ToastAndroid} from 'react-native';
// import _ from 'lodash';
import styles from './styles';
import PostCard from './Components/PostCard';
// import HomeHeaders from './Components/HomeHeaders';
// const height = Dimensions.get('window').height;


import Header from "../../components/Header";

import {getSavedOrgs, deleteOrg} from '../../api/utils'
import InternetConnection from "../../components/Info/InternetConnection";
import {CircleFade} from "react-native-animated-spinkit";

// const token = "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ0MCwiaXNPcmciOmZhbHNlLCJ0b2tlbiI6InpTZ1VramJFa2pEeDFTdXljUlR2QmowMG85djhuTjZadk9leDBXZlA2MVdJbDN5MmxJIiwiaWF0IjoxNTk1NDk0NDEzLCJleHAiOjE1OTgwODY0MTMsImF1ZCI6Imh0dHA6Ly9wcmFzaGFudC53b3JrLyIsImlzcyI6IlByYXNoYW50IEdhdXJhdiIsInN1YiI6InBnZGV2MjVAZ21haWwuY29tIn0.OwPSRwiDMhDHjf1Nk7LBXq_ml3S5FMYZHVSZkQsNvVZHYTxIqcHJHk_UZylH1fBLNbGKMA07M1UIctcv1CXQvAFWKTf9DsBOOP-_6RlfpP6pEaK-fi9_jiMT8KvqgMwFe2NvUHPhmoPiCT2xRShKxD-jEpNdNkAUrLtniix94sk";


export default  SavedOrgs = ({navigation}) => {

    const [orgData, setOrgData] = React.useState()
    const [loading, setLoading] = React.useState(true)
    const {authToken} = navigation.state.params;


    React.useEffect(() => {
        _getSavedOrgs(authToken)
    }, [])

    const _getSavedOrgs = (token) => {
        setLoading(true)
        getSavedOrgs(token).then(res => {
            setLoading(false)
            console.log(res);
            if (res.success) setOrgData(res.data)
            else alert(res.message)
        })
    }


    /*---------------------------------------------------------------*
     *               FUNCTION TO delete Orgs                         *
     *---------------------------------------------------------------*/

    const _deleteOrg = (id) => {
        // alert('hello')
        // console.log(id);
        deleteOrg(authToken, id).then(res => {
            if (res.success){
                _showToast(res.messages)
                _getSavedOrgs(authToken)
            }else {
                alert(res.message)
            }
        })
    };

    const _showToast = (title) => {
        ToastAndroid.showWithGravityAndOffset(
            title,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
        );
    };


    return (

        <SafeAreaView style={{flex: 1, backgroundColor: '#f8f8f8'}}>
            <StatusBar barStyle='dark-content' backgroundColor='rgba(255,255,255,0)' translucent={true}/>
            {/* -------------- HEADERS  -------------- */}
            <Header isBackBtn={true} navigation={() => navigation.goBack()} title={'Saved Organisations'}/>
            {/* -------------- SHOW POSTS    ----------- */}

            {loading ? (
                <View style={{flex: 1, paddingTop: 10, alignItems: "center", justifyContent: "center",}}>
                    <CircleFade size={48} color="#514fe1"/>
                    {/*<Text> Loading...</Text>*/}
                </View>
                ) :  (<View style={styles.container}>
                {orgData && orgData.length > 0 ?
                    <FlatList
                        style={styles.flatList}
                        data={orgData}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item}) => (
                            <PostCard
                                data={item}
                                // sharePost={_sharePost}
                                delete={_deleteOrg}
                            />
                        )}
                        keyExtractor={(item, index) => (item.orgId+index).toString()}
                        // ListFooterComponent={_renderFooter}
                    />
                    : <View style={styles.center}>
                        <Text style={styles.centerTxt}>No Data Found</Text>
                    </View>}

            </View> )}

            <InternetConnection />


        </SafeAreaView>

    )


}


