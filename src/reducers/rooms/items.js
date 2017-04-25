import roomList from '../../data/rooms-list.json'

let initialState = roomList.map(
    (room) => {
        const checked = false
        const deck = room.position.deck
        return {...room, checked, deck}
    }
)

import {copyObject, seachElementGroupOrElement} from '../../util'

export default function roomsList(state = initialState, action) {
    switch (action.type){
        case 'TOGGLE_CHECKED_ROOM': {
            let newRoomsList = copyObject(state)
            newRoomsList.forEach(
                (room) => room.checked = false
            )
            const {index} = action.payload
            const room = seachElementGroupOrElement(newRoomsList, index)
            room.checked = !room.checked

            return newRoomsList
        }
        default:
            return state
    }
}

