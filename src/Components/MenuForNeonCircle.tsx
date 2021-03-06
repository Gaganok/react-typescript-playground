import React, { useState, useEffect } from 'react';
import NeonLoading, {ColorSchema, Options} from '../Page/EffectPage/EffectComponent/NeonLoader/NeonLoading';
import './NeonMenu.scss';
import Slider from "./Slider";

export type Params = {
    options: Options,
    setOptions: React.Dispatch<React.SetStateAction<any>>
}

export default ({options, setOptions}: Params) => {
    
    function widthChange(){
        console.log("aaaa")
        options.width = Number.parseInt((document.getElementById("width") as HTMLInputElement).value);
        // setOptions(options);
    }

    function heightChange(){
        console.log("aaaa")
        options.width = Number.parseInt((document.getElementById("height") as HTMLInputElement).value);
        // setOptions(options);
    }

    function maxCircleChange(maxCircle: number){
        options.maxCircles = maxCircle;
        setOptions({...options, maxCircles: options.maxCircles});
    }

    function maxCircleRadiusChange(){
        console.log("aaaa")
        options.width = Number.parseInt((document.getElementById("maxCircleRadius") as HTMLInputElement).value);
        // setOptions(options);
        setOptions({...options, maxCircleRadius: options.maxCircleRadius});
        console.log("just called setOptions")
    }

    function circleLayoutRadiusChange(){
        console.log("aaaa")
        options.width = Number.parseInt((document.getElementById("circleLayoutRadius") as HTMLInputElement).value);
        // setOptions(options);
        setOptions({...options, circleLayoutRadius: options.circleLayoutRadius});
        console.log("just called setOptions")
    }

    function backgroundColorChange(){
        console.log("aaaa")
        options.width = Number.parseInt((document.getElementById("backgroundColor") as HTMLInputElement).value);
        // setOptions(options);
        setOptions({...options, backgroundColor: options.backgroundColor});
        console.log("just called setOptions")
    }

    return(
        <div className="menuDiv">
            <div className="menuList">
                <div className="group">      
                    <input className="Input" placeholder={"Width: "} type="text" id="width" onChange={ e => {widthChange()}}/>
                    <span className="bar"></span>
                </div>

                <div className="group">      
                    <input className="Input" placeholder={"Height: "}type="text" id="height" onChange={ e => {heightChange()}}/>
                    <span className="bar"></span>
                </div>

                <div className="group">      
                    <input className="Input" placeholder={"Max Circle: "} type="text" id="maxCircles" onChange={ e => {maxCircleChange(Number.parseInt(e.target.value))}}/>   
                    <span className="bar"></span>
                </div>

                <div className="group">      
                    <input className="Input" placeholder={"Max Circle Radius: "} type="text" id="maxCircleRadius" onChange={ e => {maxCircleRadiusChange()}}/>
                    <span className="bar"></span>
                </div>

                <div className="group">      
                    <input className="Input" placeholder={"Circle Layout Radius: "} type="text" id="maxCircleRadius" onChange={ e => {circleLayoutRadiusChange()}}/>
                    <span className="bar"></span>
                </div>

                <div className="group">      
                    <input className="Input" placeholder={"Background Color: "} type="text" id="maxCircleRadius" onChange={ e => {backgroundColorChange()}}/>
                    <span className="bar"></span>
                </div>
            </div>
            <div className="SliderRange">
                <Slider 
                    hookMethod={maxCircleChange}
                />
            </div>
        </div>
    )
}