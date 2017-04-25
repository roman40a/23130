import React, {Component} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {setDeckModel} from '../../actions'
import DeckSetter from '../../components/OptionsControl/TabLayouts/DeckSetter'


class DeckSetterRedux extends Component {
    render() {
        const { deck, setDeckModel } = this.props
        return <DeckSetter deck={deck} setDeckModel={setDeckModel}/>
    }
}

const mapStateToProps = (state) => {
    return {
        deck: state.model.deck
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setDeckModel: bindActionCreators(setDeckModel, dispatch)
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(DeckSetterRedux)