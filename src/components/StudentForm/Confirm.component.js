import React, { Component } from 'react'
import { Button, List, ListItem, ListItemText } from '@material-ui/core';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Swal from 'sweetalert2';
import axios from '../../axios';
import ImageAvatars from '../ImageAvatars.component';


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
            values: {name, age, email, password, avatar}
        } = this.props;
        const {steps, activeStep} = this.props

        return (
            <React.Fragment>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <ImageAvatars url={avatar} />
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
                <Button variant='contained' size="large" onClick={this.back} >Back</Button>
                <Button color='primary' variant='contained' size="large" onClick={this.continue} >Confirm & Submit</Button>
            </React.Fragment>
        )
    }
}

export default Confirm
