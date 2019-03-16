/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import * as firebase from "react-native-firebase";
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  componentDidMount() {

    this.initialFirebase();
  }

  initialFirebase() {
    firebase.messaging().hasPermission()
        .then(enabled => {
          if (enabled) {
            firebase.messaging().getToken().then(token => {
              console.log("DeviceToken: ", token);
            })
            // user has permissions
          } else {
            firebase.messaging().requestPermission()
                .then(() => {
                  // alert("User Now Has Permission")
                })
                .catch(error => {
                  console.log(error)
                  // alert("Error", error)
                  // User has rejected permissions
                });
          }
        });
    this.notificationListener = firebase.notifications().onNotificationOpened((notification) => {
      // notification.setSound('default')
      this.props.navigation.navigate('AnnouncementCenter');

      // Process your notification as required
      const {
        body,
        data,
        notificationId,
        sound,
        subtitle,
        title
      } = notification;
      console.log("LOG: ", title, body, JSON.stringify(data))
    });
  }

  componentWillUnmount() {
    this.notificationListener();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
