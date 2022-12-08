import { initCanvas } from "./canvas";
import { Vector, inRect, inCircle } from "./geom";


const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = initCanvas(canvas);
// start();
sim();

/*
ctx.drawGrid();
const rect = {
    x: 200,
    y: 200,
    w: 200,
    h: 75
}
const c = { x: 450, y: 200 };
ctx.rect(rect, 'blue');
ctx.circle(c, 25, 'red');

canvas.addEventListener('click', event => {
    const p = new Vector(
        event.offsetX,
        event.offsetY
    );

    if (inRect(p, rect)) {
        ctx.rect(rect, 'green');
    } else {
        ctx.rect(rect, 'blue');
    }

    if (inCircle(p, c, 25)) {
        ctx.circle(c, 25, 'green');
    } else {
        ctx.circle(c, 25, 'red');
    }

    ctx.circle(p, 5);
})
*/

function sim() {
    document.getElementById('start').addEventListener('click', () => {
        alive = true;
        drawNext();
    });
    document.getElementById('stop').addEventListener('click', () => alive = false);
    canvas.addEventListener('click', event => {
        p.x = event.offsetX;
        p.y = event.offsetY;

        const dir = Vector.add(source, (new Vector(p)).scale(-1));
        dir.scale(-1)
        console.log(dir);

        const angle = Math.atan2(dir.y, dir.x);

        circle.dir = angle;
        circle.center.x = source.x;
        circle.center.y = source.y;
    });

    const source = new Vector(400, 750);
    const p = new Vector(0, 0);

    let alive = true;

    const circle = {
        center: new Vector(100, 400),
        r: 25,
        speed: 3,
        dir: 0
    };

    drawNext();

    function drawNext() {
        const vel = new Vector(
            Math.cos(circle.dir) * circle.speed,
            Math.sin(circle.dir) * circle.speed
        );
        circle.center.add(vel);

        ctx.clear();
        ctx.drawGrid();
        ctx.line(source, p);
        ctx.circle(circle.center, circle.r, 'red');

        if (alive) {
            requestAnimationFrame(drawNext);
        }
    }
}

function start() {
    document.getElementById('start').addEventListener('click', () => {
        alive = true;
        drawNext();
    });
    document.getElementById('stop').addEventListener('click', () => alive = false);

    let alive = true;

    const circle = {
        center: new Vector(100, 400),
        r: 25,
        speed: 3,
        dir: 0
    };
    const vel = new Vector(3, 1.5);

    drawNext();

    function drawNext() {
        circle.center.add(vel);

        ctx.clear();
        ctx.drawGrid();
        ctx.circle(circle.center, circle.r, 'red');

        if (circle.center.x >= ctx.WIDTH - circle.r && vel.x > 0) {
            vel.x *= -1;
        } else if (circle.center.x <= 0 + circle.r && vel.x < 0) {
            vel.x *= -1;
        }

        if (circle.center.y >= ctx.HEIGHT - circle.r && vel.y > 0) {
            vel.y *= -1;
        } else if (circle.center.y <= 0 + circle.r && vel.y < 0) {
            vel.y *= -1;
        }

        if (alive) {
            requestAnimationFrame(drawNext);
        }
    }
}

