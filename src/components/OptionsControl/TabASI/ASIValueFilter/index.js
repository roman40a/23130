import React, {Component} from 'react'
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap'

export default class ASIFilter extends Component{

    handleChange(setValueFilterASI, e) {
        const value = e.target.value
        setValueFilterASI(value)
    }

    render() {
        const {filter, setValueFilterASI} = this.props
        return (
            <FormGroup style={
                {
                    paddingTop: 15,
                    paddingLeft: 5,
                    paddingRight: 5
                }
            }>
                <ControlLabel>Введите наименование АСИ для поиска</ControlLabel>
                <FormControl
                    type='text'
                    placeholder='Поиск...'
                    defaultValue={filter.value}
                    onChange={this.handleChange.bind(this, setValueFilterASI)}/>
            </FormGroup>
        )
    }
}