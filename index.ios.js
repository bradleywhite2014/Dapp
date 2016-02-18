const Firebase = require('firebase');
const styles = require('./styles.js')

const StatusBar = require('./Components/StatusBar');
const ActionButton = require('./Components/ActionButton');
const ListItem = require('./Components/ListItem');
var Home = require('./Screens/Home');
var InterestScreen = require('./Screens/InterestScreen');


'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  ListView,
  AlertIOS,
  TextInput,
  Navigator
} from 'react-native';



class Dapp extends Component {


  renderScene(route, nav) {
    switch (route.id) {
      case 'authenticate':
        return <Home navigator={nav} />;
      case 'interestScreen':
        return <InterestScreen navigator={nav} />;
      default:
        return <View />;
    }
  }

  render(){

    return (
      <Navigator
        initialRoute={{ id: 'authenticate', }}
        renderScene={this.renderScene}
        configureScene={(route) => {
          if (route.sceneConfig) {
            return route.sceneConfig;
          }

          return Navigator.SceneConfigs.FloatFromRight;
        }} />
    );
}


}

AppRegistry.registerComponent('Dapp', () => Dapp);
