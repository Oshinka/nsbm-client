import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import emailjs from 'emailjs-com';
import axios from '../axios';
import './home.component.css';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Contact() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [message, setMessage] = useState('');
    const [open, setOpen] = useState(false);

    const reset = () => {
        setName('');
        setEmail('');
        setMobile('');
        setMessage('');
    }

    const onSuccess = () => (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
                Message has been sent successfully!
            </Alert>
        </Snackbar>
    )

    const onError = () => (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
                Message was not sent!
            </Alert>
        </Snackbar>
    )

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const sendEmail = e => {
        e.preventDefault();

        var templateParams = {
            name: name,
            email: email,
            mobile: mobile,
            message: message
        };

        console.log(templateParams);

        emailjs.send('service_nsbm', 'template_contact_home', templateParams, 'user_IEVOpMbXgEGRrOezcMmfg')
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                setOpen(true);
                reset();
                axios.post('/subscribers', templateParams)
                    .then(res => {
                        console.log(res.data);
                    })
                onSuccess();
            }, (error) => {
                console.log('FAILED...', error);
                setOpen(true);
                reset();
                onError();
            });

        // reset();
    }

    return (
        <React.Fragment>
            <Typography variant="h2" color='textSecondary' gutterBottom align='center'>
                CONTACT
            </Typography>
            <div>
                <Grid container direction='row' wrap='nowrap' justify='space-between' >
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
                    <TextField
                        id="mobile"
                        label="Moblile Number"
                        variant="outlined"
                        onChange={(e) => setMobile(e.target.value)}
                        defaultValue={mobile}
                        className='contactForm'
                    />
                </Grid>
                <Grid container>
                    <TextField
                        id="message"
                        label="Message"
                        variant="outlined"
                        fullWidth={true}
                        multiline={true}
                        onChange={(e) => setMessage(e.target.value)}
                        defaultValue={message}
                    />
                </Grid>
                <Grid container justify='flex-end'>
                    <Button
                        className='contactFormBtn'
                        onClick={sendEmail}
                        variant="outlined"
                        color="primary"
                        size='large'
                    >
                        Send Message
                    </Button>
                </Grid>
            </div>
        </React.Fragment>
    )
}

export default Contact
