import {
    TOTAL_MONEY, ADD_PRODUCT_TO_CART, REMOVE_PRODUCT_TO_CART, INCR_QUANTITY, DECR_QUANTITY, GET_CART
} from './types';
import { saveCart, getCart } from '../../untils/asyncStorage';


const getCarts = (carts) => {
    return {
        type: GET_CART,
        carts
    }
}

const getTotal = () => {
    return {
        type: TOTAL_MONEY,
    }
}


const addtocarts = (product) => {
    return {
        type: ADD_PRODUCT_TO_CART,
        product
    }
}

export const addProductToCart = (product) => {
    return (dispatch, getState) => {
        const state = getState();
        let carts = state.Cart.carts;
        dispatch(addtocarts(product));
        saveCart(carts);
        dispatch(getTotal(carts));
    }
}
const decrquan = (key) => {
    return {
        type: DECR_QUANTITY,
        key
    }
}
export const decrQuantity = (key) => {
    return (dispatch, getState) => {
        const state = getState();
        let carts = state.Cart.carts;
        dispatch(decrquan(key));
        saveCart(carts);
        dispatch(getTotal(carts));

    }
}
const incrquan = (key) => {
    return {
        type: INCR_QUANTITY,
        key
    }
}
export const incrQuantity = (key) => {
    return (dispatch, getState) => {
        const state = getState();
        let carts = state.Cart.carts;
        dispatch(incrquan(key));
        saveCart(carts);
        dispatch(getTotal(carts));
    }
};
const remove = (key) => {
    return {
        type: REMOVE_PRODUCT_TO_CART,
        key
    }
}
export const removeProduct = (key) => {
    return (dispatch, getState) => {
        const state = getState();
        let carts = state.Cart.carts;
        carts.filter(e => e.product.key !== key);
        dispatch(remove(key));
        saveCart(carts);
        dispatch(getTotal(carts));
    }
}


export const getDataCart = () => {
    return (dispatch) => {
        getCart().then(carts => {
            dispatch(getCarts(carts));
            dispatch(getTotal(carts));
        });

    }
}