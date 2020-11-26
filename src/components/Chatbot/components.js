import React from 'react';
import PhoneIcon from '@material-ui/icons/Phone';
import MessageIcon from '@material-ui/icons/Message';
import EmailIcon from '@material-ui/icons/Email';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import Chip from '@material-ui/core/Chip';
import './chatbot.css';

const chipWidget = {
    fontWeight: 'bolder',
    backgroundColor: '#76D7C4',
    color: '#EBF5FB',
    margin: '2px'
}

export const Courses = () => (
    <React.Fragment>
        <Chip label='Computer Science' onClick={() => { window.location = '/courses/cs' }} style={chipWidget}/>
        <Chip label='Information Systems' onClick={() => { window.location = '/courses/is' }} style={chipWidget}/>
    </React.Fragment>
)

export const Contact = () => (
    <React.Fragment>
        <Chip icon={<PhoneIcon style={{ color:'#F9EBEA' }} />} label='0112345678' style={chipWidget}/>
        <Chip icon={<MessageIcon style={{ color:'#F9EBEA' }} />} label='+94112345678' style={chipWidget}/>
        <Chip icon={<EmailIcon style={{ color:'#F9EBEA' }} />} label='nsbm@example.com' style={chipWidget}/>
        <Chip icon={<WhatsAppIcon style={{ color:'#F9EBEA' }} />} label='071234567' style={chipWidget}/>
    </React.Fragment>
)
