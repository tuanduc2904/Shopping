import { combineReducers } from 'redux';
import Auth from './Auth';
import Loading from './Loading'
import MyProduct from './MyProduct'
import Products from './Products'
import Cart from './Cart'
import Order from './Order'
const reducers = combineReducers({
    Auth: Auth,
    Loading: Loading,
    MyProduct: MyProduct,
    Products: Products,
    Cart: Cart,
    Order: Order
});
export default reducers;