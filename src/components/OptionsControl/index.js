import React, { Component } from 'react'
import {Tabs, Tab} from 'react-bootstrap'
import DeckSetterRedux from '../../containers/TabLayouts/DeckSetterRedux'
import ContextSetterRedux from '../../containers/TabLayouts/ContextSetterRedux'
import LayoutGroupListRedux from '../../containers/TabLayouts/LayoutGroupListRedux'
import ValueFilterRedux from '../../containers/TabASI/ValueFilterRedux'
import DeckFilterRedux from '../../containers/TabASI/DeckFilterRedux'
import ASIGroupListRedux from '../../containers/TabASI/ASIGroupListRedux'

import ValueFilterRoomsRedux from '../../containers/TabRooms/ValueFilterRedux'
import DeckFilterRoomsRedux from '../../containers/TabRooms/DeckFilterRedux'
import RoomsListRedux from '../../containers/TabRooms/RoomsListRedux'


class OptionsControl extends Component {

    render() {
        const {height} = this.props
        return (
            <div>
                <Tabs defaultActiveKey={1} id='uncontrolled-tab-example' style={
                    {
                        paddingTop: 10,
                        paddingLeft: 10,
                        paddingRight: 10
                    }
                }>
                    <Tab onEntered={(e) => {console.log(e.querySelector('select'))}} eventKey={1} title='Модель' style={{marginTop:20}}>
                        <DeckSetterRedux/>
                        <ContextSetterRedux height={height}/>
                        <LayoutGroupListRedux height={height}/>
                    </Tab>
                    <Tab eventKey={2} title='АСИ'>
                        <DeckFilterRedux/>
                        <ValueFilterRedux/>
                        <ASIGroupListRedux height={height} />
                    </Tab>
                    <Tab eventKey={3} title='Помещения'>
                        <DeckFilterRoomsRedux/>
                        <ValueFilterRoomsRedux/>
                        <RoomsListRedux height={height} />
                    </Tab>
                </Tabs>
            </div>
        )
    }
}

export default OptionsControl
