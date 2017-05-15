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
            cameraPosition: new THREE.Vector3(0, .2, .8),
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
            cameraPosition: this.refs.camera.position.clone(),
            cameraRotation: this.refs.camera.rotation.clone()
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
        const {camera} = this.refs
        const canvas = document.querySelector('#root canvas')
        // const controls = new TrackballControls(camera, canvas);
        const controls = new THREE.OrbitControls(camera, canvas);
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
            mouseInput,
        } = this.refs;

        const {
            containerWidth: width,
            containerHeight: height,
        } = this.props;

        if (width !== newProps.width || height !== newProps.height) {
            mouseInput.containerResized();
        }
    }

    _onAnimateInternal() {
        const {
            mouseInput,
            camera,
        } = this.refs;

        if (!mouseInput.isReady()) {
            const {
                scene,
                container,
            } = this.refs;

            mouseInput.ready(scene, container, camera);
            mouseInput.restrictIntersections(this.cubes);
            mouseInput.setActive(false);
        }

        if (this.state.mouseInput !== mouseInput) {
            this.setState({
                mouseInput,
            });
        }

        if (this.state.camera !== camera) {
            this.setState({
                camera,
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
                    mainCamera="camera"
                    onAnimate={this._onAnimate}
                    sortObjects={false}
                    shadowMapEnabled
                    shadowMapType={THREE.PCFShadowMap}
                    clearColor={0xf0f0f0}

                >
                    <module
                        ref="mouseInput"
                        descriptor={MouseInput}
                    />
                    <scene ref="scene" position={this.state.scenePosition}>
                        <perspectiveCamera
                            name="camera"
                            ref="camera"
                            fov={75}
                            aspect={width / height}
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
