import React from 'react';
import NavItem from './NavItem';

function NavMenu({navMenu}){
    console.log(navMenu)
    return(
        <ul className="header__list">
            {navMenu.map((section, index) => <NavItem key = {index} text = {section}/>)}
        </ul>
    )
}



export default NavMenu;