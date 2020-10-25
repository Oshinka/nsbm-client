import React, { Component } from 'react';
import Swal from 'sweetalert2';
import axios from '../axios';

class EditSubject extends Component {
    constructor(props) {
        super(props);

        this.onChangeSubjectCode = this.onChangeSubjectCode.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeSemester = this.onChangeSemester.bind(this);
        this.onChangeIsCompulsory = this.onChangeIsCompulsory.bind(this);
        this.onChangeLecture = this.onChangeLecture.bind(this);
        this.onChangePractical = this.onChangePractical.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            subjectCode: '',
            name: '',
            semester: 0,
            isCompulsory: false,
            credits: {
                lecture: 0,
                practical: 0
            }
        }
    }

    componentDidMount() {
        axios.get('/subjects/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    subjectCode: response.data.subjectCode,
                    name: response.data.name,
                    semester: response.data.semester,
                    isCompulsory: response.data.isCompulsory,
                    credits: {
                        lecture: response.data.credits.lecture,
                        practical: response.data.credits.practical
                    }
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeSubjectCode(e) {
        this.setState({
            subjectCode: e.target.value
        })
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        })
    }
    onChangeSemester(e) {
        this.setState({
            semester: e.target.value
        })
    }

    onChangeIsCompulsory(e) {
        this.setState({
            isCompulsory: e.target.value
        })
    }

    onChangeLecture(e) {
        this.setState({
            credits: { ...this.state.credits, lecture: e.target.value }
        })
    }

    onChangePractical(e) {
        this.setState({
            credits: { ...this.state.credits, practical: e.target.value }
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const subject = {
            subjectCode: this.state.subjectCode,
            name: this.state.name,
            semester: this.state.semester,
            isCompulsory: this.state.isCompulsory,
            credits: {
                lecture: this.state.credits.lecture,
                practical: this.state.credits.practical
            }
        }

        Swal.fire({
            title: 'Do you want to save the changes?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: `Save`,
            denyButtonText: `Don't save`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                axios.patch('/subjects/' + this.props.match.params.id, subject)
                    .then(res => console.log(res.data));
                Swal.fire('Saved!', '', 'success').then((result) => {
                    window.location = '/subjects';
                })
            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info').then((result) => {
                    window.location = '/subjects';
                })
            }
        })
    }

    render() {
        return (<div>
            <form onSubmit={this.onSubmit}>
                <input type="text" value={this.state.subjectCode} onChange={this.onChangeSubjectCode} placeholder='subjectCode' />
                <input type="text" value={this.state.name} onChange={this.onChangeName} placeholder='name' />
                <input type="text" value={this.state.semester} onChange={this.onChangeSemester} placeholder='semester' />
                <input type="text" value={this.state.isCompulsory} onChange={this.onChangeIsCompulsory} placeholder='isCompulsory' />
                <input type="text" value={this.state.credits.lecture} onChange={this.onChangeLecture} placeholder='credits for lecture' />
                <input type="text" value={this.state.credits.practical} onChange={this.onChangePractical} placeholder='credits for practical' />
                <input type="submit" />
            </form>
        </div>);
    }
}

export default EditSubject;