import React, { useState, } from 'react'
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
                    style={{ height: height, marginTop: '60px', textAlign: 'left' }}
                    
                >
                    <div>
                    <Menu>

                        <SubMenu style={{height: '40px', marginLeft: '20px', marginRight: '20px', marginTop: '10px', marginBottom: '10px'}} icon={<MenuOutlined style={{fontSize: 30, color: 'black'}}/>}  defaultOpen="true" >
                        <div className={active === 'home' ? classes.active : classes.inactive} >
                            <MenuItem 
                                style={{height: '100px' }}
                                onClick={() => setActive('home')} component={<Link to="/home" />}
                            >

                                <div>
                                    <HomeOutlinedIcon style={{fontSize: 60}}/>
                                    <div style={{marginTop: '-5px'}}>Home</div>
                                </div>
                            </MenuItem>
                        </div>

                        <div className={active === 'projects' ? classes.active : classes.inactive}>
                            <MenuItem 
                                style={{height: '100px'}}
                                onClick={() => setActive('projects')} component={<Link to="/projects" />}
                            >
                                
                                <div>
                                    <div>
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
                                
                                <div >
                                    <div >
                                        <DashboardCustomizeOutlinedIcon style={{fontSize: 50}}/>
                                        <div style={{marginTop: '5px'}}>Workflows</div>
                                    </div>
                                </div>
                            </MenuItem>
                        </div>

                        <div className={active === 'profile' ? classes.active : classes.inactive}>
                            <MenuItem 
                                style={{height: '100px'}}
                                onClick={() => setActive('profile')} component={<Link to="/profile" />}
                            >
                                <div>
                                    
                                    <div>
                                        <UserOutlined style={{fontSize: 50}}/>
                                        <div style={{marginTop: '5px'}}>Profile</div>
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