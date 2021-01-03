import React from 'react';
import {Link} from "react-router-dom"

function Button({text}){
    return(
        <Link className="button" to="/main">{text}</Link>
    )
}

export default Button;