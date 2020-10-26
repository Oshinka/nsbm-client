import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export class StudentBasicInfo extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }

    render() {
        const { values, handleChange } = this.props;
        return (
            <div>
                <React.Fragment>
                    <TextField id="name" label="name" variant="outlined" onChange={handleChange('name')} defaultValue={values.name} />
                    <TextField id="age" label="age" variant="outlined" onChange={handleChange('age')} defaultValue={values.age} />
                    <TextField id="email" label="email" variant="outlined" onChange={handleChange('email')} defaultValue={values.email} />
                    <TextField id="password" label="password" variant="outlined" onChange={handleChange('password')} defaultValue={values.password} />
                    <Button variant="contained" size="large" onClick={this.continue} >Continue</Button>
                </React.Fragment>
            </div>
        )
    }
}

export default StudentBasicInfo
