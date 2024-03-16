import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Button, CircularProgress, useMediaQuery } from '@material-ui/core/';
import TopNavBar from '../Components/TopNavBar/TopNavBar'
import { useNavigate } from "react-router-dom";

import UserProfileCard from '../Components/UserProfileCard/UserProfileCard';

import { 
    UserOutlined,
    InfoCircleOutlined,
  } 
  from '@ant-design/icons';

import url from '../defs';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const MyActions = ({user, projects}) => {

    const location = useLocation();
    //const [projects, setProjects] = useState([]);
    const [actions, setActions] = useState([]);

    const [loading, setLoading] = useState(false);

    var { innerWidth: width, innerHeight: height } = window;
    width -= 200

    var changeCount = 0;




    let navigate = useNavigate(); 

    const routeChangeProfile = () => {
        let path = `/profile`; 
        navigate(path);
    }



    

/*
    const makeAPICallProjects = async (route) => {

    
      fetch(url + route, {
          method: 'GET'
      })
      .then(response => response.json())
      .then(postsFromServer => {

          setProjects(postsFromServer);
      });
  }
  */

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

  const handleLoading = async () => {
    setLoading(true);
    
    try {
        await Promise.all([
            //makeAPICallProjects('get-projects-by-user-id/' + user.userId),
            makeAPICallActions('get-actions-by-user-id/' + user.userId)
        ]);
    } catch (error) {
        // Handle errors here if needed
        console.error("Error fetching data:", error);
    }

    setLoading(false);
}

  
  useEffect( () => {
    if (user){
        handleLoading();
    }
  }, [user]); // changeCount, location, 

  


    const [open, setOpen] = useState(false);


    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const isSmallScreen = useMediaQuery('(max-width: 600px)');



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
                  {"Action Logs"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description" >
                  The "Action Logs" section displays a history of user actions done within the bug tracker. This section is intended as a way to view and revert previous changes done by the user.
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
                    marginTop: '10px',
                    marginLeft: '40px'
                    }}
                >

                <div style={{display: 'flex', marginBottom: '-20px'}}>
                    {!isSmallScreen ? 'My Actions by Project' : 'My Actions'}
                    <UserOutlined style={{ fontSize: '200%', marginLeft: '20px', marginTop: '-10px'}}/>
                </div>
            </div>

            <div style={{display: 'flex'}}>
            
            {!isSmallScreen &&
                <InfoDialog/>
            }
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

        { true && /*projects?.length && actions?.length && projects?.length > 0 && actions?.length > 0 &&*/

        <>
            {!loading && projects && actions ?
                <div style={{width: '100%'}}>
                    <UserProfileCard projects={projects} actions={actions} changeCount={changeCount}/>
                </div>
                :
                <div style={{marginLeft: '100px', marginTop: '50px'}}>
                    <CircularProgress size={50}/>
                </div>
            }
        </>

        }
        
        </div>
  )
}

export default MyActions