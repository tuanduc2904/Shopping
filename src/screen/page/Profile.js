/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity, Image, ScrollView, Alert
} from 'react-native';
import { Dimens } from '../../assets/Dimens';
import { colors } from "../../assets/color";
import TextComponent from "../../Common/TextComponent/TextComponent";
import { firebaseApp } from "../../untils/firebase";
import FastImage from "react-native-fast-image";
import { Button, Card,Icon } from 'native-base'
import { connect } from 'react-redux'
import Icons from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { NavigationActions, StackActions } from 'react-navigation';
import { logout } from '../../redux/actions/Authenticate';
import { SkipedLogin } from './SkipedLogin'
class Profile extends Component {

    constructor(props) {
        super(props);
        this.itemRef = firebaseApp.database();
        this.state = {
            isLoading: true,
            dataSource: [],
            refreshing: false,
        }

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
            <View style={styles.container}>
                <View style={styles.heard}>
                    <View style={styles.viewHorizontalLeft}>
                        <FastImage style={styles.avatar}
                            source={{ uri: this.props.user.avatarSource }}
                        />
                        <View style={styles.viewAccout}>
                            <TextComponent style={styles.title}>{this.props.user.displayName}</TextComponent>
                            <TextComponent style={styles.text}>{this.props.user.email}</TextComponent>
                        </View>
                    </View>
                </View>
                <ScrollView style={{ flex: 1, paddingTop: 10, backgroundColor: colors.background }}>

                    <Card style={[styles.card, styles.row]}>
                        <TouchableOpacity
                                          onPress={() => {
                                              this.props.navigation.navigate('ManageCart');
                                          }}>
                        <Text style={{ marginTop: 5, marginBottom: 5 }}>Quản lý đơn hàng: </Text>
                        <View style={styles.order}>
                            <View style={styles.orderChild}>
                                <View style={{ alignItems: 'center' }}>
                                    <MaterialIcons name="present-to-all"  color={colors.red} size={45}/>
                                    <Text styes={styles.textCenter}>Chuyển hàng </Text>
                                </View>
                            </View>
                            <View style={styles.orderChild}>
                                <View style={{ alignItems: 'center' }}>
                                    <MaterialIcons name="local-shipping" styes={styles.textCenter} color={colors.red}
                                        size={45} />
                                    <Text styes={styles.textCenter}>Đang giao</Text>
                                </View>
                            </View>
                            <View style={styles.orderChild}>
                                <View style={{ alignItems: 'center' }}>
                                    <Icons name="gift" styes={styles.textCenter} color={colors.red} size={45} />
                                    <Text styes={styles.textCenter}>Đã nhận</Text>
                                </View>
                            </View>
                        </View>
                        </TouchableOpacity>
                    </Card>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate('UpdateProfile');
                        }}
                    >
                        <Card style={[styles.card, styles.button,]}>
                            <MaterialIcons name="person" style={styles.button_icon} />
                            <Text style={styles.button_text}>Thông tin tài khoản</Text>
                        </Card>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate('MyShop')
                        }}>
                        <Card style={[styles.card, styles.button,]}>
                            <MaterialIcons name="store" style={styles.button_icon} />
                            <Text style={styles.button_text}>Shop của tôi</Text>
                        </Card>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Card style={[styles.card, styles.button,]}>
                            <MaterialIcons name="help-outline" style={styles.button_icon} />
                            <Text style={styles.button_text}>Trung tâm trợ giúp</Text>
                        </Card>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            Alert.alert(
                                'Shopping ',
                                'Bạn muốn đăng xuất tài khoản?',
                                [
                                    {
                                        text: 'Cancel'
                                    },

                                    {
                                        text: 'OK', onPress: () => {
                                            this.props.logout();
                                            this.navigateScreen('Login');
                                        }
                                    },
                                ],
                                { cancelable: false }
                            )
                        }}
                    >
                        <Card style={[styles.card, styles.button,]}>
                            <MaterialIcons name="exit-to-app" style={styles.button_icon} />
                            <Text style={{ fontSize: 18, color: colors.red }}>Đăng xuất tài khoản</Text>
                        </Card>
                    </TouchableOpacity>

                </ScrollView>

            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.Auth
    }
}

export default connect(mapStateToProps, { logout })(Profile)

const styles = StyleSheet.create({

    saf: {
        flex: 1,
        backgroundColor: colors.white,
    },
    // height: Platform.OS === 'ios' ? 200 : 100,
    heard: {
        height: 120,
        backgroundColor: colors.bgUser,
        flexDirection: 'column',
    },
    card: {
        borderRadius: 8,

    },
    container: {
        flex: 1,
        backgroundColor: colors.background,


    },
    viewHorizontalLeft: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
        backgroundColor: colors.background
    },
    viewAccout: {
        marginLeft: 15,
    },
    title: {
        color: colors.white,
        fontSize: 22,
        fontWeight: 'bold'
    },
    text: {
        marginTop: 5,
        color: colors.white,
    },
    order: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    orderChild: {
        width: '30%',
        alignItems: 'center'
    },
    textCenter: {
        textAlign: 'center',
        marginTop: 5,
        marginBottom: 5
    },
    row: {
        margin: 10,
        backgroundColor: colors.white,
        padding: 5,
        paddingBottom: 10,
        paddingTop: 10,
        borderRadius: 10,
        marginLeft: 5,
        marginRight: 5,
    },
    button: {
        height: 50,
        margin: 10,
        backgroundColor: colors.white,
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 15,
        marginLeft: 5,
        marginRight: 5,
    },
    button_icon: {
        fontSize: 25,
        paddingLeft: 5,
        paddingRight: 5,
        color: colors.red,

    },
    button_text: {
        fontSize: 18
    }

})
