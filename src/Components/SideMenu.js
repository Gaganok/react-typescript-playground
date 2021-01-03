import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

function SideMenu({values, className}){
    const style = { color: 'white' }
    return(
        <MenuList>
            {values.map((value, index) => <MenuItem key={index} className={className.large}>{value}</MenuItem>)}
        </MenuList>
    )
}

export default SideMenu;