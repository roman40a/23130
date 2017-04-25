import React from 'react';
import ReactDOM from 'react-dom'
import {ReactSVGPanZoom} from 'react-svg-pan-zoom';
import Dimensions from 'react-dimensions'
import Information from './Information'

class CircleSVG extends React.Component {
    render() {
        const [x, y] = this.props.position
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

function noInRects(rects, position) {
    let result = true
    rects.forEach(
        (item) => {
            result = result && !((item[0] == position[0]) && (item[1] == position[1]))
        }
    )
    return result
}

class PlaneSVG extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.Viewer = null;
        this.state = {
            obj: null
        }
    }

    /*componentDidMount() {
        window.onresize = () => {
            console.log(this.Viewer)
            this.Viewer.setState((prevState) => {
                const value = {
                    value: {
                        a: prevState.value.a,
                        b: prevState.value.b,
                        c: prevState.value.c,
                        d: prevState.value.d,
                        e: prevState.value.e,
                        f: prevState.value.f,
                        endX: prevState.value.endX,
                        endY: prevState.value.endY,
                        focus: prevState.value.focus,
                        mode: prevState.value.mode,
                        startX: prevState.value.startX,
                        startY: prevState.value.startY,
                        viewerHeight: this.props.containerHeight - 5,
                        viewerWidth: this.props.containerWidth - 5
                    }
                }
                console.log(value)
                console.log(this.props.containerHeight, this.props.containerWidth)
                return value
            })
        }
    }*/


    render() {
        let width = this.props.containerWidth
        let height = this.props.containerHeight
        // const href = `./svg/${this.props.deck}_plan.svg`
        const {asiGroupList, layoutGroupList, fetching, svgDoc, deck, toggleCheckedRoom} = this.props
        console.log('From Plane', svgDoc)
        let rects = []
        if (asiGroupList) {
            asiGroupList.forEach(
                (asiGroup) => {
                    asiGroup.items.forEach(
                        (asi) => {
                            const nextPosition = asi.position
                            if (
                                asi.checked
                                && noInRects(rects, nextPosition)
                            )
                                rects.push(nextPosition)
                        }
                    )
                }
            )
        }

        let instance = []
        let interactive = []
        if(layoutGroupList) {
            layoutGroupList.forEach(
                (layoutGroup) => {
                    if (!layoutGroup.noImage){
                        const {checked} = layoutGroup
                        const items = layoutGroup.items
                        if (items) {
                            items.forEach(
                                (layout) => {
                                    if (layout.checked) {
                                        const href = `./svg/model/${deck}/${deck}_${layout.file}.svg`
                                        const img = <image onLoad={ function(){console.log('Loaded!!')} }
                                                           xlinkHref={href} x={0} y={0} width={width} height={height}/>
                                        instance.push(img)
                                    }
                                }
                            )
                        } else {
                            if (checked) {
                                const href = `./svg/model/${deck}/${deck}_${layoutGroup.file}.svg`
                                const img = <image
                                    xlinkHref={href} x={0} y={0} width={width} height={height}/>
                                instance.push(img)
                            }
                        }
                    }
                    else {
                        const {items} = layoutGroup
                        if (items) {
                            items.forEach(
                                (layout) => {
                                    const checked = layout.checked
                                    const data = require(`../../data/${layout["json"]}.json`)
                                    const roomsPolygons = data[deck - 1].items.map(
                                        (room) => {
                                            if (!room.path) {
                                                const {rooms} = this.props
                                                let activeRoom = null
                                                if (rooms) {
                                                    rooms.items.forEach(
                                                        (room) => {
                                                            if (room.checked) {
                                                                activeRoom = room.index
                                                            }
                                                        }
                                                    )
                                                }
                                                const index = room.index
                                                const roomPolygon = (
                                                    <path
                                                        d={room.points}
                                                        style={
                                                            {
                                                                stroke: 'yellow',
                                                                strokeWidth: 2,
                                                                fill: (index == activeRoom)?'rgb(255,0,0)':'rgb(150,150,150)',
                                                                fillOpacity: (index == activeRoom)?.7:0,
                                                                cursor: checked?'pointer':'default'
                                                            }
                                                        }
                                                        className={`room n${index}`}
                                                        onMouseEnter={
                                                            (checked) ?
                                                                (e) => {
                                                                    const room = e.target
                                                                    room.style.fillOpacity = (index == activeRoom)?.7:.2
                                                                    this.setState({obj: index})
                                                            }:
                                                                ()=>{}
                                                        } onMouseLeave={
                                                        checked ?
                                                            (e) => {
                                                                const room = e.target
                                                                room.style.fillOpacity = (index == activeRoom)?.7:0
                                                                this.setState({obj: null})
                                                            }:
                                                            ()=>{}
                                                        } onClick={
                                                            () => {
                                                                toggleCheckedRoom(index)
                                                            }
                                                        }
                                                    />
                                                )
                                                return roomPolygon
                                            }
                                        }
                                    )
                                    interactive.push(roomsPolygons)
                                }
                            )
                        }
                    }
                }
            )
        }

        return (
            fetching ?
                <div>Loading...</div>:
            <div>
                <ReactSVGPanZoom
                    SVGBackground={'#212830'}
                    background={'#212830'}
                    width={width} height={height} ref={Viewer => this.Viewer = Viewer}
                    onClick={() => console.log(this.Viewer)}

                    scaleFactor={'1.5'} detectAutoPan ={false}>


                    <svg width={width} height={height} ref='svg'>
                        {instance}
                        <svg viewBox='0 0 1024 768'>
                            {
                                rects.map(
                                    (rect) => <CircleSVG position={rect} />
                                )
                            }
                        </svg>

                        {
                            interactive.map(
                                (layout) => (
                                    <svg viewBox='0 0 1024 768'>
                                        {layout}
                                    </svg>
                                )
                            )
                        }
                    </svg>
                </ReactSVGPanZoom>
                <Information deck={this.props.deck} obj={this.state.obj}/>
            </div>
        );
    }
}

export default Dimensions()(PlaneSVG)

