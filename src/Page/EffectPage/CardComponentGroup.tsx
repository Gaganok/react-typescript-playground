import React, { useState, useEffect } from 'react';
import './Effect.css';
import CardComponent from './CardComponent'

export type CardInput = {
    backgroundText?: string;
    title: string;
    text: string;
}

export default ( {items } : any) => {
    return(
        <div className='container'>
            {items.map( (item : CardInput, index : number)  => {
                let backgroundNumber: string = item.backgroundText ? item.backgroundText :  
                    ++index >= 10 ? index.toString() : '0' + index;
                return <CardComponent text1={backgroundNumber} text2={item.title} text3={item.text} />
            })}
        </div>
    );
}
