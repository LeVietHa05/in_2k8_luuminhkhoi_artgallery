import * as THREE from 'three'

export async function createPaintings(scene) {
    let paintings = [];
    let frames = [];
    let paintingData = [];
    const frameThickness = 0.01;
    fetch('/paintingData')
        .then(res => res.json())
        .then(e => {
            paintingData = e;
            paintingData.forEach((data, i) => {
                const outlineGroup = new THREE.Group();
                const frameMaterial = new THREE.MeshPhongMaterial({
                    color: 0x550000,
                    // emissive: 0xEBD3F8,
                    emissive: 0x550000,
                    emissiveIntensity: 1,
                    side: THREE.DoubleSide,
                    transparent: true,
                    opacity: 1
                })
                let z;
                if (i % 2 == 0) {
                    z = data.position.z + 0.01;
                } else {
                    z = data.position.z - 0.01;
                }
                z = data.position.z
                const topOutline = new THREE.Mesh(
                    new THREE.PlaneGeometry(data.width + frameThickness, frameThickness),
                    frameMaterial
                );
                topOutline.position.set(data.position.x, data.position.y + data.height / 2 + frameThickness / 2, z);

                const bottomOutline = new THREE.Mesh(
                    new THREE.PlaneGeometry(data.width + frameThickness, frameThickness),
                    frameMaterial
                );
                bottomOutline.position.set(data.position.x, data.position.y - data.height / 2 - frameThickness / 2, z);

                const leftOutline = new THREE.Mesh(
                    new THREE.PlaneGeometry(frameThickness, data.height + frameThickness),
                    frameMaterial
                );
                leftOutline.position.set(data.position.x - data.width / 2 - frameThickness / 2, data.position.y, z);

                const rightOutline = new THREE.Mesh(
                    new THREE.PlaneGeometry(frameThickness, data.height + frameThickness),
                    frameMaterial
                );
                rightOutline.position.set(data.position.x + data.width / 2 + frameThickness / 2, data.position.y, z);


                outlineGroup.add(topOutline, bottomOutline, leftOutline, rightOutline);
                outlineGroup.visible = false;

                if (data.rotationY == 1.570796326794896 || data.rotationY == -1.570796326794896) {
                    // console.log('rotated')
                    topOutline.rotateY(1.570796326794896);
                    bottomOutline.rotateY(1.570796326794896);
                    leftOutline.rotateY(1.570796326794896);
                    rightOutline.rotateY(THREE.MathUtils.degToRad(90));
                    leftOutline.position.z -= data.width / 2;
                    rightOutline.position.z += data.width / 2;
                    if (data.rotationY == -1.570796326794896) {
                        leftOutline.position.x += data.width / 2;
                        rightOutline.position.x -= data.width / 2 + 0.01;
                    } else {
                        rightOutline.position.x -= data.width / 2;
                        leftOutline.position.x += data.width / 2 + 0.01;
                    }
                }

                new THREE.ImageBitmapLoader().load(data.imgSrc, function (imageBitmap) {
                    const texture = new THREE.CanvasTexture(imageBitmap);
                    texture.colorSpace = THREE.SRGBColorSpace;
                    const paintingMaterial = new THREE.MeshBasicMaterial({ map: texture });

                    // const paintingTexture = new THREE.TextureLoader().load(data.imgSrc);
                    // paintingTexture.colorSpace = THREE.SRGBColorSpace;
                    let normalMaterial = new THREE.MeshBasicMaterial({ color: 0x000 });
                    let materials = [normalMaterial, normalMaterial, normalMaterial, normalMaterial, paintingMaterial, normalMaterial];
                    const painting = new THREE.Mesh(
                        new THREE.BoxGeometry(data.width, data.height, data.depth),
                        materials
                    );

                    painting.position.set(data.position.x, data.position.y, data.position.z);
                    painting.rotation.y = data.rotationY;
                    painting.rotation.z = -Math.PI
                    //mirror the painting
                    painting.scale.x = -1;

                    //to show the painting info when look later
                    painting.userData = {
                        info: data.info,
                        type: 'painting',
                        link: data.imgSrc
                    }

                    paintings.castShadow = true;
                    paintings.receiveShadow = true;
                    scene.add(painting, outlineGroup);
                    paintings.push(painting);
                    frames.push(outlineGroup);
                }, undefined, function (error) {
                    console.error('An error happened.', error);
                });
            })
        })
    return { paintings, frames };
}