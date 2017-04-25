import React from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';

export default class Scene extends React.Component {
    render() {
        const {width, height} = this.props
        return (
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
    );
    }
}