/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, StatusBar, ImageBackground, Alert } from 'react-native';
import {Dimens} from '../assets/Dimens'
import { Icon, Button, Toast } from "native-base";
import { colors } from "../assets/color";
import ButtonComponent from "../Common/ButtonComponent/ButtonComponent";
import TextInputComponent from "../Common/TextInputComponent/TextInputComponent";
import TextComponent from "../Common/TextComponent/TextComponent";
import { connect } from 'react-redux';
import { firebaseApp } from '../untils/firebase';
// import { loginSuccess } from '../../../redux/actions/Authenticate';
import { loginSuccess, skipLogin } from '../redux/actions/Authenticate';
import { loadingShowLogin, loadingCloseLogin } from '../redux/actions/Loading';
import Loading from '../Components/Loading'
import { NavigationActions, StackActions } from 'react-navigation';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',

        }
    }


    logInFail(error) {
        this.props.loadingCloseLogin();
        setTimeout(() => {
            Alert.alert(
                error.message);
        }, 500);

    }

    LOGIN() {
        this.props.loadingShowLogin();
        firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((user) => {
                // console.log(user)
                if (user !== null) {
                    this.props.loadingCloseLogin();
                    this.props.loginSuccess(user.user);
                    this.navigateScreen('Main');
                }
                else {
                    console.log('null user')
                }
            })
            .catch(error =>
                this.logInFail(error)
            );
    }
    //ham khong cho bam quay lai
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
                    <View style={{ alignItems: 'center' }}>
                        <Icon name='shopping-bag' type='FontAwesome5'
                            style={{ fontSize: 100, color: colors.red }} />
                    </View>
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
                        text='Login'
                        onPress={() =>
                            this.LOGIN()
                        }
                    />

                    <View style={styles.btnSignIn}>
                        <ButtonComponent
                            text='Sign In'
                            onPress={() => this.props.navigation.navigate('SignUp')}
                        />
                    </View>
                    <View style={styles.footer}>
                        <Text> </Text>
                        <TextComponent style={styles.text}
                            onPress={() => {
                                this.props.skipLogin();
                                this.props.navigation.navigate('Main')
                            }}
                        >Bỏ Qua</TextComponent>
                    </View>
                </ImageBackground>
                {this.props.isLoading ? <Loading /> : null}
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        Auth: state.Auth,
        isLoading: state.Loading.isLoadingLogin
    }
}
export default connect(mapStateToProps, { loginSuccess, loadingShowLogin, loadingCloseLogin, skipLogin })(Login)
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
        marginTop: Dimens.screen.height/10,
        marginBottom: Dimens.screen.height/10
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
        marginTop: Dimens.screen.height/8
    },
    text: {
        fontSize: 18,
        color: colors.red
    }

})
