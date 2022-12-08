import { initCanvas } from "./canvas";
import { Vector, inRect, inCircle } from "./geom";


const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = initCanvas(canvas);



const assets: { [name: string]: any } = {
    catImg: '/cat.jpg',
    dogImg: '/dog.jpg'
};
let toLoad = Object.keys(assets).length;

for (let name in assets) {
    const img = new Image();
    img.src = assets[name]
    assets[name] = img;
    img.addEventListener('load', assetLoaded);
}

function assetLoaded() {
    toLoad--;
    if (toLoad == 0) {
        sim();
    }
}

function sim() {
    let alive = true;
    const p = new Vector(0, 0);
    const input: {[code: string]: boolean} = {};

    document.getElementById('start').addEventListener('click', () => {
        alive = true;
        drawNext();
    });
    document.getElementById('stop').addEventListener('click', () => alive = false);
    window.addEventListener('keydown', event => {
        input[event.code] = true;
    });
    window.addEventListener('keyup', event => {
        input[event.code] = false;
    });

    drawNext();


    function drawNext() {
        if (input['ArrowLeft']) {
            p.x-=5;
        } else if (input['ArrowRight']) {
            p.x+=5;
        }

        if (input['ArrowUp']) {
            p.y-=5;
        } else if (input['ArrowDown']) {
            p.y+=5;
        }

        ctx.clear();
        ctx.drawGrid();

        ctx.raw.drawImage(assets.catImg, 200, 100, 500, 700, p.x, p.y, 250, 350);

        if (alive) {
            requestAnimationFrame(drawNext);
        }
    }
}