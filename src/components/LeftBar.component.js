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
// import AddCircleIcon from '@material-ui/icons/AddCircle';

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    leftbar: {
        height: 1000,
        float: 'left'
    }
});

export default function TemporaryDrawer({ Icon, link, name }) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onMouseLeave={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
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
            <div
                className={clsx(classes.list, classes.leftbar)}
                onMouseOver={toggleDrawer('left', true)}
            ></div>
            <Drawer anchor='left' open={state['left']} onClose={toggleDrawer('left', false)}>
                {list('left')}
            </Drawer>
        </React.Fragment>
    );
}
