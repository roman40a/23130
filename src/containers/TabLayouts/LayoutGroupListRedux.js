import React, {Component} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {toggleCheckedLayout, toggleOpenLayout} from '../../actions'
import LayoutGroupList from '../../components/OptionsControl/TabLayouts/LayoutGroupList'



class LayoutGroupListRedux extends Component {
    render() {
        const { layoutGroupList, toggleCheckedLayout, toggleOpenLayout, height } = this.props

        return <LayoutGroupList
            height={height}
            layoutGroupList={layoutGroupList}
            toggleCheckedLayout={toggleCheckedLayout} toggleOpenLayout={toggleOpenLayout}/>
    }
}

const mapStateToProps = (state) => {
    return {
        layoutGroupList: state.model.layouts
    }
}


function mapDispatchToProps(dispatch) {
    return {
        toggleCheckedLayout: bindActionCreators(toggleCheckedLayout, dispatch),
        toggleOpenLayout: bindActionCreators(toggleOpenLayout, dispatch)
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(LayoutGroupListRedux)
