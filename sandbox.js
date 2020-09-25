// App.js

import React from 'react';
import './App.css';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={apiResponse:""};
  }

  callAPI(){
    fetch("http://localhost:9000/students")
    .then(res => res.text())
    .then(res => this.setState({apiResponse: res}));
  }

  componentWillMount(){
    this.callAPI();
  }

  render() {
    return (
      this.state.apiResponse
    );
  }
}

export default App;
