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



const SideNavBar = ({user }) => {

    const classes = useStyles();


    const [active, setActive] = useState();


    return (
        <div>
            
            <AppBar position="static" color="white" 
                style={{marginTop: '-60px'}}
            >

                <div 
                    className={classes.sideBar} 
                    width="120px" 
                    style={{ 
                        height: 'calc(100vh - 60px)', 
                        marginTop: '120px', 
                        //textAlign: 'center', 
                        //alignItems: 'center'
                        elevation: '1',
                        position: 'fixed',
                        //background: 'black',
                        //backgroundColor: 'transparent',
                        marginLeft: 1,
                        //borderRight: '1px solid #f8f8f8',
                        zIndex: '3',
                        boxShadow: '1px 1px 1px grey'

                    }}
                    
                >
                    <div>
                    <Menu>

                        
                        {/*<SubMenu style={{height: '40px', marginLeft: '20px', marginRight: '20px', marginTop: '10px', marginBottom: '10px'}} icon={<MenuOutlined style={{fontSize: 30, color: 'black'}}/>}  defaultOpen="true" >*/}
                        <div 
                            className={active === 'home' ? classes.active : classes.inactive} 
                            style={{ 
                                //textAlign: 'center', 
                                //alignItems: 'center'
                                //justifyContent: 'center',
                                //alignItems: 'center'
                            }}
                        >
                            <MenuItem 
                                style={{height: '100px' }}
                                onClick={() => setActive('home')} component={<Link to="/home" />}
                            >


                                
                                <Stack direction="column" alignItems="center">
                                    <HomeOutlinedIcon style={{fontSize: 60}}/>
                                    <Typography variant="body1" alignItems="center">Home</Typography>
                                </Stack>

                            </MenuItem>
                        </div>

                        <div className={active === 'projects' ? classes.active : classes.inactive}>
                            <MenuItem 
                                style={{height: '100px'}}
                                onClick={() => setActive('projects')} component={<Link to="/projects" />}
                            >
                                <div style={{textAlign: 'center'}}>
                                    <FolderOpenOutlined style={{fontSize: 50}}/>
                                    <div style={{marginTop: '5px', textAlign: 'center'}}>Projects</div>
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
                                <div style={{textAlign: 'center'}}>
                                    <UserOutlined style={{fontSize: 50}}/>
                                    <div style={{marginTop: '5px', textAlign: 'center'}}>Profile</div>
                                </div>
                            </MenuItem>
                        </div>
                        {/*</SubMenu>*/}
                    </Menu>

                    </div>

                
                </div>
                
            </AppBar>
        </div>
    )
}

export default SideNavBar