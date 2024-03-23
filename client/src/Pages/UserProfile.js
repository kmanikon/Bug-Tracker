import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { CardActions, CardContent, CardMedia, Button, Typography, Box, Grid, useMediaQuery } from '@material-ui/core/';
import { useNavigate } from "react-router-dom";

import { Link } from 'react-router-dom'; 
import { 

    UserOutlined,
    FundProjectionScreenOutlined,
    SnippetsOutlined
          
  } 
  from '@ant-design/icons';

/*

    Project Select for profile section


*/




const UserProfile = ({user, isSmallScreen}) => {

    const location = useLocation();

    var changeCount = 0;

    let navigate = useNavigate(); 


    const routeChangeEditProfile = () => {
        let path = `/editUserProfile`; 
        navigate(path);
    }


    const xs = 10;
    const sm = 4;
    const md = 4;

    //const isSmallScreen = useMediaQuery('(max-width: 700px)');


    return (
        <div style={{ width: '100%', height: 'calc(100vh - 160px)' }}>
            <div style={{marginTop: !isSmallScreen ? '160px' : '100px'}}></div>



            <Grid container rowSpacing={1} columnSpacing={1} spacing={2}
                style={{
                    marginLeft: '4%',
                    //marginTop: '20px',
                    height: '75%',
                    width: '92%',
                    marginRight: '4%',
                    display: 'flex',
                    justifyContent: 'center',
                    //minWidth: '750px'
                }}
            >
            <Grid item xs={xs} sm={sm} md={md}>
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
        
                <FundProjectionScreenOutlined style={{ fontSize: isSmallScreen ? '500%' : '1000%'}}/>
                <div style={{ fontSize: isSmallScreen ? '125%' : '150%', marginTop: '20px', color: 'grey'}}>
                    Dashboard
                </div>
                
            </Button>

            </Link>
            </Grid>

            <Grid item xs={xs} sm={sm} md={md}>
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
        
                <SnippetsOutlined style={{ fontSize: isSmallScreen ? '500%' : '1000%'}}/>
                <div style={{ fontSize: isSmallScreen ? '125%' : '150%', marginTop: '20px', color: 'grey', whiteSpace: 'nowrap'}}>
                    Action Logs
                </div>
                
            </Button>

            </Link>
            </Grid>

            <Grid item xs={xs} sm={sm} md={md}>

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
        
                <UserOutlined style={{ fontSize: isSmallScreen ? '500%' : '1000%'}}/>
                <div style={{ fontSize: isSmallScreen ? '125%' : '150%', marginTop: '20px', color: 'grey'}}>
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