import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import styles from './styles';
import { Link } from 'react-router-dom';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Box } from '@material-ui/core/';
import TicketTable from '../TicketTable/TicketTable';
import UserTable from '../UserTable/UserTable';
import { useNavigate } from "react-router-dom";

import url from '../../defs';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import useStyles from './styles';


/*

    manage state for project details page

*/



const ProjectDetailsCard = ({project, changeCount, user}) => {

    const [tickets, setTickets] = useState([]);

    const [history, setHistory] = useState([]);

    const [projectUsers, setProjectUsers] = useState([]);


    const makeAPICallGetHistory = async (route) => {

    
        fetch(url + route, {
            method: 'GET'
        }) 
        .then(response => response.json())
        .then(postsFromServer => {
            // keep an eye of this
            setHistory(postsFromServer.sort(function(a,b){
                // Turn your strings into dates, and then subtract them
                // to get a value that is either negative, positive, or zero.
                return new Date(b.date) - new Date(a.date);
              }));
        });
    }

    useEffect( () => {
        
        if (user){
            makeAPICallGetHistory('get-actions-by-project-id/' + project.projectId + '/' + user.userId)
        }
    }, [user]);
    

    let navigate = useNavigate(); 
    const routeChange = () =>{ 
        let path = `/addTicket`; 


        if (history.length > 0){
            var newTicketNumber = Math.max(...history.map(o => o.ticketNumber)) + 1;
            navigate(path, {state:{'project': project, devList: devList, changeCount: changeCount, ticketNumber: newTicketNumber}});
        }
        else {
            var newTicketNumber = 1;
            navigate(path, {state:{'project': project, devList: devList, changeCount: changeCount, ticketNumber: newTicketNumber}});
        }

    }

    /*
    const routeChangeUser = () =>{ 
        let path = `/addProjectUser`; 
        navigate(path, {state:{'project': project, devList: devList, changeCount: changeCount}});
    }

    const routeChangeUserRemove = () =>{ 
        let path = `/removeProjectUser`; 
        navigate(path, {state:{'project': project, devList: devList, changeCount: changeCount}});
    }
    */

    const routeChangeUsers = () =>{ 
        let path = `/manageUsers`; 
        navigate(path, {state:{projectUsers: projectUsers, 'project': project, devList: devList, changeCount: changeCount}});
    }

    const routeChangeUpdate = () =>{ 
        let path = `/editProject`; 
        navigate(path, {state:{'project': project, devList: devList, changeCount: changeCount}});
    }

    const routeChangeHistory = () =>{ 
        let path = `/projectHistory`; 
        navigate(path, {state:{'project': project, tickets: tickets, history: history, changeCount: changeCount}});
    }




    const ref = useRef(null);





    const classes = useStyles();

    const proj = project;


    

    const routeChangeDelete = () =>{ 
        let path = `/projects`; 
        navigate(path, {state:{changeCount: changeCount}});
    }


    const makeAPICallDelete = async (route) => {


        fetch(url + route, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            //body: JSON.stringify(post)
        })

        .then(response => response.json())
        .then(response => {
        });
    }

    const [open, setOpen] = useState(false);


    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };
    


    const handleDelete = () => {
        setOpen(false);
        changeCount++;
        makeAPICallDelete('delete-project-by-id/' + proj.projectId)
        routeChangeDelete();
    }


    
    
    const makeAPICallProjects = async (route) => {

    
        fetch(url + route, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(postsFromServer => {
            // keep an eye of this
            const formatTickets = postsFromServer.map((obj, index) => ({ ...obj, index }));
            setTickets(formatTickets);
 
            
        });
    }

    const makeAPICallUsers = async (route) => {

    
        fetch(url + route, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(postsFromServer => {
            setProjectUsers(postsFromServer);
        });
    }

    
    useEffect( () => {
        if (user){
        makeAPICallProjects('get-posts-by-project/' + proj.projectId + '/' + user.userId)
        makeAPICallUsers('get-users-by-project-id/' + proj.projectId)
        
        }
        
    }, [changeCount, user]);


    var devList = projectUsers.map((user) => [user.userId, user.email, user.username, user.username + ", " + user.email]);

    
    
    


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
                    Delete Project
                </Button>

                {((user.userId == 1 || user.userId == 2) && (project.projectId == 1 || project.projectId == 2)) ?
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

                :
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
                        {"Delete Project Confirmation"}
                        </DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description" >
                            Delete {proj.projectName}?
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleDelete} autoFocus>
                            Delete
                        </Button>
                        </DialogActions>
                    </Dialog>
                }



                </div>
              );
          } 


  return (

    <div >

        
            <Button color="black" size="large" variant="outlined"
                style={{
                    marginTop: '0px',
                    marginLeft: '20px',
                    marginBottom: '20px',
                    fontWeight: 'bold',
                    fontSize: 'large'
                }}

            >
            <Link to="/projects" 
                style={{ textDecoration: 'none' }}>

                Back 
              
              </Link>
            </Button>

        
        <div className={classes.projectInfo}>
            <div className="projectsTitle">Project Details</div>
        </div>

    
        <Card className={classes.headerCard} ref={ref}>
      
            <div style={{display: 'flex'}}>

                <div style={{width: '35%', display: 'block'}}>
                    <Box className={classes.title} variant="h5" gutterBottom >Title</Box>
                    <Box className={classes.subTitle} variant="h5" gutterBottom>{proj.projectName}</Box>
                </div>
            
                <div style={{width: '35%', display: 'block'}}>
                    <Box className={classes.titleRight} variant="h5" gutterBottom >Description</Box>
                    <Box className={classes.subTitleRight} variant="h5" gutterBottom>{proj.description}</Box>
                </div>

            </div>

            <div style={{ marginBottom: '20px'}}></div>
            
        </Card>




        <div style={{width: '93%', marginTop: '20px', marginBottom: '80px'}}>
        <div style={{
          display: 'flex',
          float: 'right'
        }}>
            <Button variant="outlined" style={{
                    fontWeight: 'bold',
                    fontSize: 'medium',
                    marginRight: '20px'
                }}
                onClick={routeChangeUsers}
            >
                 Manage Users
            </Button>

             <Button variant="outlined" style={{
                    fontWeight: 'bold',
                    fontSize: 'medium',
                    marginRight: '-20px'
                }}
                onClick={routeChangeHistory}
            >
                Project History
            </Button>

            {user ?
            <>
            {user.accessIdList.includes(project.projectId) ?
            <>
            <Button variant="outlined" style={{
                    fontWeight: 'bold',
                    fontSize: 'medium',
                    marginRight: '-20px',
                    marginLeft: '40px'
                }}
                onClick={routeChangeUpdate}
            >
                Update Project
            </Button>

            <DeleteDialog />
            </>
            : null}
            </>
            : null}

        </div>

        </div>

        


        <div style={{marginTop: '20px'}}></div>
        

        <div style={{width: '93%'}}>
        <div className="table-container">
            <div style={{marginLeft: '20px',
                marginBottom: '20px',
                marginRight: '20px',
                fontWeight: 'bold',
                fontSize: 'large',
                marginTop: '40px',
                marginLeft: '40px'
                }}
            >
                Project Tickets
            </div>

            <Button variant="outlined" style={{
                    fontWeight: 'bold',
                    fontSize: 'medium',
                    marginRight: '-20px'
                }}
                onClick={routeChange}
            >
                Add Ticket
            </Button>

        </div>
        </div>

       

        <div style={{marginTop: '20px', fontWeight: 'bold'}}></div>

        <TicketTable tickets={tickets} setTickets={setTickets} project={project} devList={devList} changeCount={changeCount} user={user}/>

        <div style={{marginTop: '40px'}}></div>
        
        {/*
        <div style={{width: '93%'}}>
        <div className="table-container">
            <div style={{marginLeft: '20px',
                marginBottom: '20px',
                marginRight: '20px',
                fontWeight: 'bold',
                fontSize: 'large',
                marginTop: '20px',
                marginLeft: '40px'
                }}
            >
                Project Users
            </div>

            
            
            <div>
            <Button variant="outlined" style={{
                    fontWeight: 'bold',
                    fontSize: 'medium',
                    marginRight: '20px'
                }}
                onClick={routeChangeUser}
            >
                Add User
            </Button>

            <Button variant="outlined" style={{
                    fontWeight: 'bold',
                    fontSize: 'medium',
                    marginRight: '-20px'
                }}
                onClick={routeChangeUserRemove}
            >
                Remove User
            </Button>
            </div>

        </div>
        </div>


        <UserTable users={projectUsers} project={project} changeCount={changeCount}/>
            */}

        <div style={{marginTop: '60px', fontWeight: 'bold'}}></div>

    </div>
  )
}

export default ProjectDetailsCard