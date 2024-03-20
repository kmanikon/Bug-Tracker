import React, { useMemo, useState } from 'react'
import { useTable } from 'react-table'
import { Link } from 'react-router-dom';
import { FormControlLabel, Checkbox,TextField, Select, MenuItem, Button, useMediaQuery } from '@material-ui/core/';

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




 

const TicketTable = ({tickets, setTickets, ticketChangeCount, setTicketChangeCount, project, devList, changeCount, user }) => {



    const [showClosed, setShowClosed] = useState(false)

    const [searchTerm, setSearchTerm] = useState('');

    const [sortBy, setSortBy] = useState('Submit Date');

    const [filter, setFilter] = useState('All Tickets');

    const sortList = [
        'Submit Date',
        'Ticket Type',
        'Ticket Priority'
    ]

    const filterList = [
      'All Tickets',
      'My Tickets'
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
        
        if (filter === 'My Tickets') {
            filteredTs = filteredTs.filter(ticket => ticket.asignedDevUid == user.userId);
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
    const data = useMemo(() =>  sortTickets(), [tickets, sortBy, filter, showClosed, searchTerm]); 
    
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
            setTicketChangeCount(ticketChangeCount + 1);
              

            
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

  const isSmallScreen = useMediaQuery('(max-width: 800px)');

  const bk1 = useMediaQuery('(max-width: 1200px)');
  const bk2 = useMediaQuery('(max-width: 800px)');
  const bk3 = useMediaQuery('(max-width: 1000px)');
  const bk4 = useMediaQuery('(max-width: 200px)');
  const bk5 = useMediaQuery('(max-width: 200px)');

  const bk6 = useMediaQuery('(max-width: 500px)');

  const formatType = (type) => {
    if (type === 'Feature Request'){
      return 'Feature';
    }
    if (type === 'Bugs/Errors') {
      return 'Bug'
    }
    return type;
  }

  return (
    <div >

        <div style={{display: 'flex'}}>
        {!bk6 &&
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
        }

        {!isSmallScreen &&
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
        }

      {!isSmallScreen &&
        <Select
        style={{ marginTop: '0px', marginLeft: '40px', height: '40px', color: 'grey' }}
        displayEmpty
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        >
        <MenuItem disabled value="">
            Filter By
        </MenuItem>
        {filterList.map(({ name }, index) => (
            <MenuItem key={index} value={filterList[index]}>
            {filterList[index]}
            </MenuItem>
        ))}
        </Select>
      }

        

        <div style={{marginLeft: !bk6 ? 'auto' : '30px', marginBottom: !bk6 ? 'auto' : '20px', marginRight: !bk2 ? '20px' : 0, color: 'grey', whiteSpace: 'nowrap'}}>
            <FormControlLabel control={<Checkbox color='primary' value={showClosed} onChange={() => (setShowClosed(!showClosed))} />} label="Show Closed Tickets" />
        </div>

        </div>



    
        <div className="tableContainer">
  <table {...getTableProps()} style={{width: '97%', marginLeft: '10px'}}>
    {/*
    <colgroup>
      <col className="title-column" />
      <col className="status-column" />
      <col className="ticket-type-column" />
      <col className="ticket-prio-column" />
    </colgroup>
    */}
    <thead>
      {headerGroups.map((headerGroup) => (
      <tr {...headerGroup.getHeaderGroupProps()}>
        {/*
        {headerGroup.headers.map((column) => (
        <th {...column.getHeaderProps()} className="column-header">
          {column.render('Header')}
        </th>
        ))}
        */}
        <th className="column-header" >Title</th>
        {!bk6 && <th className="column-header" >Status</th>}
        {!bk3 && <th className="column-header" >Type</th>}
        {!bk2 && <th className="column-header" >Priority</th>}
        
        {!bk1 && <th className="submitted-date-column" style={{backgroundColor:'#D6EAF8', border: '0px solid black'}} >Submitted Date</th>}
        <th className="details-column" style={{backgroundColor:'#D6EAF8', border: '0px solid black'}}> </th>
        {!bk4 && <th className="action-column" style={{backgroundColor:'#D6EAF8', border: '0px solid black'}}> </th>}
      </tr>
      ))}
    </thead>
    <tbody {...getTableBodyProps()}>
      {rows.map((row) => {
        prepareRow(row);
        return (
        <tr className="row-body">
          <td className="row-body title-column row-title">{data[row.id].title}</td>
          {!bk6 &&
          <td className="row-body status-column">
            {data[row.id].ticketStatus.charAt(0).toUpperCase() +
            data[row.id].ticketStatus.slice(1)}
          </td>
          }
          
          {/*<td className="row-body assigned-dev-column">{data[row.id].asignedDev}</td>*/}
          {!bk3 && <td className="row-body ticket-type-column">{formatType(data[row.id].ticketType)}</td> }
          {!bk2 && <td className="row-body ticket-prio-column">{data[row.id].ticketPrio}</td> }
          {!bk1 && <td className="row-body submitted-date-column">{formatDate(data[row.id].submitDate)}</td>}
          <td className="details-column" >
            {tickets !== null ? (
            <Button
              variant="outlined"
              style={{
                fontWeight: 'bold',
                fontSize: 'medium',
                marginRight: '0px',
                width: '100%',
                minWidth: '80px',
                textOverflow: 'clip',
                whiteSpace: 'nowrap'
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
          {!bk4 &&
          <td className="action-column">
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
                  minWidth: '80px',
                  whiteSpace: 'nowrap',
                  textOverflow: 'none'
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
                  minWidth: '80px',
                  whiteSpace: 'nowrap'
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
          }
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