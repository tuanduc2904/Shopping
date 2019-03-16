/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, StatusBar, Button, ImageBackground} from 'react-native';
import {Dimens} from '../../../assets/Dimens';
import {Icon} from "native-base";
import {colors} from "../../../assets/color";
import AutoTypingText from 'react-native-auto-typing-text';
import ButtonComponent from "../../../Common/ButtonComponent/ButtonComponent";
import TextInputComponent from "../../../Common/TextInputComponent/TextInputComponent";
import TextComponent from "../../../Common/TextComponent/TextComponent";

export default class Login extends Component<Props> {


    render() {
        return (
            <View>
                <ImageBackground
                    source={require('../../../assets/images/background-main.png')}
                    style={styles.bg}>
                    <View style={{alignItems: 'center'}}>
                        <Icon name='shopping-bag' type='FontAwesome5'
                              style={{fontSize: 100, color: colors.red}}/></View>
                    <View style={styles.body}>
                        <View style={styles.viewTextInput}>
                            <TextInputComponent
                                placeholder='Phone'
                            />
                        </View>
                        <View style={styles.viewTextInput}>
                            <TextInputComponent
                                placeholder='Phone'
                            />
                        </View>
                    </View>
                    <ButtonComponent
                        text='Login'/>
                    <View style={styles.btnSignIn}>
                        <ButtonComponent
                            text='Sign In'/>
                    </View>
                    <View style={styles.footer}>
                        <Text> </Text>
                        <TextComponent style={styles.text}>Bỏ Qua</TextComponent>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}
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
    body: {
        marginTop: 50,
        marginBottom: 60
    },
    viewTextInput: {
        height: 60
    },
    btnSignIn: {
        marginTop: 30
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        marginTop: 60
    },
    text: {
        fontSize: 18,
        color: colors.red
    }

})
