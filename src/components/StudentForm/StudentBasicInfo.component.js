import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

export class StudentBasicInfo extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }

    render() {
        const { steps, activeStep, values, handleChange } = this.props;
        const { firstName, lastName, dateOfBirth, email } = values;

        return (
            <React.Fragment>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <TextField
                    id="firstName"
                    label="First Name"
                    variant="outlined"
                    onChange={handleChange('firstName')}
                    defaultValue={firstName}
                />
                <TextField
                    id="lastName"
                    label="Last Name"
                    variant="outlined"
                    onChange={handleChange('lastName')}
                    defaultValue={lastName}
                />
                <TextField
                    id="dateOfBirth"
                    label="Birthday"
                    variant="outlined"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    onChange={handleChange('dateOfBirth')}
                    defaultValue={dateOfBirth}
                />
                <TextField
                    id="email"
                    label="email"
                    variant="outlined"
                    onChange={handleChange('email')}
                    defaultValue={email}
                />
                <Button variant="contained" size="large" onClick={this.continue} >Continue</Button>
            </React.Fragment>
        )
    }
}

export default StudentBasicInfo
