import React, { Component } from 'react';
import axios from '../axios';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            leturers: []
        }
    }

    componentDidMount() {
        
    }

    render() { 
        return ( 
            <p>Welcom HOme</p>
         );
    }
}
 
export default Home;