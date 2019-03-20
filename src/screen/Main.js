import React, { Component } from 'react';
import { SafeAreaView, Alert } from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Home from "./page/Home";
import SeeMore from "./SeeMore";
import { Icon } from "native-base";
import { colors } from "../assets/color";
import ShoppingCart from "./page/ShoppingCart";
import Booth from "./page/Booth";
import Profile from "./page/Profile";
import HeaderMain from '../Components/HeaderMain';
import { connect } from 'react-redux';
import { firebaseApp } from '../untils/firebase';
import { updateProfile, logout } from '../redux/actions/Authenticate';
import { loadingShowLogin } from '../redux/actions/Loading'

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'Home',
            user: {}
        }
    }
    componentWillReceiveProps(props) {
        if (props.responseData) { console.log(props.user); } // should be getting the data if the request works
    }

    componentDidMount() {
        if (this.props.user !== null) {
            this.checkLogin();
        }
    };

    goToUpdateProfile() {

        Alert.alert(
            'Bổ sung thông tin tài khoản',
            'Bạn cần phải bổ sung thông tin cho tài khoản',
            [
                {
                    text: 'Ok', onPress: () => {
                        this.props.navigation.navigate('UpdateProfile');
                    }
                },
            ],
        );
    };

    checkLogin() {
        const user = this.props.user;
        if (user.loggedIn) {
            firebaseApp.database().ref('user').child(user.uid).once('value').then((snapshot) => {
                console.log(`user.uid :` + user.uid);
                console.log(`snapshot uid: ` + snapshot.val().uid);
                if (snapshot.val().uid === user.uid) {
                    this.props.updateProfile(snapshot.val());
                    console.log(`updateProfile`)
                }
                else {

                }
            }).catch(err => {
                console.log(err.message);
                this.goToUpdateProfile();
                console.log(`goToUpdateProfile`);
            })
        }

    };



    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
                <HeaderMain />
                <TabNavigator tabBarStyle={{ backgroundColor: colors.white }}>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'Home'}
                        // title="Home"
                        renderIcon={() => <Icon name='home' type='AntDesign' style={{ fontSize: 25, color: '#707070' }} />}
                        renderSelectedIcon={() => <Icon name='home' type='AntDesign'
                            style={{ fontSize: 25, color: colors.red }} />}
                        badgeText="1"
                        onPress={() => this.setState({ selectedTab: 'Home' })}>
                        <Home />

                    </TabNavigator.Item>

                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'SeeMore'}
                        // title="Profile"
                        renderIcon={() => <Icon name='checkbox-multiple-blank-outline' type='MaterialCommunityIcons'
                            style={{ fontSize: 25, color: '#707070' }} />}
                        renderSelectedIcon={() => <Icon name='checkbox-multiple-blank-outline'
                            type='MaterialCommunityIcons'
                            style={{ fontSize: 25, color: colors.red }} />}
                        // renderBadge={() => <CustomBadgeView />}
                        onPress={() => this.setState({ selectedTab: 'SeeMore' })}>
                        <SeeMore />
                    </TabNavigator.Item>

                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'ShoppingCart'}
                        // title="Profile"
                        renderIcon={() => <Icon name='shoppingcart' type='AntDesign'
                            style={{ fontSize: 25, color: '#707070' }} />}
                        renderSelectedIcon={() => <Icon name='shoppingcart' type='AntDesign'
                            style={{ fontSize: 25, color: colors.red }} />}
                        // renderBadge={() => <CustomBadgeView />}
                        onPress={() => this.setState({ selectedTab: 'ShoppingCart' })}>
                        <ShoppingCart />
                    </TabNavigator.Item>

                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'Booth'}
                        // title="Profile"
                        renderIcon={() => <Icon name='isv' type='AntDesign' style={{ fontSize: 25, color: '#707070' }} />}
                        renderSelectedIcon={() => <Icon name='isv' type='AntDesign'
                            style={{ fontSize: 25, color: colors.red }} />}
                        // renderBadge={() => <CustomBadgeView />}
                        onPress={() => this.setState({ selectedTab: 'Booth' })}>
                        <Booth />
                    </TabNavigator.Item>

                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'Profile'}
                        // title="Profile"
                        renderIcon={() => <Icon name='user' type='EvilIcons' style={{ fontSize: 35, color: '#707070' }} />}
                        renderSelectedIcon={() => <Icon name='user' type='EvilIcons'
                            style={{ fontSize: 35, color: colors.red }} />}
                        // renderBadge={() => <CustomBadgeView />}
                        onPress={() => this.setState({ selectedTab: 'Profile' })}>
                        <Profile />
                    </TabNavigator.Item>
                </TabNavigator>
            </SafeAreaView>
        );
    }
}
function mapStateToProps(state) {
    return {
        user: state.Auth
    }
}
export default connect(mapStateToProps, { updateProfile, logout, loadingShowLogin })(Main);