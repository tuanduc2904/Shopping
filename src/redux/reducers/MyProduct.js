const INITIAL = {
    myProducts: [],
    isAdding: false,
    err: null,
    success: false,
}

export default (state = INITIAL, action) => {
    switch (action.type) {
        case 'START_ADD':
            return {
                ...state, isAdding: true, err: null, success: false,
            }
        case 'ADD_SUCCESS':
            return {
                ...state, isAdding: false, err: null, success: true, myProducts: state.myProducts.concat(action.product)
            }
        case 'ADD_ERR':
            return {
                ...state, isAdding: false, err: 'Không đăng được sản phẩm.', success: false,
            }
        case 'FINISH':
            return {
                ...state, err: null, success: false, isAdding: false
            }
        default:
            return state;
    }
}