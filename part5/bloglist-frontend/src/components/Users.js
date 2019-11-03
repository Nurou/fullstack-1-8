import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import ReactTable from 'react-table'
import 'react-table/react-table.css'

const columns = [
  {
    Header: 'Name',
    accessor: 'name', // String-based value accessors!
  },
  {
    Header: 'Username',
    accessor: 'username',
    Cell: props => <span className="number">{props.value}</span>, // Custom cell components!
  },
  {
    Header: 'Blogs Listed',
    accessor: 'blogs',
  },
]

const Users = props => {
  const data = []
  // populate table

  props.users.forEach(user => {
    data.push({
      name: <Link to={`/users/${user.id}`}>{user.name}</Link>,
      username: user.username,
      blogs: user.blogs.length,
    })
  })

  return (
    <div>
      <h2>Users</h2>
      <ReactTable data={data} columns={columns} />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    users: state.users,
  }
}

export default connect(
  mapStateToProps,
  null,
)(Users)
