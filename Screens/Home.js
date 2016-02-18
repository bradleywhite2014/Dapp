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



class Home extends Component {

  render() {
    return (
      <View style={styles.flexColumnContainer}>

          <StatusBar title="Dapp" />
          <Text style={styles.text}>
             Email
          </Text>
          <TextInput
            style={styles.textBox}
            onChangeText={(text) => this.updateUser({text})}
          />
          <Text style={styles.text}  >
             Password
          </Text>
          <TextInput
            style={styles.textBox}
            secureTextEntry={true}
            onChangeText={(text) => this.updatePassword({text})}
          />

            <ActionButton title="Login" onPress={this.doLogin.bind(this)}/>
      </View>
    );
  }

  constructor(props) {
    super(props);


    this.authRef = new Firebase("amber-inferno-1182.firebaseIO.com");
    this.currentUser = "";
    this.currentPassword = "";


    this.state = {
    };
    this.navigator = this.props.navigator;
  }

  doLogin(){
    var self = this;
      this.authRef.authWithPassword({
        email    : this.currentUser.text,
        password : this.currentPassword.text
      }, function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);

        self.navigator.replace({id: 'interestScreen', authData: authData});
      }
    });
  }

  createUser(){
    this.authRef.createUser({
      email    : this.currentUser.text,
      password : this.currentPassword.text
    }, function(error, userData) {
      if (error) {
        console.log("Error creating user:", error);
      } else {
        console.log("Successfully created user account with uid:", userData.uid);
      }
    });
  }

  updateUser(text){
    this.currentUser = text
  }

  updatePassword(text){
    this.currentPassword = text
  }

  componentDidMount() {
    var authData = this.authRef.getAuth();
    if (authData) {
      console.log("User " + authData.uid + " is logged in with " + authData.provider);
      //navigate to welcome screen
    } else {
      console.log("User is logged out");
      //navigate to login screen
    }
    this.state = {
      authorizedUser: authData
    };
  }


}

module.exports = Home;
