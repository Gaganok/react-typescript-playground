import React from 'react';
import SideMenu from './SideMenu';
import anon from "../Resources/Image/anon.png"
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

function SideBar(){
    const values = ["Home", "Friend", "Photo"]
    const style = {
        avatar:{
            alignSelf: "center",
            justifySelf: "center",
        },
        wrapper:{
            display:"flex",
            flexDirection:"column",
            alignContent:"center",
            justifyContent:"center",
            padding: "3rm"
        }
    }

    const useStyles = makeStyles((theme) => ({
        root: {
          display: 'flex',
          '& > *': {
            margin: theme.spacing(1),
          },
        },
        small: {
          width: theme.spacing(3),
          height: theme.spacing(3),
        },
        large: {
          width: theme.spacing(15),
          height: theme.spacing(15),
        },
      }));
    
      const classes = useStyles();
    return(
        <div style={style.wrapper}>
            <Avatar style={style.avatar} src={anon} className={classes.large}></Avatar>
            <SideMenu values = {values} className={classes}></SideMenu>
        </div>
    )
}

export default SideBar;