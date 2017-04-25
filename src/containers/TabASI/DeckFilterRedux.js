import React, {Component} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {setDeckFilterASI} from '../../actions'
import ASIDeckFilter from '../../components/OptionsControl/TabASI/ASIDeckFilter'



class ASIFilterRedux extends Component {
    render() {
        const { filter, setDeckFilterASI } = this.props
        return <ASIDeckFilter filter={filter} setDeckFilterASI={setDeckFilterASI}/>
    }
}

const mapStateToProps = (state) => {
    return {
        filter: state.asi.filter
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setDeckFilterASI: bindActionCreators(setDeckFilterASI, dispatch)
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(ASIFilterRedux)