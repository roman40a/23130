import React, {Component} from 'react'
import {FormGroup, Checkbox} from 'react-bootstrap'
import {filterElementGroupList} from '../../../../util'

export default class RoomList extends Component{

    handleChange(toggleCheckedRoom, e) {
        const index = e.target.dataset.index
        toggleCheckedRoom(index)
    }

    render() {
        const {roomsList, filter, toggleCheckedRoom, height} = this.props
        let filteredList =
            filterElementGroupList(roomsList, filter.deck, filter.value)
        // let filteredList = roomsList
        return (
            <FormGroup style={{
                overflow:'auto',
                height:height - 260,
                paddingTop: 15,
                paddingLeft: 15,
                paddingRight: 15}}>
                {filteredList.map((room) => {
                    return <Checkbox
                        onChange={this.handleChange.bind(this, toggleCheckedRoom)}
                        data-index={room.index}
                        checked={room.checked}
                        key={Math.random()}>{`${room.title} - ${room.index}`}</Checkbox>
                })}
            </FormGroup>
        )
    }
}

