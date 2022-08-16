/**
 * @flow
 */
import React from 'react';

import {BackHandler, SafeAreaView} from 'react-native';
import FloatNav from "../../components/FloatNav";

import Home from "../Home";
import Search from "../Search";
import ListMyEvent from "../ListMyEvent"

import _ from 'lodash';


const screens = ["home", "event", "search"];

export default class Main extends React.Component {

   state = {
       pageIndex: [0],
       activeScreen: screens[0],
    }

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            if (this.state.pageIndex.length > 1) {
                console.log(this.state.pageIndex);
                let newState = [...this.state.pageIndex];
                newState.splice(-1, 1)
                let elem = newState[newState.length - 1]
                this.setState({pageIndex: newState, activeScreen: screens[elem]})
                return true;
            }
            BackHandler.exitApp();
            return false;
        });
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }


    _changeScreen = (val) => {
        let index = screens.indexOf(val)
        let newState = _.union(this.state.pageIndex, [index]);
        // console.log(newState)
        this.setState({pageIndex: [...newState]})
        this.setState({activeScreen: screens[index]})
    }

    _renderScreen = () => {
        switch (this.state.activeScreen) {
            case 'home':
                return <Home navigation={this.props.navigation}/>
            case 'event':
                return <ListMyEvent navigation={this.props.navigation}/>
            case 'search':
                return <Search navigation={this.props.navigation}/>
            default:
                return <Home navigation={this.props.navigation}/>
        }
    }


    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                {this._renderScreen()}
                <FloatNav navScreen={val => this._changeScreen(val)} activeScreen={this.state.activeScreen}/>
            </SafeAreaView>
        );
    }

}

// export default Main;
