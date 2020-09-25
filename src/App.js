import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import StudentList from './components/StudentList.component';
import CreateStudent from './components/CreateStudent.component';
import EditStudent from './components/EditStudent.component';

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
      <Router>
        <div className='container'>
          <Route path='/' exact component={StudentList} />
          <Route path='/add-student' exact component={CreateStudent} />
          <Route path='/edit/:id' exact component={EditStudent} />
        </div>
      </Router>
    );
  }
}

export default App;
