/* ------------------------------ *
 *   Author: Prashant Gaurav      *
 * ------------------------------ */
//React
import React from "react";
//React Native
import {ScrollView, StyleSheet, View,} from "react-native";
//Libraries
import {NavigationEvents} from 'react-navigation';
import {CircleFade} from 'react-native-animated-spinkit';
//Components
import Headers from "../../components/Events/Headers";
import Featured from "../../components/Events/Featured";
import Upcoming from "../../components/Events/Upcoming";
import InternetConnection from "../../components/Info/InternetConnection";

//Api
import {getEvents} from "../../api/events";
import {getEventTypes} from "../../api/utils";

//AsyncStorage
import {getToken} from '../../asy-store';


const Home = ({navigation}) => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [imageBaseUrl, setImageBaseUrl] = React.useState();
    const [featuredEvents, setFeaturedEvents] = React.useState();
    const [upcomingEvents, setUpcomingEvents] = React.useState();
    const [authToken, setAuthToken] = React.useState();
    const [userData, setUserData] = React.useState();
    const [cityId, setCityId] = React.useState();
    const [count, setCount] = React.useState(1);
    const [eventTypes, setEventTypes] = React.useState();


    React.useEffect(() => {
        let isSubscribed = true;
        if (isSubscribed) {
            getToken('userData').then(res => {
                console.log(res)
                setUserData(JSON.parse(res));
            })
            getToken('authToken').then(res => {
                // console.log(res)
                const authToken = JSON.parse(res);
                getToken('userCity').then(res => {
                    const resp = JSON.parse(res)
                    setAuthToken(authToken)
                    if (res) {
                        setCityId(resp.id)
                    }
                    //Get all events
                    getAllEvents(authToken, 1558 || resp.id)

                    //Get event types
                    getEventTypes(authToken).then(res => {
                        console.log(res)
                        if (res.success) setEventTypes(res.data);
                    })
                })
            });
        }
        return () => isSubscribed = false;
    }, [])


    /* ------------------------------------- *
     *           Get All Events              *
     * ------------------------------------- */

    const getAllEvents = (token, city) => {
        {
            count === 1 && setIsLoading(true)
        }
        getEvents(token, 1, city).then(
            (d) => {
                {
                    count === 1 && setIsLoading(false)
                }
                console.log(d)
                if (d.success) {
                    setImageBaseUrl(d.imageBaseUrl);
                    setFeaturedEvents(d.fetured);
                    setUpcomingEvents(d);
                    setCount(count + 1);
                }
            },
            (error) => {
                console.log(error);
            }
        );
    };

    return (
        <React.Fragment>
            <View style={styles.container}>
                <Headers onPress={() => navigation.navigate('Profile')}/>
                {isLoading ? (
                    <View style={styles.loadingCenter}>
                        <CircleFade size={48} color="#514fe1"/>
                    </View>
                ) : (
                    <View style={styles.innerContent}>
                        {upcomingEvents ? (
                            <ScrollView
                                showsVerticalScrollIndicator={false}>

                                {/*--------------Featured Events-----------------*/}
                                {featuredEvents && featuredEvents.map((item, i) => (
                                    <Featured
                                        eventsId={featuredEvents.eventsId}
                                        title={"Events"}
                                        imageUrl={imageBaseUrl}
                                        image={item.images}
                                        navigate={() => {
                                            navigation.navigate('EventDetails', {
                                                eventsId: featuredEvents.eventsId,
                                                authToken: authToken
                                            })
                                        }}
                                    />
                                ))}

                                {/*--------------Upcoming Events // NGO -----------------*/}
                                {/*{upcomingEvents && (*/}
                                {/*    <Upcoming*/}
                                {/*        data={upcomingEvents.ngo}*/}
                                {/*        title={eventTypes && eventTypes.length && eventTypes[0].title}*/}
                                {/*        imageUrl={imageBaseUrl}*/}
                                {/*        navigate={(id, cat) => {*/}
                                {/*            navigation.navigate('EventDetails', {*/}
                                {/*                postId: id,*/}
                                {/*                category: cat,*/}
                                {/*                authToken: authToken*/}
                                {/*            })*/}
                                {/*        }}*/}
                                {/*    />*/}
                                {/*)}*/}

                                {/*--------------Upcoming Events // Volunteer -----------------*/}
                                {upcomingEvents && (
                                    <Upcoming
                                        data={upcomingEvents.volunteer}
                                        title={eventTypes && eventTypes.length && eventTypes[1].title}
                                        imageUrl={imageBaseUrl}
                                        navigate={(id, cat) => {
                                            navigation.navigate('EventDetails', {
                                                postId: id,
                                                category: cat,
                                                authToken: authToken
                                            })
                                        }}
                                    />
                                )}

                                {/*--------------Upcoming Events // Fundraisers -----------------*/}
                                {upcomingEvents && (
                                    <Upcoming
                                        data={upcomingEvents.fundraisers}
                                        title={eventTypes && eventTypes.length && eventTypes[2].title}
                                        imageUrl={imageBaseUrl}
                                        navigate={(id, cat) => {
                                            navigation.navigate('EventDetails', {
                                                postId: id,
                                                category: cat,
                                                authToken: authToken
                                            })
                                        }}
                                    />
                                )}

                                {/*--------------Upcoming Events // Events -----------------*/}
                                {upcomingEvents && (
                                    <Upcoming
                                        data={upcomingEvents.evants}
                                        title={eventTypes && eventTypes.length && eventTypes[3].title + ' & Initiatives'}
                                        imageUrl={imageBaseUrl}
                                        navigate={(id, cat) => {
                                            navigation.navigate('EventDetails', {
                                                postId: id,
                                                category: cat,
                                                authToken: authToken
                                            })
                                        }}
                                    />
                                )}

                                <View style={styles.space}/>
                            </ScrollView>
                        ) : null}
                    </View>)}

                <NavigationEvents
                    onDidFocus={() => getAllEvents(authToken, 1558 || cityId)}
                />

                <InternetConnection/>
            </View>

        </React.Fragment>
    )

};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    innerContent: {
        flex: 1,
    },
    space: {
        flex: 1,
        height: 30,
    },
    loadingCenter: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    }
});
export default Home;
