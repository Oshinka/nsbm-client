import React, { Component } from 'react'
import { Button, List, ListItem, ListItemText } from '@material-ui/core';
import Swal from 'sweetalert2';
import axios from '../../axios';


export class Confirm extends Component {
    continue = e => {
        e.preventDefault();

        const student = this.props.values;

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

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }

    render() {
        const{
            values: {name, age, email, password}
        } = this.props;

        return (
            <React.Fragment>
                <List>
                    <ListItem>
                        <ListItemText primary='Name' secondary={name} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary='Age' secondary={age} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary='Email' secondary={email} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary='Password' secondary={password} />
                    </ListItem>
                </List>
                <br />
                <Button variant='contained' onClick={this.back} >Back</Button>
                <Button color='primary' variant='contained' onClick={this.continue} >Confirm & Submit</Button>
            </React.Fragment>
        )
    }
}

export default Confirm
