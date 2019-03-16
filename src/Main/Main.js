/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {
    createStackNavigator,
    createAppContainer,
    createBottomTabNavigator,
    TabNavigator,
} from 'react-navigation';
import  SplashScreen from '../Components/screen/SplashScreen/SplashScreen';
import Login from "../Components/screen/Login/Login";
import Home from "../Components/screen/Home/Home";
import {Icon} from "native-base";
import {colors} from "../assets/color";
import SeeMore from "../Components/screen/SeeMore/SeeMore";
import ShoppingCart from "../Components/screen/ShoppingCart/ShoppingCart";
import Booth from "../Components/screen/Booth/Booth";
import Profile from "../Components/screen/Profile/Profile";
const MainNavigator = createBottomTabNavigator({
    Home: {
        screen: Home,
        tabBarLabel: "Trang ",
        navigationOptions: {
            tabBarIcon: ({tintColor}) => (
                <Icon name='home' type='AntDesign' style={{fontSize: 30, color:tintColor}}/>
            )
        },
    },
    SeeMore: {
        screen: SeeMore,
        tabBarLabel: "Dạo",
        navigationOptions: {
            tabBarIcon: ({tintColor}) => (
                <Icon name='checkbox-multiple-blank-outline' type='MaterialCommunityIcons' style={{fontSize: 30, color:tintColor}}/>
            )
        },
    },
    ShoppingCart: {
        screen: ShoppingCart,
        tabBarLabel: "ShoppingCart",
        navigationOptions: {
            tabBarIcon: ({tintColor}) => (
                <Icon name='shoppingcart' type='AntDesign' style={{fontSize: 30, color:tintColor}}/>
            )
        },
    },
    Booth: {
        screen: Booth,
        tabBarLabel: "ShoppingCart",
        navigationOptions: {
            tabBarIcon: ({tintColor}) => (
                <Icon name='isv' type='AntDesign' style={{fontSize: 28, color:tintColor}}/>
            )
        },
    },
    Profile: {
        screen: Profile,
        tabBarLabel: "ShoppingCart",
        navigationOptions: {
            tabBarIcon: ({tintColor}) => (
                <Icon name='user' type='EvilIcons' style={{fontSize: 35, color:tintColor}}/>
            )
        },
    },
},{
    tabBarOptions: {
        showLabel: false,
        title: true,
        showIcon: true,
        activeTintColor: colors.red,
        inactiveTintColor: '#707070',
        labelStyle: {
            fontSize: 10,
        },
        style: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right:0,
            backgroundColor: '#ffffffcc',
            // borderTopWidth: 1,
            shadowColor: '#ffffffbf',
            // shadowOpacity: 1,
            elevation: 1
        },
        indicatorStyle: {
            backgroundColor: 'transparent'
        },
    },
    tabBarPosition: 'bottom',
});
const NavStack = createStackNavigator({
    // SplashScreen: {
    //     screen: SplashScreen,
    //     navigationOptions: {
    //         header: null
    //     }
    // },
    // Login: {
    //     screen: Login,
    //     navigationOptions: {
    //         header: null
    //     }
    // },
    Menu: {
        screen: MainNavigator,
        navigationOptions: {
            header: null,
            headerStyle: {
                backgroundColor: '#FFF',
            },
        }
    },

})
const Main = createAppContainer(NavStack);
export default Main;
