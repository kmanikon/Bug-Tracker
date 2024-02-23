
import React, { useState, useEffect } from 'react';
import './App.css';


import { useNavigate } from "react-router-dom";


import { Navigate, Router, Routes ,Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom'

import StickyBox from "react-sticky-box";



import Home from './Pages/Home';
import Projects from './Pages/Projects';
import ProjectDetails from './Pages/ProjectDetails';
import TicketDetails from './Pages/TicketDetails';
import AddTicket from './Pages/AddTicket';
import EditTicket from './Pages/EditTicket';
import AddProject from './Pages/AddProject';
import EditProject from './Pages/EditProject';
import Login from './Pages/Login';
import AddProjectUser from './Pages/AddProjectUser';
import RemoveProjectUser from './Pages/RemoveProjectUser';
import ProjectHistory from './Pages/ProjectHistory';
import TicketHistoryDetails from './Pages/TicketHistoryDetails';
import UserProfile from './Pages/UserProfile';
import UserProfileHistory from './Pages/UserProfileHistory';
import ManageProjectUsers from './Pages/ManageProjectUsers';
import EditUserRole from './Pages/EditUserRole';
import EditUserProfile from './Pages/EditUserProfile';
import MyActions from './Pages/MyActions';
import Dashboard from './Pages/Dashboard';

import MyTickets from './Pages/MyTickets';
import MyProjectsTickets from './Pages/MyProjectsTickets';

import Notifications from './Pages/Notifications';
import NotificationsHistory from './Pages/NotificationsHistory';

import SideNavBar from './Components/SideNavBar/SideNavBar';

import TopNavBar from './Components/TopNavBar/TopNavBar';

import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';


const paths = [
  "/home",
  "/projects",
  "/projectDetails",
  "/ticketDetails",
  "/addTicket",
  "/editTicket",
  "/addProject",
  "/editProject",
  "/projectHistory",
  //"/login"
  "/addProjectUser",
  "/removeProjectUser",
  "/ticketHistoryDetails",
  "/profile",
  "/profileHistory",
  "/editUserProfile",
  "/myTickets",
  "/mytickets",
  "/myProjectTickets",
  "/manageUsers",
  "/editUserRole",
  "/myActions",
  "/notifications",
  "/notificationsHistory",
  "/dashboard",
  //"/"

]

const theme = createTheme({
  overrides: {
    // Style sheet name ⚛️
    MuiButton: {
      // Name of the rule
      text: {
        //boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        transition: 'transform 0.35s',
          '&:hover': {
            transform: 'scale(1.025)',
          },
      },
    },
  },
  props: {
    // Name of the component ⚛️
    MuiButtonBase: {
      // The default props to change
      disableRipple: true, // No more ripple, on the whole application 💣!
    },
  },
});

function App() {

  const location = useLocation();


  const [currentUser, setCurrentUser] = useState();

  const [checkUser, setCheckUser] = useState(0);

  const [init, setInit] = useState(false);

  

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem( 'currentUser' )));
    setCheckUser(1);

    
  }, [])
  




  

    return (
      <ThemeProvider theme={theme}>
            
          <div style={{ display: 'flex' }}>

              
          


            { 
            //location.pathname !== '/login' && location.pathname !== '/' ? 
            paths.includes(location.pathname) ?
              <>
              
 

              
              
              <div>

                <div style={{position: 'fixed'}}>
                  <SideNavBar user={currentUser}/>
                </div>
       
              </div>
    
              <div style={{ minWidth: "60px", height: '100vh' }}></div>
              {/* style={{width: '100%', marginLeft: -60, marginRight: 60 }} */}

              
              </>
            : null}
            
            {currentUser === undefined && checkUser === 1 ? 
                <Navigate to="/login" />
              :
              null
            }

            
            

            <Routes> 
                <Route exact path="/home" element={<div style={{width: '100%' }}><TopNavBar setUser={setCurrentUser} user={currentUser} init={init} /><Home/></div>}/>
                <Route path="/projects" element={<div><TopNavBar setUser={setCurrentUser} user={currentUser} /><Projects user={currentUser} setUser={setCurrentUser}/></div>}/>
                <Route path="/projectDetails" element={<div><TopNavBar setUser={setCurrentUser} user={currentUser} /><ProjectDetails user={currentUser} /></div>}/>
                <Route path="/ticketDetails" element={<div style={{width: '100%' }}><TopNavBar setUser={setCurrentUser} user={currentUser} /><TicketDetails user={currentUser}/></div>}/>
                <Route path="/addTicket" element={<div style={{width: '100%' }}><TopNavBar setUser={setCurrentUser} user={currentUser} /><AddTicket user={currentUser}/></div>}/>
                <Route path="/editTicket" element={<div style={{width: '100%' }}><TopNavBar setUser={setCurrentUser} user={currentUser} /><EditTicket user={currentUser}/></div>}/>
                <Route path="/addProject" element={<div style={{width: '100%' }}><TopNavBar setUser={setCurrentUser} user={currentUser} /><AddProject user={currentUser}/></div>}/>
                <Route path="/editProject" element={<div style={{width: '100%'}}><TopNavBar setUser={setCurrentUser} user={currentUser} /><EditProject user={currentUser}/></div>}/>
                <Route path="/projectHistory" element={<div style={{width: '100%'}}><TopNavBar setUser={setCurrentUser} user={currentUser} /><ProjectHistory user={currentUser}/></div>}/>
                <Route path="/login" element={<Login user={currentUser} setUser={setCurrentUser} setInit={setInit}/>}/>
                <Route path="/addProjectUser" element={<div style={{width: '100%' }}><TopNavBar setUser={setCurrentUser} user={currentUser} /><AddProjectUser/></div>}/>
                <Route path="/removeProjectUser" element={<div style={{width: '100%' }}><TopNavBar setUser={setCurrentUser} user={currentUser} /><RemoveProjectUser/></div>}/>
                <Route exact path="/ticketHistoryDetails" element={<div style={{width: '100%' }}><TopNavBar setUser={setCurrentUser} user={currentUser} /><TicketHistoryDetails user={currentUser}/></div>}/>
                <Route exact path="/profile" element={<div style={{width: '100%'}}><TopNavBar setUser={setCurrentUser} user={currentUser} /><UserProfile user={currentUser}/></div>}/>                
                <Route exact path="/profileHistory" element={<div><TopNavBar setUser={setCurrentUser} user={currentUser} /><UserProfileHistory user={currentUser}/></div>}/>
                <Route path="/editUserProfile" element={<div style={{width: '100%' }}><TopNavBar setUser={setCurrentUser} user={currentUser} /><EditUserProfile user={currentUser} setUser={setCurrentUser}/></div>}/>                
                <Route path="/myTickets" element={<div><TopNavBar setUser={setCurrentUser} user={currentUser} /><MyTickets user={currentUser} setUser={setCurrentUser}/></div>}/>                
                <Route path="/myProjectTickets" element={<div><TopNavBar setUser={setCurrentUser} user={currentUser} /><MyProjectsTickets user={currentUser} setUser={setCurrentUser}/></div>}/>                
                <Route path="/manageUsers" element={<div><TopNavBar setUser={setCurrentUser} user={currentUser} /><ManageProjectUsers user={currentUser} setUser={setCurrentUser}/></div>}/>
                <Route path="/editUserRole" element={<div style={{width: '100%' }}><TopNavBar setUser={setCurrentUser} user={currentUser} /><EditUserRole/></div>}/>                
                <Route path="/myActions" element={<div><TopNavBar setUser={setCurrentUser} user={currentUser} /><MyActions user={currentUser}/></div>}/>                
                <Route path="/notifications" element={<div><TopNavBar setUser={setCurrentUser} user={currentUser} /><Notifications user={currentUser} setUser={setCurrentUser}/></div>}/>                
                <Route path="/notificationsHistory" element={<div><TopNavBar setUser={setCurrentUser} user={currentUser} /><NotificationsHistory user={currentUser} setUser={setCurrentUser}/></div>}/>

                <Route exact path="/dashboard" element={<div style={{width: '100%', height: '100%' }}><TopNavBar setUser={setCurrentUser} user={currentUser} init={init} /><Dashboard user={currentUser}/></div>}/>
                <Route path="/" element={<Login user={currentUser} setUser={setCurrentUser} setInit={setInit}/>}/>
                <Route path="*" element={<Login user={currentUser} setUser={setCurrentUser} setInit={setInit}/>}/>
                {/*<Route path="*" element={<div style={{width: '100%' }}><TopNavBar setUser={setCurrentUser} user={currentUser} /><Home/></div>}/> */}
            </Routes>


          
            

          </div>
          
        </ThemeProvider>

  );
}

export default App;
