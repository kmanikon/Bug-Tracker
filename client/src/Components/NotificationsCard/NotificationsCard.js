import React, { useMemo, useState, useRef } from 'react'
import { useTable } from 'react-table' 
import { Link } from 'react-router-dom';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Box, TextField } from '@material-ui/core/';
import './styles.css';
import useStyles from './styles';

/*

    project select from notifications page

*/



// column headers
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



const NotificationsCard = ({projects, notifCounts, changeCount}) => {
    
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

            <table {...getTableProps()} >


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
                            
                            <Link to="/notificationsHistory" state={{ project: data[row.id], changeCount: changeCount }}>
                            
                            
                            
                            <div className={classes.projectInfo}>
                                
                                <div className="projectsTitle">
                                    
                                    
                                    <div style={{position: 'relative'}}>
                                        {filteredProjects[row.id].projectName} 

                                        {notifCounts[row.id] !== 0 ? 
                                        <span class="icon-button__badge" style={{
                                            position: 'absolute',
                                            top: '-12px',
                                            right: '100%',
                                            width: '30px',
                                            height: '30px',
                                            background: 'red',
                                            color: '#ffffff',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            borderRadius: '50%'
                                        }}>{notifCounts[row.id]}</span>
                                        : null
                                        }


                                    </div>
                                    
                                
                                
                                </div>
                                
                                
                            </div>
                            

                            


                            
                            <Card className={classes.headerCard} ref={ref}>
                                <div style={{display: 'flex'}}>
                                    <div style={{width: '35%', display: 'block'}}>
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

export default NotificationsCard