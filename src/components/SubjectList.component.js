import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Swal from 'sweetalert2';
import Container from '@material-ui/core/Container';
import axios from '../axios';
import Navbar from './Navbar.component';
import SearchBar from './SearchBar.component';

const Subject = props => (
    <tr>
        <td>{props.subject.subjectCode}</td>
        <td>{props.subject.name}</td>
        <td>{props.subject.semester}</td>
        <td>{(props.subject.isCompulsory) ? 'X' : 'O'}</td>
        <td>{props.subject.credits.lecture}</td>
        <td>{props.subject.credits.practical}</td>
        <td>
            <Link to={'/subjects/edit/' + props.subject._id}><IconButton><EditIcon /></IconButton></Link>
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
                            props.deleteSubject(props.subject._id);
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
)

class SubjectList extends Component {
    constructor(props) {
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

    getSubjectList() {
        if (this.state.searchField) {
            return this.state.subjects.map(currentSubject => {
                console.log(currentSubject);
                if (this.state.searchField === currentSubject.subjectCode)
                    return <Subject subject={currentSubject} deleteSubject={this.deleteSubject} key={currentSubject._id} />;
                return null;
            })
        } else {
            return this.state.subjects.map(currentSubject => {
                console.log(currentSubject);
                return <Subject subject={currentSubject} deleteSubject={this.deleteSubject} key={currentSubject._id} />;
            })
        }
    }

    render() {
        return (
            <React.Fragment>
                <Container>
                    <Navbar />
                    <Link to={"/subjects/add-subject"}>+ add subject</Link>
                    <SearchBar
                        placeholder="Enter subject code"
                        handleChange={(e) => this.setState({ searchField: e.target.value })}
                    />
                    <table>
                        <thead>
                            <tr>
                                <th>Subject code</th>
                                <th>Name</th>
                                <th>Semester</th>
                                <th>IsCompulsory</th>
                                <th>Credits for Lecture</th>
                                <th>Credits for Practicle</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.getSubjectList()}
                        </tbody>
                    </table>
                </Container>
            </React.Fragment>
        );
    }
}

export default SubjectList;