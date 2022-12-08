import { Point, Rect } from "./geom";

export function initCanvas(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d');

    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;

    function clear() {
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
    }

    function drawGrid() {
        for (let y = 50; y < HEIGHT; y += 50) {
            ctx.save();
            ctx.strokeStyle = `rgba(0, 0, 0, ${y % 200 == 0 ? '0.5' : '0.2'})`;

            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(WIDTH, y);
            ctx.stroke();
            ctx.closePath();

            ctx.restore();
        }
        for (let x = 50; x < WIDTH; x += 50) {
            ctx.save();
            ctx.strokeStyle = `rgba(0, 0, 0, ${x % 200 == 0 ? '0.5' : '0.2'})`;

            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, HEIGHT);
            ctx.stroke();
            ctx.closePath();

            ctx.restore();
        }
    }

    function circle(p: Point, radius: number, color?: string);
    function circle(x: number, y: number, radius: number, color?: string);
    function circle(xOrP: number | Point, yOrR: number, rOrColor?: number | string, color?: string) {
        let x: number;
        let y: number;
        let radius: number;

        if (typeof xOrP == 'number' && typeof yOrR == 'number' && typeof rOrColor == 'number') {
            x = xOrP;
            y = yOrR;
            radius = rOrColor;
        } else if (typeof xOrP == 'object' && (typeof rOrColor == 'string' || typeof rOrColor == 'undefined')) {
            x = xOrP.x;
            y = xOrP.y;
            radius = yOrR;
            color = rOrColor;
        }

        ctx.save();

        if (color) {
            ctx.fillStyle = color;
        }
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fill();

        ctx.restore();
    }

    function rect(rect: Rect, color?: string);
    function rect(x: number, y: number, w: number, h: number, color?: string);
    function rect(xOrRect: number | Rect, yOrColor?: number | string, w?: number, h?: number, color?: string) {
        let x: number;
        let y: number;

        if (typeof xOrRect == 'number' && typeof yOrColor == 'number') {
            x = xOrRect;
            y = yOrColor;
        } else if (typeof xOrRect == 'object' && typeof yOrColor == 'string') {
            x = xOrRect.x;
            y = xOrRect.y;
            w = xOrRect.w;
            h = xOrRect.h;
            color = yOrColor;
        }

        ctx.save();

        if (color) {
            ctx.fillStyle = color;
        }

        ctx.fillRect(x, y, w, h);

        ctx.restore();
    }

    function line(p1, p2) {
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
        ctx.closePath();
    }

    return {
        WIDTH,
        HEIGHT,
        clear,
        drawGrid,
        circle,
        rect,
        line,
        raw: ctx
    }
}


