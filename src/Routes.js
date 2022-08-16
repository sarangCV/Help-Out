/*---------------------------------------------------------------*
 *   @author: Harish Kumar                                       *
 *   @licence: Copyright, All Rights Reserved to Ajnasoft        *
 *   @flow                                                       *
 *---------------------------------------------------------------*/
import React from 'react';
import SignUp from './screens/SignUp';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Splash from './screens/Splash';
import Home from './screens/Home';
import Search from './screens/Search';

import Help from './screens/Help';
import Contact from './screens/Contact';
import Licences from './screens/Licences';

import Profile from './screens/Profile';
import EditProfile from './screens/EditProfile';
import ValidateOtp from './screens/EditProfile/ValidateOtp';

import CreateEvent from './screens/CreateEvent';
import CreateNext from './screens/CreateEvent/CreateNext';

import Feedback from './screens/Feedback';

import EventDetails from './screens/EventDetails';

import SelectType from './screens/SelectType';

import OTP from './screens/OTP';

import Categories from './screens/SelectType/Categories';

import AddAddress from './screens/SelectType/AddAddress';

import LocationSelect from './screens/SelectType/LocationSelect';

import AddLogo from './screens/SelectType/AddLogo';

import Password from './screens/Password';

import OrgDetails from './screens/OrgDetails';

import SavedOrgs from './screens/SavedOrgs'

import ReportedIssues from './screens/ReportedIssues'

import ManageEvents from "./screens/ManageEvents";

import Onboarding from "./screens/Onboarding";

import ListMyEvent from "./screens/ListMyEvent"

import ListMyNgo from "./screens/ListMyNgo"

import Main from "./screens/Main";


export const AuthStack = createStackNavigator({
    SignUp: {
        screen: SignUp,
        navigationOptions: {
            header: null,
        },
    },
    OTP: {
        screen: OTP,
        navigationOptions: {
            header: null
        }
    },
    SelectType: {
        screen: SelectType,
        navigationOptions: {
            header: null,
        },
    },
    Categories: {
        screen: Categories,
        navigationOptions: {
            header: null
        }
    },
    AddAddress: {
        screen: AddAddress,
        navigationOptions: {
            header: null
        }
    },
    LocationSelect: {
        screen: LocationSelect,
        navigationOptions: {
            header: null
        }
    },
    AddLogo: {
        screen: AddLogo,
        navigationOptions: {
            header: null
        }
    },
    Password: {
        screen: Password,
        navigationOptions: {
            header: null
        }
    },
    Onboarding: {
        screen: Onboarding,
        navigationOptions: {
            header: null
        }
    },
});


export const HomeStack = createStackNavigator({
    Main: {
        screen: Main,
        navigationOptions: {
            header:null,
        },
    },
    Home: {
        screen: Home,
        navigationOptions: {
            header: null,
        },
    },
    CreateEvent: {
        screen: CreateEvent,
        navigationOptions: {
            header: null,
        },
    },
    CreateNext: {
        screen: CreateNext,
        navigationOptions: {
            header: null,
        },
    },
    Search: {
        screen: Search,
        navigationOptions: {
            header: null,
        },
    },
    OrgDetails: {
        screen: OrgDetails,
        navigationOptions:{
            header: null
        }
    },
    EventDetails:{
        screen: EventDetails,
        navigationOptions: {
            header: null,
        },
    },
    Profile: {
        screen: Profile,
        navigationOptions: {
            header: null,
        },
    },
    EditProfile: {
        screen: EditProfile,
        navigationOptions: {
            header: null
        },
    },
    Help:{
        screen: Help,
        navigationOptions: {
            header: null
        },
    },
    Licences:{
        screen: Licences,
        navigationOptions: {
            header: null
        },
    },
    // BlockedUsers:{
    //     screen: BlockedUsers,
    //     navigationOptions:{
    //         header: null,
    //     }
    // },
    ValidateOtp: {
        screen: ValidateOtp,
        navigationOptions:{
            header:null
        },
    },
    Feedback: {
        screen: Feedback,
        navigationOptions: {
            header: null
        }
    },
    Contact:{
        screen: Contact,
        navigationOptions: {
            header: null
        },
    },
    ReportedIssues: {
        screen: ReportedIssues,
        navigationOptions: {
            header: null,
        }
    },
    SavedOrgs: {
        screen: SavedOrgs,
        navigationOptions: {
            header: null,
        }
    },
    ManageEvents: {
        screen: ManageEvents,
        navigationOptions: {
            header: null,
        }
    },
    ListMyNgo: {
        screen: ListMyNgo,
        navigationOptions: {
            header: null,
        }
    },
    ListMyEvent: {
        screen: ListMyEvent,
        navigationOptions: {
            header: null,
        }
    }
});


/*---------------------------------------------------------------*
 *        createSwitchNavigator TO LOAD DEFAULT PAGE             *
 *---------------------------------------------------------------*/

export const Routes = createAppContainer(
    createSwitchNavigator(
        {
            AuthLoading: Splash,
            Auth: AuthStack,
            App: HomeStack,
        },
        {
            initialRouteName: 'AuthLoading',
        },
    ),
);

export default Routes;
