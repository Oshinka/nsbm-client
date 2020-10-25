import React, { Component } from 'react';
import Swal from 'sweetalert2';
import axios from '../axios';

class EditStudent extends Component {
    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeAge = this.onChangeAge.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            age: 0,
            email: ''
        }
    }

    componentDidMount() {
        axios.get('/students/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    name: response.data.name,
                    age: response.data.age,
                    email: response.data.email
                })
            })
            .catch(function (error) {
                console.log(error);
            })
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

    onSubmit(e) {
        e.preventDefault();

        const student = {
            name: this.state.name,
            age: this.state.age,
            email: this.state.email
        }

        Swal.fire({
            title: 'Do you want to save the changes?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: `Save`,
            denyButtonText: `Don't save`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                axios.patch('/students/' + this.props.match.params.id, student)
                    .then(res => console.log(res.data));
                Swal.fire('Saved!', '', 'success').then((result) => {
                    window.location = '/students';
                  })
            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info').then((result) => {
                    window.location = '/students';
                  })
            }
        })
    }

    render() {
        return (<div>
            <form onSubmit={this.onSubmit}>
                <input type="text" value={this.state.name} onChange={this.onChangeName} placeholder='name' />
                <input type="text" value={this.state.age} onChange={this.onChangeAge} placeholder='age' />
                <input type="text" value={this.state.email} onChange={this.onChangeEmail} placeholder='email' />
                <input type="submit" />
            </form>
        </div>);
    }
}

export default EditStudent;