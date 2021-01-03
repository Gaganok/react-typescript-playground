import React from 'react';

function NavItem({text}){
    return(
        <li className="header__items">
            <a href="#" className="header__link">{text}</a>
        </li>
    )
}



export default NavItem