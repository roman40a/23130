import React, {Component} from 'react';
import * as THREE from 'three';

export default class Bit extends Component {
    render() {
        const {
            geometry, material, index,
            onHover, onMouseLeave
        } = this.props
        return (
            <mesh
                ref={(mesh) => { this.cubes[index] = mesh }}
                onMouseEnter={(event, intersection) => {
                    console.log('onMouseEnter: ' + intersection.object.name)
                    onHover()
                    const {lastHoveredMesh, hoveredMesh} = this.state
                    if (!lastHoveredMesh && !hoveredMesh) {
                        intersection.object.material.opacity = .1
                        this.setState({
                            lastHoveredMesh: intersection.object,
                            hoveredMesh: intersection.object
                        })
                    } else {
                        intersection.object.material.opacity = .1
                        this.setState({
                            hoveredMesh: intersection.object
                        })
                    }
                }}
                name={`mesh${index + 1}`}
                position={new THREE.Vector3(1, 0, 0)}>
                <geometry faceVertexUvs={geometry.faceVertexUvs} faces={geometry.faces} vertices={geometry.vertices}/>
                <meshStandardMaterial  transparent={true} opacity={1} color={material.color} emissive={material.emissive} />
            </mesh>
        );
    }
}