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
import { createStackNavigator, createAppContainer } from 'react-navigation';
import SplashScreen from './screen/SplashScreen';
import Login from "./screen/Login";
import { Icon } from "native-base";
import { colors } from "./assets/color";
// import SeeMore from "./screen/page/ShopSell";
import SignUp from './screen/SignUp';
import store from './redux/store';
import { Provider } from 'react-redux'
import UpdateProfile from "./screen/UpdateProfile";
import Main from "./screen/Main";
import MyShop from './screen/MyShop'
import PostProduct from "./screen/page/PostProduct";
import Detaill from "./screen/page/Detaill";
import Comment from './screen/page/Comment';
import ManageCart from "./screen/page/ManageCart";


const NavStack = createStackNavigator({
    SplashScreen: {
        screen: SplashScreen,
        navigationOptions: {
            header: null
        }
    },
    PostProduct: {
        screen: PostProduct,
        navigationOptions: {
            title: 'Thêm Sản Phẩm',
            headerStyle: {
                backgroundColor: '#FFF',
            },
        }
    },
    Login: {
        screen: Login,
        navigationOptions: {
            header: null
        }
    },
    SignUp: {
        screen: SignUp,
        navigationOptions: {
            header: null
        }
    }
    ,
    Main: {
        screen: Main,
        navigationOptions: {
            header: null
        }
    },
    Detaill:{
        screen: Detaill,
        navigationOptions: {
            title: 'Chi tiết sản phẩm',
            headerStyle: {
                backgroundColor: '#FFF',
            },
        }
    },
    Comment: {
        screen: Comment,
        navigationOptions: {
            title: 'Đánh Giá',
            headerStyle: {
                backgroundColor: '#FFF',
            },
        }
    },
    ManageCart: {
        screen: ManageCart,
        navigationOptions: {
            title: 'Quản Lý Đơn Hàng',
            headerStyle: {
                backgroundColor: '#FFF',
            },
        }
    },
    UpdateProfile: {
        screen: UpdateProfile,
        navigationOptions: {
            title: 'Cập Nhật Thông Tin Cá Nhân',
            headerStyle: {
                backgroundColor: '#FFF',
            },
        }

    },
    MyShop: {
        screen: MyShop,
        navigationOptions: {
            title: 'Shop của tôi',
            headerStyle: {
                backgroundColor: '#FFF',
            },
        }
    },


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
