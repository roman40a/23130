import React, {Component} from 'react'
import {Row, Col} from 'react-bootstrap'

import deckList from '../../data/decks-title.json'
import roomList from '../../data/rooms-list.json'

import {seachElementGroupOrElement} from '../../util'

export default class Information extends Component {
    render() {
        const style = {
            position: 'absolute',
            bottom: 10,
            right: 10,
            width: 'calc(100% - 20px)',
            opacity: .7,
            backgroundColor: 'black',
            borderRadius: 5,
            webkitBoxShadow: '0px 0px 25px -4px rgba(255,255,255,.5',
            mozBoxShadow: '0px 0px 25px -4px rgba(255,255,255,.5',
            boxShadow: '0px 0px 25px -4px rgba(255,255,255,.5',
            fontSize: 20,
            color: 'rgba(255,255,0,.7)',
            fontFamily: 'Helvetica Neue'
        }
        const rowStyle = {
            paddingLeft: 10,
            paddingTop: 10,
            paddingBottom: 10
        }
        const title = seachElementGroupOrElement(deckList, this.props.deck).title
        const obj = seachElementGroupOrElement(roomList, this.props.obj)

        const objTitle = obj?obj.title:''

        return (
            <div style={style}>
                <Row style={{...rowStyle, paddingBottom: 0, opacity: 1}}>
                    <Col md={1} >ПАЛУБА</Col>
                    <Col md={11}>{title}</Col>
                </Row>
                <Row style={{...rowStyle, opacity: 1}}>
                    <Col md={1} >ОБЪЕКТ</Col>
                    <Col md={11}>{`${this.props.obj} - ${objTitle}`}</Col>


                </Row>
            </div>
        )
    }
}

