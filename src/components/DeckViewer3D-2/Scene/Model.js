import React from 'react';
import * as THREE from 'three';
import model from '../../../data/models-3d/1/1-full-plan.json'

let loader = new THREE.JSONLoader();
const basicMaterial = loader.parse(model).materials[0]
const basicColor = basicMaterial.color
const basicEmissive = basicMaterial.emissive

let models = []
const quantityModel = 5
for (let i = 0; i < quantityModel; i++) {
    models[i] = require(`../models/${i + 1}.json`)
}

export default class Model extends React.Component {

    render() {
        const {deck} = this.props
        const modelInstance = (
            models.map(
                (model, index) => {
                    const geometry = loader.parse(model).geometry
                    const instance = (
                        <mesh name={`mesh${index + 1}`} position={new THREE.Vector3(1, 0, 0)}>
                            <geometry faceVertexUvs={geometry.faceVertexUvs} faces={geometry.faces} vertices={geometry.vertices}/>
                            <meshStandardMaterial  transparent={true} opacity={1} color={basicColor} emissive={basicEmissive} />
                        </mesh>
                    )
                    if ( deck == 0 ) {
                        return (
                            instance
                        );
                    } else {
                        if ( (index + 1) == deck ) {
                            return (
                                instance
                            );
                        }
                    }
                }
            )
        )
        return (
            <group>
                {modelInstance}
            </group>
        );
    }
}

Model.propTypes = {
    deck: React.PropTypes.number
}