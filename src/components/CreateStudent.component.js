import React, { Component } from 'react';
import axios from 'axios';

class CreateStudent extends Component {
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

        const student = {
            name: this.state.name,
            age: this.state.age,
            email: this.state.email,
            password: this.state.password
        }

        axios.post('http://localhost:9000/students', student)
        .then(res => console.log(res.data));
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

export default CreateStudent;