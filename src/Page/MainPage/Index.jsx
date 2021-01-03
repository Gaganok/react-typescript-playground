import { Container, Grid, Paper } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import FriendAvatar from '../../Components/FriendAvatar';
import FriendGrid from '../../Components/FriendGrid';
import Item from '../../Components/Item'

function MainPage(){
    return(
        <Container>
            <Paper variant="outlined" square >

            </Paper>

            
            <FriendGrid/>
            

        </Container>
    );
}

export default MainPage;