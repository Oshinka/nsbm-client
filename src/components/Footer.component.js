import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import YouTubeIcon from '@material-ui/icons/YouTube';

function Footer() {
    return (
        <Grid container wrap='nowrap' direction='row' justify='center' alignItems='center' className='footer'>
            <Typography>Powered by Dumindu Oshinka</Typography>
            <IconButton href='https://www.facebook.com/dumindu.oshinka' color='inherit'>
                <FacebookIcon />
            </IconButton>
            <IconButton href='https://www.instagram.com/duminduoshinka/' color='inherit'>
                <InstagramIcon />
            </IconButton>
            <IconButton href='https://twitter.com/dumindu_oshinka' color='inherit'>
                <TwitterIcon />
            </IconButton>
            <IconButton href='https://youtube.com/channel/UCSZF6_M-ehRJbmlOHswRqhw' color='inherit'>
                <YouTubeIcon />
            </IconButton>
        </Grid>
    )
}

export default Footer
