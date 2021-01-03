const maxSize : number = 5;
const minSize : number = 0.5;
const speedCorl : number = 5;

export class Drop{

    speed : number;
    lastUpdate : number;
    x: number;
    y: number;
    size : number;

    constructor(x: number){
            this.x = x;
            this.y = 0;
            this.size = Math.random() * maxSize + minSize;
            this.speed = (maxSize + minSize) * speedCorl - (this.size * 0.9) * speedCorl;
            this.lastUpdate = Date.now();
    }
}