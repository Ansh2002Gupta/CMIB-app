/**
 * @format
 */
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';

import AppRenderer from './src';

AppRegistry.registerComponent(appName, () => AppRenderer);
