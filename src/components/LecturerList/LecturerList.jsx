import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LeftBar from '../LeftBar/LeftBar';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import PersonAddTwoToneIcon from '@material-ui/icons/PersonAddTwoTone';
import Swal from 'sweetalert2';
import axios from '../../axios';

const Lecturer = props => (
    <tr>
        <td>{props.lecturer.name}</td>
        <td>{props.lecturer.age}</td>
        <td>{props.lecturer.email}</td>
        <td>
            <Link to={'/lecturers/edit/' + props.lecturer._id}><IconButton><EditIcon /></IconButton></Link>
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
                            props.deleteLecturer(props.lecturer._id);
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

class LecturerList extends Component {
    constructor(props) {
        super(props);

        this.deleteLecturer = this.deleteLecturer.bind(this);

        this.state = { lecturers: [] };
    }

    componentDidMount() {
        axios.get('lecturers')
            .then(response => {
                this.setState({ lecturers: response.data })
            })
            .catch((error) => { console.log(error) })
    }

    deleteLecturer(id) {
        axios.delete('/lecturers/' + id)
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
            <React.Fragment>
                <LeftBar Icon={PersonAddTwoToneIcon} link='lecturers/add-lecturer' name='Add Lecturer' />
                <Container>
                    <Link to={'/lecturers/add-lecturer'}>+ add lecturer</Link>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Age</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.getLecturerList()}
                        </tbody>
                    </table>
                </Container>
            </React.Fragment>
        );
    }
}

export default LecturerList;