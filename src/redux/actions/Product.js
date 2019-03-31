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
const getNewProducts = (newProducts) => {
    return {
        type: GET_SUCCESS_NEW_PRODUCTS,
        newProducts
    }
}
const startIsLoading = () => {
    return {
        type: START_GET_DATA
    }
}
const getStoreProducts = (storeProducts) => {
    return {
        type: GET_SUCCESS_STORE_PRODUCTS,
        storeProducts
    }
}

export const getDefaulProduct = () => {
    return (dispatch) => {
        dispatch(startIsLoading());
        const defaultProducts = [];
        const storeProducts = [];
        db.ref('products').once('value', snap => {
            let currentSS = 0;
            //nhieu store
            snap.forEach((products, index, array) => {
                //trong 1 store
                currentSS++;
                let current = 0;
                let shop = {};
                let listProduct = [];
                products.forEach(item => {
                    let product = item.val();
                    current++;
                    if (current === 1) {
                        shop.uid = product.uid;
                        shop.avatarSource = product.avatarSource;
                        shop.nameShop = product.nameShop;
                    }
                    product.key = item.key;
                    listProduct.push(product);
                    defaultProducts.push(product);
                    shop.products = listProduct;
                })
                storeProducts.push(shop);

            })
            dispatch(getDefault(defaultProducts));
            dispatch(getNewProducts(defaultProducts.reverse()));
            dispatch(getStoreProducts(storeProducts));


        }, error => {
            console.log('error', error);
        });



    }
}