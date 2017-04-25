import React, { Component } from 'react'
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap'

import deckList from '../../../../data/decks-title.json'



export default class DeckSetter extends Component {

    constructor(props) {
        super(props)
    }

    handleChange(setDeckModel, e) {
        const deck = parseInt(e.target.value)
        setDeckModel(deck)
    }

    render() {
        const {deck, setDeckModel} = this.props
        return (
            <FormGroup style={
                {
                    paddingTop: 15,
                    paddingLeft: 10,
                    paddingRight: 10
                }
            }>
                <ControlLabel>Текущая палуба</ControlLabel>
                <FormControl
                    value={deck}
                    onChange={this.handleChange.bind(this, setDeckModel)}
                    componentClass='select'
                    placeholder='Выберите палубу' autoFocus={true}>
                    {deckList.map((deckObj)=><option key={Math.random()} value={deckObj.index}>{deckObj.title}</option>)}
                </FormControl>
            </FormGroup>
        )
    }
}
