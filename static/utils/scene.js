
import * as THREE from 'three';
import { PointerLockControls } from 'three/poiterLockControls'

export const scene = new THREE.Scene();
let camera, controls, renderer;

export function setupScene() {

    camera = new THREE.PerspectiveCamera(
        50, // Field of view
        window.innerWidth / window.innerHeight, // Aspect ratio
        0.1, // Near clipping plane
        1000 // Far clipping plane
    )
    camera.position.set(0, 1.2, 5);
    camera.lookAt(0, 1.5, 9.5);
    scene.add(camera);

    renderer = new THREE.WebGLRenderer({ antialias: true });// Enable antialiasing
    renderer.setSize(window.innerWidth, window.innerHeight);// Set the size of the renderer to the size of the window
    renderer.setPixelRatio(window.devicePixelRatio);// Set the pixel ratio of the renderer to the pixel ratio of the window
    renderer.setClearColor('#fff', 1);
    // Append the renderer to the body
    document.body.appendChild(renderer.domElement);
    //enable shadows
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    controls = new PointerLockControls(camera, document.body);
    //reduce the speed of the camera
    controls.pointerSpeed = 0.3;

    // scene.add(controls.getObject()); // Add the controls to the scene

    window.addEventListener('resize', onWindowResize, false);

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight; //update aspect ratio
        camera.updateProjectionMatrix(); //update camera
        renderer.setSize(window.innerWidth, window.innerHeight); //update renderer
    }

    return {
        camera,
        controls,
        renderer
    }
}