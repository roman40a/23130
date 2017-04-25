import React, {Component} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {setValueFilterRooms} from '../../actions'
import RoomValueFilter from '../../components/OptionsControl/TabRooms/RoomValueFilter'



class RoomsValueFilterRedux extends Component {
    render() {
        const { filter, setValueFilterRooms } = this.props
        return <RoomValueFilter filter={filter} setValueFilterRooms={setValueFilterRooms}/>
    }
}

const mapStateToProps = (state) => {
    return {
        filter: state.rooms.filter
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setValueFilterRooms: bindActionCreators(setValueFilterRooms, dispatch)
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(RoomsValueFilterRedux)