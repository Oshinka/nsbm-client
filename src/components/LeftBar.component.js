import React from 'react';
import { NavLink } from "react-router-dom";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import IconButton from '@material-ui/core/IconButton';
import PersonIcon from '@material-ui/icons/Person';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SubjectIcon from '@material-ui/icons/Subject';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useSelector, useDispatch } from 'react-redux';
import { closeDrawer } from '../actions';

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    logo: {
        height: 64,
        marginLeft: 40,
        marginBottom: 10,
    },
    darkMode: {
        backgroundColor: '#424242',
        minHeight: '100vh'
    }
});

export default function TemporaryDrawer({ Icon, link, name }) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const isDark = useSelector(state => state.isDark);
    const isOpenDrawer = useSelector(state => state.isOpenDrawer);

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
    };

    const list = (anchor) => (
        <div
            className={clsx(classes.list, (isDark && classes.darkMode))}
            role="presentation"
            onMouseLeave={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <img className={classes.logo} src='https://www.pikpng.com/pngl/b/71-715532_nsbm-green-university-logo-clipart.png' alt='logo' />
                <ArrowBackIosIcon fontSize='large' onClick={()=>dispatch(closeDrawer())} style={{ marginLeft:20, color:'grey' }} />
                <NavLink to='/' style={{ textDecorationLine: 'none' }} >
                    <ListItem button>
                        <ListItemIcon><IconButton><HomeIcon /></IconButton></ListItemIcon>
                        <ListItemText primary='Home' />
                    </ListItem>
                </NavLink>
                <NavLink to='/students' style={{ textDecorationLine: 'none' }} >
                    <ListItem button>
                        <ListItemIcon><IconButton><PersonIcon /></IconButton></ListItemIcon>
                        <ListItemText primary='Students' />
                    </ListItem>
                </NavLink>
                <NavLink to='/lecturers' style={{ textDecorationLine: 'none' }} >
                    <ListItem button>
                        <ListItemIcon><IconButton><AccountBoxIcon /></IconButton></ListItemIcon>
                        <ListItemText primary='Lectures' />
                    </ListItem>
                </NavLink>
                <NavLink to='/subjects' style={{ textDecorationLine: 'none' }} >
                    <ListItem button>
                        <ListItemIcon><IconButton><SubjectIcon /></IconButton></ListItemIcon>
                        <ListItemText primary='Subjects' />
                    </ListItem>
                </NavLink>
            </List>
            <Divider />
            <List>
                {(link) ?
                    <NavLink to={link} style={{ textDecorationLine: 'none' }} >
                        <ListItem button>
                            <ListItemIcon><IconButton><Icon /></IconButton></ListItemIcon>
                            <ListItemText primary={name} />
                        </ListItem>
                    </NavLink>
                    : ''}
            </List>
        </div>
    );

    return (
        <React.Fragment>
            <Drawer anchor='left' transitionDuration={500} open={isOpenDrawer} onClose={toggleDrawer('left', false)}>
                {list('left')}
            </Drawer>
        </React.Fragment>
    );
}
