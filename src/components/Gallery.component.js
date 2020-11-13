import React from 'react'
import AppBar from './AppBar.component';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import ImageGallery from 'react-image-gallery';
import Data from '../data.json';
import { AppBarProvider } from './AppBarContext.component';
import { useSelector } from 'react-redux';
import './brightness.css';

function Gallery() {
    const isDark = useSelector(state => state.isDark)
    
    return (
        <React.Fragment>
            <AppBarProvider>
                <AppBar />
            </AppBarProvider>
            <div className={`${isDark && 'darkMode'}`}>
                <Container>
                    <Typography variant="h2" color='textSecondary' gutterBottom align='center'>
                        GALLERY
                        </Typography>
                    <ImageGallery
                        items={Data.images}
                    />
                </Container>
            </div>
        </React.Fragment>
    )

}

export default Gallery;
