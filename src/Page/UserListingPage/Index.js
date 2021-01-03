import React from 'react';
import SideBar from '../../Components/SideBar'

export default () => {  
    
    const grid = {
        xs: 12,
        sm: 6
    }
    
    const user = {
        name: "AnonUser"
    }

    return(
        <div className="side__menu">
            <SideBar/>
        </div>
    );
} 