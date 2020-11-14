import React from 'react'
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import ImageGallery from 'react-image-gallery';
import LeftBar from './LeftBar.component';
import Data from '../data.json';
import { useSelector } from 'react-redux';
import './brightness.css';

function Gallery() {
    const isDark = useSelector(state => state.isDark)
    
    return (
        <React.Fragment>
            <LeftBar />
            <div className={`${isDark && 'darkMode'}`}>
                <Container style={{ minHeight: '94vh' }}>
                    <Typography variant="h2" style={{ color: 'grey' }} gutterBottom align='center'>
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
