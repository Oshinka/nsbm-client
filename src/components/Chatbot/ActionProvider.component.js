import Data from '../../data.json';

class ActionProvider {
    constructor(createChatBotMessage, setStateFunc, createClientMessage) {
      this.createChatBotMessage = createChatBotMessage;
      this.setState = setStateFunc;
      this.createClientMessage = createClientMessage;
    }

    greetHandler = () => {
        const message = this.createChatBotMessage('Hello, how can I help you?');
        this.setChatbotMessage(message);
    }

    coursesHandler = () => {
        const message = this.createChatBotMessage('Here are the courses', {
            widget: 'courses'
        });
        this.setChatbotMessage(message);
    }

    csPriceHandler = () => {
        const message = this.createChatBotMessage(`${Data.course.cs.priceInLKR} Rupees.`);
        this.setChatbotMessage(message);
    }

    isPriceHandler = () => {
        const message = this.createChatBotMessage(`${Data.course.is.priceInLKR} Rupees.`);
        this.setChatbotMessage(message);
    }

    priceHandler = () => {
        const message = this.createChatBotMessage(`${Data.course.cs.priceInLKR} Rupees for ${Data.course.cs.name} & ${Data.course.is.priceInLKR} Rupees for ${Data.course.is.name}.`);
        this.setChatbotMessage(message);
    }

    contactHandler = () => {
        const message = this.createChatBotMessage('Contact us from these', {
            widget: 'contact'
        });
        this.setChatbotMessage(message);
    }

    closeUpHandler = () => {
        const message = this.createChatBotMessage('Thank you. Have a great day!');
        this.setChatbotMessage(message);
    }

    defaultHandler = () => {
        const message = this.createChatBotMessage('Try these..');
        this.setChatbotMessage(message);
    }

    setChatbotMessage = (message) => {
        this.setState(state => ({ ...state, messages: [...state.messages, message] }))
    }
  }
  
  export default ActionProvider;