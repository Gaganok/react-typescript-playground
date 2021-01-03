import React from 'react';
import FriendAvatar from './FriendAvatar'
import {Grid} from '@material-ui/core'

export default function FriendGrid() {
    const friendList = [
        {name: "Aleh", img: ""},
        {name: "Veta", img: ""},
        {name: "Violetta", img: ""},
        {name: "Malishkakakakaakaks", img: ""},
        {name: "Malishkakakakaakaks", img: ""},
        {name: "Malishkakakakaakaks", img: ""},
        {name: "Malishkakakakaakaks", img: ""},
    ]

    return (
        <div style={{maxWidth:'250px'}}>        
            <Grid container spacing={2}>                 
                {friendList.map( (friend, index) => 
                    <Grid key={'grid' + index} item sm={4}>
                        <FriendAvatar key={index} friend={friend}/>
                    </Grid>
                )}
            </Grid>
        </div>
    );
}
