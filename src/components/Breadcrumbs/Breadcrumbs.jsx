import React from "react";
import {
    Breadcrumbs as MUIBreadcrumbs,
    Icon,
    Link,
    Typography
} from "@material-ui/core";
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import HomeIcon from '@material-ui/icons/Home';
// import ViewQuiltIcon from '@material-ui/icons/ViewQuilt';
// import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
// import PersonIcon from '@material-ui/icons/Person';
// import PersonAddIcon from '@material-ui/icons/PersonAdd';
// import EditIcon from '@material-ui/icons/Edit';
// import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
// import PersonOutlineTwoToneIcon from '@material-ui/icons/PersonOutlineTwoTone';
// import PersonAddTwoToneIcon from '@material-ui/icons/PersonAddTwoTone';
// import SubjectIcon from '@material-ui/icons/Subject';
// import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
// import ListIcon from '@material-ui/icons/List';
import Grid from '@material-ui/core/Grid';
import { withRouter } from "react-router-dom";
import Data from '../../data.json';

const Breadcrumbs = props => {
    const {
        history,
        location: { pathname }
    } = props;
    const pathnames = pathname.split("/").filter(x => x);
    return (
        <Grid container justify='flex-end'>
            <MUIBreadcrumbs style={{ margin: '0vh 15vw' }} separator={<KeyboardArrowRightIcon />} aria-label="breadcrumb">
                {pathnames.length > 0 ? (
                    <Link style={{ cursor:'pointer' }} onClick={() => history.push("/")}>
                        <Grid container direction='row' alignItems='center'>
                            <HomeIcon style={{ marginRight: 5 }} />
                            <Typography variant='h6'>Home</Typography>
                        </Grid>
                    </Link>
                ) : ''}
                {pathnames.map((name, index) => {
                    const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
                    const isLast = index === pathnames.length - 1;
                    console.log(name);
                    return Data.breadcrumbs.map((currentBreadcrumb) => {
                        if (name === currentBreadcrumb.paramName) {
                            return (isLast) ?
                                <Grid container direction='row' alignItems='center'>
                                    <Icon component={currentBreadcrumb.icon} />
                                    <Typography variant='h6'>{currentBreadcrumb.displayName}</Typography>
                                </Grid>
                                :
                                <Link key={name} onClick={() => history.push(routeTo)}>
                                    <Grid container direction='row' alignItems='center'>
                                        <Icon component={currentBreadcrumb.icon} />
                                        <Typography variant='h6'>{currentBreadcrumb.displayName}</Typography>
                                    </Grid>
                                </Link>
                        }
                        return '';
                    })
                })}
            </MUIBreadcrumbs>
        </Grid>
    );
};

export default withRouter(Breadcrumbs);
