import React, {Component} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {toggleContextModel} from '../../actions'
import ContextSetter from '../../components/OptionsControl/TabLayouts/ContextSetter'


class ContextSetterRedux extends Component {
    render() {
        const { context, toggleContextModel, deck } = this.props
        return <ContextSetter context={context} toggleContextModel={toggleContextModel} deck={deck}/>
    }
}

const mapStateToProps = (state) => {
    return {
        context: state.model.context,
        deck: state.model.deck
    }
}

function mapDispatchToProps(dispatch) {
    return {
        toggleContextModel: bindActionCreators(toggleContextModel, dispatch)
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(ContextSetterRedux)