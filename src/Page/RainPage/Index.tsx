import { Container} from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import {Drop} from "./Drop"

export default () => {
    const canvasRef : React.RefObject<HTMLCanvasElement> = React.createRef()

    function startRain(){
        const canvas : HTMLCanvasElement = canvasRef.current as HTMLCanvasElement;

        const maxWidth : number = canvas.offsetWidth;
        const maxHeight : number = canvas.offsetHeight;

        const ctx : CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;
    
        const backgroundColor : string = "black"
        const dropColor : string = "white" 

        const drops : Array<Drop> = []

        const fps : number = 60
        const updateRate : number = 1000 / fps
        const density : number = 50

        setInterval(() => {
            generateDrop()
        }, density)

        setInterval(() => {
            refresh()
            updateDrop()
        }, updateRate) // 60 updates per second

        function generateDrop(){
            drops.push(new Drop(Math.random() * maxWidth))
        }

        function drawDrop(drop : Drop){
            ctx.strokeStyle = dropColor
            ctx.beginPath()
            ctx.moveTo(drop.x, drop.y);
            ctx.lineTo(drop.x, drop.y + drop.size); 
            ctx.stroke()
            ctx.closePath()
        }

        function drawDropV2(drop : Drop){
            ctx.strokeStyle = dropColor
            ctx.fillStyle = dropColor
            const size = 1 * drop.size
            const sizeY = 3 * drop.size

            ctx.beginPath()
            ctx.moveTo(drop.x - size, drop.y);
            ctx.lineTo(drop.x, drop.y + drop.size - sizeY);
            ctx.lineTo(drop.x + size, drop.y);
            ctx.arc(drop.x, drop.y, size, 0, Math.PI);   
            // ctx.stroke()
            ctx.fill()
            ctx.closePath()
        }

        function updateDrop(){
            for(let i = 0; i < drops.length; ++i){
                const drop = drops[i]
                if(drop.y > maxHeight){
                    drops.splice(i, 1);
                } else {
                    const now = Date.now()
                    if(now - drop.lastUpdate > drop.speed){
                        ++drop.y 
                        ++drop.x
                        drop.lastUpdate = Date.now()
                    }
                    drawDropV2(drop)
               }
            }
        }

        function refresh(){
            ctx.fillStyle = backgroundColor
            ctx.fillRect(0, 0, maxWidth, maxHeight)
        }
    }

    useEffect(() => {
        startRain()
    });

    return(
        <Container>
            <canvas ref={canvasRef} width="500" height="500"></canvas>
        </Container>
    );
}