import React, { useState, useEffect } from 'react';
import './Effect.css';

export type CardInput = {
    text1: string;
    text2: string;
    text3: string;
}

export default ({text1, text2, text3} : CardInput) => {
    return(
        <div className='BorderStyle'>
            <div className='CardStyle'>
                <h1 className='NumberStyle'>{text1}</h1>
                <h2 className='H2Style'>{text2}</h2>
                <p className='TextStyle'>{text3} </p>
                <button className='ButtonStyle'>Read more</button>
            </div>
        </div>
    );
}
