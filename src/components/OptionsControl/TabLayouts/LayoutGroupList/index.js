import React, {Component} from 'react'
import {FormGroup, ControlLabel} from 'react-bootstrap'
import CheckboxGroup from './CheckboxGroup'

export default class LayoutGroupList extends Component {
    render() {
        const { layoutGroupList, height, toggleCheckedLayout, toggleOpenLayout} = this.props

        return (
            <FormGroup style={{
                overflow:'auto',
                height:height - 320,
                paddingTop: 15,
                paddingLeft: 15,
                paddingRight: 15}}>
                <ControlLabel>Слои</ControlLabel>
                {
                    layoutGroupList.map(
                        (layoutGroup) => {
                            const items = layoutGroup.items
                            let isOpen = false
                            let checked = true
                            if (items) {
                                layoutGroup.items.forEach(
                                    (item) => {
                                        const itemChecked = item.checked
                                        isOpen = isOpen || itemChecked
                                        checked = checked && itemChecked
                                    }
                                )
                            }

                            return layoutGroup.enable?<CheckboxGroup
                            key={Math.random()}
                            index={layoutGroup.index}
                            layoutGroup={layoutGroup}
                            isOpen={isOpen}
                            checked={checked}
                            title={layoutGroup.title}
                            toggleChecked={toggleCheckedLayout}/>:false
                        }
                    )
                }
            </FormGroup>
        );
    }
}