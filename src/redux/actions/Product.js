import {
    ERROR, CANCEL_ERROR, GET_SUCCESS_NAME_PRODUCTS,
    GET_SUCCESS_NEW_PRODUCTS, GET_SUCCESS_REFER_PRODUCTS,
    GET_SUCCESS_STORE_PRODUCTS, GET_SUCCESS_DEFAULT_PRODUCTS,
    FINISHALL, START_GET_DATA
} from './type';
import firebase from 'firebase';

const db = firebase.database();

const getDefault = (defaultProducts) => {
    return {
        type: GET_SUCCESS_DEFAULT_PRODUCTS,
        defaultProducts
    }
}

const startIsLoading = () => {
    return {
        type: START_GET_DATA
    }
}

export const getDefaulProduct = () => {
    return (dispatch) => {
        dispatch(startIsLoading());
        const defaultProducts = [];
        db.ref('products').on('value', snap => {
            snap.forEach(store => {
                store.forEach(item => {
                    let product = item.val();
                    product.key = item.key;
                    defaultProducts.push(product)
                })
            });
            dispatch(getDefault(defaultProducts));
        }, error => {
            console.log('error', error);
        });
        
    }
}