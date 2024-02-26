import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import TopNavBar from '../Components/TopNavBar/TopNavBar'
import { Card, TextField, CardActions, CardContent, CardMedia, Button, Typography, Box, Select, MenuItem } from '@material-ui/core/';
import { RightOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import useStyles from '../Components/TicketDetailsCard/styles';
import { Link } from 'react-router-dom';

import url from '../defs';


/*

    form to add a project user

*/



const AddProjectUser = () => {

    const location = useLocation();
    var { project, devList, changeCount, projectUsers } = location.state;




    const classes = useStyles();
    const ref = useRef(null);


    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');

    const [queryUser, setQueryUser] = useState();

    const [userFound, setUserFound] = useState(1);
    const [userOnProject, setUserOnProject] = useState(0);


    let navigate = useNavigate(); 
    const routeChange = () => { 
        changeCount++;
        //let path = `/projectDetails`; 
        let path = '/manageUsers';
        navigate(path, {state:{ projectUsers: projectUsers, project: project, devList: devList, changeCount: changeCount }});
    }

    const makeAPICallAddUser = async (route) => {


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

            
            if (project.userIdList.includes(postsFromServer.userId)){
                setUserOnProject(1);
                return;
            }
            
            makeAPICallAddUser('add-user-to-project/' + postsFromServer.userId);

        })
        .catch((error) => {
            setUserFound(0);
            setUserOnProject(0);
        });
    }

    const handleSubmit = () => {


        makeAPICallGetUser('get-user-by-name/' + email + "/" + userName);

        

    }

    return (
        <div>

            <div style={{ width: '100%', marginLeft: '20px', maxWidth: '900px', marginRight: '20px'}}>
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
                    state={{ projectUsers: projectUsers, project: project, devList: devList, changeCount: changeCount }} 
                    style={{ textDecoration: 'none' }}>

                    Back 
                
                </Link>
                </Button>
                
                <div className={classes.projectInfo}>
                    <div className="projectsTitle">Add User</div>
                </div>


                <Card className={classes.headerCard} ref={ref}>
    
                <div style={{display: 'flex', minWidth: '800px'}}>

                    <div style={{width: '35%', display: 'block'}}>
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


                        
                    </div>

                    <Button color="black" size="large" 
                        style={{
                            marginTop: '30px',
                            marginLeft: '20px',
                            fontWeight: 'bold',
                            fontSize: 'large',
                            minWidth: '200px',
                            maxWidth: '200px',
                            transition: 'none'

                            //position: 'fixed',
    
                        }}
                        onClick={handleSubmit}
                    >
                        
                        Submit
                        <RightOutlined size="large" style={{marginLeft: '10px'}}/>
                
                    </Button>

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
                }}>User Already Exists</Typography>
        : 
            null
        }

           

            </div>

            </div>


        </div>
    )
}

export default AddProjectUser