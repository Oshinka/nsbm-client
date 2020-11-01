import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Grid from '@material-ui/core/Grid';

export class Finalize extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }

    handleClickShowPassword = e => {
        e.preventDefault();
        this.props.handleClickShowPassword();
    };

    render() {
        const { steps, activeStep, values, handleChange } = this.props;
        const { avatar, password, showPassword } = values;

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
                    Step 2 : Finalize
                </Typography>
                <hr style={{ marginRight: 500, marginBottom: 20 }} />
                <TextField
                    id="avatar"
                    label="avatar"
                    helperText="Paste image URL here"
                    variant="outlined"
                    onChange={handleChange('avatar')}
                    defaultValue={avatar}
                />
                <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={handleChange('password')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={this.handleClickShowPassword}
                                    // onMouseDown={this.handleMouseDownPassword()}
                                    edge="end"
                                >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                        labelWidth={70}
                    />
                </FormControl>
                <Grid container justify='flex-end'>
                    <Button variant='contained' size="large" onClick={this.back} >Back</Button>
                    <Button variant="contained" size="large" onClick={this.continue} >Continue</Button>
                </Grid>
            </React.Fragment>
        )
    }
}

export default Finalize
