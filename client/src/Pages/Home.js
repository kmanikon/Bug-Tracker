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
  UserOutlined,
  BellOutlined,
  FolderOpenOutlined

        
} 
from '@ant-design/icons';

import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
 
import TopNavBar from '../Components/TopNavBar/TopNavBar'
import { useNavigate } from "react-router-dom";

 
/*

  the homepage + navigation to main pages

*/
 

const Home = () => {

    const location = useLocation();


    return (
      <div style={{  
        height: '100%',
        minWidth: '700px',
        minHeight: '500px'
      }}
      >

      <div style={{marginTop: '80px'}}></div>

      {/*
        <Link to="/projects" style={{ textDecoration: 'none' }}>
          <Button style={{
            width: '40%', 
            //display: 'block', 
            textAlign: 'left',
            marginLeft: '5%',
            marginTop: '3%', 
            //textTransform: 'none',
            height: '45%',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 'large',

            flex: 0,
            justifyContent: 'center',
            flexDirection: 'row',
            display: 'block'
          }}              
          >
    
              <ContainerOutlined style={{ fontSize: '400%'}}/>
              <div style={{ fontSize: '150%', marginTop: '20px', color: 'grey'}}>
                My Projects
              </div>
              
          </Button>

          </Link>
        */}

 
      <Grid container rowSpacing={1} columnSpacing={1} style={{
            marginLeft: '5%',
            marginTop: '3%',
            height: '75%',
            width: '92%',
            marginRight: '5%'
          }}
        >
        <Grid item xs={6}>
        <Link to="/projects" style={{ textDecoration: 'none' }}>
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
    
              <FolderOpenOutlined style={{ fontSize: '400%'}}/>
              <div style={{ fontSize: '150%', marginTop: '20px', color: 'grey'}}>
                My Projects
              </div>
              
          </Button>

          </Link>
        </Grid>
        <Grid item xs={6}>
        <Link to="/myTickets" style={{ textDecoration: 'none' }}>
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
    
              <DashboardCustomizeOutlinedIcon style={{ fontSize: '400%'}}/>
              <div style={{ fontSize: '150%', marginTop: '20px', color: 'grey'}}>
                Workflows
              </div>
              
          </Button>

          </Link>
        </Grid>
        <Grid item xs={6}>
        <Link to="/profile" style={{ textDecoration: 'none' }}>
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
    
              <UserOutlined style={{ fontSize: '400%'}}/>
              <div style={{ fontSize: '150%', marginTop: '20px', color: 'grey'}}>
                User Profile
              </div>
              
          </Button>

          </Link>
        </Grid>
        <Grid item xs={6}>
        <Link to="/notifications" style={{ textDecoration: 'none' }}>
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
    
              <BellOutlined style={{ fontSize: '400%'}}/>
              <div style={{ fontSize: '150%', marginTop: '20px', color: 'grey'}}>
                Notifications
              </div>
              
          </Button>

          </Link>
        </Grid>
        
      </Grid>
      

      </div>
    )
}

export default Home