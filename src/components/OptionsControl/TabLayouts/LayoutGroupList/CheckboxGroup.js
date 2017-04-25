import React, { Component } from 'react'
import {Row, Col, Checkbox, Button, Panel} from 'react-bootstrap'

class CheckBoxGroup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: this.props.isOpen
        }
    }

    handleChange(toggleChecked, e) {
        const {index} = e.target.dataset
        // console.log(`index -> ${index}`)
        toggleChecked(index)
    }
    handleGroupChange(toggleChecked, e){
        const checkbox = e.target
        const {index} = checkbox.dataset
        const {checked} = checkbox
        // console.log(`index -> ${index}`)
        toggleChecked(index, checked)
    }
    handleOpenClick(){
        this.setState((prevState) => ({isOpen: !prevState.isOpen}))
    }

    render(){
        const {index, checked, layoutGroup, title, toggleChecked} = this.props
        let instance = null
        const items = layoutGroup.items
        if (items) {
            instance = (
                <div>
                    <Row>
                        <Col md={1} style={{paddingLeft: 15}}>
                            <Button
                                onClick={this.handleOpenClick.bind(this)}>
                                {this.state.isOpen ? '-' : '+'}
                            </Button>
                        </Col>
                        <Col md={9} style={{paddingLeft: 25}}>
                            <Checkbox
                                checked={checked}
                                data-index={index}
                                inline={true}
                                onChange={this.handleGroupChange.bind(this, toggleChecked)}>
                                {title}
                            </Checkbox>
                        </Col>
                        <Col md={2}>{`${layoutGroup.items.length} шт.`}</Col>
                    </Row>
                    <Panel collapsible expanded={this.state.isOpen}>
                        {layoutGroup.items.map(
                            (layout, layoutIndex) => {
                                return <Checkbox
                                data-index={`${index}.${layoutIndex + 1}`}
                                checked={layout.checked}
                                onChange={this.handleChange.bind(this, toggleChecked)}
                                key={Math.random()}>
                                {layout.title}
                            </Checkbox>
                            }
                        )}
                    </Panel>
                </div>
            );
        } else {
            instance = (
                <div>
                    <Row>
                        <Col md={12}>
                            <Checkbox
                                checked={layoutGroup.checked}
                                data-index={index}
                                inline={true}
                                onChange={this.handleChange.bind(this, toggleChecked)}>
                                {title}
                            </Checkbox>
                        </Col>
                    </Row>
                </div>
            );
        }
        return (
            <Panel>
                {instance}
            </Panel>
        );
    }
}

export default CheckBoxGroup

