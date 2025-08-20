import { keyPressed } from './movement.js';
import { startAudio, stopAudio } from './audioGuide.js';
import { hidePaintingInfo } from './paintingInfo.js';
import { isShowingInfo } from './rendering.js';

import { controls } from '../../main.js';

let isShowMenuUnlock = false;

export function setupEventListeners(controls) {
    setupPlayButton(controls);
    document.addEventListener("keydown", onKeyDown, false);
    document.addEventListener("keyup", onKeyUp, false);
    // document.getElementById("start-audio").addEventListener("click", startAudio);
    // document.getElementById("stop-audio").addEventListener("click", stopAudio);
}

function onKeyDown(e) {
    if (isShowingInfo) {
        return;
    }
    if (e.key in keyPressed) {
        keyPressed[e.key] = true;
    }
    if (e.key === "Enter") {
        hideMenu();
        if (!controls.isLocked)
            controls.lock();
    }
    if (e.key === "Escape") {
        console.log("click");

        showMenu();
        // if (controls.isLocked)
        controls.unlock();
    }

    // if (e.key === "e") {
    //     console.log("e");
    //     let popup = document.getElementById("popup");
    //     if (popup) {
    //         popup.style.display === "none" ? popup.style.display = "block" : popup.style.display = "none";
    //     }
    // }
}

function onKeyUp(e) {
    if (isShowingInfo) {
        return;
    }
    if (e.key in keyPressed) {
        keyPressed[e.key] = false;
    }
    //unlock but not show menu when press f
    if (e.key === "f") {
        hideMenu();
        if (controls.isLocked)
            controls.unlock();
        else
            controls.lock();
    }
    // if (e.key === "v") {
    //     document.addEventListener("mousedown", (e) => {
    //         controls.lock();
    //     })
    //     document.addEventListener("mouseup", (e) => {
    //         controls.unlock();
    //     })
    // }
    // if (e.key === "Escape") {
    //     showMenu();
    //     isShowMenuUnlock = true;
    // }
}

export const hideMenu = () => {
    const menu = document.getElementById('menu');
    menu.style.display = 'none';
}

export const showMenu = () => {
    const menu = document.getElementById('menu');
    menu.style.display = 'block';
}

export const startExperience = (controls) => {
    controls.lock();
    hideMenu();
};

export const setupPlayButton = (controls) => {
    const play_button = document.getElementById('play_button');
    play_button.addEventListener('click', (e) => startExperience(controls));
};