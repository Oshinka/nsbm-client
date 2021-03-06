import React, { useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Swal from 'sweetalert2';
import Avatar from '@material-ui/core/Avatar';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import axios from '../../axios';
import { AppBarContext } from '../AppBarContext.component';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, switchBrightness, openDrawer, setReduxAvatar } from '../../actions';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    toggleButton: {
        marginLeft: theme.spacing(2),
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
    },
    control: {
        margin: theme.spacing(2),
    },
    hrControl: {
        marginLeft: 16,
        marginRight: 16,
    }
}));

export default function ButtonAppBar() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const isDark = useSelector(state => state.isDark);

    const [name, setName, avatar, setAvatar] = useContext(AppBarContext);

    const [openNavDrop, setOpenNavDrop] = useState(null);

    const handleClick = (event) => {
        setOpenNavDrop(event.currentTarget);
    };

    const handleClose = () => {
        setOpenNavDrop(null);
    };

    const handleLogin = async () => {
        handleClose();

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
        }

        await axios.post('/students/login', credentials)
            .then(response => {
                console.log(response.data.token);
                localStorage.setItem('jwtToken', response.data.token);
                axios.get('/students/me', { headers: { 'Authorization': response.data.token } })
                    .then(response => {
                        setName(response.data.firstName);
                        dispatch(setReduxAvatar());
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            })
    }

    const handleLogout = () => {
        handleClose();

        axios.get('/students/logout', { headers: { 'Authorization': localStorage.jwtToken } })
            .then(response => {
                console.log(response.data);
                localStorage.removeItem('jwtToken');
                setName('');
                setAvatar('');
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    

    useEffect(() => {

        if (localStorage.jwtToken) {
            axios.get('/students/me', { headers: { 'Authorization': localStorage.jwtToken } })
                .then(response => {
                    setName(response.data.firstName);
                    setAvatar(response.data.avatar);
                    dispatch(login());
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
        dispatch(logout());
    })

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Link to={'/'} className={classes.menuButton}>
                        <img className={classes.logo} src='https://www.nsbm.ac.lk/wp-content/uploads/2019/08/logo.png' alt='logo' />
                    </Link>
                    <IconButton onClick={() => dispatch(openDrawer())} edge="start" className={classes.toggleButton} color="inherit" aria-label="menu">
                        <MenuIcon fontSize='large' />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        NSBM
                    </Typography>
                    <IconButton onClick={() => {
                        dispatch(switchBrightness());
                        localStorage.setItem('isDark', true);
                    }}>
                        { (isDark) ? <Brightness4Icon className={classes.menuButton} /> : <BrightnessHighIcon className={classes.menuButton} /> }
                    </IconButton>
                    <Link to={'/gallery'} className={classes.menuButton}>
                        <Typography variant="h6" className={classes.control}>
                            GALLERY
                        </Typography>
                    </Link>
                    <Avatar src={avatar} className={classes.hrControl} />
                    {
                        (name) ?
                            <Typography variant="h6" className={classes.control}>
                                {name}
                            </Typography> : ''
                    }
                    <IconButton aria-controls='dropDownMenu' aria-haspopup={true} onClick={handleClick} className={classes.hrControl}>
                        <ArrowDropDownIcon fontSize='large' className={classes.menuButton} />
                    </IconButton>
                    <Menu
                        id='dropDownMenu'
                        anchorEl={openNavDrop}
                        keepMounted
                        open={Boolean(openNavDrop)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={() => { window.location = '/' }}>Profile</MenuItem>
                        <MenuItem onClick={handleLogin}>Login</MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
        </div>
    );
}
