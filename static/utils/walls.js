import * as THREE from 'three';
let walls = [];

//create a group of walls and return it (14m x 14m x 3m room)
export function createWalls(scene) {
    const textureLoader = new THREE.TextureLoader();
    let wallGroup = new THREE.Group();
    scene.add(wallGroup);

    const wallTexture2 = textureLoader.load('./img/white-plaster-texture.jpg');
    // const wallTexture2 = textureLoader.load('./img/full-frame-white-wooden-plank.jpg', (texture) => {
    //     texture.wrapS = THREE.RepeatWrapping;
    //     texture.wrapT = THREE.RepeatWrapping;
    //     texture.repeat.set(17, 1);
    // });

    const doorTexture = textureLoader.load('./img/door3.jpg');
    const doorTextureFlip = textureLoader.load('./img/door3.jpg', (texture) => {
        texture.wrapS = THREE.RepeatWrapping;
        texture.repeat.x = -1;
    });

    //front walls
    const frontWall_1 = new THREE.Mesh(
        new THREE.BoxGeometry(5, 3, 0.1),
        new THREE.MeshBasicMaterial({ map: wallTexture2, side: THREE.DoubleSide })
    )
    frontWall_1.position.z = 7;
    frontWall_1.position.x = 4.5;

    const frontWall_2 = new THREE.Mesh(
        new THREE.BoxGeometry(5, 3, 0.1),
        new THREE.MeshBasicMaterial({ map: wallTexture2, side: THREE.DoubleSide })
    )
    frontWall_2.position.z = 7;
    frontWall_2.position.x = -4.5;

    const frontWall_3 = new THREE.Mesh(
        new THREE.BoxGeometry(4, 3, 0.1),
        new THREE.MeshBasicMaterial({ map: wallTexture2, side: THREE.DoubleSide })
    )
    frontWall_3.position.z = 9.6;

    const frontWall_4 = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 3, 2.5),
        new THREE.MeshBasicMaterial({ map: wallTexture2, side: THREE.DoubleSide })
    )
    frontWall_4.position.z = 8.3;
    frontWall_4.position.x = 2.05;

    const door1 = new THREE.Mesh(
        new THREE.BoxGeometry(0.11, 2, 1),
        new THREE.MeshBasicMaterial({ map: doorTexture, side: THREE.DoubleSide })
    )
    door1.position.z = 8.3;
    door1.position.x = 2.05;
    door1.position.y = 1;

    const door2 = new THREE.Mesh(
        new THREE.BoxGeometry(0.11, 2, 1),
        new THREE.MeshBasicMaterial({ map: doorTextureFlip, side: THREE.DoubleSide })
    )
    door2.position.z = 8.3;
    door2.position.x = -2.05;
    door2.position.y = 1;
    const frontWall_5 = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 3, 2.5),
        new THREE.MeshBasicMaterial({ map: wallTexture2, side: THREE.DoubleSide })
    )
    frontWall_5.position.z = 8.3;
    frontWall_5.position.x = -2.05;

    //left wall
    const leftWall = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 3, 14),
        new THREE.MeshBasicMaterial({ map: wallTexture2, side: THREE.DoubleSide })
    )
    leftWall.position.x = -7;

    //right wall
    const rightWall = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 3, 14),
        new THREE.MeshBasicMaterial({ map: wallTexture2, side: THREE.DoubleSide })
    )
    rightWall.position.x = 7;

    //back wall
    const backWall = new THREE.Mesh(
        new THREE.BoxGeometry(14, 3, 0.1),
        new THREE.MeshBasicMaterial({ map: wallTexture2, side: THREE.DoubleSide })
    )
    backWall.position.z = -7;

    //middle wall
    const middleWall_1 = new THREE.Mesh(
        new THREE.BoxGeometry(2, 3, 0.01),
        new THREE.MeshBasicMaterial({ map: wallTexture2, side: THREE.DoubleSide })
    )
    middleWall_1.position.set(-3, 0, 4);
    const middleWall_2 = new THREE.Mesh(
        new THREE.BoxGeometry(2, 3, 0.01),
        new THREE.MeshBasicMaterial({ map: wallTexture2, side: THREE.DoubleSide })
    )
    middleWall_2.position.set(3, 0, 4);

    const middleWall_3 = new THREE.Mesh(
        new THREE.BoxGeometry(0.01, 3, 8),
        new THREE.MeshBasicMaterial({ map: wallTexture2, side: THREE.DoubleSide })
    )
    middleWall_3.position.set(-4, 0, 0);
    const middleWall_4 = new THREE.Mesh(
        new THREE.BoxGeometry(0.01, 3, 8),
        new THREE.MeshBasicMaterial({ map: wallTexture2, side: THREE.DoubleSide })
    )
    middleWall_4.position.set(-2, 0, 0);
    const middleWall_5 = new THREE.Mesh(
        new THREE.BoxGeometry(0.01, 3, 8),
        new THREE.MeshBasicMaterial({ map: wallTexture2, side: THREE.DoubleSide })
    )
    middleWall_5.position.set(2, 0, 0);
    const middleWall_6 = new THREE.Mesh(
        new THREE.BoxGeometry(0.01, 3, 8),
        new THREE.MeshBasicMaterial({ map: wallTexture2, side: THREE.DoubleSide })
    )
    middleWall_6.position.set(4, 0, 0);

    const middleWall_7 = new THREE.Mesh(
        new THREE.BoxGeometry(2, 3, 0.01),
        new THREE.MeshBasicMaterial({ map: wallTexture2, side: THREE.DoubleSide })
    )
    middleWall_7.position.set(-3, 0, -4);
    const middleWall_8 = new THREE.Mesh(
        new THREE.BoxGeometry(2, 3, 0.01),
        new THREE.MeshBasicMaterial({ map: wallTexture2, side: THREE.DoubleSide })
    )
    middleWall_8.position.set(3, 0, -4);

    scene.add(door1);
    scene.add(door2);

    wallGroup.add(frontWall_1, frontWall_2, frontWall_3, frontWall_4, frontWall_5, leftWall, rightWall, backWall);
    wallGroup.add(middleWall_1, middleWall_2, middleWall_3, middleWall_4, middleWall_5, middleWall_6, middleWall_7, middleWall_8);
    wallGroup.position.y = 1.5;

    walls.push(frontWall_1, frontWall_2, frontWall_3, frontWall_4, frontWall_5, leftWall, rightWall, backWall, middleWall_1, middleWall_2, middleWall_3, middleWall_4, middleWall_5, middleWall_6, middleWall_7, middleWall_8);

    return { wallGroup, walls };
}