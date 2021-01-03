import React from 'react';
import Card from '../../Components/Card'
import Grid from '@material-ui/core/Grid';

export default () => {  
    
    const grid = {
        xs: 12,
        sm: 6
    }
    
    const user = {
        name: "AnonUser"
    }

    return(
        <div className="wrapper__log">
            <Grid container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={3}
                xs = {grid.xs}
                sm = {grid.sm}
            >
                <Grid item >
                    <Card user = {user}/>
                </Grid>
                <Grid item>
                    <Card user = {user}/>
                </Grid>
                <Grid item>
                    <Card user = {user}/>
                </Grid>
                <Grid item >
                    <Card user = {user}/>
                </Grid>
            </Grid>
        </div>
    );
} 