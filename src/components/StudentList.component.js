import React, { Component } from "react";
import { Link } from "react-router-dom";
import LeftBar from './LeftBar.component';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Container from '@material-ui/core/Container';
import Pagination from '@material-ui/lab/Pagination';
import { AgeFromDateString } from 'age-calculator'
import Swal from 'sweetalert2';
import axios from "../axios";

/* Handle empty students */

const Student = ({ student, deleteStudent }) => (
  <tr>
    <td><Link to={"/students/profile/" + student._id}>
      {student.lastName ? `${student.firstName} ${student.lastName}` : `${student.firstName}`}
    </Link></td>
    <td>{ new AgeFromDateString(student.dateOfBirth).age }</td>
    <td>{student.email}</td>
    <td>
      <Link to={"/students/edit/" + student._id}><IconButton><EditIcon /></IconButton></Link>
      <IconButton><DeleteIcon
        color="secondary"
        onClick={() => {
          Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
              deleteStudent(student._id);
              Swal.fire(
                'Deleted!',
                'The record has been deleted.',
                'success'
              )
            }
          })
        }}
      /></IconButton>
    </td>
  </tr>
);

class StudentList extends Component {
  constructor(props) {
    super(props);

    this.deleteStudent = this.deleteStudent.bind(this);

    this.state = {
      students: [],
      currentPage: 1,
      studentsPerPage: 10,
      isloading: false
    };
  }

  componentDidMount() {
    this.setState({ isloading: true });

    axios
      .get('/students')
      .then((response) => {
        this.setState({ students: response.data });
      })
      .catch((error) => {
        console.log(error);
      });

    this.setState({ isloading: false });
  }

  deleteStudent(id) {
    axios.delete('/students/' + id).then((response) => {
      console.log(response.data);
    });

    this.setState({
      students: this.state.students.filter((el) => el._id !== id),
    });
  }

  getStudentList() {
    const indexOfLastStudent = this.state.currentPage * this.state.studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - this.state.studentsPerPage;
    const paginateStudents = this.state.students.slice(indexOfFirstStudent, indexOfLastStudent);

    /* backend pagination */
    
    return paginateStudents.map((currentStudent) => {
      return (
        <Student
          student={currentStudent}
          deleteStudent={this.deleteStudent}
          key={currentStudent._id}
        />
      );
    });
  }

  render() {
    return (
      <React.Fragment>
        <LeftBar Icon={PersonAddIcon} link='/students/add-student' name='Add Student' />
        <Container>
          <Link to={"/students/add-student"}>+ add student</Link>
          <p>Total number of students <span className='badge badge-pill badge-primary'>{this.state.students.length}</span></p>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>{(this.state.isloading) ? <img src='https://loading.io/mod/spinner/camera/index.svg' alt='loading...' /> : this.getStudentList()}</tbody>
          </table>
          {(this.state.students.length > this.state.studentsPerPage) ?
            <Pagination
              count={Math.ceil(this.state.students.length / this.state.studentsPerPage)}
              onChange={(event, page) => { this.setState({ currentPage: page }) }}
              page={this.state.currentPage}
              color="primary"
            />
            : ''}
        </Container>
      </React.Fragment>
    );
  }
}

export default StudentList;
