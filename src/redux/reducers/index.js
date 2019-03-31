import { combineReducers } from 'redux';
import Auth from './Auth';
import Loading from './Loading'
import MyProduct from './MyProduct'
import Products from './Products'
const reducers = combineReducers({
    Auth: Auth,
    Loading: Loading,
    MyProduct: MyProduct,
    Products: Products
});
export default reducers;