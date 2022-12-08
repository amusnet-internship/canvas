import { Vector } from "./geom";


export const STEP_SIZE = 20;
export const TICK_RATE = STEP_SIZE / 1000;
export const TURN_RATE = 0.01 * Math.PI;
export const MAX_SPEED = 10;
export const ACCELERATION = 0.05;
export const FRICTION = 0.1;
export const GRAVITY = 0.5;

export class GameObject {
    public position = new Vector(0, 0);
    public dir = 0;
    public speed = 0;
    public velocity = new Vector(0, 0);
    type: string;

    constructor(type: string, x?: number, y?: number, dir?: number) {
        this.type = type;
        if (x !== undefined) {
            this.position.x = x;
        }
        if (y !== undefined) {
            this.position.y = y;
        }
        if (dir !== undefined) {
            this.dir = dir;
        }
    }
}