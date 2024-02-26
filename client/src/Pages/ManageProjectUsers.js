import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Box } from '@material-ui/core/';
import { useNavigate } from "react-router-dom";
import UserTable from '../Components/UserTable/UserTable';

import url from '../defs';

/*

    overview of project users
        - user table, links to add / remove users and edit roles

*/




const ManageProjectUsers = ({user}) => {

    const location = useLocation();
    var { project, devList, changeCount } = location.state;

    let navigate = useNavigate(); 

    const [projectUsers, setProjectUsers] = useState([]);


    const makeAPICallUsers = async (route) => {

    
        fetch(url + route, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(postsFromServer => {
            setProjectUsers(postsFromServer);
        });
    }

    useEffect( () => {
        if (user){
            makeAPICallUsers('get-users-by-project-id/' + project.projectId)
        }
    }, [changeCount, user])

    const routeChangeUser = () =>{ 
        let path = `/addProjectUser`; 
        navigate(path, {state:{'project': project, devList: devList, changeCount: changeCount, projectUsers: projectUsers}});
    }

    const routeChangeUserRemove = () =>{ 
        let path = `/removeProjectUser`; 
        navigate(path, {state:{'project': project, devList: devList, changeCount: changeCount}});
    }

    const routeChangeUserRole = () =>{ 
        let path = `/editUserRole`; 
        navigate(path, {state:{'project': project, devList: devList, changeCount: changeCount}});
    }


    return (
        <div style={{ width: 'calc(100% - 10px)', marginLeft: '10px'}}>
            <div style={{marginTop: '110px'}}></div>

            <Button color="black" size="large" variant="outlined"
                style={{
                    marginTop: '0px',
                    marginLeft: '30px',
                    marginBottom: '20px',
                    fontWeight: 'bold',
                    fontSize: 'large'
                }}
            >
            <Link to="/projectDetails" 
                state={{ project: project, changeCount: changeCount }} 
                style={{ textDecoration: 'none' }}>

                Back 
              
              </Link>
          </Button>

            <UserTable devList={devList} user={user} users={projectUsers} project={project} changeCount={changeCount}/>


        </div>
    )
}

export default ManageProjectUsers