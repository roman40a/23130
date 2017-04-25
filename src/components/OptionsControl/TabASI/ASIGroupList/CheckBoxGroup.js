import React, { Component } from 'react'
import {Row, Col, Checkbox, Button, Panel} from 'react-bootstrap'

function shorter(title, maxLength = 30) {
    if (title.length >= maxLength) {
        return title.slice(0, maxLength - 3) + '...'
    }
    return title
}

class CheckBoxGroup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: this.props.isOpen
        }
    }

    handleChange(toggleChecked, e) {
        const {index, deck} = e.target.dataset
        // console.log(`index -> ${index}`)
        toggleChecked(index, deck)
    }
    handleGroupChange(toggleChecked, e){
        const checkbox = e.target
        const {index, deck} = checkbox.dataset
        const {checked} = checkbox
        // console.log(`index -> ${index}`)
        toggleChecked(index, deck, checked)
    }
    handleOpenClick(){
        this.setState((prevState) => ({isOpen: !prevState.isOpen}))
    }

    render(){
        const {index, title, items } = this.props.data
        const {toggleChecked, checked} = this.props
        let deck = items[0].deck
        items.forEach(
            (asi) => {
                if (items[0].deck != asi.deck) {
                    deck = 0
                    return
                }
            }
        )
        return (
            <Panel>
                <Row>
                    <Col md={1} style={{paddingLeft: 15}}>
                        <Button
                            onClick={this.handleOpenClick.bind(this)}>
                            {this.state.isOpen ? '-' : '+'}
                        </Button>
                    </Col>
                    <Col md={9} style={{paddingLeft: 25}}>
                            <Checkbox
                                onChange={this.handleGroupChange.bind(this, toggleChecked)}
                                checked={checked}
                                inline={true}
                                data-deck={deck}
                                data-index={index}>
                                {shorter(title)}
                            </Checkbox>
                    </Col>
                    <Col md={2}>{`${items.length} шт.`}</Col>
                </Row>
                <Panel collapsible expanded={this.state.isOpen}>
                    {items.map(
                        (asi) => <Checkbox
                            onChange={this.handleChange.bind(this, toggleChecked)}
                            data-position={asi.position}
                            data-deck={deck}
                            data-index={asi.index}
                            checked={asi.checked}
                            key={Math.random()}>{`${title} (${asi.index}) (${asi.position})`}
                        </Checkbox>
                    )}
                </Panel>
            </Panel>
        );
    }
}

CheckBoxGroup.PropTypes = {
    data: React.PropTypes.shape({
        index: React.PropTypes.number,
        title: React.PropTypes.string,
        items: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                index: React.PropTypes.number,
                position: React.PropTypes.arrayOf(React.PropTypes.number),
                checked: React.PropTypes.bool
            })
        )
    }).isRequired,
    handleChange: React.PropTypes.func.isRequired
}

export default CheckBoxGroup