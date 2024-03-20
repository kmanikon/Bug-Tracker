import React, { useMemo, useState } from 'react'
import { useTable } from 'react-table'
import { Link } from 'react-router-dom';
import {  TextField, Button, useMediaQuery, Typography } from '@material-ui/core/';
import { CloseOutlined } from '@ant-design/icons';
import './styles.css';
import AutoScrollContainer from 'auto-scroll-container'

import url from '../../defs';


/*

    table for notifications in one project
        - notification = unread post that is assigned to the user

*/



// column headers
const COLUMNS = [
    /*
    {
        Header: 'Ticket #',
        accessor: 'ticketNumber'
    },
    */
    {
        Header: 'Title',
        accessor: 'title'
    }
    ,
    {
        Header: 'User',
        accessor: 'userName'
    },
    /*
    {
        Header: 'Email',
        accessor: 'userEmail'
    },
    */
    {
        Header: 'Action',
        accessor: 'actionString'
    }
];

const NotificationsTable = ({project, history, tickets, changeCount, userProfile, user, historyCount, setHistoryCount}) => {

    const [searchTerm, setSearchTerm] = useState('');

    //var { innerWidth: width, innerHeight: height } = window;
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

    const makeAPICallUpdateStatus = async (post) => {

        
        const route = 'update-projectActions';


        await fetch(url + route, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        })

        .then(response => response.json())
        .then(response => {

            // reload page (last resort)
            //window.location.reload(false);
            setHistoryCount(historyCount + 1);
            
        });
    }


    const markTrue = (testID, testString) => {

        const index = testString.indexOf(testID.toString());

        if (index !== -1){
            const endIndex = index + (testID.toString()).length - 1;


            var newstr = testString.substring(0, endIndex + 1) + 'T'
            
            if (newstr.length !== testString.length){
                newstr += testString.substring(newstr.length, testString.length)
            }
            return newstr;
        }

        return "";
    }


    const handleMarkRead = async (rowId) => {

        // "ticket" = postAction
        const action = filteredHistory[rowId]

        var post = action;

        //post.read = true;

        const newReadString = markTrue(user.userId, post.readString);

        if (newReadString !== ""){
             post.readString = newReadString;
             makeAPICallUpdateStatus(post);
        }

    
        // .read = 
        //  makeAPICallUpdateStatus(post);
    

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
    const bk4 = useMediaQuery('(max-width: 200px)');
    const bk5 = useMediaQuery('(max-width: 200px)');

    return (
        <div style={{width: '100%'}}>
            <Button color="black" size="large" variant="outlined"
                style={{
                    marginTop: '0px',
                    marginLeft: '20px',
                    marginBottom: '20px',
                    fontWeight: 'bold',
                    fontSize: 'large'
                }}
            >
            <Link to="/notifications"
                //state={{ project: project, changeCount: changeCount }} 
                style={{ textDecoration: 'none' }}>

                Back 
              
              </Link>
          </Button>

          <Typography variant="h5" align="center" style={{marginLeft: -20, marginTop: 0, marginBottom: 10, fontWeight: 710 }}>{project.projectName} Notifications</Typography>

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
                New Changes
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
                        {/*
                        {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps()} style={{backgroundColor: '#D6EAF8'}}> 
                            {column.render('Header')}
                        </th>
                        ))}
                        */}
                        <th className="column-header" >Title</th>
                        {!bk1 && <th className="column-header" >User</th>}
                        <th className="column-header" >Action</th>

                        {/* new column */}
                        {!bk3 && <th style={{backgroundColor: '#D6EAF8', width: '17%'}}>Date</th>}
                        <th style={{backgroundColor: '#D6EAF8'}}> </th>
                        {!bk2 && <th style={{backgroundColor: '#D6EAF8'}}> </th>}
                        
                    </tr>
                    
                ))}
                
            </thead>
            
            <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>


                        {/*
                        {row.cells.map((cell) => {
                            return <td {...cell.getCellProps()}>
                            {cell.render('Cell')} </td>

                        })}
                        */}
                        <td className="row-body">
                            {(data[row.id].title)}
                        </td>

                        {!bk1 &&
                            <td className="row-body">
                                {data[row.id].userName}
                            </td>
                        }

                        
                        <td className="row-body">
                            {(data[row.id].actionString)}
                        </td>
                        
                               
                        {!bk3 && 
                            <td className="row-body">
                                {formatDate(data[row.id].date)}
                            </td>
                        }

                        <td >
                            {history !== null ?
                                <Button variant="outlined" style={{
                                    fontWeight: 'bold',
                                    fontSize: 'medium', 
                                    //marginRight: '0px',
                                    //width: 80
                                    width: '100%',
                                    minWidth: 80,

                                }}
                                >
                                    {data[row.id].actionString === 'Created Project' || data[row.id].actionString === 'Updated Project' ?
                                        null: 

                                    <Link to="/ticketHistoryDetails" state={{ ticket: getTicket(data[row.id]), project: project, action: data[row.id].actionString, tickets: tickets, history: history, changeCount: changeCount, userProfile: 3  }} > details </Link>
                                    }
                    
                                </Button>
                            : 
                                null
                            }
                        </td>
                        {!bk2 && 
                            <td>
                                <Button variant="outlined" style={{
                                        fontWeight: 'bold',
                                        fontSize: 'large', 
                                        height: '40px',
                                        width: '100%',
                                        minWidth: 80,
                                    }}
                                    onClick={() => handleMarkRead(row.id)}
                                    >
                                    <CloseOutlined/>
                                </Button>
                            </td>
                        }


                        </tr>
                        )
                    })
                }
            </tbody>
        </table>

        </div>
    )
    
}

export default NotificationsTable