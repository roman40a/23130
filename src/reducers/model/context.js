const initialState = '3d'

export default function reducerFunc(state = initialState, action) {
    switch (action.type){
        case 'TOGGLE_CONTEXT_MODEL': {
            return (state === '2d') ? '3d' : '2d'
        }
        default:
            return state
    }
}
