import React, { Component } from 'react';
import Swal from 'sweetalert2';
import axios from '../axios';

class CreateLecturer extends Component {
    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeAge = this.onChangeAge.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            age: 0,
            email: '',
            password: ''
        }
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        })
    }

    onChangeAge(e) {
        this.setState({
            age: e.target.value
        })
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const lecturer = {
            name: this.state.name,
            age: this.state.age,
            email: this.state.email,
            password: this.state.password
        }

        axios.post('/lecturers', lecturer)
        .then(res => {
            Swal.fire(
                'Hello ' + res.data.lecturer.name,
                'You clicked the button!',
                'success'
              ).then((result) => {
                window.location = '/lecturers';
              })
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <input type="text" onChange={this.onChangeName} placeholder='name' />
                    <input type="text" onChange={this.onChangeAge} placeholder='age' />
                    <input type="text" onChange={this.onChangeEmail} placeholder='email' />
                    <input type="text" onChange={this.onChangePassword} placeholder='password' />
                    <input type="submit" />
                </form>
            </div>
        )
    }
}

export default CreateLecturer;