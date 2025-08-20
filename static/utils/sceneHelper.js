export function addObjectToScene(scene, objects) {
    objects.forEach(object => {
        scene.add(object);
    })
}