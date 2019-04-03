import React, { Component } from 'react';
import { SafeAreaView, Alert } from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Home from "./page/Home";
import ShopSell from "./page/ShopSell";
import { Icon } from "native-base";
import { colors } from "../assets/color";
import ShoppingCart from "./page/ShoppingCart";
import Search from "./page/Search";
import Profile from "./page/Profile";
import SkipedLogin from './page/SkipedLogin'
import HeaderMain from '../Components/HeaderMain';
import { connect } from 'react-redux';
import { firebaseApp } from '../untils/firebase';
import { updateProfile, logout } from '../redux/actions/Authenticate';
import { getDefaulProduct } from '../redux/actions/Product';
import { getDataCart } from '../redux/actions/Cart';
import global from './global';
import Loading from '../Components/Loading';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'Home',
            user: {}
        }
        global.goBackNavigation = this.goBackNavigation.bind(this);
        global.goToDetail = this.goToDetail.bind(this);
        global.selectedTabSearch = this.selectedTabSearch.bind(this)
    }
    goToDetail(item) {
        this.props.navigation.navigate('Detaill', { item: item });
    }
    goBackNavigation() {
        this.props.navigation.goBack();
    }
    componentDidMount() {
        this.props.getDefaulProduct();
        if (this.props.user !== null) {
            this.checkLogin();
        }
        this.props.getDataCart();
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
            firebaseApp.database().ref('user').child(user.uid).on('value', snapshot => {
                if (snapshot.val()) {

                    this.props.updateProfile(snapshot.val());
                }
                else {
                    this.goToUpdateProfile();

                }
            }, err => {
                this.goToUpdateProfile();
            })
        }

    };

    selectedTabSearch() {
        this.setState({ selectedTab: 'Search' })
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
                {this.state.selectedTab === 'Profile' ? null :
                    <HeaderMain selectedTabSearch={this.selectedTabSearch} navigate={this.props.navigation.navigate} />
                }
                <TabNavigator tabBarStyle={{ backgroundColor: colors.white }}>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'Home'}
                        // title="Home"
                        renderIcon={() => <Icon name='home' type='AntDesign' style={{ fontSize: 25, color: '#707070' }} />}
                        renderSelectedIcon={() => <Icon name='home' type='AntDesign'
                            style={{ fontSize: 25, color: colors.red }} />}
                        onPress={() => this.setState({ selectedTab: 'Home' })}>
                        <Home navigation={this.props.navigation} />

                    </TabNavigator.Item>

                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'ShopSell'}
                        renderIcon={() => <Icon name='checkbox-multiple-blank-outline' type='MaterialCommunityIcons'
                            style={{ fontSize: 25, color: '#707070' }} />}
                        renderSelectedIcon={() => <Icon name='checkbox-multiple-blank-outline'
                            type='MaterialCommunityIcons'
                            style={{ fontSize: 25, color: colors.red }} />}
                        // renderBadge={() => <CustomBadgeView />}
                        onPress={() => this.setState({ selectedTab: 'ShopSell' })}>
                        <ShopSell navigation={this.props.navigation} />
                    </TabNavigator.Item>

                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'Search'}
                        renderIcon={() => <Icon name='ios-search' style={{ fontSize: 27, color: '#707070' }} />}
                        renderSelectedIcon={() => <Icon name='ios-search'
                            style={{ fontSize: 27, color: colors.red }} />}
                        // renderBadge={() => <CustomBadgeView />}
                        onPress={() => this.setState({ selectedTab: 'Search' })}>
                        <Search navigation={this.props.navigation} />
                    </TabNavigator.Item>

                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'ShoppingCart'}
                        renderIcon={() => <Icon name='shoppingcart' type='AntDesign'
                            style={{ fontSize: 25, color: '#707070' }} />}
                        renderSelectedIcon={() => <Icon name='shoppingcart' type='AntDesign'
                            style={{ fontSize: 25, color: colors.red }} />}
                        badgeText={this.props.cart.carts.length}
                        onPress={() => this.setState({ selectedTab: 'ShoppingCart' })}>
                        <ShoppingCart navigation={this.props.navigation} />
                    </TabNavigator.Item>


                    {
                        this.props.user.loggedIn ?
                            <TabNavigator.Item
                                selected={this.state.selectedTab === 'Profile'}
                                renderIcon={() => <Icon name='user' type='EvilIcons' style={{ fontSize: 35, color: '#707070' }} />}
                                renderSelectedIcon={() => <Icon name='user' type='EvilIcons'
                                    style={{ fontSize: 35, color: colors.red }} />}
                                // renderBadge={() => <CustomBadgeView />}
                                onPress={() => this.setState({ selectedTab: 'Profile' })}>
                                <Profile navigation={this.props.navigation} />
                            </TabNavigator.Item> :
                            <TabNavigator.Item
                                selected={this.state.selectedTab === 'Profile'}
                                renderIcon={() => <Icon name='user' type='EvilIcons' style={{ fontSize: 35, color: '#707070' }} />}
                                renderSelectedIcon={() => <Icon name='user' type='EvilIcons'
                                    style={{ fontSize: 35, color: colors.red }} />}
                                // renderBadge={() => <CustomBadgeView />}
                                onPress={() => this.setState({ selectedTab: 'Profile' })}>
                                <SkipedLogin navigation={this.props.navigation} />
                            </TabNavigator.Item>
                    }
                </TabNavigator>
            </SafeAreaView>
        );
    }
}
function mapStateToProps(state) {
    return {
        user: state.Auth,
        cart: state.Cart,
        isLoading: state.Products.isLoading
    }
}
export default connect(mapStateToProps, { updateProfile, logout, getDefaulProduct, getDataCart })(Main);