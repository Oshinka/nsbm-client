import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import StudentBasicInfo from '../StudentForm/StudentBasicInfo.component';
import Finalize from '../StudentForm/Finalize.component';
import Confirm from '../StudentForm/Confirm.component';
import Typography from '@material-ui/core/Typography';
import Swal from 'sweetalert2';
import axios from '../../axios';

class CreateStudent extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            step: 1,
            firstName: '',
            lastName: '',
            gender: '',
            dateOfBirth: null,
            email: '',
            contact: {
                mobile: '',
                fixed: '',
            },
            password: '',
            showPassword: false,
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
        if(input === 'mobile' || input === 'fixed')
            this.setState({ contact: { ...this.state.contact, [input]: e.target.value } })
        this.setState({ [input]: e.target.value })
    };

    handleClickShowPassword = () => {
        const { showPassword } = this.state;
        this.setState({showPassword: !showPassword})
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
        const { firstName, lastName, gender, dateOfBirth, email, contact, password, showPassword, avatar } = this.state;
        const { mobile, fixed } = contact;
        const values = { firstName, lastName, gender, dateOfBirth, email, mobile, fixed, password, showPassword, avatar };
        const student = { firstName, lastName, gender, dateOfBirth, email, contact, password, avatar };
        const steps = ['Basic Information', 'Finalize', 'Confirmation'];

        switch (step) {
            case 1:
                return (
                    <Container>
                        <Typography variant='h2' color='textPrimary' align='center' gutterBottom>
                            Student Registration
                        </Typography>
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
                        <Typography variant='h2' color='textPrimary' align='center' gutterBottom>
                            Student Registration
                        </Typography>
                        <Finalize
                            nextStep={this.nextStep}
                            prevStep={this.prevStep}
                            handleChange={this.handleChange}
                            handleClickShowPassword={this.handleClickShowPassword}
                            values={values}
                            steps={steps}
                            activeStep={1}
                        />
                    </Container>
                )
            case 3:
                return (
                    <Container>
                        <Typography variant='h2' color='textPrimary' align='center' gutterBottom>
                            Student Registration
                        </Typography>
                        <Confirm
                            nextStep={this.nextStep}
                            prevStep={this.prevStep}
                            values={values}
                            student={student}
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