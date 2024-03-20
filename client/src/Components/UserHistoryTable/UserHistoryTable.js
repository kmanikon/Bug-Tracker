import React, { useMemo, useState } from 'react'
import { useTable } from 'react-table'
import { Link } from 'react-router-dom';
import { TextField, Button, useMediaQuery } from '@material-ui/core/';
import './styles.css';
import { Typography } from '@mui/material';

/*

    show table of user actions for a given project

*/


const COLUMNS = [
    {
        Header: 'Title',
        accessor: 'title',
    },
    /*
    {
        Header: 'Ticket #',
        accessor: 'ticketNumber'
    },
    */
    {
        Header: 'Status',
        accessor: 'ticketStatus',

    },
    /*
    {
        Header: 'Assigned Dev',
        accessor: 'asignedDev',
    },
    */
    {
        Header: 'Type',
        accessor: 'ticketType',
    },
    {
        Header: 'Action',
        accessor: 'actionString',
    },


  ];

const UserHistoryTable = ({project, history, tickets, changeCount, userProfile}) => {

    const [searchTerm, setSearchTerm] = useState('');

    var { innerWidth: width, innerHeight: height } = window;
    //width -= 200


    var filteredHistory = history;

    
    if (searchTerm !== ''){
    
        filteredHistory = history.filter(ticket => ticket.title.includes(searchTerm));
    }
    else {
        filteredHistory = history;
    }

    const columns = useMemo(() => COLUMNS, []);
    var data = useMemo(() => filteredHistory, [history, searchTerm]); 

    const tableInstance = useTable({
        columns,
        data
    })

    const { getTableProps, getTableBodyProps, headerGroups, footerGroups, rows, prepareRow} = tableInstance


    const formatAMPM = (date) => {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
      }

    const formatDate = (dateString) => {


        if (dateString) {

            var utcDate = new Date(dateString);
            const localDate = new Date(utcDate.getTime() - utcDate.getTimezoneOffset() * 60000);

            const date = localDate

            const day = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear()

            const time = formatAMPM(date);

            return day + ' ' + time

        }
        return ''
    }

    const getTicket = (ticket) => {
    
        const post = {
    
              "postId": ticket.postId,
              "title": ticket.title,
              "projectId": ticket.projectId,
              "description": ticket.description,
              "asignedDev": ticket.asignedDev,
              "asignedDevEmail": ticket.asignedDevEmail,
              "asignedDevUid": ticket.asignedDevUid,
              "submitter": ticket.submitter,
              "submitterEmail": ticket.submitterEmail,
              "submitterUid": ticket.submitterUid,
              
              "ticketPrio": ticket.ticketPrio,
              "ticketStatus": ticket.ticketStatus,
              "ticketType": ticket.ticketType,
              "ticketNumber": ticket.ticketNumber,

              "submitDate": ticket.submitDate,
              "modifyDate": ticket.modifyDate,
              "readString": ticket.readString
        }

        return post
    }

    const bk1 = useMediaQuery('(max-width: 1200px)');
    const bk2 = useMediaQuery('(max-width: 1000px)');
    const bk3 = useMediaQuery('(max-width: 800px)');

    return (
        <div style={{width: '100%'}}>

<Typography variant="h5" align="center" style={{marginLeft: -20, marginTop: 0, marginBottom: 10, fontWeight: 710 }}>My Activity Log for {project.projectName}</Typography>
            

        <div style={{display: 'flex'}}>

        {/*
          <div style={{marginLeft: '20px',
                marginBottom: '20px',
                marginRight: '20px',
                fontWeight: 'bold',
                fontSize: 'large',
                marginTop: '20px',
                marginLeft: '40px'
                }}
            >
                Ticket History
            </div>
            */}

          <TextField
            id="search-bar"
            className="text"
            onChange={(e) => setSearchTerm(e.target.value)}  
            value={searchTerm} 
            label="Search by Ticket Title"
            variant="outlined"
            placeholder="Search..."
            size="small"
            style={{
                marginLeft: '20px',
                marginBottom: '20px',
                marginTop: '10px'

            }}
        />
        </div>

            <table {...getTableProps()} style={{width: '93%'}}>
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {/*}
                        {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps()} style={{backgroundColor: '#D6EAF8', width: '12%'}}> 
                            {column.render('Header')}
                        </th>
                        ))}
                        */}

                        <th className="column-header" >Title</th>
                        {!bk1 && <th className="column-header" >Status</th>}
                        {!bk2 && <th className="column-header" >Type</th>}
                        <th className="column-header" >Action</th>

                        {/* new column */}
                        {!bk3 && <th style={{backgroundColor: '#D6EAF8', width: '17%'}}>Date</th>}


                        {/* new column */}
                            {/*<th style={{backgroundColor: '#D6EAF8', width: '17%'}}>Date</th>
                            <th style={{backgroundColor: '#D6EAF8', width: '15%'}}> </th>*/}
                            <th style={{backgroundColor: '#D6EAF8'}}> </th>
                        
                    </tr>
                    
                ))}
                
            </thead>
            
            <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                       

                                
                                {/* Add new cell with 'details' string */}
                                {/*<td >
                                    
                                    {users !== null ?
                                        <Link to="/ticketDetails" state={{ user: data[row.id], ticketNum: row.id, project: project, changeCount: changeCount }} > details </Link>
                                    : 
                                        null
                                    }
                                    </td>
                                */}
                                <td className="row-body">
                                {(data[row.id].title)}
                            </td>
                               {!bk1 &&
                                    <td className="row-body">
                                        {(data[row.id].ticketStatus.charAt(0).toUpperCase() 
                                        + data[row.id].ticketStatus.slice(1) )}
                                    </td>
                                }
                                {/*
                                <td className="row-body">
                                    {(data[row.id].asignedDev)}
                                </td>
                                    */}

                                {!bk2 && 
                                    <td className="row-body">
                                        {(data[row.id].ticketType)}
                                    </td>
                                }

                                <td className="row-body">
                                    {(data[row.id].actionString)}
                                </td>

                                {!bk3 && 
                                    <td className="row-body">
                                        {formatDate(data[row.id].submitDate)}
                                    </td>
                                }

                                <td >

                                {history !== null ?

                                    <Button variant="outlined" style={{
                                        fontWeight: 'bold',
                                        fontSize: 'medium',
                                        //marginRight: '0px'
                                        //minWidth: '80px'
                                        width: '100%',
                                        minWidth: 80,   
                                    }}
                                    >
                                        {data[row.id].actionString === 'Created Project' || data[row.id].actionString === 'Updated Project' ?
                                            null: 

                                        <Link to="/ticketHistoryDetails" state={{ ticket: getTicket(data[row.id]), project: project, action: data[row.id].actionString, tickets: tickets, history: history, changeCount: changeCount, userProfile: 1 }} > details </Link>
                                        }
                     
                                    </Button>
                                : 
                                    null
                                }
                                </td>

                        </tr>
                        )
                    })
                }
            </tbody>
        </table>

        </div>
    )
    
}

export default UserHistoryTable