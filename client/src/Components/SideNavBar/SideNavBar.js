import React, { useState, } from 'react'
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { UserOutlined, WindowsOutlined, MenuOutlined, MenuUnfoldOutlined, UnorderedListOutlined } from '@ant-design/icons';
import useStyles from './styles';


/*

    Left Navbar

*/



const SideNavBar = ({user, height}) => {

    const classes = useStyles();


    const [active, setActive] = useState();


    return (
        <div >
            
            <AppBar position="static" color="inherit" >

                <Sidebar 
                    className={classes.sideBar} 
                    width="200px" 
                    style={{ height: height}}
                >

{/*
                    <div style={{marginTop: '10px'}}></div>

                    <Typography style={{textAlign: 'center', fontWeight: 'bold', fontSize: 'large'}}>
                        {'Welcome'}
                    </Typography>
                    <Typography style={{textAlign: 'center', fontWeight: 'bold', fontSize: 'large'}}>
                        {user.username + '!'}
                    </Typography>

                    <div style={{marginBottom: '20px'}}></div>
    */}

                    <div>
                    <Menu>
                        <div className={active === 'home' ? classes.active : classes.inactive}>
                            <MenuItem onClick={() => setActive('home')} component={<Link to="/home" />} >

                            <div >
                                <div style={{ display: 'flex', alignItems: 'center'}}>
                                    <WindowsOutlined style={{marginRight: '10px'}}/>
                                    <div>Dashboard Home</div>
                                </div>
                            </div>
                            </MenuItem>
                        </div>

                        <div className={active === 'projects' ? classes.active : classes.inactive}>
                            <MenuItem onClick={() => setActive('projects')} component={<Link to="/projects" />}>
                                <div style={{alignItems: 'center'}}>
                                    <div style={{ display: 'flex', alignItems: 'center'}}>
                                        <MenuOutlined style={{marginRight: '10px'}}/>
                                        <div>My Projects</div>
                                    </div>
                                </div>
                            </MenuItem>
                        </div>

                        <div className={active === 'tickets' ? classes.active : classes.inactive}>
                            <MenuItem onClick={() => setActive('tickets')} component={<Link to="/mytickets" />}>
                                <div style={{alignItems: 'center'}}>
                                    <div style={{ display: 'flex', alignItems: 'center'}}>
                                        <UnorderedListOutlined style={{marginRight: '10px'}}/>
                                        <div>My Tickets</div>
                                    </div>
                                </div>
                            </MenuItem>
                        </div>

                        <div className={active === 'profile' ? classes.active : classes.inactive}>
                            <MenuItem onClick={() => setActive('profile')} component={<Link to="/profile" />}>
                                <div style={{alignItems: 'center'}}>
                                    <div style={{ display: 'flex', alignItems: 'center'}}>
                                        <UserOutlined style={{marginRight: '10px'}}/>
                                        <div>User Profile</div>
                                    </div>
                                </div>
                            </MenuItem>
                        </div>
                    </Menu>

                    </div>

                
                </Sidebar>
            </AppBar>
        </div>
    )
}

export default SideNavBar