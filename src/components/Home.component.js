import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Container from '@material-ui/core/Container';
import LecturerCard from './CardComponents/LecturerCard.component';
import StudentCard from './CardComponents/StudentCard.component';
import CourseCard from './CardComponents/CourseCard.component';
import IconButton from '@material-ui/core/IconButton';
import { Button, Grid } from '@material-ui/core';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import Youtube from 'react-youtube';
import Tooltip from '@material-ui/core/Tooltip';
import ImageGallery from 'react-image-gallery';
import Chatbot from "react-chatbot-kit";
import Config from './Chatbot/Config.component';
import MessageParser from "./Chatbot/MessageParser.component";
import ActionProvider from "./Chatbot/ActionProvider.component";
import Contact from './Contact.component';
import Data from '../data.json';
import './home.component.css';
import './brightness.css';

export default function Home() {

    const [showTopButton, setShowTopButton] = useState(false);
    const [openChatbot, setOpenChatbot] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                setShowTopButton(true);
            } else {
                setShowTopButton(false);
            }
        });
    })

    const getCourseCards = () => {

        return Data.courses.map((currentCourse) => {
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

    const getStudentCards = () => {
        return Data.studentReviews.map((currentStudent) => {
            return (
                <StudentCard
                    name={currentStudent.name}
                    avatar={currentStudent.avatar}
                    position={currentStudent.position}
                    comment={currentStudent.comment}
                    key={currentStudent.id}
                />
            )
        })
    }

    const getLecturerCards = () => {
        return Data.academicStaff.map((currentLecturer) => {
            return (
                <LecturerCard
                    name={currentLecturer.name}
                    avatar={currentLecturer.avatar}
                    position={currentLecturer.position}
                    key={currentLecturer.id}
                />
            )
        })
    }

    return (
        <React.Fragment>
            <div id='top' />
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
            <IconButton onClick={() => setOpenChatbot(!openChatbot)} style={{ position:'fixed', bottom: '6vh', right: 0 }} >
                <ChatBubbleIcon
                    color='primary'
                    style={{ fontSize: 72, color: '#3498DB' }}
                    className='hvr-buzz-out'
                />
            </IconButton>
            {
                (openChatbot) ?
                    <Chatbot
                        config={Config}
                        messageParser={MessageParser}
                        actionProvider={ActionProvider}
                    /> : ''
            }
            <Container>
                <Grid className='section textColor'>
                    <Typography variant="h2" gutterBottom align='center'>
                        COURSES
                        </Typography>
                    <div className='courseCards cards'>
                        {getCourseCards()}
                    </div>
                </Grid>
                <Grid className='section textColor'>
                    <Typography variant="h2" gutterBottom align='center'>
                        STUDENT LIFE
                        </Typography>
                    <Grid container direction='row' justify='center'>
                        <Youtube videoId='oKu4GAeGjp8' />
                    </Grid>
                </Grid>
                <div className={`buttonTop ${showTopButton && 'buttonTopShow'}`}>
                    <Tooltip title='Jump To Top' enterDelay={500} placement='bottom-end'>
                        <IconButton color='primary'>
                            <Button href='#top'>
                                <Fab className='hvr-grow' color="primary" size="large" aria-label="scroll back to top">
                                    <KeyboardArrowUpIcon
                                        fontSize='large'
                                        className='hvr-grow'
                                    />
                                </Fab>
                            </Button>
                        </IconButton>
                    </Tooltip>
                </div>
                <Grid className='section textColor'>
                    <Typography variant="h2" gutterBottom align='center'>
                        STUDENTS
                        </Typography>
                    <div className='studentCards cards'>
                        {getStudentCards()}
                    </div>
                </Grid>
                <Grid className='section textColor'>
                    <Typography variant="h2" gutterBottom align='center'>
                        ACADEMIC STAFF
                        </Typography>
                    <div className='lecturerCards cards'>
                        {getLecturerCards()}
                    </div>
                </Grid>
                <Grid className='section contact'>
                    <Contact />
                </Grid>
            </Container>
        </React.Fragment>
    );

}