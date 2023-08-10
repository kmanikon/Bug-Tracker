import React, {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'; 
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import { PaperClipOutlined, UserOutlined, BellOutlined, WindowsOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

import url from '../../defs';

import useStyles from './styles';

/*

    top navbar with navigation buttons + logout

*/




const TopNavBar = ({user, setUser, init}) => {

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


    const [totalNotifications, setTotalNotifications] = useState(1);



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



    useEffect(() => {

        if (user){
            
            makeAPICallReads('get-unread-actions-by-user-id/' + user.userId);
        }
    
      }, [user, location.pathname, init])

    return (
        <AppBar className={classes.appBar} position="static" color="inherit" elevation={3}>
            <Toolbar className={classes.toolbar}>

            <div style={{marginTop: '10px'}}></div>


            <div style={{marginRight: '10px'}}></div>

                <div className={classes.notifications}>
                        <Link to="/profile" style={{ textDecoration: 'none' }}>
                        <Button variant="contained" style={{backgroundColor: '#B8E2F2'}}>
                            <PaperClipOutlined style={{ marginRight: '10px'}}/>
                            {user ? user.username : ''}
                        </Button>
                        </Link>
                    </div>
    
                <div className={classes.notifications}>
                    <Link to="/home" style={{ textDecoration: 'none' }}>
                    <Button >
                        <WindowsOutlined style={{ marginRight: '10px'}}/>
                        Home
                    </Button>
                    </Link>
                </div>

                <div className={classes.notifications}>
                    <Link to="/notifications" style={{ textDecoration: 'none' }}>
                    <Button style={{position: 'relative'}}>
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
                    <Button onClick={handleLogout}>
                        <UserOutlined style={{ marginRight: '10px'}}/>
                        Logout
                    </Button>
                </div>
            </Toolbar>

        </AppBar>
    )
}

export default TopNavBar