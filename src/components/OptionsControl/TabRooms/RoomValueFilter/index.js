import React, {Component} from 'react'
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap'

export default class RoomValueFilter extends Component{

    handleChange(setValueFilterRooms, e) {
        const value = e.target.value
        setValueFilterRooms(value)
    }

    render() {
        const {filter, setValueFilterRooms} = this.props
        return (
            <FormGroup style={
                {
                    paddingTop: 15,
                    paddingLeft: 5,
                    paddingRight: 5
                }
            }>
                <ControlLabel>Введите наименование помещения для поиска</ControlLabel>
                <FormControl
                    type='text'
                    placeholder='Поиск...'
                    defaultValue={filter.value}
                    onChange={this.handleChange.bind(this, setValueFilterRooms)}/>
            </FormGroup>
        )
    }
}