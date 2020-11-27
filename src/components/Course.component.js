import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import TelegramIcon from '@material-ui/icons/Telegram';
import Button from '@material-ui/core/Button';
import CropFreeIcon from '@material-ui/icons/CropFree';
import Paypal from './Paypal.component';
import emailjs from 'emailjs-com';
import Swal from 'sweetalert2';
import Data from '../data.json';
import axios from '../axios';
import './home.component.css'
import 'fontsource-roboto';


export default function Course({ match }) {
    const [enroll, setEnroll] = useState(false);
    const [success, setSuccess] = useState(false);
    const [qrCode, setQRCode] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSuccess = async (payment) => {
        console.log('From handleSuccess method', payment);
        console.log('From handleSuccess method', payment.paymentID);

        const paymentDetails = {
            paidEmail: payment.email,
            payerId: payment.payerID,
            paymentId: payment.paymentID,
            paymentToken: payment.paymentToken
        };

        await axios.post('/payments', paymentDetails)
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
            name: name,
            email: email,
            course: stream.name,
            paymentId: payment.paymentID
        };

        const paymentDetailsForPDF = {
            name: name,
            amount: stream.priceInLKR,
            paymentId: payment.paymentID
        }

        await axios.post('/qrcode', paymentDetailsForPDF)
            .then(res => {
                setQRCode(res.data)
            })

        await axios.post('/receipt', paymentDetailsForPDF)
            .then(res => {
                console.log(res);
            })

        emailjs.send('service_nsbm', 'template_receipt_payment', templateParams, 'user_IEVOpMbXgEGRrOezcMmfg')
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
            }, (error) => {
                console.log('FAILED...', error);
            });

        setSuccess(true);
    }

    const handleError = () => {

    }

    const handleCancel = () => {

    }
    const courseCode = match.params.course_code;

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
                <Grid className='section courseContact' container>
                    <Grid container style={{ padding: '20px 20px 60px 60px' }}>
                        <Fab
                            onClick={() => { setEnroll(true) }}
                            variant='extended'
                            color='secondary'
                            className={`${!enroll && 'enroll'}  ${enroll && 'activeEnroll'} `}
                        >
                            ENROLL TO THE COURSE <TelegramIcon style={{ marginLeft: 5 }} />
                        </Fab>
                    </Grid>
                    {
                        (enroll) ?
                            <Grid container justify='center'>
                                <Grid container direction='row' justify='space-evenly'>
                                    <TextField
                                        id="name"
                                        label="Name"
                                        variant="outlined"
                                        onChange={(e) => setName(e.target.value)}
                                        defaultValue={name}
                                        className='contactForm'
                                    />
                                    <TextField
                                        id="email"
                                        label="Email"
                                        variant="outlined"
                                        onChange={(e) => setEmail(e.target.value)}
                                        defaultValue={email}
                                        className='contactForm'
                                    />
                                </Grid>
                                <Grid style={{ margin: 50 }}>
                                    <Paypal
                                        toPay={stream.priceInUSD}
                                        onTransactionSuccess={handleSuccess}
                                        onTransactionError={handleError()}
                                        onTransactionCancel={handleCancel()}
                                    />
                                </Grid>
                            </Grid>
                            : ''
                    }
                    {
                        (success) ?
                            <Grid container direction='row'>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant='h5' align='center' gutterBottom>QR Code</Typography>
                                    {
                                        (qrCode) ?
                                            <Grid container direction='column' alignItems='center' style={{ margin: '20px 0' }}>
                                                <img src={qrCode} alt='qrcode' />
                                            </Grid>
                                            :
                                            <Grid container direction='column' alignItems='center' style={{ margin: '20px 0' }}>
                                                <CropFreeIcon style={{ fontSize: 76 }} />
                                                <Typography variant='h6' color='textSecondary'>QR Code is not available</Typography>
                                            </Grid>
                                    }
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant='h5' align='center' gutterBottom>Payment Receipt</Typography>
                                    <Grid container direction='column' alignItems='center'>
                                        <Button
                                            style={{ backgroundColor: 'green', color: 'white', fontWeight: 'bold', margin: 40, padding: '10px 15px' }}
                                            size='large'
                                            href='http://localhost:9000/receipt'
                                        >Download</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                            : ''
                    }
                </Grid>
            </Container>
        </React.Fragment>
    )
}
