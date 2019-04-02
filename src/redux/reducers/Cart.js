import {
    ADD_PRODUCT_TO_CART, REMOVE_PRODUCT_TO_CART,
    DECR_QUANTITY, INCR_QUANTITY, TOTAL_MONEY, GET_CART, REMOVE_ALL_CART
} from '../actions/types';

const DEFAULT = {
    carts: [],
    totalMoney: '',
}

export default (state = DEFAULT, action) => {
    switch (action.type) {
        case ADD_PRODUCT_TO_CART:
            let newCarts = [];
            let isExist = state.carts.some(e => e.product.key === action.product.key);
            if (isExist) {
                newCarts = state.carts
            }
            else { newCarts = state.carts.concat({ product: action.product, quantity: 1 }) }
            return {
                ...state, carts: newCarts
            };
        case REMOVE_PRODUCT_TO_CART:
            return {
                ...state, carts: state.carts.filter(e => e.product.key !== action.key)
            };
        case DECR_QUANTITY:
            return {
                ...state, carts: state.carts.map(e => {
                    if (e.product.key !== action.key) return e;
                    if (e.quantity === 1) return e;
                    return { product: e.product, quantity: e.quantity - 1 };
                })
            };
        case INCR_QUANTITY:
            return {
                ...state, carts: state.carts.map(e => {
                    if (e.product.key !== action.key) return e;
                    return { product: e.product, quantity: e.quantity + 1 };
                })
            };
        case TOTAL_MONEY:
            const total = state.carts.length > 0 ? state.carts.map(e => e.product.price * e.quantity).reduce((a, b) => a + b) : 0
            return {
                ...state, totalMoney: total
            }
        case GET_CART:
            return {
                ...state, carts: action.carts
            }
        case REMOVE_ALL_CART:
            return {
                ...state, carts: [], totalMoney: '',
            }
        default:
            return state
    }
};