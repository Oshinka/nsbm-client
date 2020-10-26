import React, { Component } from 'react';
import StudentBasicInfo from './StudentForm/StudentBasicInfo.component';
import Confirm from './StudentForm/Confirm.component';
import Swal from 'sweetalert2';
import axios from '../axios';

class CreateStudent extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            step: 1,
            name: '',
            age: 0,
            email: '',
            password: ''
        }
    }

    nextStep = () => {
        const { step } = this.state;
        this.setState({
            step: step + 1
        });
    };

    prevStep = () => {
        const { step } = this.state;
        this.setState({
            step: step - 1
        });
    };

    handleChange = input => e => {
        this.setState({ [input]: e.target.value })
    };

    onSubmit(e) {
        e.preventDefault();

        const student = this.state;

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

    render() {
        const { step } = this.state;
        const { name, age, email, password } = this.state;
        const values = { name, age, email, password };

        switch (step) {
            case 1:
                return (
                    // <React.Fragment>
                    //     <form onSubmit={this.onSubmit}>
                    //         <TextField id="name" label="name" variant="outlined" onChange={this.handleChange('name')} />
                    //         <TextField id="age" label="age" variant="outlined" onChange={this.handleChange('age')} />
                    //         <TextField id="email" label="email" variant="outlined" onChange={this.handleChange('email')} />
                    //         <TextField id="password" label="password" variant="outlined" onChange={this.handleChange('password')} />
                    //         <Button type="submit" variant="contained" size="large" >Submit</Button>
                    //     </form>
                    // </React.Fragment>
                    <StudentBasicInfo
                        nextStep={this.nextStep}
                        handleChange={this.handleChange}
                        values={values}
                    />
                )
            case 2:
                return (
                    <Confirm
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        values={values}
                    />
                )
            default:
                console.log('This is multi-step from to add a new student');
        }
    }
}

export default CreateStudent;