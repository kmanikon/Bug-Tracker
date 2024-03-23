import React, { useState, useRef, useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Card, Button, Typography, Box, Select, MenuItem, Grid, useMediaQuery } from '@material-ui/core/';
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

    form to change user role

*/

const roleList = [
    'Developer',
    'Project Manager',
]

const EditUserRole = ({userChangeCount, setUserChangeCount}) => {

    const location = useLocation();
    var { project, devList, changeCount } = location.state;

    const classes = useStyles();
    const ref = useRef(null);


    //const [userName, setUserName] = useState('');
    //const [email, setEmail] = useState('');

    const [queryUser, setQueryUser] = useState();

    const [userFound, setUserFound] = useState(1);
    const [userOnProject, setUserOnProject] = useState(0);

    const [role, setRole] = useState(0);

    const [asignedDev, setAsignedDev] = useState(0);


    let navigate = useNavigate(); 
    const routeChange = () =>{ 
        changeCount++;
        //let path = `/projectDetails`; 
        //navigate(path, {state:{'project': project, changeCount: changeCount}});
        let path = '/manageUsers';
        navigate(path, {state:{ project: project, devList: devList, changeCount: changeCount }});
    }

    const makeAPICallChangeAccess = async (route) => {


        fetch(url + route, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })

        .then(response => response.json())
        .then(response => {
            //project = response;
            routeChange();
            setUserChangeCount(userChangeCount + 1);
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
                if (role == 0){
                    makeAPICallChangeAccess('revokeManagerAccess/' + postsFromServer.userId + '/' + project.projectId)
                }
                else if (role == 1){
                    makeAPICallChangeAccess('grantManagerAccess/' + postsFromServer.userId + '/' + project.projectId)
                }
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

    const xs = 8;
    const sm = 8;
    const md = 6;

    const isSmallScreen = useMediaQuery('(max-width: 959px)');

    return (
        <div>


            <div style={{ marginLeft: '20px', maxWidth: '990px' }}>
            <div>
                
                <div style={{marginTop: '110px'}}></div>


                <Button color="black" size="large" variant="outlined"
                    style={{
                        //marginTop: '10px',
                        marginLeft: '20px',
                        marginBottom: '20px',
                        fontWeight: 'bold',
                        fontSize: 'large'
                    }}

                >
                <Link to="/manageUsers" 
                    state={{ project: project, devList: devList, changeCount: changeCount }} 
                    style={{ textDecoration: 'none' }}>

                    Back 
                
                </Link>
                </Button>
                
                <div style={{width: '90%'}}>
                <div className={classes.projectInfo}>
                    <div className="projectsTitle">Change User Role</div>
                </div>


                <Card className={classes.headerCard} ref={ref}>
    
                <div style={{display: 'flex'}}>

                    <div style={{display: 'block'}}>


                        <div style={{display: 'flex', marginTop: '10px', marginBottom: '10px'}}>

                        <Grid container rowSpacing={1} columnSpacing={1} spacing={3}>
                        <Grid item xs={xs} sm={sm} md={md}>
                        <div style={{display: 'block'}}>
                        <Box className={classes.title} variant="h5" gutterBottom >Developer</Box>
                        <Select style={{ marginTop: 10, marginLeft: 20, maxWidth: '100%' }}
                            value={asignedDev}
                            onChange={(e) => setAsignedDev(e.target.value)}
                        >
                            {devList.map(({ name }, index) => (
                            <MenuItem key={index} value={index}>
                                {devList[index][3]}
                            </MenuItem>
                            ))}
                        
                        </Select>
                        </div>
                        </Grid>


                        <Grid item xs={xs} sm={sm} md={md}>
                        <div style={{display: 'block', marginLeft: isSmallScreen ? '0px' : '40px', minWidth: '125px', maxWidth: '125px'}}>
                        <Box className={classes.title} variant="h5" gutterBottom >New Role</Box>
                        <Box className={classes.subTitle} variant="h5" gutterBottom>
                            <Select style={{ marginTop: 0, marginLeft: 0 }}
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                {roleList.map(({ name }, index) => (
                                <MenuItem key={index} value={index}>
                                    {roleList[index]}
                                </MenuItem>
                                ))}
                            
                            </Select>
                            
                        </Box>
                        </div>
                        </Grid>


                        <Grid item xs={xs} sm={sm} md={md}>
                        <Button color="black" size="large" 
                            style={{
                                marginTop: '20px',
                                marginLeft: '20px',
                                fontWeight: 'bold',
                                fontSize: 'large',
                                //minWidth: '200px',
                                transition: 'none'
                                //maxWidth: '125px'
                            }}
                            onClick={handleSubmit}
                        >
                            
                            Submit
                            <RightOutlined size="large" style={{marginLeft: '10px'}}/>
                        </Button>
                        </Grid>
                        </Grid>


                    </div>
                    </div>


                </div>

                <div style={{ marginBottom: '20px'}}></div>
                
            </Card>
            </div>


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

export default EditUserRole