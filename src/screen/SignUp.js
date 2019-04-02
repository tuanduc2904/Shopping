/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, StatusBar, Button, Alert, ImageBackground } from 'react-native';
import {Dimens} from '../assets/Dimens'
import { Icon } from "native-base";
import { colors } from "../assets/color";
import ButtonComponent from "../Common/ButtonComponent/ButtonComponent";
import TextInputComponent from "../Common/TextInputComponent/TextInputComponent";
import TextComponent from '../Common/TextComponent/TextComponent'
import { connect } from 'react-redux';
import { firebaseApp } from '../untils/firebase';
import { loadingShowSignUp, loadingCloseSignUp } from '../redux/actions/Loading';
import Loading from '../Components/Loading';


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
                this.props.loadingCloseSignUp();
                setTimeout(() => {
                    Alert.alert(
                        'Thành Công',
                        'Đăng ký thành công với email: ' + email,
                        [
                            {
                                text: 'Đăng nhập', onPress: () => {
                                    this.props.navigation.goBack();
                                }
                            },
                        ],
                    );
                }, 500);

            }).catch(error => {
                this.SignFail(error);
            });
    }

    render() {
        return (
            <View>
                <ImageBackground
                    source={require('../assets/images/background-main.png')}
                    style={styles.bg}>
                    <View style={{ alignItems: 'center' }}>
                        <Icon name='shopping-bag' type='FontAwesome5'
                            style={{ fontSize: 100, color: colors.red }} /></View>
                    <View style={styles.body}>
                        <View style={styles.viewTextInput}>
                            <TextInputComponent
                                placeholder='Email'
                                onChangeText={(email) => this.setState({ email })}
                            />
                        </View>
                        <View style={styles.viewTextInput}>
                            <TextInputComponent
                                placeholder='Mật khẩu'
                                onChangeText={(password) => this.setState({ password })}
                                type='password'
                                secureTextEntry={true}

                            />
                        </View>
                    </View>
                    <ButtonComponent
                        text='SignUp'

                        onPress={() => this.checkText()}
                    />
                    <View style={styles.footer}>
                        <Text> </Text>
                        <TextComponent style={styles.text}
                            onPress={() =>
                                this.props.navigation.goBack()
                            }

                        >Quay Lại</TextComponent>
                    </View>
                </ImageBackground>
                {this.props.isLoading ? <Loading /> : null}

            </View>
        );
    }
}
function mapStateToProps(state) {
    return {
        isLoading: state.Loading.isLoadingSignUp
    }
}

export default connect(mapStateToProps, { loadingShowSignUp, loadingCloseSignUp })(SignUp)
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
