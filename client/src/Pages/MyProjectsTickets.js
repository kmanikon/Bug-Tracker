import React, { useState, useEffect, useRef, useLayoutEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import TopNavBar from '../Components/TopNavBar/TopNavBar';
import ProjectBoard from '../Components/ProjectBoard/ProjectBoard';
import { Card, TextField, CardActions, CardContent, CardMedia, Button, Typography, Box, Select, MenuItem } from '@material-ui/core/';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import useStyles from '../Components/TicketDetailsCard/styles';
import { Link } from 'react-router-dom';
import { shadows } from '@mui/system';

import url from '../defs';

import 'reactflow/dist/style.css';


/*

  My tickets project select -> assigned / submitted tickets

*/


const MyProjectsTickets = ({user}) => {

  // state: project

  const location = useLocation();
  var { project, changeCount } = location.state;
  
  // here: API call to get projectTickets + (filter here)

  // switch bar between assigned tickets and submitted tickets

  const [tickets, setTickets] = useState([]);

  const [projectUsers, setProjectUsers] = useState([]);
  
  const [showAssigned, setShowAssigned] = useState(true);

  const [open, setOpen] = useState(false);

  var devList = projectUsers.map((user) => [user.userId, user.email, user.username, user.username + ", " + user.email]);

  //var showTickets = tickets.filter(ticket => ticket.asignedDev == user.username );

  const [showTickets, setShowTickets] = useState([])

  const makeAPICallPosts = async (route) => {


      fetch(url + route, {
          method: 'GET'
      })
      .then(response => response.json())
      .then(postsFromServer => {
          // keep an eye on this
          const formatTickets = postsFromServer.map((obj, index) => ({ ...obj, index }));
          setTickets(formatTickets);
 
      });
  }

  const makeAPICallUsers = async (route) => {


    fetch(url + route, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(postsFromServer => {
        setProjectUsers(postsFromServer);
    });
}

const makeAPICallGetHistory = async (route) => {


  fetch(url + route, {
      method: 'GET'
  }) 
  .then(response => response.json())
  .then(postsFromServer => {
      // keep an eye of this
      /*
      setHistory(postsFromServer.sort(function(a,b){
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          return new Date(b.date) - new Date(a.date);
        }));
      */
  });
}



  useEffect( () => {
      if (user){
      makeAPICallPosts('get-posts-by-project/' + project.projectId + '/' + user.userId)
      makeAPICallUsers('get-users-by-project-id/' + project.projectId)

      // calling here to update notifications
      makeAPICallGetHistory('get-actions-by-project-id/' + project.projectId + '/' + user.userId)
      }
      
  }, [changeCount, user]);

  useEffect( () => {
      setShowTickets(tickets.filter(ticket => ticket.asignedDev == user.username));
  }, [tickets])


  const handleShowAssigned = () => {
    if (showAssigned) {
      setShowAssigned(false);
      setShowTickets(tickets.filter(ticket => ticket.submitter == user.username ));
    }
    else {
      setShowAssigned(true);
      setShowTickets(tickets.filter(ticket => ticket.asignedDev == user.username ));
    }
  }

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }


    return (
      <div style={{ width: '100%', marginLeft: '20px'}}>
            <div style={{marginTop: '80px'}}></div>

            
            <div style={{display: 'flex', //justifyContent: 'space-between', 
          }}>
              <Button color="black" size="large" variant="outlined"
                  style={{
                      marginTop: '0px',
                      //marginLeft: '20px',
                      marginBottom: '20px',
                      fontWeight: 'bold',
                      fontSize: 'large'
                  }}

              >
                <Link to="/myTickets" 
                    style={{ textDecoration: 'none' }}>

                    Back 
                  
                </Link>
              </Button>

              <Button 
                color="primary" 
                size="large" 
                variant="outlined"
                  style={{
                      marginTop: '0px',
                      marginLeft: '40px',
                      marginBottom: '20px',
                      fontWeight: 'bold',
                      fontSize: 'large',
                      width: 300,
                      fontSize: 16
                  }}
                  onClick={handleOpen}
              >
                    Save Workflow
              </Button>

            {/*
              <div>
                
              <Button color="black" size="medium" variant="outlined"
                  style={{
                      marginTop: '0px',
                      //marginLeft: '20px',
                      marginRight: '20px',
                      marginBottom: '20px',
                      fontWeight: 'bold',
                      fontSize: 'large'
                  }}
                  

              >
                <PlusOutlined style={{marginRight: 10 }} />
                Add Ticket
              </Button>
              <Button color="black" size="medium" variant="outlined"
                  style={{
                      marginTop: '0px',
                      //marginLeft: '20px',
                      marginRight: '20px',
                      marginBottom: '20px',
                      fontWeight: 'bold',
                      fontSize: 'large'
                  }}
              >
                Create Note
              </Button>
              </div>
              */}

              


              

            </div>

            

            {/*
            <div style={{marginTop: '20px'}}></div>

            <MyTicketTable tickets={showTickets} setTickets={setTickets} project={project} devList={devList} changeCount={changeCount} user={user} showAssigned={showAssigned}/>
            */}


            {/* Board Here */}
            <div style={{ width: '85vw', height: '75vh', borderWidth: '1px', borderColor: 'grey', borderStyle: 'solid',}}>
              <ProjectBoard
                tickets={tickets}
                project={project}
                devlist={devList}
                changeCount={changeCount}
                open={open}
                handleClose={handleClose}
              />
            </div>

      </div>
    )
}

export default MyProjectsTickets