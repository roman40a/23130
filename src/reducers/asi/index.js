import { combineReducers } from 'redux'
import filter from './filter'
import items from './items'

const asi = combineReducers({
    filter,
    items
})

export default asi