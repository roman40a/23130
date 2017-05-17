const initialState = 1

export default function asiGroupList(state = initialState, action) {
    switch (action.type){
        case 'SET_DECK_MODEL': {
            return action.payload
        }
        default:
            return state
    }
}
