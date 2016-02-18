const Firebase = require('firebase');
const styles = require('../styles.js')

const StatusBar = require('../Components/StatusBar');
const ActionButton = require('../Components/ActionButton');
const ListItem = require('../Components/ListItem');
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  ListView,
  AlertIOS,
  TextInput
} from 'react-native';

class InterestScreen extends Component {

  render() {
    return (
      <View style={styles.flexColumnContainer}>

          <StatusBar title="Dapp" />
          <Text style={styles.text}>
             Welcome! Lets figure out what apps you would like to demo!
          </Text>


            <ActionButton title="Next" onPress={this.pickAnApp.bind(this)}/>
      </View>
    );
  }


  pickAnApp(){

  }


}

module.exports = InterestScreen;
