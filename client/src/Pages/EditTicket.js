import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'; 
import TopNavBar from '../Components/TopNavBar/TopNavBar'
import { Card, TextField, CardActions, CardContent, CardMedia, Button, Typography, Box, Select, MenuItem } from '@material-ui/core/';
import { RightOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import useStyles from '../Components/TicketDetailsCard/styles';

import url from '../defs';

/*

    form for editing a ticket

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

const EditTicket = ({ user }) => {
    //const location = useLocation();
    //const { project } = location.state;
    // ticket, ticket num


    var { innerWidth: width, innerHeight: height } = window;
    width -= 200
    var descWidth = width * 0.575;

    //const ticketId = 14;
    //const projectId = 2;
    const ticketStatus = 'pending';

    const classes = useStyles();
    const ref = useRef(null);


    const location = useLocation();
    var { ticket, ticketNum, project, devList, changeCount, myTickets } = location.state;

    var showDevList = devList.map((dev) => dev[2] + ", " + dev[1]);

    //const [devList, setDevList] = useState([]);

    const [title, setTitle] = useState(ticket.title);
    const [description, setDescription] = useState(ticket.description);
 

    const [asignedDev, setAsignedDev] = useState(devList.findIndex(x => x[0] === ticket.asignedDevUid));
    const [submitter, setSubmitter] = useState(devList.findIndex(x => x[2] === ticket.submitter));
                                                                        // 0 -> submitterUid

    const [type, setType] = useState(ticketTypes.findIndex(x => x === ticket.ticketType));

    const [prio, setPrio] = useState(prioList.findIndex(x => x === ticket.ticketPrio));


    let navigate = useNavigate(); 
    const routeChange = () =>{ 
        changeCount++;
        
        if (myTickets == false){
            let path = `/projectDetails`; 
            navigate(path, {state:{'project': project, changeCount: changeCount}});
        }
        else {
            let path = `/myProjectTickets`; 
            navigate(path, {state:{'project': project, changeCount: changeCount}});
        }

        
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

    

    const handleSubmit = () => {

        

        const post = {
            "actionId": 0, // doesn't matter
            "date": "2023-05-15T07:41:51.053Z", // doesn't matter
            "actionString": "Updated Ticket",
            "userName": user.username,
            "userEmail": user.email,
            "userId": user.userId,

            "postId": ticket.postId,
            "title": title,
            "projectId": ticket.projectId,
            "description": description,
            "asignedDev": devList[asignedDev][2],
            "asignedDevEmail": devList[asignedDev][1],
            "asignedDevUid": devList[asignedDev][0],
            "submitter": ticket.submitter,
            "submitterEmail": ticket.submitterEmail,
            "submitterUid": ticket.submitterUid,
            
            "ticketPrio": prioList[prio],
            "ticketStatus": ticket.ticketStatus,
            "ticketType": ticketTypes[type],
            "ticketNumber": ticket.ticketNumber,

            "submitDate": ticket.submitDate,
            "modifyDate": ticket.modifyDate,
            "read": ticket.read
          }


        makeAPICallEdit('update-post', post)
        routeChange();
    }


    return (
        <div>

        <div style={{ width: width, marginLeft: '20px'}}>
        <div>
            
            <div style={{marginTop: '110px'}}></div>
            
            <div className={classes.projectInfo}>
                <div className="projectsTitle">Update Ticket #{ticket.ticketNumber}</div>
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
                            style={{ width: descWidth, marginLeft: '20px', marginTop: '10px'}}
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
                    fontSize: 'large'
                }}

            >
            <Link to="/ticketDetails" 
                state={{ ticket: ticket, ticketNum: ticketNum, project: project, devList: devList, changeCount: changeCount, myTickets: myTickets  }} 
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

export default EditTicket