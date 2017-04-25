import { combineReducers } from 'redux'
import model from './model'
import asi from './asi'
import rooms from './rooms'

const app = combineReducers({
    model,
    asi,
    rooms
})

export default app
