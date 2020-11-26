class MessageParser {
    constructor(actionProvider, state) {
        this.actionProvider = actionProvider;
        this.state = state;
    }

    parse(message) {
        console.log(this.state);
        const lowercase = message.toLowerCase();

        if (lowercase.includes('hi') || lowercase.includes('hey') || lowercase.includes('hello')) {
            this.actionProvider.greetHandler();
        } else if (lowercase.includes('courses')) {
            this.actionProvider.coursesHandler();
        } else if (lowercase.includes('price') && (lowercase.includes('computer science') || lowercase.includes('cs'))) {
            this.actionProvider.csPriceHandler();
        } else if (lowercase.includes('price') && (lowercase.includes('information system') || lowercase.includes('is'))) {
            this.actionProvider.isPriceHandler();
        } else if (lowercase.includes('price')) {
            this.actionProvider.priceHandler();
        } else if (lowercase.includes('contact')) {
            this.actionProvider.contactHandler();
        } else if (lowercase.includes('bye')) {
            this.actionProvider.closeUpHandler();
        } else {
            this.actionProvider.defaultHandler();
        }
            
    }
}

export default MessageParser;