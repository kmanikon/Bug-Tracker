import React, { useEffect, useMemo, useState, useRef } from 'react'
import { useTable } from 'react-table'
import { Link } from 'react-router-dom';
import { CardActions, CardContent, CardMedia, Button, Typography, Box } from '@material-ui/core/';
import ProjectDetails from '../../Pages/ProjectDetails';
import './styles.css';
import useStyles from './styles';


/*

    Project Select Table: (old)


*/



// table columns headers

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






const Card = ({projects, changeCount}) => {

    const classes = useStyles();
    const ref = useRef(null);
    
    const columns = useMemo(() => COLUMNS, []);
    var data = useMemo(() => projects, [projects]); 

    const tableInstance = useTable({
        columns,
        data
    })

    const { getTableProps, getTableBodyProps, headerGroups, footerGroups, rows, prepareRow} = tableInstance



    return (
        <>
            <table {...getTableProps()} >
            <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row)
                    return (
                        <>
                            <div className={classes.projectInfo}>
                                <div className="projectsTitle">Project Details</div>
                            </div>

                            <Card className={classes.headerCard} ref={ref}>
            
                            <div style={{display: 'flex'}}>

                                <div style={{width: '35%', display: 'block'}}>
                                    <Box className={classes.title} variant="h5" gutterBottom >Title</Box>
                                    <Box className={classes.subTitle} variant="h5" gutterBottom>{row.projectName}</Box>
                                </div>
                            
                                <div style={{width: '35%', display: 'block'}}>
                                    <Box className={classes.titleRight} variant="h5" gutterBottom >Description</Box>
                                    <Box className={classes.subTitleRight} variant="h5" gutterBottom>{row.description}</Box>
                                </div>

                            </div>

                            <div style={{ marginBottom: '20px'}}></div>
                    
                            </Card>
                        </>
                        )
                    })
                }
            </tbody>

            </table>

        </>
    )
}

export default Card