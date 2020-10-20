import React, { Component } from 'react';
import classes from './UseStyles.component';
import Avatar from '@material-ui/core/Avatar';
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
                <Avatar src={this.state.avatar} alt='avatar' className={classes.large} />
                <p>Hello {this.state.name}</p>
            </div>
        );
    }
}

export default Student;