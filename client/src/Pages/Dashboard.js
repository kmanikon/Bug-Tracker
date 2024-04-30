import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'; 
import {  
  Button, 
  useMediaQuery, 
  Grid
} 
from '@material-ui/core/';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';

import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, BarElement, CategoryScale, LinearScale} from 'chart.js';
import { Pie, Bar, Doughnut } from 'react-chartjs-2';

import url from '../defs';


ChartJS.register(ArcElement, Tooltip, Legend, Title, BarElement, CategoryScale, LinearScale);


const Dashboard = ({user}) => {
    const location = useLocation();


    const [prioData, setPrioData] = useState([]);
    const [typeData, setTypeData] = useState([]);
    const [statusData, setStatusData] = useState([]);
    const [projectData, setProjectData] = useState([]);
    const [projectNamesData, setProjectNamesData] = useState([]);

    const [showAssigned, setShowAssigned] = useState(true);

    const [mytickets, setMytickets] = useState([]);
    const [myprojects, setMyprojects] = useState([]);


    const makeAPICallPosts = async (route) => {

    
        fetch(url + route, {
            method: 'GET' 
        })
        .then(response => response.json())
        .then(postsFromServer => {

            //console.log(postsFromServer)

            //const assignedTickets = mytickets.filter((t) => t.asignedDevUid === user.userId);

            const highPrioTickets = postsFromServer.filter((t) => t.ticketPrio === 'High' && t.asignedDevUid === user.userId).length
            const medPrioTickets = postsFromServer.filter((t) => t.ticketPrio === 'Medium' && t.asignedDevUid === user.userId).length
            const lowPrioTickets = postsFromServer.filter((t) => t.ticketPrio === 'Low' && t.asignedDevUid === user.userId).length

   
            setPrioData([highPrioTickets, medPrioTickets, lowPrioTickets])
        
            const bugsTickets = postsFromServer.filter((t) => t.ticketType === 'Bugs/Errors' && t.asignedDevUid === user.userId).length
            const featureTickets = postsFromServer.filter((t) => t.ticketType === 'Feature Request' && t.asignedDevUid === user.userId).length
            const taskTickets = postsFromServer.filter((t) => t.ticketType === 'Task' && t.asignedDevUid === user.userId).length
            const otherTickets = postsFromServer.filter((t) => t.ticketType === 'Other' && t.asignedDevUid === user.userId).length

            setTypeData([bugsTickets, featureTickets, taskTickets, otherTickets])
   


            const pendingTickets = postsFromServer.filter((t) => t.ticketStatus === 'pending' && t.asignedDevUid === user.userId).length
            const closedTickets = postsFromServer.filter((t) => t.ticketStatus === 'closed' && t.asignedDevUid === user.userId).length

            setStatusData([pendingTickets, closedTickets]);

            setMytickets(postsFromServer);


            fetch(url + 'get-projects-by-user-id/' + user.userId, {
                method: 'GET'
            })
            .then(response => response.json())
            .then(projects => {
                const projectNames = projects.map((p) => p.projectName)
                const projectIds = projects.map((p) => p.projectId)
                //console.log(projectNames)
                setMyprojects(projectIds);


                setProjectNamesData(projectNames);


                const ProjectTicketCounts = projectIds.map((p) => postsFromServer.filter((t) => t.projectId === p && t.asignedDevUid === user.userId).length)
                setProjectData(ProjectTicketCounts);
            });
        });
    }

    
    useEffect( () => {
        if (user){
            makeAPICallPosts('get-posts-by-user/' + user.userId);
        }
    }, [user]);


    const handleShowSubmitted = () => {
        setShowAssigned(false);

        const submittedTickets = mytickets.filter((t) => t.submitterUid === user.userId);

        const highPrioTickets = submittedTickets.filter((t) => t.ticketPrio === 'High').length
        const medPrioTickets = submittedTickets.filter((t) => t.ticketPrio === 'Medium').length
        const lowPrioTickets = submittedTickets.filter((t) => t.ticketPrio === 'Low').length


        setPrioData([highPrioTickets, medPrioTickets, lowPrioTickets])

        
        const bugsTickets = submittedTickets.filter((t) => t.ticketType === 'Bugs/Errors').length
        const featureTickets = submittedTickets.filter((t) => t.ticketType === 'Feature Request').length
        const taskTickets = submittedTickets.filter((t) => t.ticketType === 'Task').length
        const otherTickets = submittedTickets.filter((t) => t.ticketType === 'Other').length

        setTypeData([bugsTickets, featureTickets, taskTickets, otherTickets])

        

        const pendingTickets = submittedTickets.filter((t) => t.ticketStatus === 'pending').length
        const closedTickets = submittedTickets.filter((t) => t.ticketStatus === 'closed').length

        setStatusData([pendingTickets, closedTickets]);      
        
        const ProjectTicketCounts = myprojects.map((p) => submittedTickets.filter((t) => t.projectId === p).length)
        setProjectData(ProjectTicketCounts);
    }

    const handleShowAssigned = () => {


        setShowAssigned(true);

        const assignedTickets = mytickets.filter((t) => t.asignedDevUid === user.userId);

        const highPrioTickets = assignedTickets.filter((t) => t.ticketPrio === 'High').length
        const medPrioTickets = assignedTickets.filter((t) => t.ticketPrio === 'Medium').length
        const lowPrioTickets = assignedTickets.filter((t) => t.ticketPrio === 'Low').length


        setPrioData([highPrioTickets, medPrioTickets, lowPrioTickets])

        
        const bugsTickets = assignedTickets.filter((t) => t.ticketType === 'Bugs/Errors').length
        const featureTickets = assignedTickets.filter((t) => t.ticketType === 'Feature Request').length
        const taskTickets = assignedTickets.filter((t) => t.ticketType === 'Task').length
        const otherTickets = assignedTickets.filter((t) => t.ticketType === 'Other').length

        setTypeData([bugsTickets, featureTickets, taskTickets, otherTickets])

        

        const pendingTickets = assignedTickets.filter((t) => t.ticketStatus === 'pending').length
        const closedTickets = assignedTickets.filter((t) => t.ticketStatus === 'closed').length

        setStatusData([pendingTickets, closedTickets]);      
        
        const ProjectTicketCounts = myprojects.map((p) => assignedTickets.filter((t) => t.projectId === p).length)
        setProjectData(ProjectTicketCounts);

      }


    const TicketsByPriodata = {
        labels: ['High', 'Medium', 'Low'],
        datasets: [
          {
            label: ' tickets',
            data: prioData,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 3
          },
        ],
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Custom Chart Title',
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                }
            }
        }
        
      };



      const TicketsByTypedata = {
        labels: ['Bugs', 'Feature Request', 'Task', 'Other'],
        datasets: [
          {
            label: ' tickets',
            data: typeData,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 3
          },
        ],
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Custom Chart Title',
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                }
            }
        }
        
      };


      const TicketsByStatusdata = {
        labels: ['Pending', 'Closed'],
        datasets: [
          {
            label: ' tickets',
            data: statusData,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 3
          },
        ],
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Custom Chart Title',
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                }
            }
        }
        
      };


    //const labels = Utils.months({count: 7});
    const TicketsByProjectdata = {
        labels: projectNamesData,
        datasets: [{
            label: ' tickets',
            data: projectData,
            backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
            ],
            borderWidth: 3
        }]
    };

    
      


    const graphHeight = '240px';
    const graphMargin = '20px';

    const xs = 8;
    const md = 6;


    const isSmallScreen = useMediaQuery('(max-width: 959px)');

    const isMobile = useMediaQuery('(max-width: 820px)');



    const ToggleButons = () => {
        return (
            <ToggleButtonGroup
                value={showAssigned}
                exclusive
                aria-label="text alignment"
                style={{
                    //marginRight: '80px',
                    fontWeight: 'bold',
                    fontSize: 'large',
                    height: '50px'
                }}
            >
                <ToggleButton 
                    variant="outlined"
                    size="large"
                    value={false}
                    disableRipple
                    style={{
                        fontWeight: 'bold',
                        fontSize: 'large',
                        height: '50px',
                        color: 'black'
                    }}
                    onClick={handleShowSubmitted}
                >
                     { isMobile ? 'Submitted' : 'Submitted Tickets'}
                </ToggleButton>

                <ToggleButton 
                    variant="outlined"
                    size="large"
                    value={true}
                    disableRipple
                    style={{
                        fontWeight: 'bold',
                        fontSize: 'large',
                        height: '50px',
                        color: 'black'
                    }}
                    onClick={handleShowAssigned}
                >
                     { isMobile ? 'Assigned' : 'Assigned Tickets'}
                </ToggleButton>

            </ToggleButtonGroup>
        );
    }

    
    return (
      <div style={{ height: 'calc(100vh - 200px)' }}>

      <div style={{marginTop: '100px'}}></div>

        <div style={{display: isMobile ? 'block' : 'flex', justifyContent: 'space-between' }}>
            < Button color="black" size="large" variant="outlined"
                style={{
                    //marginTop: '10px',
                    marginLeft: '40px',
                    //marginBottom: '0px',
                    fontWeight: 'bold',
                    fontSize: 'large',
                    height: '50px'

                }}

            >
            <Link to="/profile" 
                style={{ textDecoration: 'none' }}>

                Back 
              
              </Link>
            </Button>

            <div style={{marginLeft: isMobile ? '0px' : 0, marginTop: isMobile ? '20px' : 0, width: !isMobile ? 'calc(100vw - 370px)' : 'calc(100vw + 0px)', textAlign: isMobile ? 'center' : 'right', marginRight: isMobile ? '0px' : '80px'}}>
                <ToggleButons/>
            </div>

            {/*
            <ToggleButtonGroup
                value={showAssigned}
                exclusive
                aria-label="text alignment"
                style={{
                    marginRight: '80px',
                    fontWeight: 'bold',
                    fontSize: 'large',
                    height: '50px'
                }}
            >
                <ToggleButton 
                    variant="outlined"
                    size="large"
                    value={false}
                    disableRipple
                    style={{
                        fontWeight: 'bold',
                        fontSize: 'large',
                        height: '50px',
                        color: 'black'
                    }}
                    onClick={handleShowSubmitted}
                >
                     {'Submitted Tickets'}
                </ToggleButton>

                <ToggleButton 
                    variant="outlined"
                    size="large"
                    value={true}
                    disableRipple
                    style={{
                        fontWeight: 'bold',
                        fontSize: 'large',
                        height: '50px',
                        color: 'black'
                    }}
                    onClick={handleShowAssigned}
                >
                     {'Assigned Tickets'}
                </ToggleButton>

            </ToggleButtonGroup>
            */}

        </div>

 
        <Grid container rowSpacing={1} columnSpacing={1} sapcing={0} style={{
            //marginLeft: '5%',
            //marginTop: '3%',
            //height: '75%',
            //width: '100vw',
            //marginRight: '5%',
            //marginLeft: '0px',
            //marginLeft: '-20px',
            width: 'calc(100% - 40px)',
            justifyContent: 'center',
            margin: '20px'
          }}
        >


        <Grid item xs={xs} md={md} style={{ borderRight: !isSmallScreen ? "1px solid black" : "0px solid black", borderBottom: "1px solid black" }}>

            <div style={{ minWidth: '200px', maxHeight: '100%', marginTop: '2%', display: 'flex', justifyContent: 'center', height: graphHeight, marginBottom: graphMargin}}>
                <Pie 
                    data={TicketsByPriodata} 
                    options={{
                        plugins: {
                            title: {
                                display: true,
                                text: "Tickets by Priority",
                                align: "center",
                                padding: {
                                    top: 10,
                                    bottom: 15,
                                },
                            
                                font: {
                                    size: 20,

                                },
                                color: 'black',
                                
                            },
                            legend: {
                                display: true,
                                position: "top",
                            },
                            scales: {
                                y: {
                                    beginAtZero: true,
                                },
                            },
                            
                        },
                    }}
                />
            </div>
        </Grid>


        <Grid item xs={xs} md={md} style={{ borderBottom: "1px solid black"}}>
        <div style={{ minWidth: '200px', maxHeight: '100%', marginTop: isMobile ? '4%' : '2%', display: 'flex', justifyContent: 'center', height: graphHeight, marginBottom: graphMargin}}>
                <Doughnut 
                    data={TicketsByTypedata} 
                    options={{
                        plugins: {
                            title: {
                                display: true,
                                text: "Tickets by Type",
                                align: "center",
                                padding: {
                                    top: 10,
                                    bottom: 15,
                                },
                            
                                font: {
                                    size: 20,

                                },
                                color: 'black',
                                
                            },
                            legend: {
                                display: true,
                                position: "top",
                            },
                            scales: {
                                y: {
                                    beginAtZero: true,
                                },
                            },
                            
                        },
                    }}
                />
            </div>
        </Grid>
        <Grid item xs={xs} md={md} style={{ borderRight: !isSmallScreen ? "1px solid black" : "0px solid black" }}>
        <div style={{ minWidth: '200px', maxHeight: '100%', marginTop: '4%', marginLeft: '10%', marginRight: '10%', paddingBottom: 0, display: 'flex', justifyContent: 'center', height: graphHeight, marginBottom: graphMargin}}>
            <Bar
                data={TicketsByProjectdata}
                height={240}
                //width={300}
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: "Tickets by Project",
                            align: "center",
                            padding: {
                                top: 10,
                                bottom: 25,
                            },
                        
                            font: {
                                size: 20,

                            },
                            color: 'black',
                     
                            
                        },
                        legend: {
                            display: false,
                            position: "top",

                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                
                            },
       
                        },
                        
                    },
                    maintainAspectRatio: false
                }}
            />
            </div>
        </Grid>



        <Grid item xs={xs} md={md} style={{borderTop: isSmallScreen ? "1px solid black" : "0px solid black",}}>
        <div style={{ minWidth: '200px', maxHeight: '100%', marginTop: '4%', display: 'flex', justifyContent: 'center', height: graphHeight, marginBottom: graphMargin}}>
                <Pie 
                    data={TicketsByStatusdata} 
                    options={{
                        plugins: {
                            title: {
                                display: true,
                                text: "Tickets by Status",
                                align: "center",
                                padding: {
                                    top: 10,
                                    bottom: 15,
                                },
                            
                                font: {
                                    size: 20,

                                },
                                color: 'black',
                                
                            },
                            legend: {
                                display: true,
                                position: "top",
                            },
                            scales: {
                                y: {
                                    beginAtZero: true,
                                },
                            },
                            
                        },
                        maintainAspectRatio: false
                    }}
                />
            </div>
        </Grid>
        
      </Grid>
      

      </div>
    )
}

export default Dashboard