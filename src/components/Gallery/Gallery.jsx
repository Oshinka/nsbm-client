import React from 'react'
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import ImageGallery from 'react-image-gallery';
import Data from '../../data.json';

function Gallery() {
    return (
        <React.Fragment>
            <div>
                <Container>
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
