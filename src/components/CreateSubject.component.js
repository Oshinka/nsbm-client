import React, { Component } from 'react';
import axios from 'axios';

class CreateSubject extends Component {
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
            credits: {
                lecture: e.target.value
            }
        })
    }

    onChangePractical(e) {
        this.setState({
            credits: {
                practical: e.target.value
            }
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

        axios.post('http://localhost:9000/subjects', subject)
        .then(res => console.log(res.data));

        window.location = '/subjects';
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <input type="text" onChange={this.onChangeSubjectCode} placeholder='subjectCode' />
                    <input type="text" onChange={this.onChangeName} placeholder='name' />
                    <input type="text" onChange={this.onChangeSemester} placeholder='semester' />
                    <input type="text" onChange={this.onChangeIsCompulsory} placeholder='isCompulsory' />
                    <input type="text" onChange={this.onChangeLecture} placeholder='credits for lecture' />
                    <input type="text" onChange={this.onChangePractical} placeholder='credits for practical' />
                    <input type="submit" />
                </form>
            </div>
        )
    }
}

export default CreateSubject;