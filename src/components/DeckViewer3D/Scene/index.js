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
            <React3
                mainCamera="camera" // this points to the perspectiveCamera which has the name set to "camera" below
                width={width}
                height={height}
                ref='react3'
                onAnimate={this._onAnimate}
                shadowMapEnabled
                shadowMapType={THREE.PCFShadowMap}
                clearColor={0xf0f0f0}

            >
                <scene ref="scene">
                    <Camera width={width} height={height}/>
                    <Lights/>
                    <Model/>
                </scene>
            </React3>
        );
    }
}