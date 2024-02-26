import React, { useMemo, useState } from 'react'
import { useTable } from 'react-table'
import { Link, useNavigate } from 'react-router-dom';
import { IconButton, SearchIcon, TextField, Card, CardActions, CardContent, CardMedia, Button, Typography, Box } from '@material-ui/core/';
import './styles.css';
import AutoScrollContainer from 'auto-scroll-container'

  
/*

  table of users for a given project

*/



const COLUMNS = [
    {
        Header: 'Username',
        accessor: 'username'
    },
    {
        Header: 'Email',
        accessor: 'email'
    },
    /*
    {
        Header: 'Password',
        accessor: 'password'
    }
    */
  ];


const UserTable = ({devList, user, users, project, changeCount}) => {


    let navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState('');

    var filteredUsers = users;
    
    if (searchTerm !== ''){
    
        filteredUsers = users.filter(user => user.username.includes(searchTerm));
    }
    else {
        filteredUsers = users;
    }


    const columns = useMemo(() => COLUMNS, []);
    var data = useMemo(() => filteredUsers, [users, searchTerm]); 




    const tableInstance = useTable({
        columns,
        data
    })

    const { getTableProps, getTableBodyProps, headerGroups, footerGroups, rows, prepareRow} = tableInstance

    const routeChangeUser = () =>{ 
      let path = `/addProjectUser`; 
      navigate(path, {state:{'project': project, devList: devList, changeCount: changeCount, projectUsers: users}});
    }

    const routeChangeUserRemove = () =>{ 
        let path = `/removeProjectUser`; 
        navigate(path, {state:{'project': project, devList: devList, changeCount: changeCount}});
    }

    const routeChangeUserRole = () =>{ 
        let path = `/editUserRole`; 
        navigate(path, {state:{'project': project, devList: devList, changeCount: changeCount}});
    }

  return (
    <div >
        <div style={{display: 'flex', justifyContent: 'space-between', marginRight: '7%'}}>
        <TextField
            id="search-bar"
            className="text"
            onChange={(e) => setSearchTerm(e.target.value)}  
            value={searchTerm} 
            label="Search by Username"
            variant="outlined"
            placeholder="Search..."
            size="small"
            style={{
                marginLeft: '30px',
                marginBottom: '20px'
            }}
        />
                <div>
                      {user && user.accessIdList.includes(project.projectId) ?
                        <>
                        <Button variant="outlined" style={{
                                fontWeight: 'bold',
                                fontSize: 'medium',
                                marginRight: '20px'
                            }}
                            onClick={routeChangeUser}
                        >
                            Add User
                        </Button>

                        <Button variant="outlined" style={{
                                fontWeight: 'bold',
                                fontSize: 'medium',
                                marginRight: '-20px'
                            }}
                            onClick={routeChangeUserRemove}
                        >
                            Remove User
                        </Button>

                        <Button variant="outlined" style={{
                                fontWeight: 'bold',
                                fontSize: 'medium',
                                marginLeft: '40px'
                            }}
                            onClick={routeChangeUserRole}
                        >
                            Change User Roles
                        </Button>
                        </>
                      : null}
                      </div>
                </div>

{/*
    <div className="tableContainer">

    <table {...getTableProps()} style={{width: '93%'}}>
        <thead>
            {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                        <th {...column.getHeaderProps()} style={{backgroundColor: '#D6EAF8', width: '33.3%'}}> 
                          {column.render('Header')}
                       </th>
                    ))}


                    <th style={{backgroundColor: '#D6EAF8'}}>Role</th>

                </tr>
                
            ))}
            
        </thead>
        
        <tbody {...getTableBodyProps()}>
            {rows.map(row => {
                 prepareRow(row)
                  return (
                    <tr {...row.getRowProps()}>
                       {row.cells.map((cell) => {
                         return <td {...cell.getCellProps()}>
                          {cell.render('Cell')} </td>

                            })}
                            
                            <td >
                              {data[row.id].accessIdList.includes(project.projectId)
                              ?
                              <>Project Manager</>
                              : 
                              <>Developer</>
                              
                              }
                            </td>
                    </tr>
                    )
                })
            }
        </tbody>
    </table>

    </div>
    */}
    <div className="tableContainer">
  <table {...getTableProps()} style={{width: '93%'}}>
    <colgroup>
      <col className="username-column" />
      <col className="email-column" />
    </colgroup>
    <thead>
      {headerGroups.map((headerGroup) => (
      <tr {...headerGroup.getHeaderGroupProps()}>
        {headerGroup.headers.map((column) => (
        <th {...column.getHeaderProps()} className="column-header">
          {column.render('Header')}
        </th>
        ))}
        <th className="role-column" style={{backgroundColor:'#D6EAF8', border: '0px solid black'}}>Role </th>
      </tr>
      ))}
    </thead>
    <tbody {...getTableBodyProps()}>
      {rows.map(row => {
        prepareRow(row)
        return (
          <tr {...row.getRowProps()}>
            {row.cells.map((cell) => {
              return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
            })}
            <td>
              {data[row.id].accessIdList.includes(project.projectId) ?
                <>Project Manager</> :
                <>Developer</>
              }
            </td>
          </tr>
        )
      })}
    </tbody>
  </table>
</div>


    </div>
  )
}

export default UserTable