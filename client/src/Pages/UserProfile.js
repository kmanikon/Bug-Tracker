import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { CardActions, CardContent, CardMedia, Button, Typography, Box, Grid } from '@material-ui/core/';
import TopNavBar from '../Components/TopNavBar/TopNavBar'
import { useNavigate } from "react-router-dom";

import { Link } from 'react-router-dom'; 
import UserProfileCard from '../Components/UserProfileCard/UserProfileCard';
import MyActions from './MyActions';


import { 

    UserOutlined,
    InfoCircleOutlined,
    BellOutlined,
    FolderOpenOutlined,
    FileSearchOutlined,
    DashboardOutlined,
    FundProjectionScreenOutlined,
    SnippetsOutlined
          
  } 
  from '@ant-design/icons';

import url from '../defs';


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


/*

    Project Select for profile section


*/




const UserProfile = ({user}) => {

    const location = useLocation();

    var { innerWidth: width, innerHeight: height } = window;
    width -= 200

    var changeCount = 0;

    //const [projects, setProjects] = useState([]);
    //const [actions, setActions] = useState([]);

    let navigate = useNavigate(); 


    /*
    const routeChange = () => { 
        let path = `/addProject`; 
        navigate(path, {state:{changeCount: changeCount}});
    }
    */

    const routeChangeEditProfile = () => {
        let path = `/editUserProfile`; 
        navigate(path);
    }
    
    /*
    const makeAPICallProjects = async (route) => {

    
        fetch(url + route, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(postsFromServer => {

            setProjects(postsFromServer);
        });
    }

    const makeAPICallActions = async (route) => {

    
        fetch(url + route, {
            method: 'GET' 
        })
        .then(response => response.json())
        .then(postsFromServer => {

            setActions(postsFromServer.sort(function(a,b){
                // Turn your strings into dates, and then subtract them
                // to get a value that is either negative, positive, or zero.
                return new Date(b.date) - new Date(a.date);
              }));

            //setActions(postsFromServer);
        });
    }

    
    useEffect( () => {

        if (user){
            makeAPICallProjects('get-projects-by-user-id/' + user.userId);
            makeAPICallActions('get-actions-by-user-id/' + user.userId);
        }
    }, [changeCount, location, user]);

    */




    return (
        <div style={{ width: '100%', height: '85%' }}>
            <div style={{marginTop: '80px'}}></div>



            <Grid container rowSpacing={1} columnSpacing={1} style={{
                marginLeft: '5%',
                marginTop: '3%',
                height: '75%',
                width: '92%',
                marginRight: '5%',
                display: 'flex',
                justifyContent: 'center',
                minWidth: '750px'
            }}
            >
            <Grid item xs={4}>
            <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                
            <Button style={{
                width: '100%', 
                textAlign: 'left',
                height: '100%',
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 'large',
                flex: 0,
                justifyContent: 'center',
                flexDirection: 'row',
                display: 'block'
            }}              
            >
        
                <FundProjectionScreenOutlined style={{ fontSize: '1000%'}}/>
                <div style={{ fontSize: '150%', marginTop: '20px', color: 'grey'}}>
                    Dashboard
                </div>
                
            </Button>

            </Link>
            </Grid>

            <Grid item xs={4}>
            <Link to="/myActions" style={{ textDecoration: 'none' }} >
            <Button style={{
                width: '100%', 
                //display: 'block', 
                textAlign: 'left',
                
                //textTransform: 'none',
                height: '100%',
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 'large',

                flex: 0,
                justifyContent: 'center',
                flexDirection: 'row',
                display: 'block'
            }}              
            >
        
                <SnippetsOutlined style={{ fontSize: '1000%'}}/>
                <div style={{ fontSize: '150%', marginTop: '20px', color: 'grey'}}>
                    My Actions
                </div>
                
            </Button>

            </Link>
            </Grid>

            <Grid item xs={4}>

            <Button style={{
                width: '100%', 
                //display: 'block', 
                textAlign: 'left',
                
                //textTransform: 'none',
                height: '100%',
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 'large',

                flex: 0,
                justifyContent: 'center',
                flexDirection: 'row',
                display: 'block'
            }}
            onClick={routeChangeEditProfile}
            >
        
                <UserOutlined style={{ fontSize: '1000%'}}/>
                <div style={{ fontSize: '150%', marginTop: '20px', color: 'grey'}}>
                    Edit User
                </div>
                
            </Button>

            </Grid>

            
            
            
            
        </Grid>








        </div>
    )
}

export default UserProfile



/*

<div style={{ width: '100%'}}>

                <div style={{marginTop: '80px'}}></div>

            

            <div style={{width: '93%'}}>
            <div className="table-container">
                <div style={{marginLeft: '20px',

                    marginRight: '20px',
                    fontWeight: 'bold',
                    fontSize: 'large',
                    marginTop: '20px',
                    marginLeft: '40px'
                    }}
                >
                My Actions by Project
                <UserOutlined style={{ fontSize: '200%', marginLeft: '20px'}}/>

            </div>

            <div style={{display: 'flex'}}>
            
            <InfoDialog/>
            <Button variant="outlined" style={{
                    fontWeight: 'bold',
                    fontSize: 'medium',
                    marginRight: '0px',
                    marginTop: '20px'
                }}
                onClick={routeChangeEditProfile}
            >

                Edit Profile
                
            </Button>
            </div>


        </div>
        </div>

                <UserProfileCard projects={projects} actions={actions} changeCount={changeCount}/>

        
        </div>



*/