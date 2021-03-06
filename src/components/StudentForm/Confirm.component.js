import React, { Component } from 'react'
import { Button, List, ListItem, ListItemText } from '@material-ui/core';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Swal from 'sweetalert2';
import axios from '../../axios';
import ImageAvatars from '../ImageAvatars.component';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';


export class Confirm extends Component {
    continue = e => {
        e.preventDefault();

        const student = this.props.student;

        console.log(student);

        axios.post('/students', student)
            .then(res => {
                console.log(res);
                Swal.fire(
                    'Hello ' + res.data.student.firstName,
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
        const {
            values: { firstName, lastName, gender, dateOfBirth, email, mobile, fixed, password, avatar }
        } = this.props;
        const { steps, activeStep } = this.props

        return (
            <React.Fragment>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <Typography variant='h4' color='textSecondary'>
                    Step 3 : Confirmation
                </Typography>
                <hr style={{ marginRight: 500, marginBottom: 20 }} />
                <ImageAvatars url={avatar} />
                <List>
                    <ListItem>
                        {/* <ListItemText primary='Full Name' secondary={lastName ? `${firstName} ${lastName}` : `${firstName}`} /> */}
                        <ListItemText primary='First Name' secondary={firstName} />
                        <ListItemText primary='Last Name' secondary={lastName} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary='Gender' secondary={gender} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary='Birthday' secondary={dateOfBirth} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary='Email' secondary={email} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary='Password' secondary={password} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary='Mobile' secondary={mobile} />
                        <ListItemText primary='Fixed' secondary={fixed} />
                    </ListItem>
                </List>
                <br />
                <Grid container justify='flex-end'>
                    <Button variant='contained' size="large" onClick={this.back} >Back</Button>
                    <Button color='primary' variant='contained' size="large" onClick={this.continue} >Confirm & Submit</Button>
                </Grid>
            </React.Fragment>
        )
    }
}

export default Confirm
