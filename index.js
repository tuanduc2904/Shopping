

global.Symbol = require('core-js/es6/symbol');
require('core-js/fn/symbol/iterator');
require('core-js/fn/map');
require('core-js/fn/set');
require('core-js/fn/array/find');


import { AppRegistry, Platform } from 'react-native';
if (Platform.OS === 'android') {
    if (typeof Symbol === 'undefined') {
        if (Array.prototype['@@iterator'] === undefined) {
            Array.prototype['@@iterator'] = function () {
                let i = 0;
                return {
                    next: () => ({
                        done: i >= this.length,
                        value: this[i++],
                    }),
                };
            };
        }
    }
}
import App from './app/routes/index';
// import App from './src/App'

import { name as appName } from './app.json';
console.disableYellowBox = true;
AppRegistry.registerComponent(appName, () => App);


/// cau truc products
var products = [
    {
        avatarSource: '',
        uid: '',
        nameShop: '',
        listSelling: ['idProduct'],
        products: [
            {
                idProduct: '',
                name: '',
                uid: '',
                nameShop: '',
                avatarSource: '',
                images: [],
                price: '',
                category: '',
                color: [],
                timeAdd: '',
                description: '',
                feedback: [],

            }
        ],
    },
]
