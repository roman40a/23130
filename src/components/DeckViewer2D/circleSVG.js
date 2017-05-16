import React, {Component, PropTypes} from 'react';

export default class CircleSVG extends Component {
    render() {
        const {x, y} = this.props
        const [begin, dur, from, to] = [.5, 1, 0, 30]
        return (
            <g>
                <circle key={Math.random()} cx={x} cy={y} r='1' style={{stroke:'#f00', fill:'none', strokeWidth: '2px'}}/>
                <circle key={Math.random()} cx={x} cy={y} r='0' style={{stroke:'#f00', fill:'none', strokeWidth: '2px'}}>
                    <animate
                        attributeName='r'
                        begin={0}
                        dur={dur}
                        from={from}
                        to={to}
                        repeatCount='indefinite'
                    />
                    <animate attributeType='CSS' attributeName='opacity'
                             from={1} to={0} begin={0} dur={dur} repeatCount='indefinite' />
                </circle>
                <circle key={Math.random()} cx={x} cy={y} r='0' style={{stroke:'#f00', fill:'none', strokeWidth: '2px'}}>
                    <animate
                        attributeName='r'
                        begin={begin}
                        dur={dur}
                        from={from}
                        to={to}
                        repeatCount='indefinite'
                    />
                    <animate attributeType='CSS' attributeName='opacity'
                             from={1} to={0} begin={begin} dur={dur} repeatCount='indefinite' />
                </circle>
            </g>
        );
    }
}

CircleSVG.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
}