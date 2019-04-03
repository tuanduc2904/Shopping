import {
    ERROR, CANCEL_ERROR, GET_SUCCESS_NAME_PRODUCTS,
    GET_SUCCESS_NEW_PRODUCTS, GET_SUCCESS_REFER_PRODUCTS,
    GET_SUCCESS_STORE_PRODUCTS, GET_SUCCESS_DEFAULT_PRODUCTS,
    FINISHALL, START_GET_DATA, SEARCH_PRODUCT_NAME
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
    console.log(storeProducts)
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
            dispatch(getNameProducts(defaultProducts.sort(compare)));
            dispatch(dpSearch(defaultProducts));

        }, error => {
            console.log('error', error);
        });
    }
}

export const searchProductName = (text) => {
    return (dispatch, getState) => {
        const defaultProducts = getState().Products.defaultProducts;
        dispatch(dpSearch(filter(defaultProducts, text)));

    }
}
const dpSearch = (searchProduct) => {
    return {
        type: SEARCH_PRODUCT_NAME,
        searchProduct
    }
}
const compare = (a, b) => {
    const productNameA = a.productName;
    const productNameB = b.productName;
    let comparison = 0;
    if (productNameA > productNameB) {
        comparison = 1
    } else if (productNameA < productNameB) {
        comparison = -1;
    }
    return comparison;
}

const filter = (array, text) => {
    let keyWord = text.toLowerCase();
    let newArr = ewArr = array.filter((item) => {
        return item.productName.toLowerCase().match(keyWord);
    })
    return newArr
}