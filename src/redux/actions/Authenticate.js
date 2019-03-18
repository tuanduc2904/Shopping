
export function startLogin() {
    return {
        type: 'STARTLOGIN'
    }
}
export function loginSuccess(Auth) {
    return {
        type: 'LOGINSUCCESS',
        Auth
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

