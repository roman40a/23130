import React, { Component } from 'react'
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap'

import deckList from '../../../../data/decks-title.json'

export default class DeckSetter extends Component {

    constructor(props) {
        super(props)
    }

    handleChange(setDeckFilterASI, e) {
        const deck = parseInt(e.target.value)
        setDeckFilterASI(deck)
    }

    render() {
        const {filter, setDeckFilterRooms} = this.props
        const deck = filter.deck
        return (
            <FormGroup style={
                {
                    paddingTop: 15,
                    paddingLeft: 10,
                    paddingRight: 10
                }
            }>
                <ControlLabel>Фильтрация по палубе</ControlLabel>
                <FormControl
                    value={deck}
                    onChange={this.handleChange.bind(this, setDeckFilterRooms)}
                    componentClass='select'
                    placeholder='Выберите палубу'>
                    <option key={Math.random()} value='0'>Все помещения</option>
                    {
                        deckList.map(
                            (deckObj)=><option key={Math.random()} value={deckObj.index}>{deckObj.title}</option>
                        )
                    }
                </FormControl>
            </FormGroup>
        )
    }
}
