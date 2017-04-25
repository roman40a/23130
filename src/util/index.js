export const copyObject = (obj) => {
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

export const seachElementGroupOrElement = (elementGroupList, index) => {
    let result = null
    elementGroupList.forEach(
        (elementGroup) => {
            if (elementGroup.index == index)
                result = elementGroup
            else {
                const items = elementGroup.items
                if (items) {
                    items.forEach(
                        (element) => {
                            if (element.index === index)
                                result = element
                        }
                    )
                }
            }
        }
    )
    return result
}

export const filterElementGroupList = (elementGroupList = [], deck, filter) => {
    let newElementGroupList = []
    elementGroupList.forEach(
        (elementGroup) => {
            const {title, items} = elementGroup
            let newElementGroup = copyObject(elementGroup)
            if (title.toLowerCase().indexOf(filter.toLowerCase()) != -1) {
                if (items) {
                    let newItems = []
                    items.forEach(
                        (element) => {
                            if ((element.deck == deck) || (deck == 0))
                                newItems.push(element)
                        }
                    )
                    if (newItems.length > 0) {
                        newElementGroup.items = newItems
                        newElementGroupList.push(newElementGroup)
                    }
                } else {
                    if ((elementGroup.deck == deck) || (deck == 0))
                        newElementGroupList.push(elementGroup)
                }
            }
        }
    )
    return newElementGroupList
}
