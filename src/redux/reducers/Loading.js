const LOADING = {
    isLoadingLogin: false,
    isLoadingSignUp: false
}

export default (state = LOADING, action) => {
    switch (action.type) {
        case 'LOADINGSHOWLOGIN':
            return {
                isLoadingLogin: true,
                isLoadingSignUp: false
            };
        case 'LOADINGCLOSELOGIN':
            return {
                isLoadingLogin: false,
                isLoadingSignUp: false
            };
        case 'LOADINGCLOSESIGNUP':
            return {
                isLoadingLogin: false,
                isLoadingSignUp: false
            };
        case 'LOADINGSHOWESIGNUP':
            return {
                isLoadingLogin: false,
                isLoadingSignUp: true
            };
        default:
            return state;
    }
};