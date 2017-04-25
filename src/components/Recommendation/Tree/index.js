import React, {Component} from 'react'
import Dimension from 'react-dimensions'

import './style.css'

export class Node extends Component {
    render() {
        const {content, children} = this.props
        return (
            children?
                <li className="Node IsRoot ExpandOpen">
                    <div className="Expand"></div>
                    <div className="Content">{content}</div>
                    <ul className="Container">
                        {children}
                    </ul>
                </li>:
                <li className="Node IsRoot ExpandOpen">
                    <div className="Expand"></div>
                    <div className="Content">{content}</div>
                </li>
        );
    }
}

export class Tree extends Component {
    render() {
        return (
            <ul className="Container">
                {this.props.children}
            </ul>
        );
    }
}

export default Dimension()(Tree)