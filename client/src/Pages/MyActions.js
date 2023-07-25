import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { CardActions, CardContent, CardMedia, Button, Typography, Box, Grid } from '@material-ui/core/';
import TopNavBar from '../Components/TopNavBar/TopNavBar'
import { useNavigate } from "react-router-dom";

import { Link } from 'react-router-dom'; 
import UserProfileCard from '../Components/UserProfileCard/UserProfileCard';

import { 

    UserOutlined,
    InfoCircleOutlined,
    BellOutlined,
    FolderOpenOutlined,
    FileSearchOutlined,
    DashboardOutlined,
    FundProjectionScreenOutlined,
    SnippetsOutlined
          
  } 
  from '@ant-design/icons';

import url from '../defs';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const MyActions = ({user}) => {

    const location = useLocation();
    const [projects, setProjects] = useState([]);
    const [actions, setActions] = useState([]);

    var { innerWidth: width, innerHeight: height } = window;
    width -= 200

    var changeCount = 0;




    let navigate = useNavigate(); 

    const routeChangeProfile = () => {
        let path = `/profile`; 
        navigate(path);
    }



    


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
                  {"My Actions"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description" >
                  The "My Actions" section displays a history of user actions done within the bug tracker. This section is intended as a way to view and revert previous changes done by the user.
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
                My Actions by Project
                <UserOutlined style={{ fontSize: '200%', marginLeft: '20px'}}/>

            </div>

            <div style={{display: 'flex'}}>
            
            <InfoDialog/>
            <Button variant="outlined" style={{
                    fontWeight: 'bold',
                    fontSize: 'medium',
                    marginRight: '0px',
                    marginTop: '20px'
                }}
                onClick={routeChangeProfile}
            >

                Back
                
            </Button>
            </div>


        </div>
        </div>

        {projects !== [] && actions !== [] &&

        <UserProfileCard projects={projects} actions={actions} changeCount={changeCount}/>

        }
        
        </div>
  )
}

export default MyActions