import layoutList from '../../data/layout-list.json'

const initialState = layoutList.map(
    (layoutGroup, index) => {
        layoutGroup.index = index + 1
        const items = layoutGroup.items
        if (items) {
            items.forEach(
                (layout, layoutIndex) => {
                    layout.index = `${index + 1}.${layoutIndex + 1}`
                }
            )
        }
        return layoutGroup
    }
)

import {copyObject, seachElementGroupOrElement} from '../../util'


export default function asiGroupList(state = initialState, action) {
    switch (action.type){
        case 'TOGGLE_CHECKED_LAYOUT_MODEL_REQUEST': {
            let newLayoutGroupList = copyObject(state)
            newLayoutGroupList.fetching = true
            return newLayoutGroupList
        }
        case 'TOGGLE_CHECKED_LAYOUT_MODEL_SUCCESS': {
            let newLayoutGroupList = copyObject(state)
            const {index, checked, svgDoc} = action.payload
            console.log(index, checked, svgDoc)
            const LayoutGroup = seachElementGroupOrElement(newLayoutGroupList, index)
            const items = LayoutGroup.items
            if (items) {
                items.forEach(
                    (layout) => {
                        layout.checked = checked
                    }
                )
            } else {
                LayoutGroup.checked = !LayoutGroup.checked
            }
            newLayoutGroupList.fetching = false
            newLayoutGroupList.svgDoc = svgDoc

            return newLayoutGroupList
        }
        
        default:
            return state
    }
}

