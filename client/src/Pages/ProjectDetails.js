import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import TopNavBar from '../Components/TopNavBar/TopNavBar'
import ProjectDetailsCard from '../Components/ProjectDetailsCard/ProjectDetailsCard'



/*

  From My projects select, show extra info + options for a project 

*/




const ProjectDetails = ({user}) => {

  const location = useLocation();
  var { project, changeCount } = location.state;

  

  




  return (
    <div style={{ minWidth: '900px'}}>
        <div style={{marginTop: '110px'}}></div>

        <div style={{marginLeft: '20px'}}>
          <ProjectDetailsCard project={project} changeCount={changeCount} user={user} />
        </div>
    </div>
  )
}

export default ProjectDetails