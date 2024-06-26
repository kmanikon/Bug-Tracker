import React, {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'; 
import { AppBar, Typography, Toolbar, Avatar, Button, useMediaQuery } from '@material-ui/core';
import { PaperClipOutlined, UserOutlined, BellOutlined, WindowsOutlined, MenuOutlined } from '@ant-design/icons';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

import { useNavigate } from "react-router-dom";

import url from '../../defs';

import useStyles from './styles';

/*

    top navbar with navigation buttons + logout

*/




const TopNavBar = ({user, setUser, init, sidebarOpen, setSidebarOpen, totalNotifications, setTotalNotifications}) => {

    const classes = useStyles();

    const location = useLocation();
 

    let navigate = useNavigate(); 
    const routeChange = () =>{ 
        //changeCount++;
        let path = `/login`; 
        navigate(path)//, //{state:{changeCount: changeCount}});
    }

    const handleLogout = () => {
        setUser(null);
        routeChange();
    }


    //const [totalNotifications, setTotalNotifications] = useState(0);


    /*
    const makeAPICallReads = async (route) => {
        fetch(url + route, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(postsFromServer => {

        //setReads(postsFromServer);

        var sum = Object.values(postsFromServer).reduce((acc, value) => acc + value, 0);

        setTotalNotifications(sum)
        });
    }
    */

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    }

    const isSmallScreen = useMediaQuery('(max-width: 700px)');

    const hideSidebar = useMediaQuery('(max-width: 959px)')

    useEffect(() => {
        if (hideSidebar) {
            setSidebarOpen(false);
        }
        else {
            setSidebarOpen(true);
        }
    }, [hideSidebar])


    return (
        <>
        <AppBar className={classes.appBar} position="static" color="inherit" elevation={3} style={{width: '100vw'}}>

            <Menu>
                <SubMenu 
                    style={{
                        height: '40px',
                        marginLeft: '20px', 
                        marginRight: '20px', 
                        marginTop: '10px', 
                        marginBottom: '10px',
                        zIndex: '2'

                    }} 
                    icon={<MenuOutlined style={{fontSize: 30, color: 'black'}}/>}  
                    defaultOpen="true" 
                    onClick={toggleSidebar}
                />
            </Menu>
            <Toolbar className={classes.toolbar}>

            <div style={{marginTop: '10px'}}></div>


            <div style={{marginRight: '10px'}}></div>

                <div className={classes.notifications}>
                        <Link to="/profile" style={{ textDecoration: 'none' }}>
                        <Button variant="contained" style={{backgroundColor: '#B8E2F2', whiteSpace: 'nowrap'}}>
                            <PaperClipOutlined style={{ marginRight: '10px'}}/>
                            {user ? user.username : ''}
                        </Button>
                        </Link>
                    </div>
    
                <div className={classes.notifications}>
                    <Link to="/home" style={{ textDecoration: 'none' }}>
                    <Button style={{ transition: 'none', transform: 'none'}}>
                        <WindowsOutlined style={{ marginRight: '10px' }}/>
                        Home
                    </Button>
                    </Link>
                </div>

                <div className={classes.notifications}>
                    <Link to="/notifications" style={{ textDecoration: 'none' }}>
                    <Button style={{position: 'relative', transition: 'none', transform: 'none'}}>
                        <BellOutlined style={{ marginRight: '10px'}}/>
                    
                        Notifications

                        { totalNotifications !== 0 && totalNotifications !== null ?
                        <span class="icon-button__badge" style={{
                            position: 'absolute',
                            top: '-9px',
                            right: '-9px',
                            width: '25px',
                            height: '25px',
                            background: 'red',
                            color: '#ffffff',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: '50%'
                        }}>{totalNotifications}</span>
                        : null
                        }
                    </Button>
                    
                    </Link>
                </div>

                <div className={classes.profile}>
                    <Button onClick={handleLogout} style={{transition: 'none', transform: 'none'}}>
                        <UserOutlined style={{ marginRight: '10px'}}/>
                        Logout
                    </Button>
                </div>
            </Toolbar>

        </AppBar>
        
        <AppBar className={classes.mobileBar} position="static" color="inherit" elevation={3} style={{width: '100%'}}>
            <Menu>
                <Link 
                    to="/home" 
                    style={{
                        textDecoration: 'none',
                    }}
                >

                <Button
                    style={{
                        height: '40px',
                        marginLeft: '25px',
                        marginRight: '20px',
                        marginTop: '10px',
                        marginBottom: '10px',
                        zIndex: '2',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        //backgroundColor: 'transparent', // Set background color as needed
                        border: 'none', // Remove border if needed
                        cursor: 'pointer',
                    }}
                    
                >
                <MenuOutlined style={{ fontSize: 30, color: 'black' }} />
                </Button>
                
                </Link>
            </Menu>

            <Toolbar className={classes.toolbar_mobile}>
            <div className={classes.profile}>
                <Button onClick={handleLogout} style={{transition: 'none', backgroundColor: '#D6EAF8', color: 'black'}} variant="contained">
                    <UserOutlined style={{ marginRight: '10px'}}/>
                    Logout
                </Button>
            </div>
            </Toolbar>
        </AppBar>
        </>
    )
}

export default TopNavBar