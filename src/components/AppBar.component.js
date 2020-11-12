import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Swal from 'sweetalert2';
import Avatar from '@material-ui/core/Avatar';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh';
import BrightnessMediumIcon from '@material-ui/icons/BrightnessMedium';
import axios from '../axios';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    toggleButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    menuButton: {
        textDecorationLine: 'none',
        color: '#D0D3D4',
        '&:hover': {
            textDecorationLine: 'none',
            color: "white",
        },
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

    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Link to={'/'} className={classes.menuButton}>
                        <img className={classes.logo} src='https://www.nsbm.ac.lk/wp-content/uploads/2019/08/logo.png' alt='logo' />
                    </Link>
                    <IconButton edge="start" className={classes.toggleButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        NSBM
                        </Typography>
                    <Link to={'/gallery'} className={classes.menuButton}>
                        <Typography variant="h6" className={classes.control}>
                            GALLERY
                        </Typography>
                    </Link>
                    <Avatar src={avatar} className={classes.control} />
                    {
                        (name)
                            ?
                            <Typography variant="h6" className={classes.control}>
                                {name}
                            </Typography>
                            :
                            <Link
                                onClick={async () => {
                                    const { value: credentials } = await Swal.fire({
                                        title: 'LOGIN',
                                        html:
                                            '<input id="swal-input1" placeholder="E-mail" class="swal2-input">' +
                                            '<input id="swal-input2" placeholder="Password" class="swal2-input">',
                                        focusConfirm: false,
                                        preConfirm: () => {
                                            return {
                                                email: document.getElementById('swal-input1').value,
                                                password: document.getElementById('swal-input2').value
                                            }
                                        }
                                    })

                                    if (credentials) {
                                        console.log(credentials);
                                        console.log(credentials.email);
                                        console.log(credentials.password);
                                    }

                                    await axios.post('/students/login', credentials)
                                        .then(response => {
                                            console.log(response.data.token);
                                            axios.get('/students/me', { headers: { 'Authorization': response.data.token } })
                                                .then(response => {
                                                    setName(response.data.firstName);
                                                    setAvatar(response.data.avatar);
                                                })
                                                .catch(function (error) {
                                                    console.log(error);
                                                })
                                        })



                                }}
                                className={classes.menuButton}
                            >
                                <Typography variant="h6" className={classes.control}>
                                    LOGIN
                                </Typography>
                            </Link>
                    }
                    {(isDark) ? <BrightnessMediumIcon className={classes.control} /> : <BrightnessHighIcon className={classes.control} />}
                </Toolbar>
            </AppBar>
        </div>
    );
}
