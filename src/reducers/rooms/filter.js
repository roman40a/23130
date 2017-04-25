const initialState = {
    deck: 0,
    value: ''
}

export default function filterRooms(state = initialState, action) {
    switch (action.type){
        case 'SET_VALUE_FILTER_ROOMS': {
            return {
                deck: state.deck,
                value: action.payload
            }
        }
        case 'SET_DECK_FILTER_ROOMS': {
            return {
                deck: action.payload,
                value: state.value
            }
        }
        default:
            return state
    }
}