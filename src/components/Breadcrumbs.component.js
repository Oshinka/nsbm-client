import React from "react";
import {
    Breadcrumbs as MUIBreadcrumbs,
    Link,
    Typography
} from "@material-ui/core";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import HomeIcon from '@material-ui/icons/Home';
import ViewQuiltIcon from '@material-ui/icons/ViewQuilt';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import PersonIcon from '@material-ui/icons/Person';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import EditIcon from '@material-ui/icons/Edit';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import PersonOutlineTwoToneIcon from '@material-ui/icons/PersonOutlineTwoTone';
import PersonAddTwoToneIcon from '@material-ui/icons/PersonAddTwoTone';
import SubjectIcon from '@material-ui/icons/Subject';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import ListIcon from '@material-ui/icons/List';
import Grid from '@material-ui/core/Grid';
import { withRouter } from "react-router-dom";

const Breadcrumbs = props => {
    const {
        history,
        location: { pathname }
    } = props;
    const pathnames = pathname.split("/").filter(x => x);
    return (
        <Grid container justify='flex-end'>
            <MUIBreadcrumbs style={{ margin: '2vh 15vw' }} separator={<ArrowForwardIosIcon fontSize='small' />} aria-label="breadcrumb">
                {pathnames.length > 0 ? (
                    <Link onClick={() => history.push("/")}>
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
                    switch (name) {
                        case 'gallery':
                            {
                                return (isLast) ?
                                    (
                                        <Grid container direction='row' alignItems='center'>
                                            <ViewQuiltIcon style={{ marginRight: 5 }} />
                                            <Typography variant='h6'>Gallery</Typography>
                                        </Grid>
                                    ) :
                                    (
                                        <Link key={name} onClick={() => history.push(routeTo)}>
                                            <Grid container direction='row' alignItems='center'>
                                                <ViewQuiltIcon style={{ marginRight: 5 }} />
                                                <Typography variant='h6'>Gallery</Typography>
                                            </Grid>
                                        </Link>
                                    )
                            }

                        case 'courses':
                            {
                                return (isLast) ?
                                    (
                                        <Grid container direction='row' alignItems='center'>
                                            <LibraryBooksIcon style={{ marginRight: 5 }} />
                                            <Typography variant='h6'>Courses</Typography>
                                        </Grid>
                                    ) :
                                    (
                                        <Link key={name} onClick={() => history.push(routeTo)}>
                                            <Grid container direction='row' alignItems='center'>
                                                <LibraryBooksIcon style={{ marginRight: 5 }} />
                                                <Typography variant='h6'>Courses</Typography>
                                            </Grid>
                                        </Link>
                                    )
                            }

                        case 'students':
                            {
                                return (isLast) ?
                                    (
                                        <Grid container direction='row' alignItems='center'>
                                            <PersonIcon style={{ marginRight: 5 }} />
                                            <Typography variant='h6'>Students</Typography>
                                        </Grid>
                                    ) :
                                    (
                                        <Link key={name} onClick={() => history.push(routeTo)}>
                                            <Grid container direction='row' alignItems='center'>
                                                <PersonIcon style={{ marginRight: 5 }} />
                                                <Typography variant='h6'>Students</Typography>
                                            </Grid>
                                        </Link>
                                    )
                            }

                        case 'add-student':
                            {
                                return (isLast) ?
                                    (
                                        <Grid container direction='row' alignItems='center'>
                                            <PersonAddIcon style={{ marginRight: 5 }} />
                                            <Typography variant='h6'>Add Student</Typography>
                                        </Grid>
                                    ) :
                                    (
                                        <Link key={name} onClick={() => history.push(routeTo)}>
                                            <Grid container direction='row' alignItems='center'>
                                                <PersonAddIcon style={{ marginRight: 5 }} />
                                                <Typography variant='h6'>Add Student</Typography>
                                            </Grid>
                                        </Link>
                                    )
                            }

                        case 'edit':
                            {
                                return (isLast) ?
                                    (
                                        <Grid container direction='row' alignItems='center'>
                                            <EditIcon style={{ marginRight: 5 }} />
                                            <Typography variant='h6'>Edit</Typography>
                                        </Grid>
                                    ) :
                                    (
                                        <Link key={name} onClick={() => history.push(routeTo)}>
                                            <Grid container direction='row' alignItems='center'>
                                                <EditIcon style={{ marginRight: 5 }} />
                                                <Typography variant='h6'>Edit</Typography>
                                            </Grid>
                                        </Link>
                                    )
                            }

                        case 'profile':
                            {
                                return (isLast) ?
                                    (
                                        <Grid container direction='row' alignItems='center'>
                                            <AssignmentIndIcon style={{ marginRight: 5 }} />
                                            <Typography variant='h6'>Profile</Typography>
                                        </Grid>
                                    ) :
                                    (
                                        <Link key={name} onClick={() => history.push(routeTo)}>
                                            <Grid container direction='row' alignItems='center'>
                                                <AssignmentIndIcon style={{ marginRight: 5 }} />
                                                <Typography variant='h6'>Profile</Typography>
                                            </Grid>
                                        </Link>
                                    )
                            }

                        case 'lecturers':
                            {
                                return (isLast) ?
                                    (
                                        <Grid container direction='row' alignItems='center'>
                                            <PersonOutlineTwoToneIcon style={{ marginRight: 5 }} />
                                            <Typography variant='h6'>Lecturers</Typography>
                                        </Grid>
                                    ) :
                                    (
                                        <Link key={name} onClick={() => history.push(routeTo)}>
                                            <Grid container direction='row' alignItems='center'>
                                                <PersonOutlineTwoToneIcon style={{ marginRight: 5 }} />
                                                <Typography variant='h6'>Lecturers</Typography>
                                            </Grid>
                                        </Link>
                                    )
                            }

                        case 'add-lecturer':
                            {
                                return (isLast) ?
                                    (
                                        <Grid container direction='row' alignItems='center'>
                                            <PersonAddTwoToneIcon style={{ marginRight: 5 }} />
                                            <Typography variant='h6'>Add Lecturer</Typography>
                                        </Grid>
                                    ) :
                                    (
                                        <Link key={name} onClick={() => history.push(routeTo)}>
                                            <Grid container direction='row' alignItems='center'>
                                                <PersonAddTwoToneIcon style={{ marginRight: 5 }} />
                                                <Typography variant='h6'>Add Lecturer</Typography>
                                            </Grid>
                                        </Link>
                                    )
                            }

                        case 'subjects':
                            {
                                return (isLast) ?
                                    (
                                        <Grid container direction='row' alignItems='center'>
                                            <SubjectIcon style={{ marginRight: 5 }} />
                                            <Typography variant='h6'>Subjects</Typography>
                                        </Grid>
                                    ) :
                                    (
                                        <Link key={name} onClick={() => history.push(routeTo)}>
                                            <Grid container direction='row' alignItems='center'>
                                                <SubjectIcon style={{ marginRight: 5 }} />
                                                <Typography variant='h6'>Subjects</Typography>
                                            </Grid>
                                        </Link>
                                    )
                            }

                        case 'add-subject':
                            {
                                return (isLast) ?
                                    (
                                        <Grid container direction='row' alignItems='center'>
                                            <PlaylistAddIcon style={{ marginRight: 5 }} />
                                            <Typography variant='h6'>Add Subjects</Typography>
                                        </Grid>
                                    ) :
                                    (
                                        <Link key={name} onClick={() => history.push(routeTo)}>
                                            <Grid container direction='row' alignItems='center'>
                                                <PlaylistAddIcon style={{ marginRight: 5 }} />
                                                <Typography variant='h6'>Add Subjects</Typography>
                                            </Grid>
                                        </Link>
                                    )
                            }

                        default:
                            return (isLast) ?
                                (
                                    <Grid container direction='row' alignItems='center'>
                                        <ListIcon style={{ marginRight: 5 }} />
                                        <Typography variant='h6'>{name}</Typography>
                                    </Grid>
                                ) :
                                (
                                    <Link key={name} onClick={() => history.push(routeTo)}>
                                        <Grid container direction='row' alignItems='center'>
                                            <ListIcon style={{ marginRight: 5 }} />
                                            <Typography variant='h6'>{name}</Typography>
                                        </Grid>
                                    </Link>
                                )
                    }
                })}
            </MUIBreadcrumbs>
        </Grid>
    );
};

export default withRouter(Breadcrumbs);
