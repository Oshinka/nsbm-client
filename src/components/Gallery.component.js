import React, { Component } from 'react'
import AppBar from './AppBar.component';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import ImageGallery from 'react-image-gallery';
import Data from '../data.json';

export class Gallery extends Component {
    render() {
        return (
            <React.Fragment>
                <AppBar />
                <Container>
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
}

export default Gallery;
