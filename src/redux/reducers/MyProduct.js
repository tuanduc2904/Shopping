const INITIAL = {
    myProducts: [],
    isAdding: false,
    err: null,
}

export default (state = INITIAL, action) => {
    switch (action.type) {
        case 'START_ADD':
            return {
                ...state, isAdding: true, err: null
            }
        case 'ADD_SUCCESS':
            return {
                ...state, isAdding: false, err: null, myProducts: myProducts.concat(action.product)
            }
        case 'ADD_ERR':
            return {
                ...state, isAdding: false, err: 'Không đăng được sản phẩm.'
            }
        default:
            return state;
    }
}