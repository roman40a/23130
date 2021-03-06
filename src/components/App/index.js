import React, { Component } from 'react'
import {Grid, Row, Col} from 'react-bootstrap'
import Dimensions from 'react-dimensions'
import DeckViewerRedux from '../../containers/DeckViewerRedux'
import DeckViewer2Redux from '../../containers/DeckViewer2Redux'
import Recommendation from '../Recommendation'
import OptionsControl from '../OptionsControl'
import './bootstrap.css'

class ASI extends Component {

    render() {
        const { containerWidth: width, containerHeight: height } = this.props
        const colStyle = {
            height: height, paddingLeft: 0, paddingRight:0,
            borderStyle: 'ridge',
            borderWidth: 5,
            borderColor: '#666'
        }
        return (
            <Grid fluid={true}>
                <Row style={{width: width}}>
                    <Col md={9} style={{backgroundColor:'red', ...colStyle}}>
                        <DeckViewerRedux/>
                        <DeckViewer2Redux/>
                        <Recommendation height={height}/>
                    </Col>
                    <Col md={3} style={{backgroundColor:'white', ...colStyle}}>
                        <OptionsControl height={height}/>
                    </Col>
                </Row>
            </Grid>
        );
    }
}


export default Dimensions()(ASI)
