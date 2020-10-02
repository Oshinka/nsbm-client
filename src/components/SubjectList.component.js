import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Subject = props => (
    <tr>
        <td>{props.subject.subjectCode}</td>
        <td>{props.subject.name}</td>
        <td>{props.subject.semester}</td>
        <td>{props.subject.isCompulsory}</td>
        {/* <td>{props.subject.credits}</td> */}
        {/* <td>{props.subject.credits.practical}</td> */}
        <td>
            <Link to={ '/subjects/edit/' + props.subject._id }>edit</Link> |
            <button type='button' onClick={() => { props.deleteSubject(props.subject._id) }}>delete</button>
        </td>
    </tr>
)

class SubjectList extends Component {
    constructor (props) {
        super(props);

        this.deleteSubject = this.deleteSubject.bind(this);

        this.state = {subjects: []};
    }

    componentDidMount() {
        axios.get('http://localhost:9000/subjects')
        .then(response => {
            this.setState({ subjects: response.data })
        })
        .catch((error) => { console.log(error) })
    }

    deleteSubject(id) {
        axios.delete('http://localhost:9000/subjects/' + id)
        .then(response => { console.log(response.data) });

        this.setState({
            subjects: this.state.subjects.filter(el => el._id !== id)
        })
    }

    getSubjectList() {
        return this.state.subjects.map(currentSubject => {
            return <Subject subject={currentSubject} deleteSubject={this.deleteSubject} key={currentSubject._id} />;
        })
    }

    render() {
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Subject code</th>
                            <th>Name</th>
                            <th>Semester</th>
                            <th>IsCompulsory</th>
                            <th>Credits for Lecture</th>
                            <th>Credits for Practicle</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.getSubjectList() }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default SubjectList;