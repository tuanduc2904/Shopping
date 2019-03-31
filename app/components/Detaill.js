import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
export  class Detaill extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    );
  }
}
export default Detaill