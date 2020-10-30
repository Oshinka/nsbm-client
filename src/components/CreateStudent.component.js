import React, { Component } from 'react';
import StudentBasicInfo from './StudentForm/StudentBasicInfo.component';
import Container from '@material-ui/core/Container';
import Confirm from './StudentForm/Confirm.component';
import Finalize from './StudentForm/Finalize.component';
import Swal from 'sweetalert2';
import axios from '../axios';

class CreateStudent extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            step: 1,
            firstName: '',
            lastName: '',
            dateOfBirth: null,
            email: '',
            password: '',
            avatar: ''
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
        const { firstName, lastName, dateOfBirth, email, password, avatar } = this.state;
        const values = { firstName, lastName, dateOfBirth, email, password, avatar };
        const steps = ['Basic Information', 'Finalize', 'Confirmation'];

        switch (step) {
            case 1:
                return (
                    <Container>
                        <StudentBasicInfo
                            nextStep={this.nextStep}
                            handleChange={this.handleChange}
                            values={values}
                            steps={steps}
                            activeStep={0}
                        />
                    </Container>
                )
            case 2:
                return (
                    <Container>
                        <Finalize
                            nextStep={this.nextStep}
                            prevStep={this.prevStep}
                            handleChange={this.handleChange}
                            values={values}
                            steps={steps}
                            activeStep={1}
                        />
                    </Container>
                )
            case 3:
                return (
                    <Container>
                        <Confirm
                            nextStep={this.nextStep}
                            prevStep={this.prevStep}
                            values={values}
                            steps={steps}
                            activeStep={2}
                        />
                    </Container>
                )
            default:
                console.log('This is multi-step from to add a new student');
        }
    }
}

export default CreateStudent;