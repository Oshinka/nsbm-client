import React, { Component } from "react";
import { Link } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Swal from 'sweetalert2';
import axios from "../axios";
import Navbar from "./Navbar.component";

const Student = (props) => (
  <tr>
    <td><Link to={"/students/profile/" + props.student._id}>{props.student.name}</Link></td>
    <td>{props.student.age}</td>
    <td>{props.student.email}</td>
    <td>
      <Link to={"/students/edit/" + props.student._id}><IconButton><EditIcon /></IconButton></Link>
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
              props.deleteStudent(props.student._id);
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
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

    this.state = { students: [] };
  }

  componentDidMount() {
    axios
      .get('/students')
      .then((response) => {
        this.setState({ students: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
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
    return this.state.students.map((currentStudent) => {
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
      <div>
        <Navbar />
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
          <tbody>{this.getStudentList()}</tbody>
        </table>
      </div>
    );
  }
}

export default StudentList;
