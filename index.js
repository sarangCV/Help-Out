import {AppRegistry} from 'react-native';
import 'react-native-gesture-handler';
import Route from './src/Routes';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Route);
