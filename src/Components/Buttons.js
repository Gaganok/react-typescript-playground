import React from 'react';
import Button from './Button';

function Buttons({items}){
    console.log(items)
    return(
        <div className="buttons">
            {items.map( (item, index) => <Button key={index} text={item}/>)} 
        </div>
    )
}

export default Buttons;