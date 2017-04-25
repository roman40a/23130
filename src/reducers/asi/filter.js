const initialState = {
    deck: 0,
    value: ''
}

export default function filterASI(state = initialState, action) {
    switch (action.type){
        case 'SET_VALUE_FILTER_ASI': {
            return {
                deck: state.deck,
                value: action.payload
            }
        }
        case 'SET_DECK_FILTER_ASI': {
            return {
                deck: action.payload,
                value: state.value
            }
        }
        default:
            return state
    }
}