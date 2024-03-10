import React, { useMemo, useState, useRef } from 'react'
import { useTable } from 'react-table'
import { Link } from 'react-router-dom';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Box, TextField } from '@material-ui/core/';
import ProjectDetails from '../../Pages/ProjectDetails';
import './styles.css';
import useStyles from './styles';


/*

    Project Select Table: (new)


*/


// table column headers

const COLUMNS = [
    {
        Header: 'Project Name',
        accessor: 'projectName'
    },
    {
        Header: 'Description',
        accessor: 'description'
    }
];






const ProjectCard = ({projects, changeCount }) => {

    
    const [searchTerm, setSearchTerm] = useState('');

    var filteredProjects = projects;
    
    if (searchTerm !== ''){
    
        filteredProjects = projects.filter(project => project.projectName.includes(searchTerm));
    }
    else {
        filteredProjects = projects;
    }



    const classes = useStyles();
    const ref = useRef(null);
    
    const columns = useMemo(() => COLUMNS, []);
    var data = useMemo(() => filteredProjects, [projects, searchTerm]); 




    const tableInstance = useTable({
        columns,
        data
    })

    const { getTableProps, getTableBodyProps, headerGroups, footerGroups, rows, prepareRow} = tableInstance




    return (
        <div>

            <TextField
                id="search-bar"
                className="text"
                onChange={(e) => setSearchTerm(e.target.value)}  
                value={searchTerm} 
                label="Search by Name"
                variant="outlined"
                placeholder="Search..."
                size="small"
                style={{
                    marginLeft: '50px',
                    marginBottom: '20px'
                }}
            />

            <table {...getTableProps()} style={{width: '93%'}}>


            <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row)
                    return (
                        <>
                            <div>
                                    
                                <Button style={{
                                    width: '100%', 
                                    display: 'block', 
                                    textAlign: 'left',
                                    textTransform: 'none'
                                }}
                        
                                >
                                    
                                <div style={{ marginTop: '20px'}}></div>
                                <Link to="/projectDetails" state={{ project: data[row.id], changeCount: changeCount }}>

                                <div className={classes.projectInfo}>
                                    <div className="projectsTitle">{filteredProjects[row.id].projectName}</div>
                                </div>

                                


                                
                                <Card className={classes.headerCard} ref={ref}>
                                    <div style={{display: 'flex'}}>
                                        <div style={{display: 'block'}}>
                                            <Box className={classes.subTitle} variant="h5" gutterBottom>{filteredProjects[row.id].description}</Box>
                                        </div>
                                    </div>
                                    <div style={{ marginBottom: '20px'}}></div>
                                </Card>
                                

                                
                                

                                <div style={{ marginBottom: '20px'}}></div>

                                </Link>
                                </Button>
                        
                            
                            </div>


                        </>
                        )
                    })
                }
            </tbody>

            </table>


        </div>
    )
}

export default ProjectCard