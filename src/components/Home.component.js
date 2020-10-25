import React, { Component } from 'react';
import 'fontsource-roboto';
import Typography from '@material-ui/core/Typography';
import axios from '../axios';
import LecturerCard from './LecturerCard.component';
import StudentCard from './StudentCard.component';
import './home.component.css'

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            student: [],
            fullstudent: [],
            management: []
        }
    }

    async componentDidMount() {

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

        this.setState({
            student: [...this.state.student, {
                ...this.state.student[0],
                position: 'President of Student Union',
                comment: 'Absolutely outstanding. I came back to study with the OU almost 20 years after dropping out of a traditional university. I suffer from mental health issues, but the support I have had from the OU has meant that is not been an issue at all.'
            }]
        })
        this.setState({
            student: [...this.state.student, {
                ...this.state.student[1],
                position: '4th Year Undergraduate Student',
                comment: 'Very satisfied with the university. Great courses and content. Quality materials in each module that are explained and covered well. Access to online libraries, even though some articles and materials are not available for free in full.'
            }]
        })
        this.setState({
            student: [...this.state.student, {
                ...this.state.student[2],
                position: '1th Year Undergraduate Student',
                comment: 'I love it. it is flexible. you can work alongside your study. you can study anytime you want during the day or even the night do you can adjust your study time around your work shift etc.'
            }]
        })

        this.setState({ fullstudent: [...this.state.fullstudent, this.state.student[3]] })
        this.setState({ fullstudent: [...this.state.fullstudent, this.state.student[4]] })
        this.setState({ fullstudent: [...this.state.fullstudent, this.state.student[5]] })

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
        return (
            <div>
                <Typography variant="h4" gutterBottom>
                    Students
                </Typography>
                <div className='studentCards'>
                    {this.getStudentCards()}
                </div>
                <Typography variant="h4" gutterBottom>
                    Lecturers
                </Typography>
                <div className='lecturerCards'>
                    {this.getLecturerCards()}
                </div>
            </div>
        );
    }
}

export default Home;