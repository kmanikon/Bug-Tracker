import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'; 
import TopNavBar from '../Components/TopNavBar/TopNavBar'
import { Card, TextField, CardActions, CardContent, CardMedia, Button, Typography, Box, Select, MenuItem, Grid, InputAdornment, IconButton } from '@material-ui/core/';
import { RightOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import useStyles from '../Components/TicketDetailsCard/styles';

import url from '../defs';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

/*

    form for changing user credentials (once logged in)

*/


const EditUserProfile = ({user, setUser}) => {

    const classes = useStyles();
    const ref = useRef(null);


    const location = useLocation();

    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState(user.password);

    // state for password visibility
    const [showPassword, setShowPassword] = useState(false);

    // toggle password visibility
    const handleShowPassword = () => setShowPassword(!showPassword);
 



    let navigate = useNavigate(); 

    
    const routeChange = () =>{ 
        //changeCount++;
        let path = `/profile`; 
        navigate(path);
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

            localStorage.setItem( 'currentUser', JSON.stringify(post) );
            setUser(post);            
        });
    }


    const [open, setOpen] = useState(false);


    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };


    const RestrictDemoDialog = () => {
        return (
            <div>
              
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title" variant="h5" 
                    style={{
                        fontWeight: 'bold',
                        fontSize: 'large',
                    }}
                >
                  {"Demo Access Restrictions"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description" >
                    Sorry! As a demo user, you are not permitted to perform this action.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Close</Button>
                </DialogActions>
              </Dialog>
            </div>
          );
      }


    const handleSubmit = () => {

        
        const post = {
            'userId': user.userId,
            'username': username,
            'password': password,
            'email': email,
            'accessIdString': user.accessIdString,
            'accessIdList': user.accessIdList
        }

        if (user.userId == 1 || user.userId == 2){
            handleClickOpen();
        }
        else {
            makeAPICallEdit('update-user', post)   
            routeChange();
        }
        
    }


    return (
        <div>

        <div style={{ marginLeft: '20px'}}>
        <div>
            
            <div style={{marginTop: '110px'}}></div>
            
            <div className={classes.projectInfo}>
                <div className="projectsTitle">Update Profile</div>
            </div>


            <Card className={classes.headerCard} ref={ref}>
    
                <div style={{display: 'flex'}}>

                    <div style={{width: '35%', display: 'block'}}>
                        <div style={{ marginBottom: '20px'}}></div>
                        <Box className={classes.title} variant="h5" gutterBottom >Username</Box>
                        <TextField id="outlined-basic" variant="outlined" 
                            style={{ width: '240px', marginLeft: '20px', marginTop: '10px'}}
                            size="small"
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)}
                            
                        />

                        <div style={{ marginBottom: '20px'}}></div>

                        <Box className={classes.title} variant="h5" gutterBottom >Email</Box>
                        <TextField id="outlined-basic" variant="outlined" 
                            style={{ width: '240px', marginLeft: '20px', marginTop: '10px'}}
                            size="small"
                            value={email} 
                            //label={'Email'}
                            onChange={(e) => setEmail(e.target.value)}      
                        />

                        <div style={{ marginBottom: '20px'}}></div>

                        <Box className={classes.title} variant="h5" gutterBottom >Password</Box>

                        <TextField id="outlined-basic" variant="outlined" 
                                style={{ width: '300px', marginLeft: '20px', marginTop: '15px', marginBottom: '20px'}}
                                size="small"
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)}    
                                fullWidth
                                //label={'Password'}
                                //required    
                                type={showPassword === false ? 'Password' : 'Text'}
                                InputProps={{
                                    endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleShowPassword}>
                                        {showPassword === false ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                    ),
                                }}   
                            />

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
            <Link to="/profile" 
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

            <RestrictDemoDialog/>

            </div>

        </div>

        </div>

        </div>
    )
}

export default EditUserProfile