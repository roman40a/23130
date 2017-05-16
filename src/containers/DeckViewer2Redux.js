import React, {Component} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {setDeckModel, setSecondDeckModel} from '../actions'
import DeckViewer2 from '../components/DeckViewer3D-2'

class DeckViewerRedux extends Component {

    handleClick(deck, secondDeck) {
        const {setDeckModel, setSecondDeckModel } = this.props
        setSecondDeckModel(deck);
        setDeckModel(secondDeck)
    }

    render() {
        const { deck, secondDeck } = this.props
        const bothSizes = 200
        const windowStyle ={
            position: 'fixed', top: 25, right: 505,
            height: bothSizes,
            width: bothSizes,
            paddingLeft: 0, paddingRight:0,
            borderStyle: 'ridge',
            borderWidth: 5,
            borderColor: '#666'
        }
        return (
            <div style={windowStyle} onDoubleClick={this.handleClick.bind(this, deck, secondDeck)}>
                <DeckViewer2 deck={secondDeck}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const {deck, secondDeck} = state.model
    return {
        secondDeck,
        deck
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setSecondDeckModel: bindActionCreators(setSecondDeckModel, dispatch),
        setDeckModel: bindActionCreators(setDeckModel, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckViewerRedux)