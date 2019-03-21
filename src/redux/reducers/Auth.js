
const INITIAL = {
    displayName: '',
    uid: '',
    email: '',
    phoneNumber: '',
    avatarSource: '',
    address: '',
    listProduct: null,
    listOrder: null,
    listSell: null,
    loggedIn: false,
    profile: false,
    nameShop: '',
}

export default (state = INITIAL, action) => {
    switch (action.type) {
        case 'LOGINSUCCESS':
            return {
                ...state,
                uid: action.user.uid,
                email: action.user.email,
                profile: false,
                loggedIn: true,
            }
        case 'LOGOUT':
            return {
                ...state,
                displayName: '',
                uid: '',
                email: '',
                phoneNumber: '',
                avatarSource: '',
                address: '',
                nameShop: '',
                listProduct: [],
                listOrder: [],
                listSell: [],
                loggedIn: false,
                profile: false,
            }
        case 'UPDATE_PROFILE':
            return {
                ...state,
                displayName: action.user.displayName,
                uid: action.user.uid,
                email: action.user.email,
                phoneNumber: action.user.phoneNumber,
                avatarSource: action.user.avatarSource,
                address: action.user.address,
                listProduct: action.user.listProduct,
                listOrder: action.user.listOrder,
                listSell: action.user.listSell,
                profile: true,
                nameShop: action.user.nameShop,
            }
        case 'SKIP_LOGIN':
            return {
                ...state,
                loggedIn: false,
            }
        default:
            return state;
    }
};