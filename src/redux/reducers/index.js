import { combineReducers } from 'redux';
import Auth from './Auth';
import Loading from './Loading'


const reducer = combineReducers({
    Auth: Auth,
    Loading: Loading,
});
export default reducer;