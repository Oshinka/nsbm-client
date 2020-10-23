import React, { Component } from 'react';
import classes from './UseStyles.component';
import ImageAvatars from './ImageAvatars.component';
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
                <ImageAvatars url={this.state.avatar} />
                <p>Hello {this.state.name}</p>
            </div>
        );
    }
}

export default Student;