import React, { Component } from 'react';
import classes from './UseStyles.component';
import Button from '@material-ui/core/Button';
import ImageAvatars from '../ImageAvatars.component';
import Swal from 'sweetalert2';
import axios from '../../axios';

class Student extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            age: 0,
            email: '',
            avatar: ''
        }
    }

    componentDidMount() {
        axios.get('/students/me', {headers: {'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmFiY2M5NTlmYzIxYTc4ZGEzZTcxZTciLCJpYXQiOjE2MDUwOTU3OTd9.QWCCgOWpurC7Cx5iktUQD_0MqqtieHAUcQghvXamJ-U'}})
            .then(response => {
                this.setState({
                    firstName: response.data.firstName,
                    age: response.data.age,
                    email: response.data.email,
                    avatar: response.data.avatar
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {
        return (
            <div className={classes.root}>
                <Button
                    onClick={() => {
                        Swal.fire({
                            imageUrl: this.state.avatar,
                            imageWidth: 400,
                            imageAlt: 'Student Avatar',
                            showCloseButton: true,
                            showCancelButton: true,
                            confirmButtonText: `Edit`,
                        }).then(async (result) => {
                            if (result.isConfirmed) {
                                const { value: url } = await Swal.fire({
                                    input: 'url',
                                    inputLabel: 'Image URL',
                                    inputPlaceholder: 'Enter the URL',
                                    showCloseButton: true,
                                })

                                if (url) {
                                    console.log(this.state);
                                    this.setState({ avatar: url });
                                    axios.patch('/students/' + this.props.match.params.id, this.state)
                                        .then(res => console.log(res.data));
                                    Swal.fire({
                                        imageUrl: this.state.avatar,
                                        imageWidth: 400,
                                        imageHeight: 250,
                                        imageAlt: 'Student Avatar'
                                    })
                                }
                            }
                        })
                    }}
                >
                    <ImageAvatars url={this.state.avatar} />
                </Button>

                <p>Hello {this.state.firstName}</p>
            </div>
        );
    }
}

export default Student;