
export const paintingData = [
    //Front wall
    ...Array.from({ length: 2 }, (_, i) => {
        return {
            imgSrc: `./artwork/${i + 1}.jpg`,
            width: 4,
            height: 3,
            position: {
                x: 15 * (i % 2 === 0 ? 1 : -1),
                y: 5,
                z: -24.99
            },
            rotationY: 0,
            info: {
                title: `Painting ${i + 1}`,
                artist: `Artist ${i + 1}`,
                description: `Description ${i + 1}`,
                year: `Year ${i + 1}`,
                paintingID: i
            }
        }
    }),
    //back wall 
    ...Array.from({ length: 2 }, (_, i) => {
        return {
            imgSrc: `./artwork/${i + 3}.jpg`,
            width: 4,
            height: 3,
            position: {
                x: 15 * (i % 2 === 0 ? 1 : -1),
                y: 5,
                z: 24.99
            },
            rotationY: Math.PI,
            info: {
                title: `Painting ${i + 3}`,
                artist: `Artist ${i + 3}`,
                description: `Description ${i + 3}`,
                year: `Year ${i + 3}`,
                paintingID: i
            }
        }
    })
]