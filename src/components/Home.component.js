import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import axios from '../axios';
import Container from '@material-ui/core/Container';
import LecturerCard from './CardComponents/LecturerCard.component';
import StudentCard from './CardComponents/StudentCard.component';
import CourseCard from './CardComponents/CourseCard.component';
import IconButton from '@material-ui/core/IconButton';
import { Button, Grid } from '@material-ui/core';
import Youtube from 'react-youtube';
import AppBar from './AppBar.component';
import LeftBar from './LeftBar.component';
import Tooltip from '@material-ui/core/Tooltip';
import ImageGallery from 'react-image-gallery';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import YouTubeIcon from '@material-ui/icons/YouTube';
import Contact from './Contact.component';
import Data from '../data.json';
import './home.component.css'

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            student: [],
            fullstudent: [],
            management: [],
            showtopbutton: false,
            isloading: false,
            isDark: false
        }
    }

    async componentDidMount() {
        this.setState({ isloading: true })

        // Students
        await axios.get('/students/5f7c9961ac8ac64c4172cafa')
            .then(response => {
                this.setState({ student: [...this.state.student, response.data] })
            })

        await axios.get('/students/5f7f3cf074c41cc08e7d49af')
            .then(response => {
                this.setState({ student: [...this.state.student, response.data] })
            })

        await axios.get('/students/5f80423c620aa04f4b48db20')
            .then(response => {
                this.setState({ student: [...this.state.student, response.data] })
            })

        Data.studentReviews.map((review) => {
            return (
                this.setState({
                    student: [...this.state.student, {
                        ...this.state.student[review.id],
                        position: review.position,
                        comment: review.comment
                    }]
                })
            )
        })

        const studentIndexes = [3, 4, 5];

        studentIndexes.map((studentIndex) => {
            return (
                this.setState({ fullstudent: [...this.state.fullstudent, this.state.student[studentIndex]] })
            )
        })

        // Lecturers
        await axios.get('/lecturers/5f913b7009a5c2577100e76e')
            .then(response => {
                this.setState({ management: [...this.state.management, response.data] })
            })

        await axios.get('/lecturers/5f9162a9642fa710b0d916e1')
            .then(response => {
                this.setState({ management: [...this.state.management, response.data] })
            })

        await axios.get('/lecturers/5f919738fe5ae34c72e3c86c')
            .then(response => {
                this.setState({ management: [...this.state.management, response.data] })
            })

        await axios.get('/lecturers/5f919d13fe5ae34c72e3c86e')
            .then(response => {
                this.setState({ management: [...this.state.management, response.data] })
            })

        await axios.get('/lecturers/5f919fc9fe5ae34c72e3c870')
            .then(response => {
                this.setState({ management: [...this.state.management, response.data] })
            })

        await axios.get('/lecturers/5f91a15cfe5ae34c72e3c872')
            .then(response => {
                this.setState({ management: [...this.state.management, response.data] })
            })

        this.setState({ isloading: false })

        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                this.setState({ showtopbutton: true })
            } else {
                this.setState({ showtopbutton: false })
            }
        });

        return () => {
            window.removeEventListener('scroll');
        }
    }

    getCourseCards() {
        const courses = [
            {
                id: 0,
                courseCode: 'cs',
                title: 'Computer Science',
                image: 'https://media.gettyimages.com/photos/-picture-id1256651755?s=2048x2048'
            },
            {
                id: 1,
                courseCode: 'is',
                title: 'Information System',
                image: 'https://media.gettyimages.com/photos/blue-and-purple-technology-background-circuit-board-picture-id1201452137?s=2048x2048'
            }
        ]

        return courses.map((currentCourse) => {
            return (
                <Link to={'/courses/' + currentCourse.courseCode} style={{ textDecoration: 'none' }}>
                    <div className='courseCard'>
                        <CourseCard
                            title={currentCourse.title}
                            image={currentCourse.image}
                            key={currentCourse.id}
                        />
                    </div>
                </Link>
            )
        })
    }

    getStudentCards() {
        return this.state.fullstudent.map((currentStudent) => {
            return (
                <StudentCard
                    student={currentStudent}
                    key={currentStudent._id}
                />
            )
        })
    }

    getLecturerCards() {
        return this.state.management.map((currentLecturer) => {
            return (
                <LecturerCard
                    lecturer={currentLecturer}
                    key={currentLecturer._id}
                />
            )
        })
    }

    render() {
        const { showtopbutton, isDark } = this.state;

        if (this.state.isloading)
            return (
                <Container>
                    <div className='loadingIcon'>
                        <img src='https://loading.io/mod/spinner/camera/index.svg' alt='loading...' />
                    </div>
                </Container>
            )

        return (
            <React.Fragment>
                <div id='top' />
                <AppBar isDark={isDark} />
                <ImageGallery
                    items={Data.home.images}
                    showNav={false}
                    showFullscreenButton={false}
                    showPlayButton={false}
                    showThumbnails={false}
                    slideDuration={2000}
                    slideInterval={12000}
                    autoPlay
                    showBullets
                />
                <LeftBar />
                <Container className={`${isDark && 'darkMode'}`}>
                    <Grid className='section'>
                        <Typography variant="h2" color='textSecondary' gutterBottom align='center'>
                            COURSES
                        </Typography>
                        <div className='courseCards cards'>
                            {this.getCourseCards()}
                        </div>
                    </Grid>
                    <Grid className='section'>
                        <Typography variant="h2" color='textSecondary' gutterBottom align='center'>
                            STUDENT LIFE
                        </Typography>
                        <Grid  container direction='row' justify='center'>
                            <Youtube videoId='oKu4GAeGjp8' />
                        </Grid>
                    </Grid>
                    <div className={`buttonTop ${showtopbutton && 'buttonTopShow'}`}>
                        <Tooltip title='Jump To Top' enterDelay={500} placement='bottom-end'>
                            <IconButton color='primary'>
                                <Button href='#top'>
                                    <Fab color="primary" size="large" aria-label="scroll back to top">
                                        <KeyboardArrowUpIcon
                                            fontSize='large'
                                        />
                                    </Fab>
                                </Button>
                            </IconButton>
                        </Tooltip>
                    </div>
                    <Grid className='section'>
                        <Typography variant="h2" color='textSecondary' gutterBottom align='center'>
                            STUDENTS
                        </Typography>
                        <div className='studentCards cards'>
                            {this.getStudentCards()}
                        </div>
                    </Grid>
                    <Grid className='section'>
                        <Typography variant="h2" color='textSecondary' gutterBottom align='center'>
                            LECTURERS
                        </Typography>
                        <div className='lecturerCards cards'>
                            {this.getLecturerCards()}
                        </div>
                    </Grid>
                    <Grid className='section contact'>
                        <Contact />
                    </Grid>
                </Container>
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
                    
            </React.Fragment>
        );
    }
}

export default Home;