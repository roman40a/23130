import { combineReducers } from 'redux'
import deck from './deck'
import layouts from './layouts'
import context from './context'

const model = combineReducers({
    deck,
    layouts,
    context
})

export default model