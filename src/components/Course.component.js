import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import TelegramIcon from '@material-ui/icons/Telegram';
import AppBar from './AppBar.component';
// import LeftBar from './LeftBar.component';
import Paypal from './Paypal.component';
import emailjs from 'emailjs-com';
import Swal from 'sweetalert2';
import Data from '../data.json';
import axios from '../axios';
import './home.component.css'
import 'fontsource-roboto';

export class Course extends Component {
    constructor(props) {
        super(props);

        this.state = {
            enroll: false
        }
    }

    handleSuccess = (payment) => {
        console.log('From handleSuccess method', payment);
        console.log('From handleSuccess method', payment.paymentID);

        const paymentDetails = {
            paidEmail: payment.email,
            payerId: payment.payerID,
            paymentId: payment.paymentID,
            paymentToken: payment.paymentToken
        };

        axios.post('/payments', paymentDetails)
            .then(res => {
                console.log(res.data);
                Swal.fire({
                    icon: 'success',
                    title: 'Your Payment has done successfully',
                    showConfirmButton: false,
                    timer: 4500
                })
            })

        var templateParams = {
            name: 'John'
        };

        emailjs.send('service_nsbm', 'template_receipt_payment', templateParams, 'user_IEVOpMbXgEGRrOezcMmfg')
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
            }, (error) => {
                console.log('FAILED...', error);
            });
    }

    handleError() {

    }

    handleCancel() {

    }

    render() {
        const courseCode = this.props.match.params.course_code;

        switch (courseCode) {
            case 'cs':
                var stream = Data.course.cs;
                break;

            case 'is':
                stream = Data.course.is;
                break;

            default:
                console.log('Course Code is not found');
                break;
        }

        return (
            <React.Fragment>
                <AppBar />
                {/* <LeftBar /> */}
                <img
                    src={stream.cover}
                    width='100%'
                    height='400px'
                    alt='cs_cover'
                    style={{ objectFit: 'cover' }}
                />
                <Container>
                    <Grid className='section'>
                        <Typography variant='h3' color='textSecondary' gutterBottom>
                            {stream.name}
                        </Typography>
                        <Typography variant='h6' color='textSecondary' gutterBottom>
                            {stream.description}
                        </Typography>
                    </Grid>
                    <Grid className='section'>
                        <Fab
                            onClick={()=>{this.setState({enroll: true})}}
                            variant='extended'
                            color='secondary'
                            className={`${!this.state.enroll && 'enroll'}  ${this.state.enroll && 'activeEnroll'} `}
                        >
                            ENROLL TO THE COURSE <TelegramIcon style={{ marginLeft: 5 }} />
                        </Fab>
                    </Grid>
                    {
                        this.state.enroll?
                        <Grid className='section' container justify='center'>
                            <Paypal
                                toPay={stream.priceInUSD}
                                onTransactionSuccess={this.handleSuccess}
                                onTransactionError={this.handleError()}
                                onTransactionCancel={this.handleCancel()}
                            />
                        </Grid>
                        :''
                    }
                </Container>
            </React.Fragment>
        )
    }
}

export default Course
