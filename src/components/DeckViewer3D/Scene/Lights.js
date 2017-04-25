import React from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';
import Camera from './Camera'
import Lights from './Lights'
import Model from './Model'

export default class Scene extends React.Component {
    render() {
        const {width, height} = this.props
        return (
            <scene ref="scene">
                <perspectiveCamera
                    name="camera"
                    ref="camera"
                    fov={75}
                    aspect={width / height}
                    near={0.1}
                    far={100}
                    position={this.state.cameraPosition}
                    lookAt={this.scenePosition}
                />
                <pointLight castShadow={true} position={new THREE.Vector3(0, 200, 0)} color={'#ffffff'} intensity={1} distance={0}/>
                <pointLight castShadow={true} position={new THREE.Vector3(0, -200, 0)} color={'#ffffff'} intensity={1} distance={0}/>
                <pointLight castShadow={true} position={new THREE.Vector3(200, 0, 0)} color={'#ffffff'} intensity={1} distance={0}/>
                <pointLight castShadow={true} position={new THREE.Vector3(-200, 0, 0)} color={'#ffffff'} intensity={1} distance={0}/>
                <pointLight castShadow={true} position={new THREE.Vector3(0, 0, 200)} color={'#ffffff'} intensity={1} distance={0}/>
                <pointLight castShadow={true} position={new THREE.Vector3(0, 0, -200)} color={'#ffffff'} intensity={1} distance={0}/>

                <mesh name={`mesh`} position={new THREE.Vector3(-1, 0, 0)}>
                    <geometry faceVertexUvs={geometry.faceVertexUvs} faces={geometry.faces} vertices={geometry.vertices}/>
                    <meshStandardMaterial transparent={true} opacity={0.8} color={material.color} emissive={material.emissive} />
                </mesh>
            </scene>
        );
    }
}