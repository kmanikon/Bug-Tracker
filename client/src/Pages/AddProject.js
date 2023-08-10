import React, { useState, useRef, useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import TopNavBar from '../Components/TopNavBar/TopNavBar'
import { Card, TextField, CardActions, CardContent, CardMedia, Button, Typography, Box, Select, MenuItem } from '@material-ui/core/';
import { RightOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import useStyles from '../Components/TicketDetailsCard/styles';
import { Link } from 'react-router-dom';

import url from '../defs';


/*

    form to add a new project

*/



// this is passed in from project Details page



const ticketTypes = [
    'Bugs/Errors',
    'Feature Request',
    'Task',
    'Other'
]

const prioList = [
    'High',
    'Medium',
    'Low'
]



const AddProject = ({user}) => {


    const location = useLocation();
    //var { changeCount } = location.state;
    var changeCount = 0;



    //const ticketId = 14;
    //const projectId = project.projectId;
    const ticketStatus = 'pending';

    const classes = useStyles();
    const ref = useRef(null);


    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
 
    const [asignedDev, setAsignedDev] = useState(0);
    const [submitter, setSubmitter] = useState(0);

    const [type, setType] = useState(0);

    const [prio, setPrio] = useState(0);


    let navigate = useNavigate(); 
    const routeChange = () =>{ 
        changeCount++;
        let path = `/projects`; 
        navigate(path, {state:{changeCount: changeCount}});
    }

    const makeAPICallChangeAccess = async (route, project) => {


        fetch(url + route, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })

        .then(response => response.json())
        .then(response => {

            var accessIds = user.accessIdList;
            accessIds.push(parseInt(project))
            user.accessIdList = accessIds;
            localStorage.setItem( 'currentUser', JSON.stringify(user) );
            window.location.reload(false);
        });

    }

    const makeAPICallAdd = async (route, post) => {


        fetch(url + route, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        })

        .then(response => response.json())
        .then(response => {
            makeAPICallChangeAccess('grantManagerAccess/' + user.userId + '/' + response, response)
            /*
            fetch(url + "/add-user-to-project/" + user.userId, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(post)
            })
            */
            //window.location.reload(false);
           
        });
    }

    const handleSubmit = () => {

        const post = {
            'projectId': 0,
            'projectName': title,
            'description': description,
            'uidString': user.userId.toString()
        }

        makeAPICallAdd('create-project', post)
        routeChange();
    }


    return (
        <div>

        <div style={{ marginLeft: '20px' }}>
        <div>
            
            <div style={{marginTop: '110px'}}></div>
            
            <div className={classes.projectInfo}>
                <div className="projectsTitle">Add Project</div>
            </div>


            <Card className={classes.headerCard} ref={ref}>
    
                <div style={{display: 'flex' }}>

                    <div style={{width: '35%', display: 'block'}}>
                        <Box className={classes.title} variant="h5" gutterBottom >Title</Box>
                        <TextField id="outlined-basic" variant="outlined" 
                            style={{ width: '240px', marginLeft: '20px', marginTop: '10px'}}
                            size="small"
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)}
                        />


                        <div style={{ marginTop: '10px'}}></div>


                        <div style={{ marginTop: '20px'}}></div>

                        <Box className={classes.title} variant="h5" gutterBottom >Description</Box>
                        <TextField id="outlined-basic" variant="outlined" multiline="true"
                            style={{ width: '200%', marginLeft: '20px', marginTop: '10px', minWidth: '500px'}}
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                
                    <div style={{width: '35%', display: 'block'}}>
                        

                        
                    </div>

                </div>

                <div style={{ marginBottom: '20px'}}></div>
                
            </Card>
            

            <div style={{
                display: 'flex'


                }}>
            
 
            <Button color="black" size="large" 
                style={{
                    marginTop: '10px',
                    marginLeft: '30px',
                    fontWeight: 'bold',
                    fontSize: 'large'
                }}

            >
            <Link to="/projects" 
                //state={{ project: project, devList: devList, changeCount: changeCount }} 
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

            </div>

        </div>

        </div>

        </div>
    )
}

export default AddProject