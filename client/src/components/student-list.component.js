import React, { Component } from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table'
import StudentTableRow from './StudentTableRow'
import { GET_STUDENTS } from '../server_url';

export default class StudentList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      students: []
    }
  }

  componentDidMount() {
    axios.get(GET_STUDENTS)
      .then(res => {
        this.setState({
          students: res.data
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  DataTable = () => {
    return this.state.students.map((res, i) => {
      return <StudentTableRow obj={res} key={i} />
    })
  }

  render() {
    return (
      <div className="table-wrapper mt-5">
        <h1 className="mb-3">Students List</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Roll No</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.DataTable()}
          </tbody>
        </Table>
      </div>
    )
  }
}