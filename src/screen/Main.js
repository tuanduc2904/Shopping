import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, StatusBar, Button, SafeAreaView} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Home from "./page/Home";
import SeeMore from "./SeeMore";
import {Icon} from "native-base";
import {colors} from "../assets/color";
import ShoppingCart from "./page/ShoppingCart";
import Booth from "./page/Booth";
import Profile from "./page/Profile";

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'Home'
        }
    }

    openMenu() {
        const {open} = this.props;
        open();
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1,backgroundColor:colors.white}}>
                <TabNavigator tabBarStyle={{backgroundColor:colors.white}}>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'Home'}
                        // title="Home"
                        renderIcon={() => <Icon name='home' type='AntDesign' style={{fontSize: 25, color: '#707070'}}/>}
                        renderSelectedIcon={() => <Icon name='home' type='AntDesign'
                                                        style={{fontSize: 25, color: colors.red}}/>}
                        badgeText="1"
                        onPress={() => this.setState({selectedTab: 'Home'})}>
                        <Home/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'SeeMore'}
                        // title="Profile"
                        renderIcon={() => <Icon name='checkbox-multiple-blank-outline' type='MaterialCommunityIcons'
                                                style={{fontSize: 25, color: '#707070'}}/>}
                        renderSelectedIcon={() => <Icon name='checkbox-multiple-blank-outline'
                                                        type='MaterialCommunityIcons'
                                                        style={{fontSize: 25, color: colors.red}}/>}
                        // renderBadge={() => <CustomBadgeView />}
                        onPress={() => this.setState({selectedTab: 'SeeMore'})}>
                        <SeeMore/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'ShoppingCart'}
                        // title="Profile"
                        renderIcon={() => <Icon name='shoppingcart' type='AntDesign'
                                                style={{fontSize: 25, color: '#707070'}}/>}
                        renderSelectedIcon={() => <Icon name='shoppingcart' type='AntDesign'
                                                        style={{fontSize: 25, color: colors.red}}/>}
                        // renderBadge={() => <CustomBadgeView />}
                        onPress={() => this.setState({selectedTab: 'ShoppingCart'})}>
                        <ShoppingCart/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'Booth'}
                        // title="Profile"
                        renderIcon={() => <Icon name='isv' type='AntDesign' style={{fontSize: 25, color: '#707070'}}/>}
                        renderSelectedIcon={() => <Icon name='isv' type='AntDesign'
                                                        style={{fontSize: 25, color: colors.red}}/>}
                        // renderBadge={() => <CustomBadgeView />}
                        onPress={() => this.setState({selectedTab: 'Booth'})}>
                        <Booth/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'Profile'}
                        // title="Profile"
                        renderIcon={() => <Icon name='user' type='EvilIcons' style={{fontSize: 35, color: '#707070'}}/>}
                        renderSelectedIcon={() => <Icon name='user' type='EvilIcons'
                                                        style={{fontSize: 35, color: colors.red}}/>}
                        // renderBadge={() => <CustomBadgeView />}
                        onPress={() => this.setState({selectedTab: 'Profile'})}>
                        <Profile/>
                    </TabNavigator.Item>
                </TabNavigator>
            </SafeAreaView>
        );
    }
}