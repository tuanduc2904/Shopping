
export function updateProfile() {
    return {
        type: 'UPDATE_PROFILE'
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

