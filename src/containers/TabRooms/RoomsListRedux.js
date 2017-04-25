import React, {Component} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {toggleCheckedRoom} from '../../actions'
import RoomsList from '../../components/OptionsControl/TabRooms/RoomsList'



class RoomsListRedux extends Component {
    render() {
        const { roomsList, filter, toggleCheckedRoom, height } = this.props
        return <RoomsList
            height={height}
            filter={filter}
            roomsList={roomsList}
            toggleCheckedRoom={toggleCheckedRoom}/>
    }
}

const mapStateToProps = (state) => {
    return {
        roomsList: state.rooms.items,
        filter: state.rooms.filter
    }
}

function mapDispatchToProps(dispatch) {
    return {
        toggleCheckedRoom: bindActionCreators(toggleCheckedRoom, dispatch)
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(RoomsListRedux)