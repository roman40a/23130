import React, {Component, PropTypes} from 'react'
import * as THREE from 'three';
// import MouseInput from '../inputs/MouseInput';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';

let models = []
const quantityModel = 10
for (let i = 0; i < quantityModel; i++) {
    models[i] = require(`./models/${i + 1}.json`)
}
let loader = new THREE.JSONLoader();
const basicMaterial = loader.parse(models[0]).materials[0]
const basicColor = '#ffb054'
const basicEmissive = basicMaterial.emissive

export default class Model extends Component {
    constructor(props, context){
        super(props, context);
        this.cubes = this.props.cubes
        this.state = {
            intersections: []
        }
    }

    shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate;

    render() {
        const {deck} = this.props
        // let instance = models.map(
        //     (model, index) => {
        //         const geometry = loader.parse(model).geometry
        //         return (
        //             <mesh
        //                 key={Math.random()}
        //                 ref={(mesh) => { this.cubes[index] = mesh }}
        //                 onMouseEnter={(event, intersection) => {
        //                     console.log('onMouseEnter: ' + intersection.object.name)
        //                 }}
        //                 onClick={() => {
        //                     console.log('Click!')
        //                 }}
        //                 name={`mesh${index + 1}`}
        //                 position={new THREE.Vector3(1, 0, 0)}>
        //                 <geometry faceVertexUvs={geometry.faceVertexUvs} faces={geometry.faces} vertices={geometry.vertices}/>
        //                 <meshStandardMaterial  transparent={true} opacity={1} color={basicColor} emissive={basicEmissive} />
        //             </mesh>
        //         )
        //     }
        // )

        const position = new THREE.Vector3(-.3, 0, 0)
        const {intersections} = this.state
        let activeName = ''
        if (intersections) {
            const lastIntersection = intersections[intersections.length - 1]
            activeName = lastIntersection.object.name
        }


        if ( deck == 0 ) {
            return (
                <group>
                    {
                        models.map(
                            (model, index) => {
                                const geometry = loader.parse(model).geometry
                                const condition = (activeName.slice(4) - 1) == index
                                return (
                                    <mesh
                                        key={Math.random()}
                                        ref={(mesh) => { this.cubes[index] = mesh }}
                                        onMouseEnter={(event, intersection) => {
                                            console.log('onMouseEnter: ' + intersection.object.name)
                                            this.setState((prevState) => ({intersections: prevState.intersections.concat(intersection)}))
                                            console.log(this.state.intersections)
                                        }}
                                        onMouseLeave={(event, intersection) => {
                                            console.log('onMouseLeave: ')
                                            console.log(event)
                                            console.log(intersection)
                                        }}
                                        onClick={() => {
                                            console.log('Click!')
                                        }}
                                        name={`mesh${index + 1}`}
                                        position={position}>
                                        <geometry faceVertexUvs={geometry.faceVertexUvs} faces={geometry.faces} vertices={geometry.vertices}/>
                                        <meshStandardMaterial  transparent={true} opacity={1} color={(condition)?basicColor:'#fff'} emissive={basicEmissive} />
                                    </mesh>
                                )
                            })
                    }
                </group>
            );
        } else {
            const geometry = loader.parse(models[deck - 1]).geometry
            return (
                <group>
                    <mesh
                        key={Math.random()}
                        ref={(mesh) => { this.cubes[0] = mesh }}
                        onMouseEnter={(event, intersection) => {
                            console.log('onMouseEnter: ' + intersection.object.name)
                        }}
                        onClick={() => {
                            console.log('Click!')
                        }}
                        name={'mesh1'}
                        position={position}>
                        <geometry faceVertexUvs={geometry.faceVertexUvs} faces={geometry.faces} vertices={geometry.vertices}/>
                        <meshStandardMaterial  transparent={true} opacity={1} color={basicColor} emissive={basicEmissive} />
                    </mesh>
                </group>
            );
        }
    }
}

Model.propTypes = {
    deck: PropTypes.number
}