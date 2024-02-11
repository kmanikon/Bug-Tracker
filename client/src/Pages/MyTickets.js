import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { CardActions, CardContent, CardMedia, Button, Typography, Box } from '@material-ui/core/';
import TopNavBar from '../Components/TopNavBar/TopNavBar'
import { useNavigate } from "react-router-dom";

import MyTicketsCard from '../Components/MyTicketsCard/MyTicketsCard';

import { 
    InfoCircleOutlined
  } 
  from '@ant-design/icons';
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';

import url from '../defs';


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



/*

  my tickets page
    - show assigned / submitted tickets by project

*/




const MyTickets = ({user}) => { 

    const location = useLocation();

    var changeCount = 0;

    const [projects, setProjects] = useState([]);
    const [actions, setActions] = useState([]);

    let navigate = useNavigate(); 


    /*
    const routeChange = () => { 
        let path = `/addProject`; 
        navigate(path, {state:{changeCount: changeCount}});
    }
    */
    
    const makeAPICallProjects = async (route) => {

    
        fetch(url + route, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(postsFromServer => {

            setProjects(postsFromServer);
        });
    }

    const makeAPICallActions = async (route) => {

    
        fetch(url + route, {
            method: 'GET' 
        })
        .then(response => response.json())
        .then(postsFromServer => {

            setActions(postsFromServer.sort(function(a,b){
                // Turn your strings into dates, and then subtract them
                // to get a value that is either negative, positive, or zero.
                return new Date(b.date) - new Date(a.date);
              }));

            //setActions(postsFromServer);
        });
    }

    
    useEffect( () => {

        if (user){ 
            makeAPICallProjects('get-projects-by-user-id/' + user.userId);
            makeAPICallActions('get-actions-by-user-id/' + user.userId);
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
                  {"Workflows"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description" >
                  The "Workflows" section serves as a collaborative whiteboard for visualizing project issues and timelines. Users can drag and drop project tickets, leaving comments as needed.
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
                    <div style={{display: 'flex',  marginBottom: '-20px'}}>
                        Go To Project Workflow
                        <DashboardCustomizeOutlinedIcon style={{ fontSize: '200%', marginLeft: '20px', marginTop: '-10px'}}/>
                    </div>
                </div>
                <InfoDialog/>


            </div>
            </div>

                    <MyTicketsCard projects={projects} actions={actions} changeCount={changeCount} />
            </div>
    )
}

export default MyTickets