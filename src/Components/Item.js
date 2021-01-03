import React from 'react';

function Item({field, value}){
    const style = { color: 'white' }
    return(
        <p style={style}>{field} : {value}</p>
    )
}

export default Item;