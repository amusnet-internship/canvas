export interface Point {
    x: number;
    y: number
}

export interface Rect {
    x: number;
    y: number;
    w: number;
    h: number;
}

export class Vector implements Point {
    x: number;
    y: number;

    constructor(p: Point)
    constructor(x: number, y: number)
    constructor(
        xOrPoint: number | Point,
        y?: number
    ) {
        if (typeof xOrPoint == 'number' && typeof y == 'number') {
            this.x = xOrPoint;
            this.y = y;
        } else if (typeof xOrPoint == 'object') {
            this.x = xOrPoint.x;
            this.y = xOrPoint.y;
        }
    }

    add(p: Point) {
        this.x += p.x;
        this.y += p.y;

        return this;
    }

    scale(s: number) {
        this.x *= s;
        this.y *= s;

        return this;
    }

    dist(p: Point) {
        const dx = this.x - p.x;
        const dy = this.y - p.y;
        return Math.sqrt(dx ** 2 + dy ** 2);
    }

    sqLength() {
        return this.x ** 2 + this.y ** 2;
    }

    static add(p1: Point, p2: Point) {
        return new Vector(p1.x + p2.x, p1.y + p2.y);
    }
}

export function inRect(p: Point, r: Rect) {
    return p.x >= r.x
        && p.x <= r.x + r.w
        && p.y >= r.y
        && p.y <= r.y + r.h;
}

export function inCircle(p: Point, c: Point, radius: number) {
    // Possible optimisation: check inscribed rectangle before calculating distance
    const dx = p.x - c.x;
    const dy = p.y - c.y;
    const d = Math.sqrt(dx ** 2 + dy ** 2);

    return d <= radius;
}