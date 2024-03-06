import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import TopNavBar from '../Components/TopNavBar/TopNavBar'
import ProjectDetailsCard from '../Components/ProjectDetailsCard/ProjectDetailsCard'



/*

  From My projects select, show extra info + options for a project 

*/




const ProjectDetails = ({user, changeCount, setChangeCount, ticketChangeCount, setTicketChangeCount, userChangeCount, setUserChangeCount}) => {

  const location = useLocation();
  var { project } = location.state;

  
  return (
    <div style={{ minWidth: '900px'}}>
        <div style={{marginTop: '110px'}}></div>

        <div style={{marginLeft: '20px'}}>
          <ProjectDetailsCard project={project} changeCount={changeCount} setChangeCount={setChangeCount} user={user} ticketChangeCount={ticketChangeCount} setTicketChangeCount={setTicketChangeCount} userChangeCount={userChangeCount} setUserChangeCount={setUserChangeCount}/>
        </div>
    </div>
  )
}

export default ProjectDetails