import * as THREE from 'three';
import { displayPaintingInfo, hidePaintingInfo } from './paintingInfo.js';

let mouse = new THREE.Vector2();
let raycaster = new THREE.Raycaster();
export let isNearPainting = false;
export let isClickedPainting = false;
export let isHoverPainting = false;
export let paintingToShow = null;
export let isControlEnabled = true;
export let isTranslate = true;

let lastPainting = -1;

export let isEdit = false;
let isDragging = false;
let offset = new THREE.Vector3();
let offset2 = new THREE.Vector3();

document.querySelector('#edit_button')?.addEventListener('click', (e) => {
    // isEdit = !isEdit;
    e.target.textContent = isEdit ? 'Done' : 'Edit';
})

document.querySelector("#translate_button")?.addEventListener('click', (e) => {
    isTranslate = !isTranslate;
    if (isTranslate) {
        document.querySelector("#translate-code").textContent = "Painting code"
        document.querySelector("#translate-legend").textContent = "If you are interested"
        document.querySelector("#translate-pricetag").textContent = "Starting from: "
        document.querySelector("#isSold").textContent = "Sold"
        alert("Selected language: English")
    } else {
        document.querySelector("#translate-code").textContent = "Mã tranh";
        document.querySelector("#translate-legend").textContent = "Nếu bạn có hứng thú với bức tranh"
        document.querySelector("#translate-pricetag").textContent = "Giá khởi điểm: "
        document.querySelector("#isSold").textContent = "Đã bán"
        alert("Ngôn ngữ đã chuyển sang tiếng Việt")
    }

    document.querySelector("#translate_button").innerHTML =
        `<div style=" display: inline-block; font-size: 24px;">
            <span class="material-symbols-outlined">
                translate
            </span> - ${isTranslate ? 'EN' : 'VI'}
        </div>`


})

document.querySelector("#painting_info").addEventListener('click', (e) => {
    if (e.target.id == "close_painting_info" || e.target.id == "painting_info") {
        hidePaintingInfo();
        isClickedPainting = false;
        isNearPainting = false;
        isHoverPainting = false;
    }
})

document.querySelectorAll("input").forEach(input => {
    console.log(input);
    input.addEventListener('focus', (e) => {
        console.log("focus");
        isControlEnabled = false;
    })
    input.addEventListener('blur', (e) => {
        console.log("blur");
        isControlEnabled = true;
    })
})

document.querySelector("#show_intruction").addEventListener('click', (e) => {
    if (document.querySelector("#instruction_text").style.display == "block") {
        document.querySelector("#instruction_text").style.display = "none";
    }
    else {
        document.querySelector("#instruction_text").style.display = "block";
    }

})

export function clickHandle(renderer, camera, paintings, frames) {
    renderer.domElement.addEventListener('mousedown', (e) => {
        console.log("click handle");
        // e.preventDefault();
        // e.stopPropagation();
        if (e.target != renderer.domElement) return;
        //normalize mouse position because it is not in the same scale as the camera
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);

        frames.forEach(outlines => {
            outlines.visible = false;
        });

        const intersects = raycaster.intersectObjects(paintings);
        if (intersects.length > 0) {
            paintingToShow = intersects[0].object;
            console.log(paintingToShow.userData.info.title);
            let paintingID = paintingToShow.userData.info.paintingID;

            frames[paintingID].visible = !frames[paintingID].visible;
            if (!isEdit) {
                isClickedPainting = true;
                // displayPaintingInfo(painting.userData.info);
                //window.open(painting.userData.link, '_blank');
            } else {
                isDragging = true;
                isClickedPainting = false;
                const intersectionPoint = intersects[0].point;
                offset.copy(intersectionPoint).sub(paintingToShow.position);
                //somehow the frame group 's position is relative to the painting
                offset2.copy(paintingToShow.position).sub(frames[paintingID].position);
            }
        } else {
            isClickedPainting = false;
            // hidePaintingInfo();
        }
    }, false);
}

export function nearCheck(camera, paintings, frames) {
    if (!isEdit) {
        const distanceThreshold = 1.5;
        let painting = paintings.find(painting => {
            return camera.position.distanceTo(painting.position) < distanceThreshold;
        })
        if (painting) {
            paintingToShow = painting;
            let paintingID = paintingToShow.userData.info.paintingID;
            lastPainting = paintingID;
            frames[paintingID].visible = true;
            isNearPainting = true;
        } else {
            if (lastPainting >= 0 && !isClickedPainting && !isHoverPainting) {
                frames[lastPainting].visible = false;
            }
            isNearPainting = false;
        }
    }
}

export function hoverHandle(renderer, camera, paintings, frames) {
    renderer.domElement.addEventListener('mousemove', (e) => {
        //normalize mouse position because it is not in the same scale as the camera
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        // console.log(mouse);
        if (!isEdit) {
            onHover(camera, paintings, frames);
        } else {
            if (isDragging && paintingToShow) {
                raycaster.setFromCamera(mouse, camera);
                const planeZ = new THREE.Plane(new THREE.Vector3(0, 0, 1), -paintingToShow.position.z);
                const newPoint = new THREE.Vector3();

                raycaster.ray.intersectPlane(planeZ, newPoint);
                paintingToShow.position.copy(newPoint.sub(offset));
                // console.log(paintingToShow.position);

                let paintingID = paintingToShow.userData.info.paintingID;
                frames[paintingID].position.copy(newPoint.sub(offset2));
                // console.log(frames[paintingID].position);
            }
        }
    }, false);

    renderer.domElement.addEventListener('mouseup', (e) => {
        isDragging = false;
    }, false);
}
function onHover(camera, paintings, frames) {
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(paintings);

    if (intersects.length > 0) {
        isHoverPainting = true;
        paintingToShow = intersects[0].object;
        let paintingID = paintingToShow.userData.info.paintingID;
        // console.log(paintingID);
        frames.forEach(outlines => {
            outlines.visible = false;
        });
        frames[paintingID].visible = !frames[paintingID].visible;
        // displayPaintingInfo(painting.userData.info);
    }
    else {
        isHoverPainting = false;
        // hidePaintingInfo();
        frames.forEach(outlines => {
            outlines.visible = false;
        });
    }
}

function onclick(camera, paintings, frames) {

}