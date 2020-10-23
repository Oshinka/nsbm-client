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
        this.onChangePosition = this.onChangePosition.bind(this);
        this.onChangeAvatar = this.onChangeAvatar.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            age: 0,
            email: '',
            password: '',
            position: '',
            avatar: ''
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

    onChangePosition(e) {
        this.setState({
            position: e.target.value
        })
    }

    onChangeAvatar(e) {
        this.setState({
            avatar: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const lecturer = {
            name: this.state.name,
            age: this.state.age,
            email: this.state.email,
            password: this.state.password,
            position: this.state.position,
            avatar: this.state.avatar
        }

        axios.post('/lecturers', lecturer)
        .then(res => {
            Swal.fire(
                'Hello ' + res.data.lecturer.name,
                'Your data has been recorded successfully!',
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
                    <input type="text" onChange={this.onChangePosition} placeholder='position' />
                    <input type="text" onChange={this.onChangeAvatar} placeholder='paste url of the image' />
                    <input type="submit" />
                </form>
            </div>
        )
    }
}

export default CreateLecturer;