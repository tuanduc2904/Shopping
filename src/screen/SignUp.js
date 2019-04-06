/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, StatusBar, Button, Alert, ImageBackground, TextInput } from 'react-native';
import { Dimens } from '../assets/Dimens'
import { Icon } from "native-base";
import { colors } from "../assets/color";
import ButtonComponent from "../Common/ButtonComponent/ButtonComponent";
import TextInputComponent from "../Common/TextInputComponent/TextInputComponent";
import TextComponent from '../Common/TextComponent/TextComponent'
import { connect } from 'react-redux';
import { firebaseApp } from '../untils/firebase';
import { loadingShowSignUp, loadingCloseSignUp } from '../redux/actions/Loading';
import Loading from '../Components/Loading';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { loginSuccess, logout } from '../redux/actions/Authenticate';
import { NavigationActions, StackActions } from 'react-navigation';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
    }
    checkText() {
        let { email, password } = this.state;
        if (email.length > 0 && password.length > 0) {
            this.signUp(email, password);

        }
        else {
            Alert.alert(
                'Lỗi',
                'Hãy nhập đầy đủ email và mật khẩu',
                [
                    { text: 'OK' }
                ]

            );
        }
    }

    SignFail(error) {
        this.props.loadingCloseSignUp();
        setTimeout(() => {
            Alert.alert(
                error.message);
        }, 500);

    }

    signUp(email, password) {
        this.props.loadingShowSignUp();
        firebaseApp.auth().createUserWithEmailAndPassword(email, password).
            then((user) => {
                console.log(user)
                u = user.user
                this.props.loadingCloseSignUp();
                setTimeout(() => {
                    Alert.alert(
                        'Thành Công',
                        'Đăng ký thành công với email: ' + email,
                        [
                            {
                                text: 'Đăng nhập', onPress: () => {
                                    this.props.logout();
                                    this.props.loginSuccess(user.user);
                                    this.navigateScreen('Main');
                                }
                            },
                        ],
                    );
                }, 500);

            }).catch(error => {
                this.SignFail(error);
            });
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
                <KeyboardAwareScrollView>
                    <ImageBackground
                        source={require('../assets/images/background-main.png')}
                        style={styles.bg}>
                        <View style={{ alignItems: 'center' }}>
                            <Icon name='shopping-bag' type='FontAwesome5'
                                style={{ fontSize: 100, color: colors.red }} /></View>
                        <View style={styles.body}>
                            <View style={styles.viewTextInput}>
                                <TextInput
                                    style={styles.text}
                                    placeholder='Email'
                                    onChangeText={(email) => this.setState({ email })}
                                    returnKeyType='next'
                                    keyboardType='email-address'
                                    onSubmitEditing={() => { this.refs.txtPassWord.focus() }}
                                    autoCorrect={false}
                                />
                            </View>
                            <View style={styles.viewTextInput}>
                                <TextInput
                                    style={styles.text}
                                    placeholder='Mật khẩu'
                                    onChangeText={(password) => this.setState({ password })}
                                    type='password'
                                    secureTextEntry={true}
                                    returnKeyType='go'
                                    ref={'txtPassWord'}
                                    autoCorrect={false}
                                    onSubmitEditing={() => {
                                        this.checkText();
                                    }}

                                />
                            </View>
                        </View>
                        <ButtonComponent
                            text='Đăng ký'
                            onPress={() => this.checkText()}
                        />
                        <View style={styles.footer}>
                            <Text> </Text>
                            <TextComponent style={styles.skip}
                                onPress={() =>
                                    this.props.navigation.goBack()
                                }

                            >Quay Lại</TextComponent>
                        </View>
                    </ImageBackground>
                    {this.props.isLoading ? <Loading /> : null}
                </KeyboardAwareScrollView>
            </View>
        );
    }
}
function mapStateToProps(state) {
    return {
        isLoading: state.Loading.isLoadingSignUp
    }
}

export default connect(mapStateToProps, { loadingShowSignUp, loadingCloseSignUp, loginSuccess, logout })(SignUp)
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
        color: colors.red,
        width: Dimens.screen.width / 1.2,
        borderBottomColor: colors.red,
        borderBottomWidth: 1
    },
    skip: {
        fontSize: 18,
        color: colors.red,
        position: 'absolute',
        bottom: 5,
        right: 10
    }
})
