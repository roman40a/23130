import asiList from '../../data/asi-list.json'

let initialState = []
asiList.forEach(
    (asiGroup) => {
        asiGroup.items.forEach(
            (asi, index) => {
                asi.index = `${asiGroup.index}.${index + 1}`
                asi.checked = false
            }
        )
        initialState.push(asiGroup)
    }
)

import {copyObject, seachElementGroupOrElement} from '../../util'

export default function asiGroupList(state = initialState, action) {
    switch (action.type){
        case 'TOGGLE_CHECKED_ASI': {
            let newASIGroupList = copyObject(state)
            const {index, deck, checked} = action.payload
            const ASIGroup = seachElementGroupOrElement(newASIGroupList, index)
            const items = ASIGroup.items
            if (items) {
                items.forEach(
                    (asi) => {
                        if ( (asi.deck == deck) || (deck == 0))
                            asi.checked = checked

                    }
                )
            } else {
                ASIGroup.checked = !ASIGroup.checked
            }

            return newASIGroupList
        }
        default:
            return state
    }
}
