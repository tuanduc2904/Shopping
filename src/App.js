/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import {createStackNavigator,createAppContainer} from 'react-navigation';
import SplashScreen from './screen/SplashScreen';
import Login from "./screen/Login";
import { Icon } from "native-base";
import { colors } from "./assets/color";
import SeeMore from "./screen/SeeMore";
import SignUp from './screen/SignUp';
import store from './redux/store';
import { Provider } from 'react-redux'
import UpdateProfile from "./screen/UpdateProfile";
import Main from "./screen/Main";


const NavStack = createStackNavigator({
    // SplashScreen: {
    //     screen: SplashScreen,
    //     navigationOptions: {
    //         header: null
    //     }
    // },
    Login: {
        screen: Login,
        navigationOptions: {
            header: null
        }
    },
    SignUp:{
        screen: SignUp,
        navigationOptions: {
            header: null
        }
    }
    ,
    Main: {
        screen: Main,
        navigationOptions: {
            header: null,
            headerStyle: {
                backgroundColor: '#FFF',
            },
        }
    },
    SeeMore:{
        screen:SeeMore,
        navigationOptions: {
            title:'Home',
            headerStyle: {
                backgroundColor: '#FFF',
            },
        }
    },
    UpdateProfile:{
        screen: UpdateProfile,
        navigationOptions: {
            title:'Thông Tin Cá Nhân',
            headerStyle: {
                backgroundColor: '#FFF',
            },
        }
    }
    

})
const AppContainer = createAppContainer(NavStack);

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <AppContainer />
            </Provider>
        );
    }
}



export default App;
