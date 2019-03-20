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
    TouchableOpacity, Image, ScrollView
} from 'react-native';
import { Dimens } from '../../assets/Dimens';
import { colors } from "../../assets/color";
import TextComponent from "../../Common/TextComponent/TextComponent";
import { firebaseApp } from "../../untils/firebase";
import FastImage from "react-native-fast-image";
import { Button } from 'native-base'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

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
                <ScrollView style={{ flex: 1, paddingTop: 10, backgroundColor: '#EFEFEF' }}>

                    <View style={styles.row}>
                        <Text style={{ marginTop: 5, marginBottom: 5 }}>Quản lý đơn hàng: </Text>
                        <View style={styles.order}>
                            <TouchableOpacity style={styles.orderChild}>
                                <View style={{ alignItems: 'center' }}>
                                    <Icon name="send-o" styes={styles.textCenter} color={colors.red} size={45} />
                                    <Text styes={styles.textCenter}>Chuyển hàng </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.orderChild}>
                                <View style={{ alignItems: 'center' }} >
                                    <MaterialIcons name="local-shipping" styes={styles.textCenter} color={colors.red} size={45} />
                                    <Text styes={styles.textCenter}>Đang giao</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.orderChild}>
                                <View style={{ alignItems: 'center' }}>
                                    <Icon name="gift" styes={styles.textCenter} color={colors.red} size={45} />
                                    <Text styes={styles.textCenter}>Đã nhận</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Button block style={styles.button}>
                        <MaterialIcons name="person" style={styles.button_icon} />
                        <Text style={styles.button_text}>Thông tin tài khoản</Text>
                    </Button>
                    <Button block style={styles.button}>
                        <MaterialIcons name="store" style={styles.button_icon} />
                        <Text style={styles.button_text}>Shop của tôi</Text>
                    </Button>
                    <Button block style={styles.button}>
                        <MaterialIcons name="help-outline" style={styles.button_icon} />
                        <Text style={styles.button_text}>Trung tâm trợ giúp</Text>
                    </Button>
                    <Button block style={styles.button}>
                        <MaterialIcons name="exit-to-app" style={styles.button_icon} />
                        <Text style={{ fontSize: 18, color: colors.red }}>Đăng xuất tài khoản</Text>
                    </Button>

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
export default connect(mapStateToProps)(Profile)

const styles = StyleSheet.create({
    saf: {
        flex: 1,
        backgroundColor: colors.white,
    },
    height: Platform.OS === 'ios' ? 200 : 100,
    heard: {
        height: 120,
        backgroundColor: colors.bgUser,
        flexDirection: 'column',
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
        borderRadius: 10
    },
    button: {
        margin: 10,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: 15,
    },
    button_icon: {
        fontSize: 25,
        paddingLeft: 5,
        paddingRight: 5,
        color: colors.red
    },
    button_text: {
        fontSize: 18
    }

})
