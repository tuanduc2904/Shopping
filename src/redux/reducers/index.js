import { combineReducers } from 'redux';
import Auth from './Auth';
import Loading from './Loading'
import MyProduct from './MyProduct'

const reducers = combineReducers({
    Auth: Auth,
    Loading: Loading,
    MyProduct: MyProduct
});
export default reducers;