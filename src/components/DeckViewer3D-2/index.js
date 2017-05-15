import React from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';
import MouseInput from './inputs/MouseInput';
import Dimensions from 'react-dimensions'
// import TrackballControls from './controls/trackball';
import './controls/orbit';
import Model from './Model'

class DeckViewer3D extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            cameraRotation: new THREE.Euler(),
            cameraPosition: new THREE.Vector3(0, .8, 0),
            scenePosition: new THREE.Vector3(0, 0, 0),
            mouseInput: null,
            hoveredMesh: null,
            lastHoveredMesh: null
        };
        const deck = this.props.deck
        this.cubes = []
        if (deck != 0){
            this.cubes.length = 1
        }
    }

    _onTrackballChange = () => {
        this.setState({
            cameraPosition: this.refs.camera2.position.clone(),
            cameraRotation: this.refs.camera2.rotation.clone()
        });
    };

    _onAnimate = () => {
        // const {camera} = this.refs
        // raycaster.setFromCamera( mouse, camera );
        // if (this.controls){
        //     this.controls.update();
        // }
        this._onAnimateInternal();
    };

    componentDidMount() {
        const {camera2} = this.refs
        const canvas = document.querySelectorAll('#root canvas')[1]
        // const controls = new TrackballControls(camera2, canvas);
        const controls = new THREE.OrbitControls(camera2, canvas);
        this.controls = controls;
        this.controls.addEventListener('change', this._onTrackballChange);
        console.log(THREE)
    }

    componentWillUnmount() {
        delete this.stats;
        this.controls.dispose();
        delete this.controls;
    }

    componentDidUpdate(newProps) {
        const {
            mouseInput2,
        } = this.refs;

        const {
            containerWidth: width,
            containerHeight: height,
        } = this.props;

        if (width !== newProps.width || height !== newProps.height) {
            mouseInput2.containerResized();
        }
    }

    _onAnimateInternal() {
        const {
            mouseInput2,
            camera2,
        } = this.refs;

        if (!mouseInput2.isReady()) {
            const {
                scene,
                container,
            } = this.refs;

            mouseInput2.ready(scene, container, camera2);
            mouseInput2.restrictIntersections(this.cubes);
            mouseInput2.setActive(false);
        }

        if (this.state.mouseInput !== mouseInput2) {
            this.setState({
                mouseInput2,
            });
        }

        if (this.state.camera !== camera2) {
            this.setState({
                camera: camera2,
            });
        }

        // this.stats.update();
        this.controls.update();
    }

    render() {
        const {
            containerWidth: width,
            containerHeight: height,
            deck
        } = this.props;

        return (
            <div ref='container' className='3DViewer'>
                <React3
                    width={width}
                    height={height}
                    antialias
                    pixelRatio={window.devicePixelRatio}
                    mainCamera="camera2"
                    onAnimate={this._onAnimate}
                    sortObjects={false}
                    shadowMapEnabled
                    shadowMapType={THREE.PCFShadowMap}
                    clearColor={0xf0f0f0}

                >
                    <module
                        ref="mouseInput2"
                        descriptor={MouseInput}
                    />
                    <scene ref="scene" position={this.state.scenePosition}>
                        <perspectiveCamera
                            name="camera2"
                            ref="camera2"
                            fov={75}
                            aspect={width / (height)}
                            near={0.1}
                            far={100}
                            position={this.state.cameraPosition}
                            rotation={this.state.cameraRotation}
                        />
                        <pointLight castShadow={true} position={new THREE.Vector3(0, 200, 0)} color={'#ffffff'} intensity={1} distance={0}/>
                        <pointLight castShadow={true} position={new THREE.Vector3(0, -200, 0)} color={'#ffffff'} intensity={1} distance={0}/>
                        <pointLight castShadow={true} position={new THREE.Vector3(200, 0, 0)} color={'#ffffff'} intensity={1} distance={0}/>
                        <pointLight castShadow={true} position={new THREE.Vector3(-200, 0, 0)} color={'#ffffff'} intensity={1} distance={0}/>
                        <pointLight castShadow={true} position={new THREE.Vector3(0, 0, 200)} color={'#ffffff'} intensity={1} distance={0}/>
                        <pointLight castShadow={true} position={new THREE.Vector3(0, 0, -200)} color={'#ffffff'} intensity={1} distance={0}/>
                        <Model deck={deck} cubes={this.cubes}/>
                    </scene>
                </React3>
            </div>
        );
    }
}

export default Dimensions()(DeckViewer3D)
