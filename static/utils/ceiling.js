import * as THREE from 'three';

export function createCeiling(scene) {
    const textureLoader = new THREE.TextureLoader();
    const ceilingTexture = textureLoader.load('./img/ceilingTexture2.jpg', (texture) => {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(10, 10);
    });

    const planeGeometry = new THREE.PlaneGeometry(20,20);
    const planeMaterial = new THREE.MeshBasicMaterial({
        //not shiny texture for the ceiling
        map: ceilingTexture,
        side: THREE.DoubleSide,
    });

    const ceiling = new THREE.Mesh(planeGeometry, planeMaterial);

    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = 3; //

    scene.add(ceiling);

    return ceiling;
}