import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'; 
import { 
  CardActions, 
  CardContent, 
  CardMedia,  
  Button, 
  Typography, 
  Box, 
  Grid
} 
from '@material-ui/core/';

import { 
  ContainerOutlined,
  FileSearchOutlined,
  UserOutlined,
  BellOutlined,
  FolderOpenOutlined

        
} 
from '@ant-design/icons';
 
import TopNavBar from '../Components/TopNavBar/TopNavBar'
import { useNavigate } from "react-router-dom";

import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, BarElement, CategoryScale, LinearScale} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

import url from '../defs';


ChartJS.register(ArcElement, Tooltip, Legend, Title, BarElement, CategoryScale, LinearScale);


const Dashboard = ({user}) => {
    const location = useLocation();


    const [prioData, setPrioData] = useState([]);
    const [typeData, setTypeData] = useState([]);
    const [statusData, setStatusData] = useState([]);
    const [projectData, setProjectData] = useState([]);
    const [projectNamesData, setProjectNamesData] = useState([]);


    const makeAPICallPosts = async (route) => {

    
        fetch(url + route, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(postsFromServer => {

            //console.log(postsFromServer)

            const highPrioTickets = postsFromServer.filter((t) => t.ticketPrio === 'High').length
            const medPrioTickets = postsFromServer.filter((t) => t.ticketPrio === 'Medium').length
            const lowPrioTickets = postsFromServer.filter((t) => t.ticketPrio === 'Low').length

   
            setPrioData([highPrioTickets, medPrioTickets, lowPrioTickets])
        
            const bugsTickets = postsFromServer.filter((t) => t.ticketType === 'Bugs/Errors').length
            const featureTickets = postsFromServer.filter((t) => t.ticketType === 'Feature Request').length
            const taskTickets = postsFromServer.filter((t) => t.ticketType === 'Task').length
            const otherTickets = postsFromServer.filter((t) => t.ticketType === 'Other').length

            setTypeData([bugsTickets, featureTickets, taskTickets, otherTickets])
   


            const pendingTickets = postsFromServer.filter((t) => t.ticketStatus === 'pending').length
            const closedTickets = postsFromServer.filter((t) => t.ticketStatus === 'closed').length

            setStatusData([pendingTickets, closedTickets]);


            fetch(url + 'get-projects-by-user-id/' + user.userId, {
                method: 'GET'
            })
            .then(response => response.json())
            .then(projects => {
                const projectNames = projects.map((p) => p.projectName)
                const projectIds = projects.map((p) => p.projectId)
                //console.log(projectNames)


                setProjectNamesData(projectNames);


                const ProjectTicketCounts = projectIds.map((p) => postsFromServer.filter((t) => t.projectId === p).length)
                setProjectData(ProjectTicketCounts);
            });
        });
    }

    
    useEffect( () => {

        if (user){
            makeAPICallPosts('get-posts-by-user/' + user.userId);
        }
    }, [user]);


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

    
      


    



    var { innerWidth: width, innerHeight: height } = window;
    width -= 200
    return (
      <div style={{ width: width, height: height}}>

      <div style={{marginTop: '100px'}}></div>


        < Button color="black" size="large" variant="outlined"
                style={{
                    marginTop: '10px',
                    marginLeft: '80px',
                    marginBottom: '0px',
                    fontWeight: 'bold',
                    fontSize: 'large'
                }}

            >
            <Link to="/profile" 
                style={{ textDecoration: 'none' }}>

                Back 
              
              </Link>
            </Button>

 
      <Grid container rowSpacing={1} columnSpacing={1} style={{
            marginLeft: '5%',
            marginTop: '3%',
            height: '75%',
            width: '92%',
            marginRight: '5%'
          }}
        >


        <Grid item xs={6}>

            <div style={{height: '90%', width: '90%', marginLeft: '5%', marginTop: '0%', display: 'flex', justifyContent: 'center'}}>
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


        <Grid item xs={6}>
        <div style={{height: '90%', width: '90%', marginLeft: '5%', marginTop: '0%', display: 'flex', justifyContent: 'center'}}>
                <Pie 
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
        <Grid item xs={6}>
        <div style={{height: '90%', width: '90%', marginLeft: '5%', marginTop: '0%', display: 'flex', justifyContent: 'center'}}>
            <Bar
                data={TicketsByProjectdata}
                height={200}
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
        <Grid item xs={6}>


        <div style={{height: '90%', width: '90%', marginLeft: '5%', marginTop: '0%', display: 'flex', justifyContent: 'center'}}>
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
                    }}
                />
            </div>
        </Grid>
        
      </Grid>
      

      </div>
    )
}

export default Dashboard