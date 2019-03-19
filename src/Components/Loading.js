import React, { Component } from 'react'
import { Text, View, ActivityIndicator } from 'react-native'

export default class Loading extends Component {
    render() {
        return (
            <View>
                <ActivityIndicator size="large" color="red" />
            </View>
        )
    }
}
