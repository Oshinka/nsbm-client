import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import AppBar from './AppBar.component';
import LeftBar from './LeftBar.component';
import Paypal from './Paypal.component';
import Swal from 'sweetalert2';
import axios from '../axios';

export class Course extends Component {
    constructor(props) {
        super(props);

        this.state = {
            total: 1
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
    }

    handleError() {

    }

    handleCancel() {

    }

    render() {
        const { total } = this.state;

        return (
            <React.Fragment>
                <AppBar />
                <LeftBar />
                <Container>
                    <p>Welcome to {total} Course</p>
                    <Paypal
                        toPay={total}
                        onTransactionSuccess={this.handleSuccess}
                        onTransactionError={this.handleError()}
                        onTransactionCancel={this.handleCancel()}
                    />
                </Container>
            </React.Fragment>
        )
    }
}

export default Course
