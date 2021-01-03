import React from 'react';
import Buttons from './Buttons';

function Navmenu(){
    const items = ["Sign In", "Login"]
    
    return(
        <div className="navmenu">
            <div className="username">
                <label htmlFor="username">Username</label>
                <input id="username" type="text" placeholder="Enter Username" name="username" />
            </div>
            <div className="password">
                <label htmlFor="password">Password</label>
                <input id="password" type="password" placeholder="Enter Password" name="password" />
            </div>
            <Buttons items={items} />
        </div>
    )
}

export default Navmenu;