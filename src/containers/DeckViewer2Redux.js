import React, {Component} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
// import {setDeckModel, setSecondDeckModel} from '../actions'
import {toggleCheckedRoom} from '../actions'
import DeckViewer2 from '../components/DeckViewer3D-2'

import {filterElementGroupList} from '../util'

class DeckViewerRedux extends Component {

    constructor(props) {
        super(props)
        this.state = {
            fullScreen: false,
            show: true,
            action: false
        }
    }

    handleClick() {
        // const {setDeckModel, setSecondDeckModel } = this.props
        // setSecondDeckModel(deck);
        // setDeckModel(secondDeck)
        // const div = e.currentTarget
        // div.height = '500px'
        // div.width = '500px'
        // div.left = '0 px'
        // div.top = '0 px'
        this.setState((prevState)=>({fullScreen: !prevState.fullScreen}))
        // const handler = window.onresize
        // setTimeout(1000, () => {handler()})
    }

    render() {
        // const { deck, secondDeck } = this.props
        const {fullScreen, show, action} = this.state
        const bothSizes = 300
        const fullHeight = innerHeight
        const fullWidth = innerWidth - bothSizes - 5

        const { deck, context, asiGroupList, layoutGroupList, rooms, fetching, svgDoc, toggleCheckedRoom } = this.props

        const condition = (fullScreen)
        const windowStyle ={
            position: 'fixed', top: condition?0:25, right: condition?(innerWidth / 4):(innerWidth / 4 + 25),

            height: condition?fullHeight:bothSizes,
            width: condition?fullWidth:bothSizes,
            paddingLeft: 0, paddingRight:0,
            borderStyle: 'ridge',
            borderWidth: 5,
            borderColor: '#666',
            // transition: 'all 1s cubic-bezier(0, 0, 1, 1)'
        }

        return (
            <div style={windowStyle}
                 onDoubleClick={this.handleClick.bind(this)} onTransitionEnd={() => {
                     // this.setState({show: true});

                     // console.log(`Закончил ${fullScreen?'увеличиваться':'уменьшаться'}`)
                 }}>
                <div style={{opacity: (show)?1:0, transition: 'all 1s cubic-bezier(0, 0, 1, 1)'}}
                     /*onTransitionEnd={() => {
                         this.setState({fullScreen: true, action: false});
                         // console.log(`Закончил ${show?'появляться':'исчезать'}`)
                     }}*/>
                    <DeckViewer2
                        deck={deck}
                        containerWidth={fullScreen?fullWidth:bothSizes}
                        containerHeight={fullScreen?fullHeight:bothSizes}/>
                </div>
            </div>
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

// const mapStateToProps = (state) => {
//     const {deck, secondDeck} = state.model
//     return {
//         secondDeck,
//         deck
//     }
// }
//
// function mapDispatchToProps(dispatch) {
//     return {
//         setSecondDeckModel: bindActionCreators(setSecondDeckModel, dispatch),
//         setDeckModel: bindActionCreators(setDeckModel, dispatch)
//     }
// }

export default connect(mapStateToProps, mapDispatchToProps)(DeckViewerRedux)