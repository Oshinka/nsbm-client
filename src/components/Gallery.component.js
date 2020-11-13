import React from 'react'
import AppBar from './AppBar.component';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import ImageGallery from 'react-image-gallery';
import Data from '../data.json';
import { AppBarProvider } from './AppBarContext.component';
import { useSelector, useDispatch } from 'react-redux';
import { changeLoginState } from '../actions';
import { Button } from '@material-ui/core';

function Gallery() {

    const isLogged = useSelector(state => state.isLogged);
    const dispatch = useDispatch();


    return (
        <React.Fragment>
            <AppBarProvider>
                <AppBar />
            </AppBarProvider>
            <Container>
                {isLogged ? 'YOURE LOGGED IN' : 'YOU NEED TO LOG'}
                <Button onClick={()=>dispatch(changeLoginState())} >SIGN IN</Button>
                <Typography variant="h2" color='textSecondary' gutterBottom align='center'>
                    GALLERY
                    </Typography>
                <ImageGallery
                    items={Data.images}
                />
            </Container>
        </React.Fragment>
    )

}

export default Gallery;
