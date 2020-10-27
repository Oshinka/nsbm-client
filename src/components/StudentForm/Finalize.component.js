import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

export class Finalize extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }

    render() {
        const { steps, activeStep, values, handleChange } = this.props;

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
                    id="avatar"
                    label="avatar"
                    helperText="Paste image URL here"
                    variant="outlined"
                    onChange={handleChange('avatar')}
                    defaultValue={values.avatar}
                />
                <Button variant='contained' size="large" onClick={this.back} >Back</Button>
                <Button variant="contained" size="large" onClick={this.continue} >Continue</Button>
            </React.Fragment>
        )
    }
}

export default Finalize
