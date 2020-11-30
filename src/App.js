import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { AppBarProvider } from './components/AppBarContext.component';
import { useSelector } from 'react-redux';
import { PageNotFound } from './components/PageNotFound/PageNotFound'

import AppBar from './components/AppBar/AppBar';
import Breadcrumbs from './components/Breadcrumbs/Breadcrumbs';
import LeftBar from './components/LeftBar/LeftBar';
import Home from './components/Home/Home';
import Gallery from './components/Gallery/Gallery';
import Course from './components/Course/Course';
import StudentList from './components/StudentList/StudentList';
import CreateStudent from './components/CreateStudent/CreateStudent';
import EditStudent from './components/EditStudent/EditStudent';
import Student from './components/Student/Student';
import LecturerList from './components/LecturerList/LecturerList';
import CreateLecturer from './components/CreateLecture/CreateLecturer';
import EditLecturer from './components/EditLecturer/EditLecturer';
import SubjectList from './components/SubjectList/SubjectList';
import CreateSubject from './components/CreateSubject/CreateSubject';
import EditSubject from './components/EditSubject/EditSubject';
import Footer from './components/Footer/Footer';

function App() {
  const isDark = useSelector(state => state.isDark);

  return (
    <div className='app'>
      <Router>
        <AppBarProvider>
          <AppBar />
        </AppBarProvider>
        <div className={`appContent ${(isDark)? 'darkMode': 'lightMode'}`}>
          <Breadcrumbs />
          <LeftBar />
          <Route path='/' exact component={Home} />
          <Route path='/gallery' exact component={Gallery} />
          <Route path='/courses/:course_code' exact component={Course} />
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
          <Route path='/404' exact component={PageNotFound} />
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
