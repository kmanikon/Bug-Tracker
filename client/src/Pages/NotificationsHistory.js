import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import NotificationsTable from '../Components/NotificationsTable/NotificationsTable'
import { useNavigate } from "react-router-dom";

import url from '../defs';

/*

    show notifications for a given project

*/



const NotificationsHistory = ({user}) => {

    var { innerWidth: width, innerHeight: height } = window;
    width -= 200

    const location = useLocation();

    const [tickets, setTickets] = useState([]);
    const [history, setHistory] = useState([]);

    const makeAPICallPosts = async (route) => {

    
        fetch(url + route, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(postsFromServer => {
            // keep an eye of this
            //const formatTickets = postsFromServer.map((obj, index) => ({ ...obj, index }));
            setTickets(postsFromServer);
        });
    }

    const makeAPICallActions = async (route) => {

    
        fetch(url + route, {
            method: 'GET' 
        })
        .then(response => response.json())
        .then(postsFromServer => {
  
  
            var myunreads = postsFromServer.filter(post => post.asignedDevUid == user.userId && post.read == false)

            setHistory(myunreads.sort(function(a,b){
                // Turn your strings into dates, and then subtract them
                // to get a value that is either negative, positive, or zero.
                return new Date(b.date) - new Date(a.date);
              }));
  
            //setActions(postsFromServer);
        });
    }

    

    var { project, changeCount } = location.state;


    var filteredHistory = history.filter(history => history.projectId === project.projectId);

    useEffect(() => {
        if (user){
            makeAPICallActions('get-actions-by-project-id-notifications/' + project.projectId)
            makeAPICallPosts('get-posts-by-project-notifications/' + project.projectId);
        }
    }, [user])
 


    return (
        <div style={{ width: width, marginLeft: '20px'}}>
            <div style={{marginTop: '110px'}}></div>

            
            <NotificationsTable project={project} history={filteredHistory} tickets={tickets} changeCount={changeCount} />
 

        </div>
    )
}

export default NotificationsHistory