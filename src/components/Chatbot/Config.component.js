import React from 'react'
import { createChatBotMessage } from "react-chatbot-kit";
import Avatar from '@material-ui/core/Avatar';
import { Courses, Contact } from './components'

const config = {
    botName: `Assistant`,
    initialMessages: [createChatBotMessage(`Welcome to NSBM`)],
    customComponents: {
        botAvatar: (props) => <Avatar style={{ marginRight: 10 }} src='https://www.nsbm.ac.lk/wp-content/uploads/2019/08/logo.png' {...props} />
    },
    widgets: [
        {
            widgetName: "courses",
            widgetFunc: (props) => <Courses {...props} />,
            // Any props you want the widget to receive on render
            props: {},
            // Any piece of state defined in the state object that you want to pass down to this widget
            mapStateToProps: [
                "courses"
            ],
        },
        {
            widgetName: "contact",
            widgetFunc: (props) => <Contact {...props} />,
            // Any props you want the widget to receive on render
            props: {},
            // Any piece of state defined in the state object that you want to pass down to this widget
            mapStateToProps: [
                "contact"
            ],
        },
    ],
}

export default config;