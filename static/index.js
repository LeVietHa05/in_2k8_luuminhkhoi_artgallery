import * as THREE from 'three'
import { PointerLockControls } from 'three/poiterLockControls'

console.log(THREE)

// Create a scene
const scene = new THREE.Scene()
// Create a camera
const camera = new THREE.PerspectiveCamera(
    75, // Field of view
    window.innerWidth / window.innerHeight, // Aspect ratio
    0.1, // Near clipping plane
    1000 // Far clipping plane
)
scene.add(camera)
camera.position.z = 5 // Move the camera back 5 units
camera.position.y = 3

// Create a renderer
const renderer = new THREE.WebGLRenderer(
    {
        antialias: true, // Enable antialiasing
    })
renderer.setSize(window.innerWidth, window.innerHeight) // Set the size of the renderer to the size of the window
renderer.setClearColor('#fff', 1) // Set the background color of the renderer to black
document.body.appendChild(renderer.domElement) // Append the renderer to the body

//let there be light
// Ambient light
let ambientLight = new THREE.AmbientLight(0x101010) //color, intensity
// ambientLight.position = camera.position //light position follows camera
scene.add(ambientLight)

// Directional light
let sunlight = new THREE.DirectionalLight(0xdddddd, 1.0) //color, intensity
sunlight.position.y = 15;
scene.add(sunlight)

//cube
let geometry = new THREE.BoxGeometry(1, 1, 1) //geometry is like a blueprint, shape and size
let material = new THREE.MeshBasicMaterial({ color: 0xff0000 }) //material is like the paint
let mesh = new THREE.Mesh(geometry, material) //mesh is the object created from the geometry and material
scene.add(mesh)

//texture loader
let textureLoader = new THREE.TextureLoader();
let floorTexture = textureLoader.load('img/floorTexture3.jpg');
floorTexture.wrapS = THREE.RepeatWrapping;
floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(10, 10)
let wallTexture = textureLoader.load('img/white-plaster-texture.jpg');

//floor plane 
let floorPlaneGeometry = new THREE.PlaneGeometry(50, 50) //width, height, widthSegments, heightSegments
let floorPlaneMaterial = new THREE.MeshBasicMaterial({
    map: floorTexture, //texture
    side: THREE.DoubleSide//side: THREE.DoubleSide to see both sides
})
let floorPlane = new THREE.Mesh(floorPlaneGeometry, floorPlaneMaterial);
floorPlane.rotation.x = Math.PI / 2; //rotate the plane to be horizontal
floorPlane.position.y = -1; //move the plane down
scene.add(floorPlane)

//walls
const wallGroup = new THREE.Group();//to hold the walls
scene.add(wallGroup);
//front wall
const frontWall = new THREE.Mesh(
    new THREE.BoxGeometry(50, 20, 0.01),
    new THREE.MeshBasicMaterial({ map: wallTexture, side: THREE.DoubleSide })
);
frontWall.position.z = -25;

//left wall
const leftWall = new THREE.Mesh(
    new THREE.BoxGeometry(0.01, 20, 50),
    new THREE.MeshBasicMaterial({ map: wallTexture, side: THREE.DoubleSide })
)
leftWall.position.x = -25;
//right wall
const rightWall = new THREE.Mesh(
    new THREE.BoxGeometry(0.01, 20, 50),
    new THREE.MeshBasicMaterial({ map: wallTexture, side: THREE.DoubleSide })
)
rightWall.position.x = 25;
//back wall
const backWall = new THREE.Mesh(
    new THREE.BoxGeometry(50, 20, 0.01),
    new THREE.MeshBasicMaterial({ map: wallTexture, side: THREE.DoubleSide })
)
backWall.position.z = 25;
wallGroup.add(rightWall, leftWall, frontWall, backWall);

//create bounding box for the walls
for (let i = 0; i < wallGroup.children.length; i++) {
    //BBOX is the bounding box of the object (manually created )
    wallGroup.children[i].BBOx = new THREE.Box3().setFromObject(wallGroup.children[i]);
}

