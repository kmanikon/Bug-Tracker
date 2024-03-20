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
  Grid,
  useMediaQuery
} 
from '@material-ui/core/';

import { 
  UserOutlined,
  BellOutlined,
  FolderOpenOutlined

        
} 
from '@ant-design/icons';

import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
 
/*

  the homepage + navigation to main pages

*/
 

const Home = () => {

    //const location = useLocation();

    const xs = 8;
    const sm = 6;
    const md = 6;

    const isSmallScreen = useMediaQuery('(max-width: 600px)');

    return (
      <div style={{  
        height: '100%',
        //minWidth: '400px',
        minHeight: '500px'
      }}
      >

      <div style={{marginTop: '100px'}}></div>
 
      <Grid container rowSpacing={1} columnSpacing={1} style={{
            marginLeft: '4%',
            //marginTop: '3%',
            //height: '75%',
            width: '92%',
            //marginRight: '5%',
            height: isSmallScreen ? 'calc(100vh - 290px)' : 'calc(100vh - 170px)',
            display: 'flex',
            justifyContent: 'center',
          }}
          spacing={3}
        >
        <Grid item xs={xs} sm={sm} md={md}>
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
            display: 'block',
          }}              
          >
    
              <FolderOpenOutlined style={{ fontSize: isSmallScreen ? '350%' : '400%' }} />
              <div style={{ fontSize: isSmallScreen ? '120%' : '150%', marginTop: isSmallScreen ? '0px' : '20px', color: 'grey'}}>
                My Projects
              </div>
              
          </Button>

          </Link>
        </Grid>
        <Grid item xs={xs} sm={sm} md={md}>
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
    
              <DashboardCustomizeOutlinedIcon style={{ fontSize: isSmallScreen ? '350%' : '400%' }}/>
              <div style={{ fontSize: isSmallScreen ? '120%' : '150%', marginTop: isSmallScreen ? '0px' : '10px', color: 'grey'}}>
                Workflows
              </div>
              
          </Button>

          </Link>
        </Grid>
        <Grid item xs={xs} sm={sm} md={md}>
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
    
              <UserOutlined style={{ fontSize: isSmallScreen ? '350%' : '400%' }}/>
              <div style={{ fontSize: isSmallScreen ? '120%' : '150%', marginTop: isSmallScreen ? '0px' : '20px', color: 'grey'}}>
                User Profile
              </div>
              
          </Button>

          </Link>
        </Grid>
        <Grid item xs={xs} sm={sm} md={md}>
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
          //variant={isSmallScreen ? "contained": "normal" }         
          >
    
              <BellOutlined style={{ fontSize: isSmallScreen ? '350%' : '400%' }}/>
              <div style={{ fontSize: isSmallScreen ? '120%' : '150%', marginTop: isSmallScreen ? '0px' : '20px', color: 'grey'}}>
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