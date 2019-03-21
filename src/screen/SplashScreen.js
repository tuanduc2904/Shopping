/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, StatusBar, Button, ImageBackground } from 'react-native';
import { Dimens } from '../assets/Dimens';
import { Icon } from "native-base";
import { colors } from "../assets/color";
import AutoTypingText from 'react-native-auto-typing-text';
import { connect } from 'react-redux'
import { NavigationActions, StackActions } from 'react-navigation';

class SplashScreen extends Component {


    componentDidMount() {
        setTimeout(() => {
            this.navigateScreen('Login')
        }, 3000);


    }

    navigateScreen = (screen) => {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: screen })
            ]
        });
        this.props.navigation.dispatch(resetAction);
    }


    render() {
        return (
            <View>
                <ImageBackground
                    source={require('../assets/images/background-main.png')}
                    style={styles.bg}>
                    <View style={{ marginTop: Dimens.screen.height / 2.5 }}>
                        <View style={{ alignItems: 'center' }}>
                            <Icon name='shopping-bag' type='FontAwesome5'
                                style={{ fontSize: 100, color: colors.red }} /></View>
                        <View>
                            <AutoTypingText
                                text={`Shopping`}
                                charMovingTime={80}
                                delay={0}
                                style={{
                                    alignItems: 'center',
                                    width: '100%',
                                    fontSize: 30,
                                    color: colors.black,
                                    top: 10,

                                }}
                                onComplete={() => {
                                    console.log('done');
                                }} />
                        </View>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

// export default SplashScreen;


function mapStateToProp(state) {
    return {
        Auth: state.Auth,
    }
}

export default connect(mapStateToProp)(SplashScreen)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bg: {
        width: Dimens.screen.width,
        height: Dimens.screen.height,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
