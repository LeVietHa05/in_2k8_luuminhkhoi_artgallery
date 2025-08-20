import * as THREE from 'three';

let sound;
let bufferLoaded = false;

export function setupAudio(camera) {
    //create a ear
    const listener = new THREE.AudioListener();
    //add it to camera
    camera.add(listener)
    //create a sound source
    sound = new THREE.Audio(listener)

    const audioLoader = new THREE.AudioLoader();
    audioLoader.load('sounds/audioGuide1.ogg', function (buffer) {
        bufferLoaded = true;
        sound.setBuffer = buffer;
        sound.setLoop(true);
        sound.setVolume(0.5);
    })


}

export function startAudio() {
    if (sound && bufferLoaded) {
        sound.play();
    }
}

export function stopAudio() {
    if (sound && bufferLoaded) {
        sound.pause();
    }
}