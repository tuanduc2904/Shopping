// import { LOGINSUCCESS, LOGOUT, STARTLOGIN } from '../actions/types'

const INITIAL = {
    displayName: '',
    idUser: '',
    email: '',
    phoneNumber: '',
    avatar: '',
    address: '',
    listProduct: [],
    listOrder: [],
    listSell: [],
    isLoading: false,
    loggedIn: false,
    error: false,
}

export default (state = INITIAL, action) => {
    switch (action.type) {
        case 'LOGINSUCCESS':
            return {
                displayName: action.Auth.displayName,
                idUser: action.Auth.user.uid,
                email: action.Auth.email,
                phoneNumber: action.Auth.phoneNumber,
                avatar: action.Auth.avatar,
                address: action.Auth.address,
                listProduct: action.Auth.listProduct,
                listOrder: action.Auth.listOrder,
                listSell: action.Auth.listSell,
                loggedIn: true,
                isLoading: false,

            }
        case 'STARTLOGIN':
            return {
                ...state, isLoading: true, loggedIn: false,
            }
        case 'LOGOUT':
            return {
                displayName: '',
                idUser: '',
                email: '',
                phoneNumber: '',
                avatar: '',
                address: '',
                listProduct: [],
                listOrder: [],
                listSell: [],
                loggedIn: false,
                isLoading: false,

            }
        default:
            return state;
    }
};