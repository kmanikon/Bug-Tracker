import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { CardActions, CardContent, CardMedia, Button, Typography, Box } from '@material-ui/core/';
import TopNavBar from '../Components/TopNavBar/TopNavBar'
import { useNavigate } from "react-router-dom";
import NotificationsCard from '../Components/NotificationsCard/NotificationsCard';
import { 
    BellOutlined,
    InfoCircleOutlined     
  } 
  from '@ant-design/icons';

import url from '../defs';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

/*

  Notifications page
    - show unread actions where user is assigned


*/




const Notifications = ({user}) => {
  const location = useLocation();

  var { innerWidth: width, innerHeight: height } = window;
  width -= 200

  var changeCount = 0;

  const [projects, setProjects] = useState([]);
  const [readCounts, setReadCounts] = useState([]);

  let navigate = useNavigate(); 


  // readCounts: project id, count

  var projectIds = projects.map((project) => project.projectId)

  var mappedCounts = projectIds.map((id) => readCounts[id] ? readCounts[id] : 0)

  const makeAPICallProjects = async (route) => {

  
      fetch(url + route, {
          method: 'GET'
      })
      .then(response => response.json())
      .then(postsFromServer => {

          setProjects(postsFromServer);
      });
  }



  const makeAPICallReads = async (route) => {


    fetch(url + route, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(postsFromServer => {

        setReadCounts(postsFromServer)
      
    });
}

 
 
  
  useEffect( () => {

      if (user){
          makeAPICallProjects('get-projects-by-user-id/' + user.userId);

          makeAPICallReads('get-unread-actions-by-user-id/' + user.userId)
      }
  }, [changeCount, location, user]);




  const [open, setOpen] = useState(false);


    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };


    const InfoDialog = () => {
        return (
            <div>
              <Button 
                variant="outlined" 
                style={{
                    fontWeight: 'bold',
                    fontSize: 'medium',
                    marginLeft: '40px',
                    marginRight: '20px',
                    marginTop: '20px'
                 }}
                //onClick={handleDelete}
                onClick={handleClickOpen}
            >
                <InfoCircleOutlined style={{fontSize: '200%'}}/>
            </Button>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title" variant="h5" 
                    style={{
                        fontWeight: 'bold',
                        fontSize: 'large',
                    }}
                >
                  {"Notifications"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description" >
                  The "Notifications" section provides users updates on new changes to their tickets. This section displays unread ticket actions for tickets that the user is currently assigned to.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Close</Button>
                </DialogActions>
              </Dialog>
            </div>
          );
      }


  return (
      <div style={{ width: '100%'}}>

                  <div style={{marginTop: '80px'}}></div>

              

              <div style={{width: '93%'}}>
              <div className="table-container">
                  <div style={{marginLeft: '20px',

                      marginRight: '20px',
                      fontWeight: 'bold',
                      fontSize: 'large',
                      marginTop: '20px',
                      marginLeft: '40px'
                      }}
                  >
                  Updates to My Tickets
                  <BellOutlined style={{ fontSize: '200%', marginLeft: '20px'}}/>
              </div>
              <InfoDialog/>


          </div>
          </div>


                  <NotificationsCard projects={projects} 
                  //actions={actions} 
                  notifCounts={mappedCounts}
                  changeCount={changeCount} />




          </div>
  )
}

export default Notifications