import { combineReducers } from 'redux'
import filter from './filter'
import items from './items'

const rooms = combineReducers({
    filter,
    items
})

export default rooms