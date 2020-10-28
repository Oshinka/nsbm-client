import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './components/Home.component';
import StudentList from './components/StudentList.component';
import CreateStudent from './components/CreateStudent.component';
import EditStudent from './components/EditStudent.component';
import Student from './components/Student.component';
import LecturerList from './components/LecturerList.component';
import CreateLecturer from './components/CreateLecturer.component';
import EditLecturer from './components/EditLecturer.component';
import SubjectList from './components/SubjectList.component';
import CreateSubject from './components/CreateSubject.component';
import EditSubject from './components/EditSubject.component';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI() {
    fetch("http://localhost:9000/students")
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }));
  }

  componentWillMount() {
    this.callAPI();
  }

  render() {
    return (
      <div className='app'>
        <Router>
          <Route path='/' exact component={Home} />
          <Route path='/students' exact component={StudentList} />
          <Route path='/students/add-student' exact component={CreateStudent} />
          <Route path='/students/edit/:id' exact component={EditStudent} />
          <Route path='/students/profile/:id' exact component={Student} />
          <Route path='/lecturers' exact component={LecturerList} />
          <Route path='/lecturers/add-lecturer' exact component={CreateLecturer} />
          <Route path='/lecturers/edit/:id' exact component={EditLecturer} />
          <Route path='/subjects' exact component={SubjectList} />
          <Route path='/subjects/add-subject' exact component={CreateSubject} />
          <Route path='/subjects/edit/:id' exact component={EditSubject} />
        </Router>
      </div>
    );
  }
}

export default App;
