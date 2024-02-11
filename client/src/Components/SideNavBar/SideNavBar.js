import React, { useState, } from 'react'
import Stack from '@mui/material/Stack';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { UserOutlined, MenuOutlined, FolderOpenOutlined } from '@ant-design/icons';
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import useStyles from './styles';


/*

    Left Navbar

*/



const SideNavBar = ({user, height}) => {

    const classes = useStyles();


    const [active, setActive] = useState();


    return (
        <div >
            
            <AppBar position="static" color="inherit" elevation={3} 
                style={{marginTop: '-60px'}}
            >

                <Sidebar 
                    className={classes.sideBar} 
                    width="120px" 
                    style={{ 
                        height: height, 
                        marginTop: '60px', 
                        //textAlign: 'center', 
                        //alignItems: 'center'
                    }}
                    
                >
                    <div>
                    <Menu>

                        <SubMenu style={{height: '40px', marginRight: '20px', marginTop: '10px', marginBottom: '10px'}} icon={<MenuOutlined style={{fontSize: 30, color: 'black'}}/>}  defaultOpen="true" >
                        <div className={active === 'home' ? classes.active : classes.inactive} >
                            <MenuItem 
                                style={{height: '100px' }}
                                onClick={() => setActive('home')} component={<Link to="/home" />}
                            >

                                <Stack direction="column" alignItems="center">
                                    <HomeOutlinedIcon style={{fontSize: 60}}/>
                                    <Typography variant="body1">Home</Typography>
                                </Stack>
                            </MenuItem>
                        </div>

                        <div className={active === 'projects' ? classes.active : classes.inactive}>
                            <MenuItem 
                                style={{height: '100px'}}
                                onClick={() => setActive('projects')} component={<Link to="/projects" />}
                            >
                                
                                <div>
                                    <div style={{textAlign: 'center'}}>
                                        <FolderOpenOutlined style={{fontSize: 50}}/>
                                        <div style={{marginTop: '5px'}}>Projects</div>
                                    </div>
                                </div>
                            </MenuItem>
                        </div>

                        <div className={active === 'tickets' ? classes.active : classes.inactive}>
                            <MenuItem 
                                style={{height: '100px'}}
                                onClick={() => setActive('tickets')} component={<Link to="/myTickets" />}
                            >
                                <Stack direction="column" alignItems="center" gap={1}>
                                    <DashboardCustomizeOutlinedIcon style={{fontSize: 50}}/>
                                    <Typography variant="body1">Workflows</Typography>
                                </Stack>
                            </MenuItem>
                        </div>

                        <div className={active === 'profile' ? classes.active : classes.inactive}>
                            <MenuItem 
                                style={{height: '100px'}}
                                onClick={() => setActive('profile')} component={<Link to="/profile" />}
                            >
                                <div>
                                    
                                    <div style={{textAlign: 'center'}}>
                                        <UserOutlined style={{fontSize: 50}}/>
                                        <div style={{marginTop: '10px'}}>Profile</div>
                                    </div>
                                </div>
                            </MenuItem>
                        </div>
                        </SubMenu>
                    </Menu>

                    </div>

                
                </Sidebar>
                
            </AppBar>
        </div>
    )
}

export default SideNavBar