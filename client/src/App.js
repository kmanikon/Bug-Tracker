import React, { useState, useEffect, useMemo } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import SideNavBar from './Components/SideNavBar/SideNavBar';
import TopNavBar from './Components/TopNavBar/TopNavBar';
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
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';

import url from './defs';

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
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [init, setInit] = useState(0);
  const [totalNotifications, setTotalNotifications] = useState(0);
  const [readCounts, setReadCounts] = useState([]);

  const [projects, setProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(false);
  const [projectChangeCount, setProjectChangeCount] = useState(0);
  //var projectChangeCount = 0;

  const [ticketChangeCount, setTicketChangeCount] = useState(0);

  const [userChangeCount, setUserChangeCount] = useState(0);

  const [historyCount, setHistoryCount] = useState(0);

  const makeAPICallReads = async (route) => {
      const response = await fetch(url + route, {
          method: 'GET'
      });
      const postsFromServer = await response.json();
      setReadCounts(postsFromServer);
      const sum = Object.values(postsFromServer).reduce((acc, value) => acc + value, 0);
      setTotalNotifications(sum);
      return sum;
  }

  
  /*
  useEffect(() => {
      if (currentUser){
          makeAPICallReads('get-unread-actions-by-user-id/' + currentUser.userId);
      }
    }, [historyCount, currentUser, init]); // location.pathname,
  */
 

    
  const memoizedTotalNotifications = useMemo(() => {
      if (currentUser) {
          makeAPICallReads('get-unread-actions-by-user-id/' + currentUser.userId)
              .then(sum => {
                  //setTotalNotifications(sum);
                  //console.log(sum);
              })
              .catch(error => {
                  // Handle error
              });
      }
  }, [historyCount, currentUser, init]); // location.pathname
  

  const makeAPICallProjects = async (route) => {
      fetch(url + route, {
          method: 'GET'
      })
      .then(response => response.json())
      .then(postsFromServer => {

          setProjects(postsFromServer);
      });
  }

  const handleProjectLoading = async () => {
      setProjectsLoading(true);
      await makeAPICallProjects('get-projects-by-user-id/' + currentUser.userId);
      setProjectsLoading(false);
  }


  const memoizedProjects = useMemo(() => {
  //useEffect( () => {
      if (currentUser){
        handleProjectLoading();
      }
  }, [projectChangeCount, currentUser]);




  
  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem('currentUser')));
    setCheckUser(1);
  }, []);


  const isSmallScreen = useMediaQuery('(max-width: 600px)');
  const isSmallScreen700px = useMediaQuery('(max-width: 700px)');
  const isSmallScreen800px = useMediaQuery('(max-width: 800px)');


  return (
    <ThemeProvider theme={theme}>
      {location.pathname !== '/login' && location.pathname !== '/' &&
      <TopNavBar setUser={setCurrentUser} user={currentUser} init={init} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} totalNotifications={totalNotifications} setTotalNotifications={setTotalNotifications}/>
      }
      <div style={{ display: 'flex' }}>
        {paths.includes(location.pathname) && sidebarOpen && location.pathname !== '/login' && location.pathname !== '/' && (
          <div>
            <SideNavBar user={currentUser} />
          </div>
        )}

        <div style={{ width: '100%', marginLeft: (sidebarOpen && location.pathname !== '/login' && location.pathname !== '/') ? '120px' : '0px' }}>
          <Routes>
            {/* Define your routes here */}
            <Route path="/home" element={<Home isSmallScreen={isSmallScreen} totalNotifications={totalNotifications}/>} />
            <Route path="/projects" element={<Projects projects={projects} loading={projectsLoading} changeCount={projectChangeCount} user={currentUser} setUser={setCurrentUser} isSmallScreen={isSmallScreen}/>} />
            <Route path="/projectDetails" element={<ProjectDetails user={currentUser} changeCount={projectChangeCount} setChangeCount={setProjectChangeCount} ticketChangeCount={ticketChangeCount} setTicketChangeCount={setTicketChangeCount} userChangeCount={userChangeCount} setUserChangeCount={setUserChangeCount}/>} />
            <Route path="/ticketDetails" element={<TicketDetails user={currentUser} ticketChangeCount={ticketChangeCount} setTicketChangeCount={setTicketChangeCount}/>} />
            <Route path="/addTicket" element={<AddTicket user={currentUser} ticketChangeCount={ticketChangeCount} setTicketChangeCount={setTicketChangeCount}/>} />
            <Route path="/editTicket" element={<EditTicket user={currentUser} ticketChangeCount={ticketChangeCount} setTicketChangeCount={setTicketChangeCount}/>} />
            <Route path="/addProject" element={<AddProject user={currentUser} changeCount={projectChangeCount} setChangeCount={setProjectChangeCount}/>} />
            <Route path="/editProject" element={<EditProject user={currentUser} changeCount={projectChangeCount} setChangeCount={setProjectChangeCount}/>} />
            <Route path="/projectHistory" element={<ProjectHistory user={currentUser} />} />
            <Route path="/login" element={<Login user={currentUser} setUser={setCurrentUser} init={init} setInit={setInit} setTotalNotifications={setTotalNotifications}/>} />
            <Route path="/addProjectUser" element={<AddProjectUser userChangeCount={userChangeCount} setUserChangeCount={setUserChangeCount} isSmallScreen={isSmallScreen}/>} />
            <Route path="/removeProjectUser" element={<RemoveProjectUser userChangeCount={userChangeCount} setUserChangeCount={setUserChangeCount}/>} />
            <Route path="/ticketHistoryDetails" element={<TicketHistoryDetails user={currentUser} ticketChangeCount={ticketChangeCount} setTicketChangeCount={setTicketChangeCount}/>} />
            <Route path="/profile" element={<UserProfile user={currentUser} isSmallScreen={isSmallScreen800px} />} />
            <Route path="/profileHistory" element={<UserProfileHistory user={currentUser} />} />
            <Route path="/editUserProfile" element={<EditUserProfile user={currentUser} setUser={setCurrentUser} />} />
            <Route path="/myTickets" element={<MyTickets user={currentUser} setUser={setCurrentUser} projects={projects} isSmallScreen={isSmallScreen}/>} />
            <Route path="/myProjectTickets" element={<MyProjectsTickets user={currentUser} setUser={setCurrentUser} isSmallScreen={isSmallScreen800px}/>} />
            <Route path="/manageUsers" element={<ManageProjectUsers user={currentUser} setUser={setCurrentUser} isSmallScreen={isSmallScreen}/>} />
            <Route path="/editUserRole" element={<EditUserRole userChangeCount={userChangeCount} setUserChangeCount={setUserChangeCount}/>} />
            <Route path="/myActions" element={<MyActions user={currentUser} projects={projects} isSmallScreen={isSmallScreen}/>} />
            <Route path="/notifications" element={<Notifications user={currentUser} setUser={setCurrentUser} projects={projects} readCounts={readCounts} isSmallScreen={isSmallScreen}/>} />
            <Route path="/notificationsHistory" element={<NotificationsHistory user={currentUser} setUser={setCurrentUser} historyCount={historyCount} setHistoryCount={setHistoryCount}/>} />
            <Route path="/dashboard" element={<Dashboard user={currentUser} />} />
            <Route path="/" element={<Login user={currentUser} setUser={setCurrentUser} init={init} setInit={setInit} setTotalNotifications={setTotalNotifications}/>} />
            <Route path="*" element={<Login user={currentUser} setUser={setCurrentUser} init={init} setInit={setInit} setTotalNotifications={setTotalNotifications}/>} />
          </Routes>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
