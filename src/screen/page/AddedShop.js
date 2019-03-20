import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
class AddedShop extends Component {
  render() {
    return (
      <View>
        <Text> Đã có shop page/addedShop </Text>
      </View>
    )
  }
}
export default connect()(AddedShop);