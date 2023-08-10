import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import ProjectHistoryTable from '../Components/ProjectHistoryTable/ProjectHistoryTable'
import { useNavigate } from "react-router-dom";


/*

    show project actions for a given project

*/


const ProjectHistory = ({user}) => {

    const location = useLocation();

    var { project, tickets, history, changeCount } = location.state;

    

    return (
        <div style={{ marginLeft: '20px'}}>
            <div style={{marginTop: '110px'}}></div>

            <ProjectHistoryTable project={project} history={history} tickets={tickets} changeCount={changeCount} user={user}/>
            
        </div>
    )
}

export default ProjectHistory