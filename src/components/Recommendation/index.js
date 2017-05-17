import React, {Component} from 'react'
import './style.css'
import TextExample from './example'

export default class Recommendation extends Component {

    constructor(props) {
        super(props)
        this.state = {
            open: false
        }
    }

    render() {
        const width = 500
        const height = this.props.height - 10
        const togglePanelStyle = {
            width: width,
            height: height - 10
        }
        const open = this.state.open
        return (
            <div style={{position: 'absolute', top: 0, left: 0, height: height}}>
                <div className='box-arrow' style={{backgroundColor: open?'white':'', opacity:open?0.7:''}} onClick={
                    () => this.setState({open: !open})
                }>
                    <div className='arrow' style={{backgroundColor: open?'':'black'}}>
                        <img src={open?'/img/arrow-back.svg':'/img/arrow.svg'}/>
                    </div>
                </div>
                <div className='toggle-panel' style={{width: open?(innerWidth / 3 * 2):0}}>
                    {open?<TextExample/>:''}
                </div>
            </div>
        )
    }
}

