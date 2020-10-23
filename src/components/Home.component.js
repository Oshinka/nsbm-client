import React, { Component } from 'react';
import 'fontsource-roboto';
import Typography from '@material-ui/core/Typography';
import axios from '../axios';
import LecturerCard from './LecturerCard.component';
import './home.component.css'

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lecturers: [],
            management: []
        }
    }

    async componentDidMount() {
        axios.get('/lecturers')
            .then(response => {
                this.setState({ lecturers: response.data })
            })
            
            await axios.get('/lecturers/5f913b7009a5c2577100e76e')
            .then(response => {
                this.setState({ management: [...this.state.management, response.data ] })
            })
            
            await axios.get('/lecturers/5f9162a9642fa710b0d916e1')
            .then(response => {
                this.setState({  management: [...this.state.management, response.data ]})
            })
            
            await axios.get('/lecturers/5f919738fe5ae34c72e3c86c')
            .then(response => {
                this.setState({  management: [...this.state.management, response.data ]})
            })
            
            await axios.get('/lecturers/5f919d13fe5ae34c72e3c86e')
            .then(response => {
                this.setState({  management: [...this.state.management, response.data ]})
            })
            
            await axios.get('/lecturers/5f919fc9fe5ae34c72e3c870')
            .then(response => {
                this.setState({  management: [...this.state.management, response.data ]})
            })
            
            await axios.get('/lecturers/5f91a15cfe5ae34c72e3c872')
            .then(response => {
                this.setState({  management: [...this.state.management, response.data ]})
            })
    }

    getlecturerCards() {
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
                    Lecturers
                </Typography>
                <div className='lecturerCards'>
                    { this.getlecturerCards() }
                </div>
            </div>
        );
    }
}

export default Home;