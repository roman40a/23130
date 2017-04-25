import React, {Component} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {toggleCheckedASI, toggleOpenASI} from '../../actions'
import ASIGroupList from '../../components/OptionsControl/TabASI/ASIGroupList'



class ASIGroupListRedux extends Component {
    render() {
        const { asiGroupList, deck, filter, toggleCheckedASI, toggleOpenASI, height } = this.props
        return <ASIGroupList
            height={height}
            deck={deck}
            filter={filter}
            asiGroupList={asiGroupList}
            toggleCheckedASI={toggleCheckedASI} toggleOpenASI={toggleOpenASI}/>
    }
}

const mapStateToProps = (state) => {
    return {
        asiGroupList: state.asi.items,
        filter: state.asi.filter
    }
}

function mapDispatchToProps(dispatch) {
    return {
        toggleCheckedASI: bindActionCreators(toggleCheckedASI, dispatch),
        toggleOpenASI: bindActionCreators(toggleOpenASI, dispatch)
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(ASIGroupListRedux)