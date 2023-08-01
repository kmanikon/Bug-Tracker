import React, { useEffect, useMemo, useState, useRef } from 'react'
import { useTable } from 'react-table'
import { Link } from 'react-router-dom';
import { FormControlLabel, Checkbox, InputLabel, FormControl, IconButton, SearchIcon, TextField, Card, Select, MenuItem, CardActions, CardContent, CardMedia, Button, Typography, Box } from '@material-ui/core/';
import AutoScrollContainer from 'auto-scroll-container'

import url from '../../defs';

import './styles.css';

/*

  ticket table in project details

*/
  


const COLUMNS = [
    {
        Header: 'Title',
        accessor: 'title',
    },
    
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
        Header: 'Priority',
        accessor: 'ticketPrio',
    },


  ];




const priorityOrder = {
    'High': 3,
    'Medium': 2,
    'Low': 1
};

const typeOrder = {
    'Bugs/Errors': 4,
    'Feature Request': 3,
    'Task': 2,
    'Other': 1
}




 

const TicketTable = ({tickets, setTickets, project, devList, changeCount, user }) => {



    const [showClosed, setShowClosed] = useState(false)

    const [searchTerm, setSearchTerm] = useState('');

    const [sortBy, setSortBy] = useState('Submit Date')

    const sortList = [
        'Submit Date',
        'Ticket Type',
        'Ticket Priority'
    ]

    //var filteredTickets = tickets;
    //var [filteredTickets, setFilteredTickets] = useState(tickets);

    

    const sortTickets = () => {
        var filteredTs = tickets;

        if (sortBy === 'Ticket Type') {
            filteredTs = filteredTs.sort((a, b) => 
                typeOrder[b.ticketType] - typeOrder[a.ticketType] 
                    
            );
        } 
        else if (sortBy === 'Ticket Priority') {
                
            filteredTs = filteredTs.sort((a, b) => 
                priorityOrder[b.ticketPrio] - priorityOrder[a.ticketPrio]
                    
            );
        } 
        else {
            filteredTs = filteredTs.sort((a, b) => new Date(b.submitDate) - new Date(a.submitDate));
        }
        
        if (!showClosed) {
            filteredTs = filteredTs.filter(ticket => ticket.ticketStatus == 'pending');
            
        }

        if (searchTerm !== ''){
            filteredTs = filteredTs.filter(ticket => ticket.title.includes(searchTerm) );
        }

        return filteredTs
    }
    




 
    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() =>  sortTickets(), [tickets, sortBy, showClosed, searchTerm]); 
    
    // data is changing

    const tableInstance = useTable({
        columns,
        data
    })

    const { getTableProps, getTableBodyProps, headerGroups, footerGroups, rows, prepareRow} = tableInstance;

    






    const makeAPICallUpdateStatus = async (post, newStatus, row) => {

        
        const route = 'update-post';

        post.ticketStatus = newStatus;


        await fetch(url + route, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        })

        .then(response => response.json())
        .then(response => {
            
            
            /*
            const newTicks = tickets;
            newTicks[post.index].ticketStatus = newStatus;
            setTickets(newTicks);
            */
            

            

            // reload page (last resort)
            window.location.reload(false);
              

            
        });
        //changeCount++;
    }





        const handleClose = async (rowId) => {

            const ticket = data[rowId]

            const post = {
                "actionId": 0, // doesn't matter
                "date": "2023-05-15T07:41:51.053Z", // doesn't matter
                "actionString": "Closed Ticket",
                "userName": user.username,
                "userEmail": user.email,
                "userId": user.userId,
      
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

            await makeAPICallUpdateStatus(post, "closed", rowId)
            //tickets[rowId].ticketStatus = "closed";
        }

        const handleOpen = async (rowId) => {

            const ticket = data[rowId]

            const post = {
                "actionId": 0, // doesn't matter
                "date": "2023-05-15T07:41:51.053Z", // doesn't matter
                "actionString": "Opened Ticket",
                "userName": user.username,
                "userEmail": user.email,
                "userId": user.userId,
      
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

            await makeAPICallUpdateStatus(post, "pending", rowId)
            //tickets[rowId].ticketStatus = "closed";
        }



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


  return (
    <div >

        <div style={{display: 'flex'}}>
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
                marginLeft: '30px',
                marginBottom: '20px'
            }}
        />

        <Select
        style={{ marginTop: '0px', marginLeft: '40px', height: '40px', color: 'grey' }}
        displayEmpty
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        >
        <MenuItem disabled value="">
            Sort By
        </MenuItem>
        {sortList.map(({ name }, index) => (
            <MenuItem key={index} value={sortList[index]}>
            {sortList[index]}
            </MenuItem>
        ))}
        </Select>

        

        <div style={{marginLeft: 'auto', marginRight: '60px', color: 'grey'}}>
            <FormControlLabel control={<Checkbox color='primary' value={showClosed} onChange={() => (setShowClosed(!showClosed))} />} label="Show Closed Tickets" />
        </div>

        </div>



    
        <div className="tableContainer">
  <table {...getTableProps()}>
    <colgroup>
      <col className="title-column" />
      <col className="status-column" />
      {/*
      <col className="assigned-dev-column" />
      */}
      <col className="ticket-type-column" />
      <col className="ticket-prio-column" />
      {/*
      <col className="submitted-date-column" />
      <col className="details-column" />
      <col className="action-column" />
      */}
    </colgroup>
    <thead>
      {headerGroups.map((headerGroup) => (
      <tr {...headerGroup.getHeaderGroupProps()}>
        {headerGroup.headers.map((column) => (
        <th {...column.getHeaderProps()} className="column-header">
          {column.render('Header')}
        </th>
        ))}
        <th className="submitted-date-column" style={{backgroundColor:'#D6EAF8', border: '0px solid black'}} >Submitted Date</th>
        <th className="details-column" style={{backgroundColor:'#D6EAF8', border: '0px solid black'}}> </th>
        <th className="action-column" style={{backgroundColor:'#D6EAF8', border: '0px solid black'}}> </th>
      </tr>
      ))}
    </thead>
    <tbody {...getTableBodyProps()}>
      {rows.map((row) => {
        prepareRow(row);
        return (
        <tr className="row-body">
          <td className="row-body title-column">{data[row.id].title}</td>
          <td className="row-body status-column">
            {data[row.id].ticketStatus.charAt(0).toUpperCase() +
            data[row.id].ticketStatus.slice(1)}
          </td>
          
          {/*<td className="row-body assigned-dev-column">{data[row.id].asignedDev}</td>*/}
          <td className="row-body ticket-type-column">{data[row.id].ticketType}</td>
          <td className="row-body ticket-prio-column">{data[row.id].ticketPrio}</td>
          <td className="row-body submitted-date-column">{formatDate(data[row.id].submitDate)}</td>
          <td className="row-body details-column">
            {tickets !== null ? (
            <Button
              variant="outlined"
              style={{
                fontWeight: 'bold',
                fontSize: 'medium',
                marginRight: '0px',
                width: '100%',
              }}
            >
              <Link
                to="/ticketDetails"
                state={{
                  ticket: data[row.id],
                  ticketNum: row.id,
                  project: project,
                  devList: devList,
                  changeCount: changeCount,
                  myTickets: false,
                }}
              >
                details
              </Link>
            </Button>
            ) : null}
          </td>
          <td className="row-body action-column">
            {tickets !== null ? (
            <>
              {data[row.id].ticketStatus === 'pending' ? (
              <Button
                variant="outlined"
                style={{
                  fontWeight: 'bold',
                  fontSize: 'medium',
                  marginRight: '0px',
                  width: '100%',
                }}
                //onClick={() => makeAPICallUpdateStatus(data[row.id], "closed", row.id)}
                onClick={() => handleClose(row.id)}
              >
                Close
              </Button>
              ) : (
              <Button
                variant="outlined"
                style={{
                  fontWeight: 'bold',
                  fontSize: 'medium',
                  marginRight: '0px',
                  width: '100%',
                }}
                //onClick={() => makeAPICallUpdateStatus(data[row.id], "pending", row.id)}
                onClick={() => handleOpen(row.id)}
              >
                Reopen
              </Button>
              )}
            </>
            ) : null}
          </td>
        </tr>
        );
      })}
    </tbody>
  </table>
</div>



    

    




    </div>
  )
}

export default TicketTable