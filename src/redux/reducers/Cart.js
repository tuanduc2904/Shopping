import {
    ADD_PRODUCT_TO_CART, REMOVE_PRODUCT_TO_CART,
    DECR_QUANTITY, INCR_QUANTITY, TOTAL_MONEY, GET_CART
} from '../actions/types';

const DEFAULT = {
    carts: [],
    totalMoney: '',
}

export default (state = DEFAULT, action) => {
    switch (action.type) {
        case ADD_PRODUCT_TO_CART:
            return {
                ...state, carts: state.carts.concat({ product: action.product, quantity: 1 })
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
            return {
                ...state, totalMoney: state.carts.map(e => e.product.price * e.quantity)
            }
        case GET_CART:
            return {
                ...state, carts: action.carts
            }
        default:
            return state
    }
};