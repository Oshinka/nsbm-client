import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Lecturer = props => (
    <tr>
        <td>{props.lecturer.name}</td>
        <td>{props.lecturer.age}</td>
        <td>{props.lecturer.email}</td>
        <td>
            <Link to={ '/lecturers/edit/' + props.lecturer._id }>edit</Link> |
            <button type='button' onClick={() => { props.deleteLecturer(props.lecturer._id) }}>delete</button>
        </td>
    </tr>
)

class LecturerList extends Component {
    constructor (props) {
        super(props);

        this.deleteLecturer = this.deleteLecturer.bind(this);

        this.state = {lecturers: []};
    }

    componentDidMount() {
        axios.get('http://localhost:9000/lecturers')
        .then(response => {
            this.setState({ lecturers: response.data })
        })
        .catch((error) => { console.log(error) })
    }

    deleteLecturer(id) {
        axios.delete('http://localhost:9000/lecturers/' + id)
        .then(response => { console.log(response.data) });

        this.setState({
            lecturers: this.state.lecturers.filter(el => el._id !== id)
        })
    }

    getLecturerList() {
        return this.state.lecturers.map(currentLecturer => {
            return <Lecturer lecturer={currentLecturer} deleteLecturer={this.deleteLecturer} key={currentLecturer._id} />;
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
                        { this.getLecturerList() }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default LecturerList;