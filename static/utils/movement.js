import * as THREE from 'three';

export const keyPressed = {
    w: false,
    s: false,
    a: false,
    d: false,
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
}

export function updateMovement(delta, controls, camera, walls) {
    const moveMent = 2 * delta;

    const previousPosition = camera.position.clone();

    if (keyPressed.w || keyPressed.ArrowUp) {
        controls.moveForward(moveMent);
    }
    if (keyPressed.s || keyPressed.ArrowDown) {
        controls.moveForward(-moveMent);
    }
    if (keyPressed.a || keyPressed.ArrowLeft) {
        controls.moveRight(-moveMent);
    }
    if (keyPressed.d || keyPressed.ArrowRight) {
        controls.moveRight(moveMent);
    }

    if (checkCollision(camera, walls)) {
        camera.position.copy(previousPosition);
    }
}

function checkCollision(camera, walls) {
    const playerBBox = new THREE.Box3();
    const cameraWorldPosition = new THREE.Vector3();

    camera.getWorldPosition(cameraWorldPosition);

    playerBBox.setFromCenterAndSize(
        cameraWorldPosition,
        new THREE.Vector3(0.5, 1.8, 0.5)
    )
    for (let i = 0; i < walls.children.length; i++) {
        const wall = walls.children[i]
        if (playerBBox.intersectsBox(wall.BBox)) {
            return true;
        }
    }
    return false;
}