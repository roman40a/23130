import React, {Component} from 'react'
import {FormGroup} from 'react-bootstrap'
import CheckBoxGroup from './CheckBoxGroup'

// function copyObject(object) {
//     let newObject = JSON.stringify(object)
//     newObject = JSON.parse(newObject)
//     return newObject
// }
function copyObject (obj) {
    let copy = null
    if (Array.isArray(obj)) {
        copy = obj.map(
            (item) => copyObject(item)
        )
    } else if (typeof obj == 'object') {
        copy = {}
        for (let key in obj){
            copy[key] = copyObject(obj[key])
        }
    } else {
        copy = obj
    }
    return copy;
}

function filterASIGroupList(asiGroupList = [], deck, filter){
    let newASIGroupList = []
    asiGroupList.forEach(
        (asiGroup) => {
            const {title, items} = asiGroup
            let newASIGroup = copyObject(asiGroup)
            if (title.toLowerCase().indexOf(filter.toLowerCase()) != -1) {
                if (items) {
                    let newItems = []
                    items.forEach(
                        (asi) => {
                            if ((deck == 0) ? true : (asi.deck == deck))
                                newItems.push(asi)
                        }
                    )
                    if (newItems.length > 0) {
                        newASIGroup.items = newItems
                        newASIGroupList.push(newASIGroup)
                    }
                }
            }
        }
    )
    return newASIGroupList
}

export default class ASIGroupList extends Component{
    render() {
        const {asiGroupList, filter, toggleCheckedASI, toggleOpenASI, height} = this.props
        let filteredList =
            filterASIGroupList(asiGroupList, filter.deck, filter.value)
        return (
            <FormGroup style={{
                overflow:'auto',
                height:height - 260,
                paddingTop: 15,
                paddingLeft: 15,
                paddingRight: 15}}>
                {filteredList.map((asiGroup) => {
                    const items = asiGroup.items
                    let isOpen = false
                    let checked = true
                    if (items) {
                        asiGroup.items.forEach(
                            (item) => {
                                const itemChecked = item.checked
                                isOpen = isOpen || itemChecked
                                checked = checked && itemChecked
                            }
                        )
                    }
                    return <CheckBoxGroup
                        toggleOpen={toggleOpenASI}
                        toggleChecked={toggleCheckedASI}
                        checked={checked}
                        isOpen={isOpen}
                        key={Math.random()}
                        data={asiGroup}/>
                })}
            </FormGroup>
        )
    }
}