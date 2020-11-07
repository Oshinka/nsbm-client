import React, { Component } from 'react'
import AppBar from './AppBar.component';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import ImageGallery from 'react-image-gallery';

export class Gallery extends Component {
    render() {
        const images = [
            {
              original: 'https://picsum.photos/id/1018/1000/600/',
              thumbnail: 'https://picsum.photos/id/1018/250/150/',
            },
            {
              original: 'https://picsum.photos/id/1015/1000/600/',
              thumbnail: 'https://picsum.photos/id/1015/250/150/',
            },
            {
              original: 'https://picsum.photos/id/1019/1000/600/',
              thumbnail: 'https://picsum.photos/id/1019/250/150/',
            },
          ];

        return (
            <React.Fragment>
                <AppBar />
                <Container>
                    <Typography variant="h2" color='textSecondary' gutterBottom align='center'>
                        GALLERY
                    </Typography>
                    <ImageGallery items={images} />
                </Container>
            </React.Fragment>
        )
    }
}

export default Gallery;
