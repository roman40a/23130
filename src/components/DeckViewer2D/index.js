import React, {PropTypes, Component} from 'react';
import CircleSVG from './circleSVG'
import {ReactSVGPanZoom} from 'react-svg-pan-zoom';
import Dimensions from 'react-dimensions'
import Information from './Information'

function noInRects(rects, position) {
    let result = true
    rects.forEach(
        (item) => {
            result = result && !((item[0] == position[0]) && (item[1] == position[1]))
        }
    )
    return result
}

class PlaneSVG extends Component {
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
                                    console.log(layout, layout["json"])
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
                                                        key={Math.random()}
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
                                    (rect) => <CircleSVG key={Math.random()} x={rect[0]} y={rect[1]} />
                                )
                            }
                        </svg>

                        {
                            interactive.map(
                                (layout) => (
                                    <svg key={Math.random()} viewBox='0 0 1024 768'>
                                        {layout}
                                    </svg>
                                )
                            )
                        }
                    </svg>
                </ReactSVGPanZoom>
                <Information deck={deck} obj={this.state.obj}/>
            </div>
        );
    }
}

export default Dimensions()(PlaneSVG)

PlaneSVG.propTypes = {
    asiGroupList: PropTypes.arrayOf(
        PropTypes.shape({
            "index": PropTypes.number,
            "title": PropTypes.string,
            "mass": PropTypes.number,
            "items": PropTypes.arrayOf(
                PropTypes.shape({
                    "index": PropTypes.string,
                    "checked": PropTypes.bool,
                    "deck": PropTypes.number,
                    "position": PropTypes.arrayOf(PropTypes.number)
                })
            )
        })
    ),
    layoutGroupList: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.shape({
                "index": PropTypes.number,
                "file": PropTypes.string,
                "checked": PropTypes.bool,
                "enable": PropTypes.bool
            }),
            PropTypes.shape({
                "index": PropTypes.number,
                "enable": PropTypes.bool,
                "items": PropTypes.arrayOf(
                    PropTypes.shape({
                        "index": PropTypes.string,
                        "file": PropTypes.string,
                        "checked": PropTypes.bool
                    })
                )
            }),
            PropTypes.shape({
                "index": PropTypes.number,
                "noImage": PropTypes.bool,
                "enable": PropTypes.bool,
                "items": PropTypes.arrayOf(
                    PropTypes.shape({
                        "index": PropTypes.string,
                        "title": PropTypes.string,
                        "json": PropTypes.string,
                        "checked": PropTypes.bool
                    })
                )
            })
        ])
    ),
    fetching: PropTypes.bool,
    svgDoc: PropTypes.any,
    toggleCheckedRoom: PropTypes.func,
    deck: PropTypes.number,
    rooms: PropTypes.shape({
        "filter": PropTypes.any,
        "items": PropTypes.arrayOf(
            PropTypes.shape({
                "index": PropTypes.string,
                "title": PropTypes.string,
                "deck": PropTypes.number,
                "checked": PropTypes.bool,
                "position": PropTypes.shape({
                    "from": PropTypes.string,
                    "to": PropTypes.string,
                    "side": PropTypes.string
                })
            })
        )
    })
}