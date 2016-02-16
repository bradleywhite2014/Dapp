const Firebase = require('firebase');
const styles = require('./styles.js')

const StatusBar = require('./Components/StatusBar');
const ActionButton = require('./Components/ActionButton');
const ListItem = require('./Components/ListItem');
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  ListView,
  AlertIOS
} from 'react-native';



class Dapp extends Component {
  _renderItem(item) {

  const onPress = () => {
    AlertIOS.alert(
      'Complete',
      null,
      [
        {text: 'Complete', onPress: (text) => this.itemsRef.child(item._key).remove()},
        {text: 'Cancel', onPress: (text) => console.log('Cancel')}
      ],
      'default'
    );
  };

  return (
    <ListItem item={item} onPress={onPress} />
  );
}


  render() {
    return (
      <View style={styles.container}>

        <StatusBar title="Dapp" />

        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)}
          style={styles.listview}/>

        <ActionButton title="Add" onPress={this._addItem.bind(this)} />


      </View>
    );
  }

  constructor(props) {
    super(props);

    this.itemsRef = new Firebase("amber-inferno-1182.firebaseIO.com/items");


    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };
  }

  componentDidMount() {
    this.listenForItems(this.itemsRef);
  }

  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {
      // get children as an array
      var items = [];
      snap.forEach((child) => {
        items.push({
          title: child.val().title,
          _key: child.key()
        });
      });
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      });
    });
  }

  _addItem() {
  AlertIOS.alert(
    'Add New Item',
    null,
    [
      {
        text: 'Add',
        onPress: (text) => {
          this.itemsRef.push({ title: text })
        }
      },
    ],
    'plain-text'
  );
}



}

AppRegistry.registerComponent('Dapp', () => Dapp);
