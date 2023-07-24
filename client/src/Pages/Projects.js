import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { CardActions, CardContent, CardMedia, Button, Typography, Box } from '@material-ui/core/';
import TopNavBar from '../Components/TopNavBar/TopNavBar'
import ProjectCard from '../Components/Card/ProjectCard';

import { useNavigate } from "react-router-dom";

import { 
    ContainerOutlined,
    InfoCircleOutlined,
    FolderOpenOutlined
   
  } 
  from '@ant-design/icons';

import url from '../defs';


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

/*

  Project select from 'my Projects'

*/



const Projects = ({ user, setUser }) => {

    const location = useLocation();
    var { innerWidth: width, innerHeight: height } = window;
    width -= 200

    //var [changeCount, setChangeCount] = useState(0);
    var changeCount = 0;

    const [projects, setProjects] = useState([]);

    let navigate = useNavigate(); 
    const routeChange = () => { 
        let path = `/addProject`; 
        navigate(path, {state:{changeCount: changeCount}});
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

    
    useEffect( () => {

        if (user){
            makeAPICallProjects('get-projects-by-user-id/' + user.userId);
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
                  {"My Projects"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description" >
                  The "My Projects" section provides users with an overview of the projects they are involved in. It displays a list of projects assigned to the user, allowing them to access project details, assign tickets, and manage users.
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
        <div>
            
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
                My Projects
                <FolderOpenOutlined style={{ fontSize: '200%', marginLeft: '20px'}}/>
                
            </div>

            <div style={{display: 'flex', alignItems: 'right'}}>
            <InfoDialog/>
            <Button variant="outlined" style={{
                    fontWeight: 'bold',
                    fontSize: 'medium',
                    marginRight: '0px',
                    marginTop: '20px'
                }}
                onClick={routeChange}
            >

                Add Project
                
            </Button>
            </div>

        </div>
        </div>
        
            <ProjectCard projects={projects} changeCount={changeCount} />
  
        
        </div>
    )
}

export default Projects