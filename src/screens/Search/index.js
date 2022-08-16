/*---------------------------------------------------------------*
 *   Author: Harish                                              *
 *   Licence: Copyright, All Rights Reserved to Ajnasoft         *
 *---------------------------------------------------------------*/

//React
import React, {Component} from 'react';

//React Native
import {
    View,
    ScrollView,
    Animated,
    Dimensions, SafeAreaView, TouchableOpacity,
    Text,
    Modal,
    TouchableWithoutFeedback,
    StatusBar
} from 'react-native';

//Icons
import Icon from 'react-native-vector-icons/Ionicons';

//Libraries
import Geolocation from "react-native-geolocation-service";
import {CircleFade} from "react-native-animated-spinkit";
import {debounce} from "lodash";
import DropDownPicker from 'react-native-dropdown-picker';


//Components
import Header from './Header';
import InternetConnection from "../../components/Info/InternetConnection";
import NoResults from "./NoResults";
import Filters from "./Filters";
import SearchCard from "./SearchCard";

//Apis
import {getOrganisations, fetchInterests} from '../../api/utils'

//AsyncStorage
import {getToken} from "../../asy-store";

//Styles
import styles from './styles';


const height = Dimensions.get('window').height;

export default class Search extends Component {

    constructor() {
        super();
        this.state = {
            authToken: null,
            categories: null,
            data: null,
            modal: new Animated.Value(height + 50),
            searchResults: null,
            selectedId: null,
            coordinate: null,
            loading: true,
            isFilter: false,
            filteredCat: null
        }
        this._handleInputThrottled = debounce(this._handleSearch, 500)
    }


    componentDidMount() {
        //Get Categories
        fetchInterests().then(res => {
            if (res.success) {


                let filteredCat = [{ label: 'All Categories', value: null }]
                res.data.map((v, i) => {
                   filteredCat = [...filteredCat, { label: v.interestTitle, value: i }]
                })

                this.setState({categories: res.data, filteredCat})

                console.log("Filtered category is:::------------------::",this.state.filteredCat)


            } else {
                alert(res.message)
            }
        });

        //Get Current Location
        this._getCurrentLocation();

        //Get AuthToken
        getToken('authToken').then(val => {
            this.setState({authToken: JSON.parse(val)}, () => this._getOrganisationList())
        })

    }

    /* --------------------------------------------- *
     *              Get Organisations                *
     * --------------------------------------------- */

    _getOrganisationList = () => {
        let data = {
            requestNumber: 1,
            categoryId: null,
            searchInput: null,
            isCertAsc: false,
            coordinate: this.state.coordinate,
        };
        this.setState({loading: true})
        getOrganisations(this.state.authToken, data).then(res => {
            // console.log(res)
            this.setState({loading: false})
            if (res.success) {
                this.setState({data: res.data})
            } else {
                alert(res.message)
            }
        });
    }

    /* --------------------------------------------- *
     *            Toggle Filter Modal                *
     * --------------------------------------------- */

    _toggleModal = bool => {
        Animated.spring(this.state.modal, {
            toValue: bool ? 0 : height + 50,
            tension: 0.8,
            friction: 5.5,
            useNativeDriver: true,
        }).start();
    };

    /* --------------------------------------------- *
     *            Sort by Category                   *
     * --------------------------------------------- */

    _handleSearch = text => {
        let t = text.toLowerCase();
        const {selectedId, authToken} = this.state;
        let data = {
            requestNumber: 1,
            categoryId: selectedId,
            searchInput: t,
            isCertAsc: false,
            coordinate: this.state.coordinate,
        };
        // console.log(data)
        this.setState({data: null, loading: true});
        getOrganisations(authToken, data).then(res => {
            this.setState({loading: false})
            if (res.success) {
                // console.log(res);
                this.setState({data: res.data})
            } else {
                alert(res.message);
            }
        });
    };

    /* --------------------------------------------- *
     *            Sort by Category                   *
     * --------------------------------------------- */
    selectCategory = (cat) => {
        this.setState({selectedId: cat});
        console.log("selected filter ID :: -------:: ", cat)
    };

    _filterCategory = cat => {
        // console.log('filter category is running..')
        let data = {
            requestNumber: 1,
            categoryId: this.state.selectedId,
            searchInput: null,
            isCertAsc: false,
            coordinate: this.state.coordinate,
        };
        this.setState({data: null, loading: true});
        getOrganisations(this.state.authToken, data).then(res => {
            this.setState({loading: false})
            // console.log(res);
            if (res.success) {
                this.setState({data: res.data})
            } else {
                alert(res.message);
            }
        });
        this.selectCategory(data.categoryId);
    };

    /* --------------------------------------------- *
     *            Get Current Location               *
     * --------------------------------------------- */

