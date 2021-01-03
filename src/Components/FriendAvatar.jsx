import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { Container, Typography } from '@material-ui/core';
import panda from './panda1.jpg';

export default function FriendAvatar({friend}) {
    let title = friend.name;
    
    if(title.length > 8){
        title = title.substring(0, 8) + '...'
    }

  return (
    <div>
        <Avatar style={{margin: 'auto'}} src={panda} />
        <Typography align="center" variant="subtitle1" gutterBottom>{title}</Typography>
    </div>
  );
}
