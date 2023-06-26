import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import styles from './styles';
import { Link } from 'react-router-dom';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Box } from '@material-ui/core/';
import { useNavigate } from "react-router-dom";

import url from '../../defs';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import useStyles from './styles';

/*

  show more info for one ticket + update + delete options

*/




const TicketDetailsCard = ({ticket, ticketNum, project, devList, changeCount, user, myTickets}) => {



  const tick = ticket;
  const ticknum = parseInt(ticketNum) + 1;//parseInt(ticket.ticketNum) + 1

  const classes = useStyles();
  const ref = useRef(null);


    let navigate = useNavigate(); 
    const routeChangeUpdate = () => { 
        let path = `/editTicket`; 
        navigate(path, {state: {'ticket': tick, 'ticketNum': ticknum, 'project': project, 'devList': devList, changeCount: changeCount, myTickets: myTickets}});
    }

    //let navigate = useNavigate(); 
    const routeChangeDelete = () => { 
        //let path = `/projectDetails`; 
        //navigate(path, {state:{'project': project, changeCount: changeCount}});
        if (myTickets == false){
          let path = `/projectDetails`; 
          navigate(path, {state:{'project': project, changeCount: changeCount}});
      }
      else {
          let path = `/myProjectTickets`; 
          navigate(path, {state:{'project': project, changeCount: changeCount}});
      }
    }
 

    const makeAPICallDelete = async (route, post) => {


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


    const handleDelete = () => {
        setOpen(false);
        changeCount++;

        const post = {
          "actionId": 0, // doesn't matter
          "date": "2023-05-15T07:41:51.053Z", // doesn't matter
          "actionString": "Deleted Ticket",
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
          "read": ticket.read
        }


        makeAPICallDelete('delete-post-by-id', post)
        routeChangeDelete();
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
            Delete Ticket
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
                Delete Ticket #{ticket.ticketNumber}?
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


  return (
    <div>
        
      <div className={classes.projectInfo}>
          <div className="projectsTitle">Details for Ticket #{ticket.ticketNumber}</div>
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
            <Button variant="outlined" style={{
              fontWeight: 'bold',
              fontSize: 'medium',
              marginRight: '20px'
            }}
            >

              {myTickets === true ? 
                <Link to="/myProjectTickets" 
                state={{ project: project, changeCount: changeCount }} 
                style={{ textDecoration: 'none' }}>

                Back 
              
              </Link>
              :
                <Link to="/projectDetails" 
                  state={{ ticket: tick, ticketNum: ticknum, project: project, devList: devList, changeCount: changeCount }} 
                  style={{ textDecoration: 'none' }}>

                  Back 
                
                </Link>
              }
                                
             </Button>

            <Button variant="outlined" style={{
                    fontWeight: 'bold',
                    fontSize: 'medium',
                    marginRight: '-20px'
                }}
                onClick={routeChangeUpdate}
            >
                Update Ticket
            </Button>

            <DeleteDialog />

        </div>

        </div>
      

      





    </div>
  )
}

export default TicketDetailsCard