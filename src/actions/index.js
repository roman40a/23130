export const setDeckFilterASI = (deck) => {
    return {
        type: 'SET_DECK_FILTER_ASI',
        payload: deck
    }
}

export const setValueFilterASI = (value) => {
    return {
        type: 'SET_VALUE_FILTER_ASI',
        payload: value
    }
}

export const toggleCheckedASI = (index, deck, checked) => {
    return {
        type: 'TOGGLE_CHECKED_ASI',
        payload: {index, deck, checked}
    }
}

export const toggleOpenASI = (index) => {
    return {
        type: 'TOGGLE_OPEN_ASI',
        payload: index
    }
}

export const setDeckModel = (deck) => {
    return {
        type: 'SET_DECK_MODEL',
        payload: deck
    }
}

export const toggleCheckedLayout = (index, checked) => {
    // return {
    //     type: 'TOGGLE_CHECKED_LAYOUT_MODEL',
    //     payload: {index, checked}
    // }
    return (dispatch) => {
        dispatch({
            type: 'TOGGLE_CHECKED_LAYOUT_MODEL_SUCCESS',
            payload: {index, checked}
        })

        // let xhr = new XMLHttpRequest();
        // xhr.onreadystatechange = function() {
        //     if (this.readyState == 4 && this.status == 200) {
        //         let svgDoc = xhr.responseXML.documentElement;
        //         return dispatch({
        //             type: 'TOGGLE_CHECKED_LAYOUT_MODEL_SUCCESS',
        //             payload: {index, checked, svgDoc}
        //         })
        //     }
        // }
        // xhr.open("GET", `/svg/9_plan.svg`, false);
        // xhr.send();
        // console.log('go...', xhr.onreadystatechange)



        // setTimeout(() => {
        //     dispatch({
        //         type: 'TOGGLE_CHECKED_LAYOUT_MODEL_SUCCESS',
        //         payload: {index, checked}
        //     })
        // }, 1000)
    }
}




export const toggleOpenLayout = (index) => {
    return {
        type: 'TOGGLE_OPEN_LAYOUT_MODEL',
        payload: index
    }
}

export const setDeckFilterRooms = (deck) => {
    return {
        type: 'SET_DECK_FILTER_ROOMS',
        payload: deck
    }
}

export const setValueFilterRooms = (value) => {
    return {
        type: 'SET_VALUE_FILTER_ROOMS',
        payload: value
    }
}

export const toggleCheckedRoom = (index) => {
    return {
        type: 'TOGGLE_CHECKED_ROOM',
        payload: {index}
    }
}

export const toggleContextModel = () => {
    return {
        type: 'TOGGLE_CONTEXT_MODEL'
    }
}
