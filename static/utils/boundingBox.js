import * as THREE from 'three'

export function createBoundingBoxes(objects) {
    //check if the object is painting or wall
    if (!Array.isArray(objects)) {
        //coz the walls are in a group
        //object.children is an array of the walls from the group
        objects = objects.children;
    }
    //create bounding box for the objects
    objects.forEach(object => {
        object.BBox = new THREE.Box3().setFromObject(object);
    })
}