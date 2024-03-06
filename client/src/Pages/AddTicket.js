import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom';
import TopNavBar from '../Components/TopNavBar/TopNavBar'
import { Card, TextField, CardActions, CardContent, CardMedia, Button, Typography, Box, Select, MenuItem } from '@material-ui/core/';
import { RightOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import url from '../defs';
import useStyles from '../Components/TicketDetailsCard/styles';


/*

    form to add a new ticket to a project

*/


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





const AddTicket = ({user, ticketChangeCount, setTicketChangeCount}) => {


    const location = useLocation();
    var { project, devList, changeCount, ticketNumber } = location.state;

    //const ticketId = 14;
    const projectId = project.projectId;
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
        let path = `/projectDetails`; 
        navigate(path, {state:{'project': project, changeCount: changeCount}});
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
            setTicketChangeCount(changeCount + 1);
        });
    }

    const handleSubmit = () => {

        const post = {

            "actionId": 0, // doesn't matter
            "date": "2023-05-15T07:41:51.053Z", // doesn't matter
            "actionString": "Created Ticket",
            "userName": user.username,
            "userEmail": user.email,
            "userId": user.userId,
            "postId": 0, // doesn't matter
            "title": title,
            "projectId": projectId,
            "description": description,
            "asignedDev": devList[asignedDev][2],
            "asignedDevEmail": devList[asignedDev][1],
            "asignedDevUid": devList[asignedDev][0],
            "submitter": user.username,
            "submitterEmail": user.email,
            "submitterUid": user.userId,
            //devList[submitter][2],
            //"submitterEmail": devList[submitter][1],
            //"submitterUid": devList[submitter][0],
            
            "ticketPrio": prioList[prio],
            "ticketStatus": ticketStatus,
            "ticketType": ticketTypes[type],
            "ticketNumber": ticketNumber,

            "submitDate": new Date,//"2023-05-15T07:41:51.053Z", // doesn't matter
            "modifyDate": new Date,//"2023-05-15T07:41:51.053Z", // doesn't matter
            "readString": "0F"
            
        }


        makeAPICallAdd('create-post', post)
        routeChange();
    }


    return (
        <div>

        <div style={{ marginLeft: '20px', maxWidth: '950px', marginRight: '20px'}}>
        <div>
            
            <div style={{marginTop: '110px'}}></div>
            
            <div className={classes.projectInfo}>
                <div className="projectsTitle">Add Ticket</div>
            </div>


            <Card className={classes.headerCard} ref={ref}>
    
                <div style={{display: 'flex', minWidth: '800px'}}>

                    <div style={{width: '35%', display: 'block'}}>
                        <Box className={classes.title} variant="h5" gutterBottom >Title</Box>
                        <TextField id="outlined-basic" variant="outlined" 
                            style={{ width: '240px', marginLeft: '20px', marginTop: '10px'}}
                            size="small"
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)}
                        />


                        <div style={{ marginTop: '10px'}}></div>

                        <Box className={classes.title} variant="h5" gutterBottom >Assigned Developer</Box>
                        <Select style={{ marginTop: 10, marginLeft: 20 }}
                            value={asignedDev}
                            onChange={(e) => setAsignedDev(e.target.value)}
                        >
                            {devList.map(({ name }, index) => (
                            <MenuItem key={index} value={index}>
                                {devList[index][3]}
                            </MenuItem>
                            ))}
                        
                        </Select>


          
                        

                        <div style={{ marginTop: '20px'}}></div>

                        <Box className={classes.title} variant="h5" gutterBottom >Description</Box>
                        <TextField id="outlined-basic" variant="outlined" multiline="true"
                            style={{ width: '200%', marginLeft: '20px', marginTop: '10px'}}
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                
                    <div style={{width: '35%', display: 'block'}}>
                        <Box className={classes.titleRight} variant="h5" gutterBottom >Ticket Type</Box>
                        <Box className={classes.subTitleRight} variant="h5" gutterBottom>
                            <Select style={{ marginTop: 0, marginLeft: 0 }}
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            >
                                {ticketTypes.map(({ name }, index) => (
                                <MenuItem key={index} value={index}>
                                    {ticketTypes[index]}
                                </MenuItem>
                                ))}
                            
                            </Select>

                        </Box>
                    
                        <div style={{ marginTop: '20px'}}></div>

                        <Box className={classes.titleRight} variant="h5" gutterBottom >Ticket Priority</Box>
                        <Box className={classes.subTitleRight} variant="h5" gutterBottom>
                            <Select style={{ marginTop: 0, marginLeft: 0 }}
                                value={prio}
                                onChange={(e) => setPrio(e.target.value)}
                            >
                                {prioList.map(({ name }, index) => (
                                <MenuItem key={index} value={index}>
                                    {prioList[index]}
                                </MenuItem>
                                ))}
                            
                            </Select>
                            
                        </Box>


                        
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
                    fontSize: 'large',
                    transition: 'none'
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
                    fontSize: 'large',
                    transition: 'none'
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

export default AddTicket