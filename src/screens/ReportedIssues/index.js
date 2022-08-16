/**
 * @flow
 */
import React  from 'react';
import {View, StatusBar, FlatList, SafeAreaView, ActivityIndicator, Share,  Text} from 'react-native';
// import _ from 'lodash';
import styles from './styles';
import PostCard from './Components/PostCard';
// import HomeHeaders from './Components/HomeHeaders';
// const height = Dimensions.get('window').height;


import Header from "../../components/Header";

import {getSupportIssues} from '../../api/utils'
import InternetConnection from "../../components/Info/InternetConnection";
import {CircleFade} from "react-native-animated-spinkit";

// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsInRva2VuIjoiUkhkRGNEbGpORFZsVTI1SVdWWlhhRXQ0VjFWcU1ubG1NMW8xUWxCR1pHUnlhemh6VHpKYVNVYzFORUptY1UxSWMxYz0iLCJpYXQiOjE1OTQwMzIzNTAsImV4cCI6MTU5NDg5NjM1MH0.h7Blb92qQKs9KT2i-SR0N93jRhl-qh9vY3uE2sPO1c0";


export default  ReportedIssues = ({navigation}) => {

    const [data, setData] = React.useState()
    const [loading, setLoading] = React.useState()



    React.useEffect(() => {
        const {authToken} = navigation.state.params;
        setLoading(true)
        getSupportIssues(authToken).then(res => {
            setLoading(false)
            // console.log(res);
            if (res.success) setData(res.supportData)
            else alert(res.message)
        })
    }, [])


    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#eaeaea'}}>
            <StatusBar barStyle='dark-content' backgroundColor='rgba(255,255,255,0)' translucent={true}/>
            {/* -------------- HEADERS  -------------- */}
            <Header isBackBtn={true} navigation={() => navigation.goBack()} title={'Reported Issues'}/>
            {/* -------------- SHOW POSTS    ----------- */}

            {loading ? (
            <View style={{flex: 1, paddingTop: 10, alignItems: "center", justifyContent: "center",}}>
                <CircleFade size={48} color="#514fe1"/>
                <Text> Loading...</Text>
            </View>
            ) : (
            <View style={styles.container}>

                {data && data.length ?
                    <FlatList
                        style={styles.flatList}
                        data={data}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item}) => (
                            <PostCard
                                data={item}
                                // sharePost={_sharePost}
                            />
                        )}
                        keyExtractor={(item, index) => (item.orgId+index).toString()}
                        // ListFooterComponent={_renderFooter}
                    />
                    : <View style={styles.center}>
                        <Text style={styles.centerTxt}>No Data Found</Text>
                    </View>}

            </View>)}

            <InternetConnection />

        </SafeAreaView>

    )


}


