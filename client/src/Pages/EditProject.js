import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'; 
import TopNavBar from '../Components/TopNavBar/TopNavBar'
import { Card, TextField, CardActions, CardContent, CardMedia, Button, Typography, Box, Select, MenuItem, useForkRef } from '@material-ui/core/';
import { RightOutlined, UserAddOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import useStyles from '../Components/TicketDetailsCard/styles';

import url from '../defs';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


/*

    form for editing a project

*/


const EditProject = ({user}) => {

    const classes = useStyles();
    const ref = useRef(null);


    const location = useLocation();
    var { project, devList, changeCount } = location.state;

    const [title, setTitle] = useState(project.projectName);
    const [description, setDescription] = useState(project.description);
 
    const updatedProject = {
        'projectId': project.projectId,
        'projectName': title,
        'description': description,
    }


    let navigate = useNavigate(); 
    const routeChange = () =>{ 
        changeCount++;
        let path = `/projects`; 
        navigate(path, {state:{'project': updatedProject, changeCount: changeCount}});
    }

    const makeAPICallEdit = async (route, post) => {


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


    const RestrictDemoDialog = () => {
        return (
            <div>
              
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
                  {"Demo Access Restrictions"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description" >
                    Sorry! As a demo user, you are not permitted to perform this action.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Close</Button>
                </DialogActions>
              </Dialog>
            </div>
          );
      } 

    const handleSubmit = () => {

        const post = {
            'projectId': project.projectId,
            'projectName': title,
            'description': description,
            'uidString': project.uidString
        }


        if ((user.userId == 1 || user.userId == 2) && (project.projectId == 1 || project.projectId == 2)){
            handleClickOpen();
        }
        else {
            makeAPICallEdit('update-project', post)
            routeChange();
        }

        
    }


    return (
        <div>

        <div style={{ marginLeft: '20px'}}>
        <div>
            
            <div style={{marginTop: '110px'}}></div>
            
            <div className={classes.projectInfo}>
                <div className="projectsTitle">Update {project.projectName}</div>
            </div>


            <Card className={classes.headerCard} ref={ref}>
    
                <div style={{display: 'flex'}}>

                    <div style={{width: '35%', display: 'block'}}>
                        <Box className={classes.title} variant="h5" gutterBottom >Title</Box>
                        <TextField id="outlined-basic" variant="outlined" 
                            style={{ width: '240px', marginLeft: '20px', marginTop: '10px'}}
                            size="small"
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)}
                            
                        />

                        <div style={{ marginTop: '20px'}}></div>

                        <Box className={classes.title} variant="h5" gutterBottom >Description</Box>
                        <TextField id="outlined-basic" variant="outlined" multiline="true"
                            style={{ width: '200%', marginLeft: '20px', marginTop: '10px', minWidth: '500px'}}
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                
                    

                </div>

                <div style={{ marginBottom: '20px'}}></div>
                
            </Card>


            <div style={{
                display: 'flex',


                }}>

            <Button color="black" size="large" 
                style={{
                    marginTop: '10px',
                    marginLeft: '30px',
                    fontWeight: 'bold',
                    fontSize: 'large'
                }}

            >
            <Link to="/projectDetails" 
                state={{ project: project, devList: devList, changeCount: changeCount }} 
                style={{ textDecoration: 'none' }}>

                Back 
              
              </Link>
            </Button>
            

            <Button color="black" size="large" 
                style={{
                    marginTop: '10px',
                    marginLeft: '30px',
                    fontWeight: 'bold',
                    fontSize: 'large'
                }}
                onClick={handleSubmit}
            >
                
                Submit
                <RightOutlined size="large" style={{marginLeft: '10px'}}/>
            </Button>

            <RestrictDemoDialog/>

            </div>

        </div>

        </div>

        </div>
    )
}

export default EditProject