import React from 'react';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh';
import BrightnessMediumIcon from '@material-ui/icons/BrightnessMedium';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    logo: {
        height: 64,
        marginLeft: 20,
        marginRight: 80,
    },
    control: {
        margin: theme.spacing(2),
      },
}));

export default function ButtonAppBar({ isDark }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <img className={classes.logo} src='https://www.nsbm.ac.lk/wp-content/uploads/2019/08/logo.png' alt='logo' />
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        NSBM
                    </Typography>
                    <Link to={'/gallery'} color='textSecondary' style={{ textDecorationLine: 'none' }}>
                        <Typography variant="h6" className={classes.control}>
                            GALLERY
                        </Typography>
                    </Link>
                    {(isDark) ? <BrightnessMediumIcon className={classes.control} /> : <BrightnessHighIcon className={classes.control} />}
                </Toolbar>
            </AppBar>
        </div>
    );
}