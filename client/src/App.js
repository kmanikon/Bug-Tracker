import React, { useState, useEffect } from 'react';
import './App.css';
import { Navigate, Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import StickyBox from "react-sticky-box";
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
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem('currentUser')));
    setCheckUser(1);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {location.pathname !== '/login' && location.pathname !== '/' &&
      <TopNavBar setUser={setCurrentUser} user={currentUser} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      }
      <div style={{ display: 'flex' }}>
        {paths.includes(location.pathname) && sidebarOpen && (
          <div>
            <SideNavBar user={currentUser} />
          </div>
        )}

        <div style={{ width: '100%', marginLeft: sidebarOpen ? '120px' : '0px' }}>
          <Routes>
            {/* Define your routes here */}
            <Route path="/home" element={<Home />} />
            <Route path="/projects" element={<Projects user={currentUser} setUser={setCurrentUser} />} />
            <Route path="/projectDetails" element={<ProjectDetails user={currentUser} />} />
            <Route path="/ticketDetails" element={<TicketDetails user={currentUser} />} />
            <Route path="/addTicket" element={<AddTicket user={currentUser} />} />
            <Route path="/editTicket" element={<EditTicket user={currentUser} />} />
            <Route path="/addProject" element={<AddProject user={currentUser} />} />
            <Route path="/editProject" element={<EditProject user={currentUser} />} />
            <Route path="/projectHistory" element={<ProjectHistory user={currentUser} />} />
            <Route path="/login" element={<Login user={currentUser} setUser={setCurrentUser} />} />
            <Route path="/addProjectUser" element={<AddProjectUser />} />
            <Route path="/removeProjectUser" element={<RemoveProjectUser />} />
            <Route path="/ticketHistoryDetails" element={<TicketHistoryDetails user={currentUser} />} />
            <Route path="/profile" element={<UserProfile user={currentUser} />} />
            <Route path="/profileHistory" element={<UserProfileHistory user={currentUser} />} />
            <Route path="/editUserProfile" element={<EditUserProfile user={currentUser} setUser={setCurrentUser} />} />
            <Route path="/myTickets" element={<MyTickets user={currentUser} setUser={setCurrentUser} />} />
            <Route path="/myProjectTickets" element={<MyProjectsTickets user={currentUser} setUser={setCurrentUser} />} />
            <Route path="/manageUsers" element={<ManageProjectUsers user={currentUser} setUser={setCurrentUser} />} />
            <Route path="/editUserRole" element={<EditUserRole />} />
            <Route path="/myActions" element={<MyActions user={currentUser} />} />
            <Route path="/notifications" element={<Notifications user={currentUser} setUser={setCurrentUser} />} />
            <Route path="/notificationsHistory" element={<NotificationsHistory user={currentUser} setUser={setCurrentUser} />} />
            <Route path="/dashboard" element={<Dashboard user={currentUser} />} />
            <Route path="/" element={<Login user={currentUser} setUser={setCurrentUser} />} />
            <Route path="*" element={<Login user={currentUser} setUser={setCurrentUser} />} />
          </Routes>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
