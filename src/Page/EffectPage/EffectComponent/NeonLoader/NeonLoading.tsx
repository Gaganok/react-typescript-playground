import React, { useState, useEffect } from 'react';

type Coord = {x: number, y: number}
type Circle = {coord: Coord, radius: number}

export class ColorSchema{
    red: number;
    green: number;
    blue: number;

    deltaRed: number;
    deltaGreen: number;
    deltaBlue: number;

    constructor(red?: number, green?: number, blue?: number, deltaRed?: number, deltaGreen?: number, deltaBlue?: number){
        this.red = red ? red : 0;
        this.green = green ? green : 0;
        this.blue = blue ? blue : 0;

        this.deltaRed = deltaRed? deltaRed : 10;
        this.deltaGreen = deltaGreen? deltaGreen : 0;
        this.deltaBlue = deltaBlue? deltaBlue : 0;
    }

    toRGB(): string{
        return `rgb(${this.red}, ${this.green}, ${this.blue})`
    }

    update(): string{
        if(this.red > 255 || this.red < 0){
            this.deltaRed = -this.deltaRed
        }

        if(this.blue > 255 || this.blue < 0){
            this.deltaBlue = -this.deltaBlue
        }

        if(this.green > 255 || this.green < 0){
            this.deltaGreen = -this.deltaGreen
        }

        this.red += this.deltaRed
        this.green += this.deltaGreen
        this.blue += this.deltaBlue
        
        return this.toRGB()
    }
}

export class Options{

    readonly centerX: number;
    readonly centerY: number;
    readonly slice: number;
    readonly deltaCirlceRadius: number;
    readonly maxActualRadius: number;
    readonly colorSchema: ColorSchema

    constructor(
        public width: number,
        readonly height: number,
        public maxCircles: number,
        readonly maxCircleRadius: number,
        readonly circleLayoutRadius: number,
        readonly backgroundColor: string,
        colorSchema?: ColorSchema
    ){
        this.centerX = width / 2;
        this.centerY = height / 2;
        this.slice = 2 * Math.PI / maxCircles;
        this.deltaCirlceRadius = maxCircleRadius / maxCircles
        this.maxActualRadius = maxCircleRadius - this.deltaCirlceRadius
        this.maxActualRadius = maxCircleRadius - this.deltaCirlceRadius
        this.colorSchema = colorSchema ? colorSchema : new ColorSchema();
    }
}

type Params = {
    options: Options
}

let canvasRef: React.RefObject<HTMLCanvasElement> = React.createRef();

export default ( {options} : Params) => {
    useEffect(() => {
        let canvas: HTMLCanvasElement =  canvasRef.current as HTMLCanvasElement;
        let ctx: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;
        const circles: Array<Circle> = []
        let circleColor: string = "black"

        let running: boolean = true;

        function render(){
            if(running){
                clear()
                drawCircles()
            }
        }

        function update(){
            if(running){
                circleColor = options.colorSchema.update();
                updateRadius();
            }
        }

        initCircles();
        setInterval(render, 16.6);
        setInterval(update, 200);

        function updateRadius(){
            circles.forEach(circle => {
                circle.radius -= options.deltaCirlceRadius
                if(circle.radius < 0) 
                    circle.radius = options.maxActualRadius;
            });
        }

        function clear(){
            ctx.fillStyle = options.backgroundColor;
            ctx.fillRect(0, 0, options.width, options.height);
        }

        function initCircles(){
            for(let i = 0; i < options.maxCircles; ++i){
                const circleCoord: Coord = getCircleCoord(i, options.circleLayoutRadius)
                const circleRadius = options.deltaCirlceRadius * i;
                circles.push({coord: circleCoord, radius: circleRadius})
            }
        }

        function drawCircles(){
            ctx.fillStyle = circleColor;
            for(let circle of circles){
                ctx.beginPath()
                ctx.arc(circle.coord.x, circle.coord.y, circle.radius, 0, 2 * Math.PI)
                ctx.closePath()
                ctx.fill()
            }
        }
        
        function getCircleCoord(point: number, radius: number): Coord{
            const angle = point * options.slice
            const x = options.centerX + radius * Math.cos(angle)
            const y = options.centerY + radius * Math.sin(angle)
            return {x, y}
        }

        return () => {
            running = false;
        }

    })

    return(
        <canvas ref = {canvasRef} width = "500px" height = "500px"></canvas>
    );
}
