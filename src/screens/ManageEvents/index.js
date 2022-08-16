import React from "react";
import {
    View,
    FlatList,
    ActivityIndicator,
    Text,
    SafeAreaView,
    StyleSheet, ToastAndroid
} from "react-native";

import Header from "../../components/Header";

import Card from "./Components/Card";
import InternetConnection from "../../components/Info/InternetConnection";
import {getEvents, deleteEvent} from "../../api/utils";
import {CircleFade} from "react-native-animated-spinkit";

// const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInRva2VuIjoibnJpaXNhYk9zU0I1Q1BlcHUwSkRDQk5LTWlFazBnZ1dvYUU3UVVTMmFqRVR2OGN0SDQiLCJpYXQiOjE1OTQyOTAxMzcsImV4cCI6MTU5NTE1NDEzN30.rk6G09Uie6QBPAUD5zRS4KiBcCXjJzIyo5G7t5vjwCw";

const ManageEvents = ({navigation}) => {
    const [loading, setLoading] = React.useState(false);
    const [refreshing, setRefreshing] = React.useState(false);
    const [data, setData] = React.useState();
    const [authToken, setAuthToken] = React.useState();
    const [requestNumber, setRequestNumber] = React.useState(1);
    const [allPostsLoaded, setAllPostsLoaded] = React.useState(false)
    const [imageBaseUrl, setImageBaseUrl] = React.useState();
    // const [onEndReachedCalledDuringMomentum, setOnEndReachedCalledDuringMomentum] = React.useState()


    React.useEffect(() => {
        const {authToken} = navigation.state.params;
        setAuthToken(authToken)
        let isSubscribed = true
        if (isSubscribed) _loadPosts(authToken, requestNumber)
        return () => isSubscribed = false
    }, []);


    /* --------------------------------------------------------------- *
     *              ON SCROLL DOWN LOAD MORE DATA                      *
     * --------------------------------------------------------------- */

    const _handleLoadMore = () => {
        if (!allPostsLoaded) {
            let reqNumber  = requestNumber + 1;
            setRequestNumber(reqNumber)
            setRefreshing(true)
            _loadPosts(authToken, reqNumber);
        }
    };


    /*---------------------------------------------------------------*
     *               FUNCTION TO LOAD POSTS                          *
     *---------------------------------------------------------------*/
    const _loadPosts = (token, num) => {
        requestNumber === 1 ? setLoading(true) : setLoading(false)
        getEvents(token, {requestNumber: num}).then(res => {
            setLoading(false)
            console.log(res);
            setRefreshing(false)
            if (res.success) {
                // let oldData = []
                setImageBaseUrl(res.imageBaseUrl)
                if (res.data.length) setData(requestNumber === 1 ? res.data : [...data, ...res.data])
                else setAllPostsLoaded(res.data.length === 0)
            } else {
                // alert(res.message)
                _showToast(res.message)
            }
        })
    }

    /*----------------------------------------------------*
     *               DELETE POST                          *
     *----------------------------------------------------*/

    const _deleteEvent = id => {
        setLoading(true)
        deleteEvent(authToken, {postId: id}).then(res => {
            setLoading(false)
            setRefreshing(false)
            console.log(res);
            if (res.success){
                // alert(res.message)
                _showToast(res.message)
                _loadPosts(authToken, 1).then(()=> setLoading(false))
            }else {
                _showToast(res.message)
                // alert(res.message)
            }
        })
    }

    const _showToast = (title) => {
        ToastAndroid.showWithGravityAndOffset(
            title,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
        );
    };

    const _renderFooter = () => {
        return (
            <View
                style={{
                    paddingVertical: 20,
                    borderTopWidth: 1,
                    borderColor: "#CED0CE",
                }}
            >
                <ActivityIndicator animating size="large"/>
            </View>
        );
    };




    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.container}>
                {/* -------------- HEADERS  -------------- */}
                <Header isBackBtn={true} navigation={() => navigation.goBack()} title={'Manage Events'}/>

                {loading ? (
                    <View
                        style={{
                            flex: 1,
                            paddingTop: 10,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <CircleFade size={48} color="#514fe1"/>
                        {/*<Text> Loading...</Text>*/}
                    </View>
                ) : (
                    <View style={styles.innerCont}>
                        {data && data.length > 0 ?
                            <FlatList
                                style={styles.flatList}
                                data={data}

                                showsVerticalScrollIndicator={false}
                                renderItem={({item}) => (
                                    <Card
                                        eventsId={item.postID}
                                        image={imageBaseUrl +item.postImages[0]}
                                        date={item.postedAt}
                                        details={item.postDetails}
                                        likeCount={item.likeCount}
                                        delete={_deleteEvent}
                                    />
                                )}
                                keyExtractor={(item, index) => (item.postID + index).toString()}
                                ListFooterComponent={refreshing && _renderFooter}
                                refreshing={refreshing}
                                onEndReached= { ({ distanceFromEnd }) => distanceFromEnd >= 0 && _handleLoadMore }
                                onEndReachedThreshold={0.5}
                                // onMomentumScrollBegin={() => setOnEndReachedCalledDuringMomentum(false)}
                            />
                            : <View style={styles.center}>
                                <Text style={styles.centerTxt}>No Data Found</Text>
                            </View>}
                    </View>
                )}
                <InternetConnection/>
            </View>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        // alignItems: "center",
        // padding: 10,
    },
    flatList: {
        flex: 1,
        width: '100%',
    },
    innerCont: {
        flex: 1,
        paddingTop: 15,
        paddingHorizontal: 15,
    },
    center: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
    },
    centerTxt: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 22,
        color: '#1c1c1c',
    }
});
export default ManageEvents;
