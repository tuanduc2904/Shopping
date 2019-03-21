import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import ButtonComponent from '../../Common/ButtonComponent/ButtonComponent';
import TextComponent from '../../Common/TextComponent/TextComponent'

export default class SkipedLogin extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Bạn chưa đăng nhâp, quay trở lại màn hình đăng nhập</Text>
                <ButtonComponent
                    text='Đăng nhập'
                    onPress={() => {
                        this.props.navigation.goBack();
                    }}
                />

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});

