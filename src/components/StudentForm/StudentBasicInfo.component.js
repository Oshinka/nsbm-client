import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import '../createStudent.component.css'

export class StudentBasicInfo extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }

    render() {
        const { steps, activeStep, values, handleChange } = this.props;
        const { firstName, lastName, gender, dateOfBirth, email, mobile, fixed } = values;

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
                    Step 1 : Basic Information
                </Typography>
                <hr style={{ marginRight: 500, marginBottom: 20 }} />
                <Grid>
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
                </Grid>
                <Grid container alignItems="center">
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup aria-label="gender" name="gender" defaultValue={gender} onChange={handleChange('gender')}>
                            <Grid>
                                <FormControlLabel value='Male' control={<Radio />} label="Male" />
                                <FormControlLabel value='Female' control={<Radio />} label="Female" />
                            </Grid>
                        </RadioGroup>
                    </FormControl>
                    <TextField
                        id="dateOfBirth"
                        label="Birthday"
                        variant="outlined"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        onChange={handleChange('dateOfBirth')}
                        defaultValue={dateOfBirth}
                    />
                </Grid>
                <Grid>
                    <TextField
                        id="email"
                        label="E-mail"
                        required
                        variant="outlined"
                        onChange={handleChange('email')}
                        defaultValue={email}
                    />
                    <TextField
                        id="nic"
                        label="NIC"
                        variant="outlined"
                    // onChange={handleChange('fixed')}
                    // defaultValue={email}
                    />
                </Grid>
                <Grid>
                    <TextField
                        id="mobile"
                        label="Mobile"
                        variant="outlined"
                        onChange={handleChange('mobile')}
                        defaultValue={mobile}
                    />
                    <TextField
                        id="fixed"
                        label="Fixed"
                        placeholder="Fixed Number"
                        variant="outlined"
                        onChange={handleChange('fixed')}
                        defaultValue={fixed}
                    />
                </Grid>
                <Grid container justify='flex-end'>
                    <Button variant="contained" size="large" onClick={this.continue} >Continue</Button>
                </Grid>
            </React.Fragment>
        )
    }
}

export default StudentBasicInfo
