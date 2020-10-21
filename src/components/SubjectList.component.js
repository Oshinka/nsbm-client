import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from '../axios';
import Navbar from './Navbar.component';
import SearchBar from './SearchBar.component';

const Subject = props => (
    <tr>
        <td>{props.subject.subjectCode}</td>
        <td>{props.subject.name}</td>
        <td>{props.subject.semester}</td>
        <td>{props.subject.isCompulsory}</td>
        <td>{props.subject.credits.lecture}</td>
        <td>{props.subject.credits.practical}</td>
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

        this.state = {
            subjects: [],
            filteredSubject: {},
            searchField: ''
        };
    }

    componentDidMount() {
        axios.get('/subjects')
        .then(response => {
            this.setState({ subjects: response.data })
        })
        .catch((error) => { console.log(error) })
    }

    deleteSubject(id) {
        axios.delete('/subjects/' + id)
        .then(response => { console.log(response.data) });

        this.setState({
            subjects: this.state.subjects.filter(el => el._id !== id)
        })
    }

    getSubjectBySubjectCode() {
        axios.get('/subjects?code=' + this.state.searchField)
        .then(response => {
            console.log(response.data);
            // return <Subject subject={response.data} deleteSubject={this.deleteSubject} key={response.data._id} />;
            this.setState({ filteredSubject: response.data })
        })
        .catch((error) => { console.log(error) });

        return <Subject subject={this.state.filteredSubject} deleteSubject={this.deleteSubject} key={this.state.filteredSubject._id} />;
    }

    getSubjectList() {
        return this.state.subjects.map(currentSubject => {
            console.log(currentSubject);
            return <Subject subject={currentSubject} deleteSubject={this.deleteSubject} key={currentSubject._id} />;
        })
    }

    render() {
        return (
            <div>
                <Navbar />
                <Link to={"/subjects/add-subject"}>+ add subject</Link> 
                <SearchBar 
                    placeholder="Enter subject code"
                    handleChange={(e) => this.setState({searchField: e.target.value})}
                />
                <button
                    type="button"
                    onClick={() => {
                        this.getSubjectBySubjectCode()
                    }}
                >search</button>
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
                        {/* { this.getSubjectBySubjectCode() } */}
                        { this.getSubjectList() }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default SubjectList;