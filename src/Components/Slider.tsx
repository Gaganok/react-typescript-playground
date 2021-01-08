import React, { useState, useEffect } from 'react';
import NeonLoading, {ColorSchema, Options} from '../Page/EffectPage/EffectComponent/NeonLoader/NeonLoading';
import './NeonMenu.scss';

interface params{
    hookMethod: (input: number) => void 
}

export default  function Slider(param : params){
    return(
        <div className="RangeDiv">
            <input className="Range" type="range" id="myRange" min={0} max={100} 
                onChange={(event) => param.hookMethod(Number.parseInt(event.target.value))}/>
            {/* <input className="Range" type="range" id="myRange" min={0} max={10}/> */}
        </div>
    )          
}