//ceiling
// wallTexture.wrapS = THREE.RepeatWrapping;
// wallTexture.wrapT = THREE.RepeatWrapping;
// wallTexture.repeat.set(10, 10);
const ceiling = new THREE.Mesh(
    new THREE.BoxGeometry(50, 0.1, 50),
    new THREE.MeshBasicMaterial({ map: wallTexture, side: THREE.DoubleSide })
)
ceiling.position.y = 10;
scene.add(ceiling);

function createPainting(imageURL, width, height, position) {
    const textureLoadder = new THREE.TextureLoader();
    const paintingTexture = textureLoadder.load(imageURL);
    const paintingMaterial = new THREE.MeshBasicMaterial({ map: paintingTexture });
    const paintingGeometry = new THREE.PlaneGeometry(width, height);
    const painting = new THREE.Mesh(paintingGeometry, paintingMaterial);
    painting.position.set(position.x, position.y, position.z);
    return painting;
}

const painting1 = createPainting('artwork/1.jpg', 10, 10, new THREE.Vector3(15, 3, -24.99));
const painting2 = createPainting('artwork/2.jpg', 10, 10, new THREE.Vector3(-15, 3, -24.99));

scene.add(painting1, painting2);

//control
const controls = new PointerLockControls(camera, document.body);
//lock the pointer (control are activated) and hide the menu
function startExperience() {
    //lock cursor
    controls.lock();
    //hide the menu
    hideMenu();

}

function hideMenu() {
    const menu = document.getElementById('menu');
    menu.style.display = 'none';
}

function showMenu() {
    const menu = document.getElementById('menu');
    menu.style.display = 'block';
}

const play_button = document.getElementById('play_button');
play_button.addEventListener('click', startExperience);
controls.addEventListener('lock', () => {
    hideMenu();
    //add event listener
    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener("keyup", onKeyUp, false);
});
controls.addEventListener('unlock', () => {
    showMenu();
    //remove event listener
    document.removeEventListener('keydown', onKeyDown, false);
    document.removeEventListener('keyup', onKeyUp, false);
});

const key = {
    w: false,
    s: false,
    a: false,
    d: false,
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
}

function onKeyUp(e) {
    if (e.key in key) {
        key[e.key] = false;
    }
}

function onKeyDown(e) {
    if (e.key in key) {
        key[e.key] = true;
    }
}

//clock to keep track of the time between frames
const clock = new THREE.Clock();

//update the movement of the camera each frame (delta is the time between frames)
function updateMovement(delta) {
    let moveMent = 10 * delta; //movement speed

    let previousPosition = camera.position.clone();

    if (key.w || key.ArrowUp) {
        controls.moveForward(moveMent);
    }
    if (key.s || key.ArrowDown) {
        controls.moveForward(-moveMent);
    }
    if (key.a || key.ArrowLeft) {
        controls.moveRight(-moveMent);
    }
    if (key.d || key.ArrowRight) {
        controls.moveRight(moveMent);
    }

    //check for collision
    if (checkCollision()) {
        //if there is a collision, reset the camera position
        camera.position.copy(previousPosition);
    }
}

function checkCollision() {
    const playerBBox = new THREE.Box3(); //bounding box for the player
    const cameraWorldPosition = new THREE.Vector3(); //camera position in world coordinates (to hold the camera position)

    camera.getWorldPosition(cameraWorldPosition); //get the camera position in world coordinates (same as the player position)

    //set the bounding box center to the camera position with a size of 0.5, 1.8, 0.5
    playerBBox.setFromCenterAndSize( 
        cameraWorldPosition,
        new THREE.Vector3(0.5, 1.8, 0.5)
    )

    //check for collision with the walls
    for (let i = 0; i < wallGroup.children.length; i++) {
        const wall = wallGroup.children[i];
        if (playerBBox.intersectsBox(wall.BBOx)) {
            return true;
        }
    }
    return false;
}

let renderLoop = function () {
    mesh.rotation.x += 0.1 //rotate the mesh
    mesh.rotation.y += 0.1 //rotate the mesh
    //update the movement of the camera each frame
    updateMovement(clock.getDelta());
    //render
    renderer.render(scene, camera);
    requestAnimationFrame(renderLoop);
}

// Call the render loop
renderLoop();
