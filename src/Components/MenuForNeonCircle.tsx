import React, { useState, useEffect } from 'react';
import NeonLoading, {ColorSchema, Options} from '../Page/EffectPage/EffectComponent/NeonLoader/NeonLoading';
import '../Page/EffectPage/Effect.css';

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

    function maxCircleChange(){
        console.log("aaaa")
        options.maxCircles = Number.parseInt((document.getElementById("maxCircles") as HTMLInputElement).value);
        // setOptions(options.maxCircles);
        setOptions({...options, maxCircles: options.maxCircles});
        console.log("just called setOptions")
    }

    return(
        <div className="menuDiv">
            <div className="menulist">
                <div className="form">
                    <input placeholder={options.width.toString()} className="input" type="text" id="width"
                        onChange={ e => {widthChange()}}/>
                    <button className="buttonForm"> Start</button>
                </div>
                <div className="form">
                    <input placeholder="Height" className="input" type="text" id="height" value={options.height}/>
                    <button className="buttonForm"> Start</button>
                </div>
                <div className="form">
                    <input placeholder={options.maxCircles.toString()} className="input" type="text" id="maxCircles"
                    onChange={ e => {maxCircleChange()}}/>
                    <button className="buttonForm"> Start</button>
                </div>
                <div className="form">
                    <input placeholder="Max Circle Radius" className="input" type="text" id="maxCircleRadius" value={options.maxCircleRadius}/>
                    <button className="buttonForm"> Start</button>
                </div>
                <div className="form">
                    <input placeholder="Circle Layout Radius" className="input" type="text" id="circleLayoutRadius" value={options.circleLayoutRadius}/>
                    <button className="buttonForm"> Start</button>
                </div>
                <div className="form">
                    <input placeholder="Background Color" className="input" type="text" id="backgroundColor" value={options.backgroundColor}/>
                    <button className="buttonForm"> Start</button>
                </div>
            </div>
        </div>
    )
}