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

    var { innerWidth: width, innerHeight: height } = window;
    width -= 200

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
        <div style={{ width: '100%', marginLeft: '20px'}}>
            <div style={{marginTop: '110px'}}></div>

            <Button color="black" size="large" variant="outlined"
                style={{
                    marginTop: '0px',
                    marginLeft: '20px',
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



            <div style={{width: '93%'}}>
                    <div className="table-container">
                        <div style={{marginLeft: '20px',
                            marginBottom: '20px',
                            marginRight: '20px',
                            fontWeight: 'bold',
                            fontSize: 'large',
                            marginTop: '20px',
                            marginLeft: '40px'
                            }}
                        >
                            Project Users
                        </div>

                        
                        
                        <div>
                        {user ?
                        <>
                        {user.accessIdList.includes(project.projectId) ?
                        <>
                        <Button variant="outlined" style={{
                                fontWeight: 'bold',
                                fontSize: 'medium',
                                marginRight: '20px'
                            }}
                            onClick={routeChangeUser}
                        >
                            Add User
                        </Button>

                        <Button variant="outlined" style={{
                                fontWeight: 'bold',
                                fontSize: 'medium',
                                marginRight: '-20px'
                            }}
                            onClick={routeChangeUserRemove}
                        >
                            Remove User
                        </Button>

                        <Button variant="outlined" style={{
                                fontWeight: 'bold',
                                fontSize: 'medium',
                                marginLeft: '40px'
                            }}
                            onClick={routeChangeUserRole}
                        >
                            Change User Roles
                        </Button>
                        </>
                        : null}
                        </> 
                        : null}
                        </div>

                        
                        
                        

                    </div>
                    </div>


                    <UserTable users={projectUsers} project={project} changeCount={changeCount}/>


        </div>
    )
}

export default ManageProjectUsers