    _getCurrentLocation = async () => {
        await Geolocation.getCurrentPosition(
            (position) => {
                // console.log(position);
                this.setState({
                    coordinate: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    }
                })
            }, (error) => {
                console.log('Unable to find your location, please check your location Settings.')
            },
            {showLocationDialog: true, enableHighAccuracy: false}
        );
    };


    /* --------------------------------------------- *
     *            On SortOptions Checked             *
     * --------------------------------------------- */

    _handleSort = text => {
        this.setState({text})
    };

    /* --------------------------------------------- *
     *            Sort by Certificates               *
     * --------------------------------------------- */

    _handleSortOptions = () => {
        const {coordinate, authToken} = this.state;
        this.setState({data: null, loading: true});
        getOrganisations(authToken, {
            requestNumber: 1,
            categoryId: null,
            searchInput: null,
            isCertAsc: true,
            coordinate: coordinate,
        }).then(res => {
            this.setState({loading: false})
            // console.log(res);
            if (res.success) {
                this.setState({data: res.data})
            } else {
                alert(res.message);
            }
        });
        this._toggleModal(false);
    };

    render() {

        const backdrop = {
            transform: [
                {
                    translateY: this.state.modal.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, height],
                        extrapolate: "clamp",
                    }),
                },
            ],
            opacity: this.state.modal.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0],
                extrapolate: "clamp",
            }),
        };

        const {categories, data, selectedId, text, loading, isFilter} = this.state;

        return (
            <SafeAreaView style={styles.container}>
                <Header
                    onChange={this._handleInputThrottled}
                    showOptions={() => this._toggleModal(true)}
                    onPressFilter={() => this.setState({isFilter: !isFilter})}
                    filterColor={isFilter ? 'black' : '#a6a6a6'}/>
                {loading ? (
                    <View style={{flex: 1, paddingTop: 10, alignItems: "center", justifyContent: "center",}}>
                        <CircleFade size={48} color="#514fe1"/>
                        {/*<Text> Loading...</Text>*/}
                    </View>
                ) : (
                    <>
                        <View style={styles.contView}>
                            <ScrollView
                                showsVerticalScrollIndicator={false}>
                                <View style={styles.body}>
                                    {data && data.length ? data.map((item, i) => (
                                            <SearchCard
                                                key={i}
                                                orgImage={item.orgImage}
                                                orgName={item.orgName}
                                                navigate={() => this.props.navigation.navigate('OrgDetails', {
                                                    orgId: item.orgId,
                                                    authToken: this.state.authToken
                                                })}
                                            />
                                        ))
                                        : <NoResults/>}
                                </View>
                            </ScrollView>
                        </View>
                    </>
                )}

                {/* Filter pop-up */}
                <Modal
                    animationType="none"
                    transparent={true}
                    visible={isFilter}
                    onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    }}
                >   
                    <View style={styles.filterOverlay}>
                        <View style={ styles.filterOverlayContent }>
                            <View style={styles.filterHeader}>
                                <Text style={ styles.filterText }>Select a category</Text>
                            </View>
                            <View style={styles.filterContent}>
                                <View style={styles.filterContentInner}>
                                        <Filters
                                            categories={categories}
                                            selectedId={selectedId}
                                            select={this.selectCategory}
                                            // filterCategory={this._filterCategory}
                                        />
                                </View>
                            </View>
                            <View style={styles.filterFooter}>
                                {/* <View style={styles.filterButtonView}> */}
                                    <TouchableOpacity
                                    style={[styles.filterOverlayButton, {backgroundColor: '#fff'}]}
                                    onPress={()=>{this._filterCategory(), this.setState({isFilter: !isFilter})}}
                                    >
                                        <Text style={[ styles.filterButtonText, {color: '#3b52d4'} ]}>Apply</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                    style={[styles.filterOverlayButton, {marginRight: 0, marginLeft: 0, backgroundColor: '#3b52d4'}]}
                                    onPress={() => {
                                        this.setState({isFilter: !isFilter});
                                    }}
                                    >
                                        <Text style={[ styles.filterButtonText, {color: '#fff'} ]}>Cancel</Text>
                                    </TouchableOpacity>
                                {/* </View> */}
                            </View>
                        </View>
                    </View>
                </Modal>
                {/* Filter pop-up */}

                {/*------ Filter Options  -------*/}
                <Animated.View style={[styles.modalOverlay, backdrop]}
                               onStartShouldSetResponder={() => this._toggleModal(false)}>
                    <Animated.View style={[styles.modal, {transform: [{translateY: this.state.modal}]}]}>

                        <TouchableOpacity style={styles.btnDefault} onPress={() => this._handleSort('org')}>
                            <Text style={styles.btnDefaultText}>Show Certified Organisations</Text>
                            {text === 'org' && <Icon name="ios-checkmark-circle-outline" color={'#4CAF50'} size={25}/>}
                        </TouchableOpacity>

                        <View style={styles.buttonCenter}>
                            <TouchableOpacity style={styles.defCenter} onPress={this._handleSortOptions}>
                                <Text style={styles.defCenterTxt}>Apply</Text>
                            </TouchableOpacity>
                        </View>

                    </Animated.View>
                </Animated.View>
                {/*------ Filter Options  ------*/}

                <InternetConnection/>

            </SafeAreaView>
        );
    }
}

