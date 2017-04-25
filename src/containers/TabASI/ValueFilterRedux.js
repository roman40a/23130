import React, {Component} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {setValueFilterASI} from '../../actions'
import ASIValueFilter from '../../components/OptionsControl/TabASI/ASIValueFilter'



class ASIValueFilterRedux extends Component {
    render() {
        const { filter, setValueFilterASI } = this.props
        return <ASIValueFilter filter={filter} setValueFilterASI={setValueFilterASI}/>
    }
}

const mapStateToProps = (state) => {
    return {
        filter: state.asi.filter
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setValueFilterASI: bindActionCreators(setValueFilterASI, dispatch)
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(ASIValueFilterRedux)