import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { CREATE_STUDENT } from '../server_url';

export default class CreateStudent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      name: '',
      email: '',
      rollno: ''
    }
  }

  onChangeStudentName = (e) => {
    this.setState({ name: e.target.value })
  }

  onChangeStudentEmail = (e) => {
    this.setState({ email: e.target.value })
  }

  onChangeStudentRollno = (e) => {
    this.setState({ rollno: e.target.value })
  }

  onSubmit = (e) => {
    e.preventDefault();

    const studentObject = {
      name: this.state.name,
      email: this.state.email,
      rollno: this.state.rollno
    }
    axios.post(CREATE_STUDENT, studentObject)
      .then(res => { console.log(res.data) });

    // console.log('Student successfully created!');
    // console.log(`Name: ${this.state.name}`);
    // console.log(`Email: ${this.state.email}`);
    // console.log(`Roll no: ${this.state.rollno}`);

    this.setState({
      name: '',
      email: '',
      rollno: ''
    })
  }

  render() {
    return (
      <div className="create-student">
        <h1>Create Student</h1>
        <Form onSubmit={this.onSubmit}>
          <Form.Group controlId="Name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" value={this.state.name} onChange={this.onChangeStudentName} />
          </Form.Group>

          <Form.Group controlId="Email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={this.state.email} onChange={this.onChangeStudentEmail} />
          </Form.Group>

          <Form.Group controlId="Roll">
            <Form.Label>Roll No.</Form.Label>
            <Form.Control type="text" value={this.state.rollno} onChange={this.onChangeStudentRollno} />
          </Form.Group>

          <div className="d-grid my-2">
            <Button variant="success" size="lg" type="submit" block={false}>
              Create Student
            </Button>
          </div>

        </Form>
      </div>
    )
  }
}