import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Student = props => (
    <tr>
        <td>{props.student.name}</td>
        <td>{props.student.age}</td>
        <td>{props.student.email}</td>
        <td>
            <Link to={ '/students/edit/' + props.student._id }>edit</Link> |
            <button type='button' onClick={() => { props.deleteStudent(props.student._id) }}>delete</button>
        </td>
    </tr>
)

class StudentList extends Component {
    constructor (props) {
        super(props);

        this.deleteStudent = this.deleteStudent.bind(this);

        this.state = {students: []};
    }

    componentDidMount() {
        axios.get('http://localhost:9000/students')
        .then(response => {
            this.setState({ students: response.data })
        })
        .catch((error) => { console.log(error) })
    }

    deleteStudent(id) {
        axios.delete('http://localhost:9000/students/' + id)
        .then(response => { console.log(response.data) });

        this.setState({
            students: this.state.students.filter(el => el._id !== id)
        })
    }

    getStudentList() {
        return this.state.students.map(currentStudent => {
            return <Student student={currentStudent} deleteStudent={this.deleteStudent} key={currentStudent._id} />;
        })
    }

    render() {
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.getStudentList() }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default StudentList;