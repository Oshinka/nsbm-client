import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Swal from 'sweetalert2';
import axios from '../axios';

class CreateStudent extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            age: 0,
            email: '',
            password: ''
        }
    }

    handleChange = input => e => {
        this.setState({ [input]: e.target.value })
    };

    onSubmit(e) {
        e.preventDefault();

        const student = this.state;

        console.log(student);

        axios.post('/students', student)
            .then(res => {
                console.log(res);
                Swal.fire(
                    'Hello ' + res.data.student.name,
                    'Your record saved successfully!',
                    'success'
                ).then((result) => {
                    window.location = '/students/profile/' + res.data.student._id;
                })
            });
    }

    render() {
        return (
            <React.Fragment>
                <form onSubmit={this.onSubmit}>
                    <TextField id="name" label="name" variant="outlined" onChange={this.handleChange('name')} />
                    <TextField id="age" label="age" variant="outlined" onChange={this.handleChange('age')} />
                    <TextField id="email" label="email" variant="outlined" onChange={this.handleChange('email')} />
                    <TextField id="password" label="password" variant="outlined" onChange={this.handleChange('password')} />
                    <Button type="submit" variant="contained" size="large" >Submit</Button>
                </form>
            </React.Fragment>
        )
    }
}

export default CreateStudent;