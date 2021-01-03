import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Dropzone from '../../Components/Dropzone';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    }
  }));

export default () => {  

    const [loaded, setLoaded] = useState(false);
    const [images, setImages] = useState(null);
    
    const grid = {
        xs: 12,
        sm: 6
    }
    
    const classes = useStyles();

    return(
        <Container maxWidth="lg">
            <Dropzone loadHook = {setLoaded} imagesHook = {setImages}></Dropzone>
            {!loaded  ? <CircularProgress /> :
                <Grid container spacing={3}>
                    {images.map( (image, index) => 
                        <Grid key={index} item lg={4}>
                            <Paper className={classes.paper}>
                                <img src={`data:image/jpg;base64,${image}`}  width="100%" />
                            </Paper>
                        </Grid>
                    )}
                </Grid>
            }
        </Container>
    );
} 