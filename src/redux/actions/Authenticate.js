import { saveUser, getUser } from '../../untils/asyncStorage';
const update = (user) => {
    return {
        type: 'UPDATE_PROFILE',
        user
    }
}
export const updateProfile = (user) => {
    return (dispatch) => {
        dispatch(update(user));
        saveUser(user);
        saveUser(user);
    }
}
export function getUserLogin() {
    return (dispatch) => {
        getUser().then(user => dispatch(update(user)));
    }
}
export function skipLogin() {
    return {
        type: 'SKIP_LOGIN'
    }
}
export function loginSuccess(user) {
    return {
        type: 'LOGINSUCCESS',
        user
    }
}
export function logout() {
    return {
        type: 'LOGOUT'
    }
}






// export const loginSuccess = (user) => {
//     return (dispatch) => {
//         dispatch: ({
//             type: LOGINSUCCESS,
//             user: user
//         })
//     }
// }

// export const logout = () => {
//     return (dispatch) => {
//         dispatch: ({
//             type: LOGOUT
//         })
//     }
// }

