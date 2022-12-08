import { initCanvas } from "./canvas";
import { ACCELERATION, FRICTION, GameObject, GRAVITY, MAX_SPEED, STEP_SIZE, TURN_RATE } from "./engine";
import { Vector, inRect, inCircle } from "./geom";


const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = initCanvas(canvas);

sim();

function sim() {
    let alive = true;
    const input: { [code: string]: boolean } = {};

    const player = new GameObject('player', 300, 300);

    const objects = [
        player,
        new GameObject('asteroid', Math.random() * ctx.WIDTH | 0, Math.random() * ctx.HEIGHT | 0),
        new GameObject('asteroid', Math.random() * ctx.WIDTH | 0, Math.random() * ctx.HEIGHT | 0),
        new GameObject('asteroid', Math.random() * ctx.WIDTH | 0, Math.random() * ctx.HEIGHT | 0),
        new GameObject('asteroid', Math.random() * ctx.WIDTH | 0, Math.random() * ctx.HEIGHT | 0),
        new GameObject('asteroid', Math.random() * ctx.WIDTH | 0, Math.random() * ctx.HEIGHT | 0),
        new GameObject('asteroid', Math.random() * ctx.WIDTH | 0, Math.random() * ctx.HEIGHT | 0),
        new GameObject('asteroid', Math.random() * ctx.WIDTH | 0, Math.random() * ctx.HEIGHT | 0),
        new GameObject('asteroid', Math.random() * ctx.WIDTH | 0, Math.random() * ctx.HEIGHT | 0),
        new GameObject('asteroid', Math.random() * ctx.WIDTH | 0, Math.random() * ctx.HEIGHT | 0),
        new GameObject('asteroid', Math.random() * ctx.WIDTH | 0, Math.random() * ctx.HEIGHT | 0),
    ];


    document.getElementById('start').addEventListener('click', () => {
        alive = true;
        update(performance.now());
    });
    document.getElementById('stop').addEventListener('click', () => alive = false);
    window.addEventListener('keydown', event => {
        input[event.code] = true;
    });
    window.addEventListener('keyup', event => {
        input[event.code] = false;
    });

    let lastTime = 0;
    let elapsed = 0;

    update(performance.now());


    // physics step
    function tick() {
        if (input['ArrowLeft']) {
            player.dir -= TURN_RATE;
        } else if (input['ArrowRight']) {
            player.dir += TURN_RATE;
        }

        if (input['ArrowUp']) {
            player.speed += ACCELERATION;
            if (player.speed > MAX_SPEED) {
                player.speed = MAX_SPEED;
            }
        } else if (input['ArrowDown']) {
            player.speed -= ACCELERATION;
            if (player.speed < -MAX_SPEED) {
                player.speed = -MAX_SPEED;
            }
        } else {
            player.speed = 0;
        }

        const acceleration = new Vector(
            Math.cos(player.dir) * player.speed,
            Math.sin(player.dir) * player.speed
        );
        player.velocity.add(acceleration);

        const gravity = new Vector(0, GRAVITY);

        for (let object of objects) {
            object.velocity.add(gravity);

            if (object.velocity.sqLength() > 0) {
                const friction = new Vector(object.velocity);
                friction.scale(-FRICTION);
                object.velocity.add(friction);
            }

            object.position.add(object.velocity);

            if (object.position.y > ctx.HEIGHT) {
                object.position.y = ctx.HEIGHT;
                if (object.velocity.y > 0) {
                    if (object.type == 'player') {
                        object.velocity.y = 0;
                    } else if (object.type == 'asteroid') {
                        object.velocity.y *= -1; 
                    }
                }
            }
        }
    }

    function render(delta) {
        ctx.clear();
        ctx.drawGrid();

        for (let object of objects) {
            ctx.draw(object)
        }

        ctx.raw.fillText(delta.toFixed(1), 50, 50);
    }

    function update(time: number) {
        const delta = time - lastTime;
        lastTime = time;
        elapsed += delta;
        if (elapsed > STEP_SIZE * 10) {
            elapsed = STEP_SIZE * 10;
        }

        while (elapsed > STEP_SIZE) {
            elapsed -= STEP_SIZE;
            tick();
        }
        render(elapsed);

        if (alive) {
            requestAnimationFrame(update);
        }
    }
}