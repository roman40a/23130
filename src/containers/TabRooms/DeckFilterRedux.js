import React, {Component} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {setDeckFilterRooms} from '../../actions'
import RoomDeckFilter from '../../components/OptionsControl/TabRooms/RoomDeckFilter'



class RoomsFilterRedux extends Component {
    render() {
        const { filter, setDeckFilterRooms } = this.props
        return <RoomDeckFilter filter={filter} setDeckFilterRooms={setDeckFilterRooms}/>
    }
}

const mapStateToProps = (state) => {
    return {
        filter: state.rooms.filter
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setDeckFilterRooms: bindActionCreators(setDeckFilterRooms, dispatch)
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(RoomsFilterRedux)