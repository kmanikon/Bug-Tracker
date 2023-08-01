import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import styles from './styles';
import { Link } from 'react-router-dom';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Box } from '@material-ui/core/';
import { useNavigate } from "react-router-dom";
import useStyles from './styles';

import url from '../../defs';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


/*

      show info for a given project action (on a ticket) + restore ticket option


      What is "Restore Ticket"?
        - revert to the change selected

      All these changes are in the handle__() functions

      Cases:
          action: Created Ticket (update to selected state)

            if ticket does exist, (get-post-by-id is not null)
                - make a PUT request ('update-post')

            if ticket does not exist, (get-post-by-id is null)
                - make a POST request ('create-post')
              

          action: Delete Ticket

              if ticket exists: 
                  - make a PUT request ('delete-post')

              if ticket does not exist:
                  - create ticket (POST request)

          action: Updated Ticket

              if ticket exists: 
                  - make a PUT request ('update post')

              if ticket does not exist: 
                  - make a POST request ('create-post')

*/

const TicketHistoryDetailsCard = ({user, ticket, project, action, tickets, history, changeCount, userProfile}) => {
 
    const tick = ticket; 

    const classes = useStyles();
    const ref = useRef(null); 

    const [errorString, setErrorString] = useState('')


    const makeAPICallPOST = async (route, post) => {


      fetch(url + route, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(post)
      })

      .then(response => response.json())
      .then(response => {
          window.location.reload(false);
      });
  }

    const makeAPICallPUT = async (route, post) => {


      fetch(url + route, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(post)
      })

      .then(response => response.json())
      .then(response => {
          window.location.reload(false);
      });
  }



  const postExists = (tickets.filter(t => t.postId === ticket.postId).length > 0);

 



    let navigate = useNavigate(); 





    const [open, setOpen] = useState(false);


    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

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



    const DeleteDialog = () => {
      return (
          <div>
            <Button 
              variant="outlined" 
              style={{
                  fontWeight: 'bold',
                  fontSize: 'medium',
                  marginLeft: '40px',
                  marginRight: '-20px'
               }}
              //onClick={handleDelete}
              onClick={handleClickOpen}
          >
              Restore Ticket
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
                {"Delete Ticket Confirmation"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description" >
                  {postExists ? <>Update Ticket?</> : <>Create Ticket?</>}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleDelete} autoFocus>
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        );
    }

    const handleDelete = () => {
      setOpen(false);
      changeCount++;
      const post = {
        "actionId": 0, // doesn't matter
        "date": "2023-05-15T07:41:51.053Z", // doesn't matter
        "actionString": "Reverted Change",
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

      

      /*
                    if ticket exists: 
                  - make a PUT request ('update-post')

              if ticket does not exist:
                  - create ticket (POST request)
      */

      //setErrorString('Error: Could not Delete Ticket')

      if (postExists === true){
        post.actionString = "Updated Ticket";
        makeAPICallPUT('update-post', post)
      }
      else {
        post.actionString = "Created Ticket";
        makeAPICallPOST('create-post', post)
      }

      if (userProfile === 0){
        let path = `/projectDetails`; 
        navigate(path, {state: {'project': project, changeCount: changeCount}});
      }
      else if (userProfile === 3){
        let path = `/notificationsHistory`;
        navigate(path, {state: {'project': project, history: history, changeCount: changeCount}});
      }
      else {
        let path = `/profileHistory`; 
        navigate(path, {state: {'project': project, history: history, changeCount: changeCount}});
      }

  }






  const CreateDialog = () => {
    return (
        <div>
          <Button 
            variant="outlined" 
            style={{
                fontWeight: 'bold',
                fontSize: 'medium',
                marginLeft: '40px',
                marginRight: '-20px'
             }}
            //onClick={handleDelete}
            onClick={handleClickOpen}
        >
            Restore Ticket
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
              {"Confirmation: Reverting Changes"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description" >
                  {postExists ? <>Update Ticket?</> : <>Create Ticket?</>}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleCreate} autoFocus>
                Revert
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
  }

  const handleCreate = () => {
    setOpen(false);
    changeCount++;
    const post = {
      "actionId": 0, // doesn't matter
      "date": "2023-05-15T07:41:51.053Z", // doesn't matter
      "actionString": "Reverted Change",
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


    // post DNE -> create 
    if (postExists === false){
        post.actionString = "Created Ticket";
        makeAPICallPOST('create-post', post)
        if (userProfile === 0){
          let path = `/projectDetails`; 
          navigate(path, {state: {'project': project, changeCount: changeCount}});
        }
        else if (userProfile === 3){
          let path = `/notificationsHistory`;
          navigate(path, {state: {'project': project, history: history, changeCount: changeCount}});
        }
        else {
          let path = `/profileHistory`; 
          navigate(path, {state: {'project': project, history: history, changeCount: changeCount}});
        }
    }
    // post Exists -> update
    else {
        post.actionString = "Updated Ticket";
        makeAPICallPUT('update-post', post)
        if (userProfile === 0){
          let path = `/projectDetails`; 
          navigate(path, {state: {'project': project, changeCount: changeCount}});
        }
        else if (userProfile === 3){
          let path = `/notificationsHistory`;
          navigate(path, {state: {'project': project, history: history, changeCount: changeCount}});
        }
        else {
          let path = `/profileHistory`; 
          navigate(path, {state: {'project': project, history: history, changeCount: changeCount}});
        }
    }
}







const UpdateDialog = () => {
  return (
      <div>
        <Button 
          variant="outlined" 
          style={{
              fontWeight: 'bold',
              fontSize: 'medium',
              marginLeft: '40px',
              marginRight: '-20px'
           }}
          //onClick={handleDelete}
          onClick={handleClickOpen}
      >
          Restore Ticket
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
            {"Update Ticket Confirmation"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description" >
            {postExists ? <>Update Ticket?</> : <>Create Ticket?</>}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleUpdate} autoFocus>
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
}

const handleUpdate = () => {
  setOpen(false);
  changeCount++;
  const post = {
    "actionId": 0, // doesn't matter
    "date": "2023-05-15T07:41:51.053Z", // doesn't matter
    "actionString": "Reverted Change",
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


  if (postExists === true){
    post.actionString = "Updated Ticket";
    makeAPICallPUT('update-post', post)
  }
  else {
    post.actionString = "Created Ticket";
    makeAPICallPOST('create-post', post)
  }

  if (userProfile === 0){
    let path = `/projectDetails`; 
    navigate(path, {state: {'project': project, changeCount: changeCount}});
  }
  else if (userProfile === 3){
    let path = `/notificationsHistory`;
    navigate(path, {state: {'project': project, history: history, changeCount: changeCount}});
  }
  else {
    let path = `/profileHistory`; 
    navigate(path, {state: {'project': project, history: history, changeCount: changeCount}});
  }

}
  



  return (
    <div>
        <div className={classes.projectInfo}>
          <div className="projectsTitle">Changes for Ticket #{ticket.ticketNumber}</div>
      </div>


      <Card className={classes.headerCard} ref={ref}>
    
          <div style={{display: 'flex'}}>

              <div style={{width: '35%', display: 'block'}}>
                  <Box className={classes.title} variant="h5" gutterBottom >Title</Box>
                  <Box className={classes.subTitle} variant="h5" gutterBottom>{tick.title}</Box>

                  <div style={{ marginTop: '20px'}}></div>

                  <Box className={classes.title} variant="h5" gutterBottom >Assigned Developer Username</Box>
                  <Box className={classes.subTitle} variant="h5" gutterBottom>{tick.asignedDev}</Box>

                  <div style={{ marginTop: '20px'}}></div>

                  <Box className={classes.title} variant="h5" gutterBottom >Submitter Username</Box>
                  <Box className={classes.subTitle} variant="h5" gutterBottom>{tick.submitter}</Box>

                  <div style={{ marginTop: '20px'}}></div>

                  <Box className={classes.title} variant="h5" gutterBottom >Ticket Status</Box>
                  <Box className={classes.subTitle} variant="h5" gutterBottom>{tick.ticketStatus}</Box>

                  <div style={{ marginTop: '20px'}}></div>

                  <Box className={classes.title} variant="h5" gutterBottom >Ticket Type</Box>
                  <Box className={classes.subTitle} variant="h5" gutterBottom>{tick.ticketType}</Box>
              
                  <div style={{ marginTop: '20px'}}></div>

                  <Box className={classes.title} variant="h5" gutterBottom >Last Modified</Box>
                  <Box className={classes.subTitle} variant="h5" gutterBottom>{formatDate(tick.modifyDate)}</Box>
              </div>
          
              <div style={{width: '35%', display: 'block'}}>
                  <Box className={classes.titleRight} variant="h5" gutterBottom >Description</Box>
                  <Box className={classes.subTitleRight} variant="h5" gutterBottom>{tick.description}</Box>
              
                  <div style={{ marginTop: '20px'}}></div>

                  <Box className={classes.titleRight} variant="h5" gutterBottom >Assigned Developer Email</Box>
                  <Box className={classes.subTitleRight} variant="h5" gutterBottom>{tick.asignedDevEmail}</Box>

                  <div style={{ marginTop: '20px'}}></div>

                  <Box className={classes.titleRight} variant="h5" gutterBottom >Submitter Email</Box>
                  <Box className={classes.subTitleRight} variant="h5" gutterBottom>{tick.submitterEmail}</Box>

                  <div style={{ marginTop: '20px'}}></div>



                  <Box className={classes.titleRight} variant="h5" gutterBottom >Ticket Priority</Box>
                  <Box className={classes.subTitleRight} variant="h5" gutterBottom>{tick.ticketPrio}</Box>
              
                  <div style={{ marginTop: '20px'}}></div>

                  <Box className={classes.titleRight} variant="h5" gutterBottom >Submitted</Box>
                  <Box className={classes.subTitleRight} variant="h5" gutterBottom>{formatDate(tick.submitDate)}</Box>
              </div>

          </div>

          <div style={{ marginBottom: '20px'}}></div>
          
      </Card>

      <div style={{marginTop: '20px'}}></div>


      <div style={{width: '93%'}}>
        <div style={{
          display: 'flex',
          float: 'right'

        }}>


          <Button 
            variant="outlined" 
            style={{
                fontWeight: 'bold',
                fontSize: 'medium',
                marginLeft: '40px',
                marginRight: '-20px'
            }}
            >

            {userProfile === 0 ?
            <Link to="/projectHistory" 
                state={{ project: project, tickets: tickets, history: history, changeCount: changeCount }} 
                style={{ textDecoration: 'none' }}>

                Back 
              
              </Link>
              :
              null }

            {userProfile === 1 ?
              <Link to="/profileHistory" 
                state={{'project': project, history: history, changeCount: changeCount}} 
                style={{ textDecoration: 'none' }}>

                Back 
            
              </Link>
              : null
              }

            {userProfile === 3 ?
              <Link to="/notificationsHistory" 
                state={{'project': project, history: history, changeCount: changeCount}} 
                style={{ textDecoration: 'none' }}>

                Back 
            
              </Link>
              : null
              }
              
          </Button>

            {userProfile !== 3 ? 
            <>
          {action === "Created Ticket" ?
            <CreateDialog />
              : 
              <>
              {action === "Deleted Ticket" ?
                <DeleteDialog />
                  : <UpdateDialog /> 
                } 
              </>
                
              }
            
            </>
            : null}


              
            
        

        </div>

        </div>

        <Typography style={{marginLeft: '20px', fontWeight: 'bold'}}>
          {errorString}
        </Typography>
    </div>
  )
}

export default TicketHistoryDetailsCard