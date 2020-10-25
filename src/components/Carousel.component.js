import React from 'react';
import { AutoRotatingCarousel } from 'material-auto-rotating-carousel';

const Carousel = () => {

    return (
        <div>
            <AutoRotatingCarousel>
                <img src='https://media.gettyimages.com/photos/twice-the-brainpower-on-this-assignment-picture-id947895256?s=2048x2048' />
                <img src='https://media.gettyimages.com/photos/we-have-everything-we-need-to-pass-picture-id637874086?s=2048x2048' />
            </AutoRotatingCarousel>
        </div>
    )
}

export default Carousel;
