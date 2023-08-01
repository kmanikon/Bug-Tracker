import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'; 
import TopNavBar from '../Components/TopNavBar/TopNavBar'
import { Card, TextField, CardActions, CardContent, CardMedia, Button, Typography, Box, Select, MenuItem } from '@material-ui/core/';
import { RightOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import UserHistoryTable from '../Components/UserHistoryTable/UserHistoryTable'


/*

  Show history of project actions associated with a user for one project

*/



const UserProfileHistory = () => {

    const location = useLocation();
    var { project, history, changeCount } = location.state;

    
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


  const filterHistory = history.filter(h => h.projectId === project.projectId);
  const filterTickets = history.map((h) => getTicket(h));


    return (
      <div style={{marginLeft: '20px'}}>

        <div style={{marginTop: '110px'}}></div>


        <Button color="black" size="large" variant="outlined"
                style={{
                    marginTop: '0px',
                    marginLeft: '20px',
                    marginBottom: '20px',
                    fontWeight: 'bold',
                    fontSize: 'large'
                }}
            >
            <Link to="/myActions"
                style={{ textDecoration: 'none' }}>

                Back 
              
              </Link>
          </Button>

        <UserHistoryTable project={project} history={filterHistory} tickets={filterTickets} changeCount={changeCount} userProfile={true}/>


      </div>
    ) 
}

export default UserProfileHistory