import React, { useState, useRef, useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import TopNavBar from '../Components/TopNavBar/TopNavBar'
import { Card, TextField, CardActions, CardContent, CardMedia, Button, Typography, Box, Select, MenuItem } from '@material-ui/core/';
import { RightOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import useStyles from '../Components/TicketDetailsCard/styles';
import { Link } from 'react-router-dom';

import url from '../defs';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


/*
    form to remove a project user

*/



const RemoveProjectUser = () => {

    const location = useLocation();
    var { project, devList, changeCount } = location.state;

    const classes = useStyles();
    const ref = useRef(null);


    //const [userName, setUserName] = useState('');
    //const [email, setEmail] = useState('');

    const [queryUser, setQueryUser] = useState();

    const [userFound, setUserFound] = useState(1);
    const [userOnProject, setUserOnProject] = useState(0);


    const [asignedDev, setAsignedDev] = useState(0);


    let navigate = useNavigate(); 
    const routeChange = () =>{ 
        changeCount++;
        //let path = `/projectDetails`; 
        //navigate(path, {state:{'project': project, changeCount: changeCount}});
        let path = '/manageUsers';
        navigate(path, {state:{ project: project, devList: devList, changeCount: changeCount }});
    }

    const makeAPICallRemoveUser = async (route) => {


        fetch(url + route, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })

        .then(response => response.json())
        .then(response => {
            project = response;
            routeChange();
            window.location.reload(false);
        });

    }

    const makeAPICallGetUser = async (route) => {

    
        fetch(url + route, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(postsFromServer => {
            setQueryUser(postsFromServer);
            setUserFound(1);
            setUserOnProject(0);
            
            if (!project.userIdList.includes(postsFromServer.userId)){
                setUserOnProject(1);
                return;
            }
            
            if ((postsFromServer.userId == 1 || postsFromServer.userId == 2) && (project.projectId == 1 || project.projectId == 2)){
                handleClickOpen();
            }
            else {
                makeAPICallRemoveUser('remove-user-from-project/' + postsFromServer.userId);
            }
        })
        .catch((error) => {
            setUserFound(0);
            setUserOnProject(0);
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

        const userName = devList[asignedDev][2];
        const email = devList[asignedDev][1];


        makeAPICallGetUser('get-user-by-name/' + email + "/" + userName);

    
    }

    return (
        <div>


            <div style={{ width: '100%', marginLeft: '20px', maxWidth: '800px'}}>
            <div>
                
                <div style={{marginTop: '110px'}}></div>

                <Button color="black" size="large" variant="outlined"
                    style={{
                        marginTop: '10px',
                        marginLeft: '20px',
                        fontWeight: 'bold',
                        fontSize: 'large',
                        marginBottom: '20px'
                    }}
 
                >
                <Link to="/manageUsers" 
                    state={{ project: project, devList: devList, changeCount: changeCount }} 
                    style={{ textDecoration: 'none' }}>

                    Back 
                
                </Link>
                </Button>

                
                <div className={classes.projectInfo}>
                    <div className="projectsTitle">Remove User</div>
                </div>


                <Card className={classes.headerCard} ref={ref}>
    
                <div style={{display: 'flex'}}>

                    <div style={{width: '35%', display: 'block'}}>

                        {/*}
                        <Box className={classes.title} variant="h5" gutterBottom >Username</Box>
                        <TextField id="outlined-basic" variant="outlined" 
                            style={{ width: '240px', marginLeft: '20px', marginTop: '10px'}}
                            size="small"
                            value={userName} 
                            onChange={(e) => setUserName(e.target.value)}
                        />


                    </div>
                
                    <div style={{width: '35%', display: 'block'}}>
                        <Box className={classes.title} variant="h5" gutterBottom >Email</Box>
                        <TextField id="outlined-basic" variant="outlined" 
                            style={{ width: '240px', marginLeft: '20px', marginTop: '10px'}}
                            size="small"
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                        />
    */}

                        <div style={{ display: 'flex', }}>

                        <Select style={{ marginTop: 10, marginLeft: 20, maxWidth: '350px', minWidth: '350px' }}
                            value={asignedDev}
                            onChange={(e) => setAsignedDev(e.target.value)}
                        >
                            {devList.map(({ name }, index) => (
                            <MenuItem key={index} value={index}>
                                {devList[index][3]}
                            </MenuItem>
                            ))}
                        
                        </Select>

                        

                        <Button color="black" size="large" 
                            style={{
                                marginTop: '10px',
                                marginLeft: '100px',
                                fontWeight: 'bold',
                                fontSize: 'large',
                                minWidth: '200px',
                                maxWidth: '200px',

                                //position: 'fixed',
      
                            }}
                            onClick={handleSubmit}
                        >
                            
                            Submit
                            <RightOutlined size="large" style={{marginLeft: '10px'}}/>
                 
                        </Button>
                        
                        </div>

                        
                    </div>

                </div>

                <div style={{ marginBottom: '20px'}}></div>
                
            </Card>


            {userFound === 0 ? 
            
                <Typography className={classes.title} 
                    style={{
                        //fontWeight: 'bold',
                        marginLeft: '20px'
                    }}>User Not Found</Typography>
            :
                null
            }

            {userOnProject === 1 ? 
            
            <Typography className={classes.title} 
                style={{
                    //fontWeight: 'bold',
                    marginLeft: '20px'
                }}>User not in Project</Typography>
        :
            null
        }
                
                <div style={{
                    display: 'flex',


                    }}>
            
 
                

                

                <RestrictDemoDialog/>

                </div>

            </div>

            </div>


        </div>
    )
}

export default RemoveProjectUser