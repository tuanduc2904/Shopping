import { UPDATE_MYSELLING, UPDATE_MYORDERING, LOADING_ORDER, FINISH_ORDER, DONE_ADD_ORDER, FINISH_ADD_ORDER } from '../actions/types'
const DEFAULT = {
    myOrdering: [],
    mySelling: [],
    isLoading: false,
    addDone: false,
}

export default (state = DEFAULT, action) => {
    switch (action.type) {
        case UPDATE_MYSELLING:
            return {
                ...state, mySelling: action.mySelling
            }
        case UPDATE_MYORDERING:
            return {
                ...state, myOrdering: action.myOrdering
            }
        case FINISH_ORDER:
            return {
                ...state, isLoading: false
            }
        case LOADING_ORDER:
            return {
                ...state, isLoading: true
            }
        case FINISH_ADD_ORDER:
            return {
                ...state, isLoading: false, addDone: true,
            }
        case DONE_ADD_ORDER:
            return {
                ...state, addDone: false,
            }
        default:
            return state
    }
}