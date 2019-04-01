import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Provider } from 'react-redux';

import store from '../redux/store';
import Products from '../pages/Products';
import Checkout from '../pages/Checkout';
import Receipt from '../pages/Receipt';

import themes from '../styles/theme.style';
import Detaill from '../components/Detaill';

const Route = createStackNavigator(
    {
        Products: { screen: Products },
        Checkout: { screen: Checkout },
        Receipt: { screen: Receipt },
        Detaill: { screen: Detaill }
    },
    {
        navigationOptions: {
            headerStyle: {
                backgroundColor: themes.BACKGROUND_COLOR,
                paddingHorizontal: 10,
            },
            headerTintColor: '#fff'
        }
    }
);
const AppContainer = createAppContainer(Route);

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
