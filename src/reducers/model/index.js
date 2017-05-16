import { combineReducers } from 'redux'
import deck from './deck'
import secondDeck from './secondDeck'
import layouts from './layouts'
import context from './context'

const model = combineReducers({
    deck,
    secondDeck,
    layouts,
    context
})

export default model