const initialState = 0

export default function asiGroupList(state = initialState, action) {
    switch (action.type){
        case 'SET_SECOND_DECK_MODEL': {
            return action.payload
        }
        default:
            return state
    }
}
