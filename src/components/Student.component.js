import React, { Component } from 'react';
import classes from './UseStyles.component';
import Button from '@material-ui/core/Button';
import ImageAvatars from './ImageAvatars.component';
import Swal from 'sweetalert2';
import axios from '../axios';

class Student extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            age: 0,
            email: '',
            avatar: ''
        }
    }

    componentDidMount() {
        axios.get('/students/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    name: response.data.name,
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
                            imageHeight: 250,
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

                <p>Hello {this.state.name}</p>
            </div>
        );
    }
}

export default Student;