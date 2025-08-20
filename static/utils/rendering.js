
import * as THREE from 'three';
import { displayPaintingInfo, hidePaintingInfo } from './paintingInfo.js';
import { updateMovement } from './movement.js';
import { isClickedPainting, isHoverPainting, isNearPainting, paintingToShow, nearCheck, isControlEnabled } from './clickHandle.js';

export let isShowingInfo = false;

export function setupRendering(
    scene,
    camera,
    renderer,
    paintings,
    frames,
    controls,
    walls,
) {
    const clock = new THREE.Clock();

    let render = function () {
        const delta = clock.getDelta();
        if (isControlEnabled) {
            updateMovement(delta, controls, camera, walls);
        }
        // nearCheck(camera, paintings, frames);
        if (isNearPainting || isClickedPainting || isHoverPainting) {
            if (!isShowingInfo)
                displayPaintingInfo(paintingToShow.userData);
            isShowingInfo = true;
        } else {
            isShowingInfo = false;
            hidePaintingInfo();
        }
        // camera.layers.set(1);
        renderer.render(scene, camera);

        requestAnimationFrame(render);
    }

    render();
}
