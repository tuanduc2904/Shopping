import {
    ERROR, CANCEL_ERROR, GET_SUCCESS_NAME_PRODUCTS,
    GET_SUCCESS_NEW_PRODUCTS, GET_SUCCESS_REFER_PRODUCTS,
    GET_SUCCESS_STORE_PRODUCTS, GET_SUCCESS_DEFAULT_PRODUCTS,
    FINISHALL, START_GET_DATA
} from './types';
import firebase from 'firebase';


const db = firebase.database();
const getNameProducts = (nameProducts) => {
    return {
        type: GET_SUCCESS_NAME_PRODUCTS,
        nameProducts
    }
}
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
            dispatch(getDefault(JSON.parse(JSON.stringify(defaultProducts))));
            dispatch(getNewProducts(JSON.parse(JSON.stringify(defaultProducts.reverse()))));
            dispatch(getStoreProducts(JSON.parse(JSON.stringify(storeProducts))));
            dispatch(getNameProducts(JSON.parse(JSON.stringify(defaultProducts.sort(compare)))));

        }, error => {
            console.log('error', error);
        });



    }
}
function compare(a, b) {
    const productNameA = a.productName;
    const productNameB = b.productName;
    console.log(a);
    let comparison = 0;
    if (productNameA > productNameB) {
        comparison = 1
    } else if (productNameA < productNameB) {
        comparison = -1;
    }
    return comparison;
}