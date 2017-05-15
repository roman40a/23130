import React, {Component} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {toggleCheckedRoom} from '../actions'
import DeckViewer2D from '../components/DeckViewer2D'
import DeckViewer3D from '../components/DeckViewer3D-2'

import {filterElementGroupList} from '../util'

class DeckViewerRedux extends Component {
    render() {
        const { deck, context, asiGroupList, layoutGroupList, rooms, fetching, svgDoc, toggleCheckedRoom } = this.props
        return (
            context === '3d' ?
                <DeckViewer3D
                    deck={deck}/>:
                <DeckViewer2D
                    deck={deck} asiGroupList={asiGroupList}
                    layoutGroupList={layoutGroupList} rooms={rooms}
                    fetching={fetching} svgDoc={svgDoc} toggleCheckedRoom={toggleCheckedRoom}/>
        )
    }
}

const mapStateToProps = (state) => {
    const deck = state.model.deck
    const context = state.model.context
    const filter = state.asi.filter
    const asiGroupList = state.asi.items
    const filteredList = filterElementGroupList(
        asiGroupList, deck, filter.value
    )

    const layoutGroupList = state.model.layouts
    return {
        deck: deck,
        context: context,
        asiGroupList: filteredList,
        layoutGroupList: layoutGroupList,
        fetching: state.model.layouts.fetching,
        svgDoc: state.model.layouts.svgDoc,
        rooms: state.rooms
    }
}

function mapDispatchToProps(dispatch) {
    return {
        toggleCheckedRoom: bindActionCreators(toggleCheckedRoom, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckViewerRedux)