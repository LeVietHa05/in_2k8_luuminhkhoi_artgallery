import * as THREE from 'three';

export function createFloor(scene) {
    const textureLoader = new THREE.TextureLoader();
    const floorTexture = textureLoader.load('./img/floorTexture5.jpg');

    floorTexture.wrapS = THREE.RepeatWrapping;
    floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(10, 10);

    const planeGeometry = new THREE.PlaneGeometry(20, 20);
    const planeMaterial = new THREE.MeshBasicMaterial({
        map: floorTexture,
        side: THREE.DoubleSide,
    });

    const floor = new THREE.Mesh(planeGeometry, planeMaterial);

    floor.rotation.x = Math.PI / 2;
    floor.position.y = 0; //

    scene.add(floor);

    return floor;
}