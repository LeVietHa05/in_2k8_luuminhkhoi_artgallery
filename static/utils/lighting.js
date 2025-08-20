import * as THREE from 'three';

export function setupLights(scene) {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    function createSpotLight(x, y, z, intensity, targetPosition) {
        const spotLight = new THREE.SpotLight(0xffffff, intensity);//color, intensity
        spotLight.position.set(x, y, z);
        spotLight.target.position.copy(targetPosition);//target the light to the targetPosition
        spotLight.castShadow = true; //shadow
        spotLight.angle = Math.PI / 3; //angle of the light
        spotLight.penumbra = 1; //softness of the shadow
        spotLight.decay = 1.5; //intensity decay
        spotLight.distance = 40; //distance of the light
        spotLight.shadow.mapSize.width = 1024; //shadow map
        spotLight.shadow.mapSize.height = 1024;//shadow map
        return spotLight;
    }

    const spotLight1 = createSpotLight(0, 20, -10, 2, new THREE.Vector3(0, 2, -20))
    const spotLight2 = createSpotLight(0, 20, 10, 2, new THREE.Vector3(0, 2, 20))
    const spotLight3 = createSpotLight(-10, 20, 0, 2, new THREE.Vector3(-20, 2, 0))
    const spotLight4 = createSpotLight(10, 20, 0, 2, new THREE.Vector3(20, 2, 0))

    scene.add(spotLight1, spotLight2, spotLight3, spotLight4);
    scene.add(spotLight1.target, spotLight2.target, spotLight3.target, spotLight4.target);
}