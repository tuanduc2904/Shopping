import React, { Component } from 'react'
import { Text, View, ActivityIndicator, StyleSheet } from 'react-native'

export default class Loading extends Component {
    render() {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size="large" color="red" />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    loading: {
        flex: 1,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
    }
})