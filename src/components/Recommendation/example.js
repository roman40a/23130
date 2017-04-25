import React, {Component} from 'react'
import Dimension from 'react-dimensions'
import {Tabs, Tab, PageHeader} from 'react-bootstrap'
import {Tree, Node} from './Tree'
import './Tree/style.css'

class TextExample extends Component {
    render() {
        const styleTabs = {
            padding: 15
        }
        return (
            <Tabs defaultActiveKey={1} style={styleTabs}>
                <Tab eventKey={1} title="Обнаружение">
                    <PageHeader>ТАМБУР №1 <small>ОБНАРУЖЕНИЕ</small></PageHeader>
                    <Tree>
                        <Node content='Root'>
                            <Node content='item 1'/>
                        </Node>
                    </Tree>
                </Tab>
                <Tab eventKey={2} title="Оценка">Tab 2 content</Tab>
                <Tab eventKey={3} title="Локализация">Tab 3 content</Tab>
                <Tab eventKey={4} title="Ликвидация">Tab 3 content</Tab>
                <Tab eventKey={5} title="Восстановление">Tab 3 content</Tab>
            </Tabs>
        );
    }
}

export default Dimension()(TextExample)