import React from 'react'
import { useLocation } from 'react-router-dom'

import TicketHistoryDetailsCard from '../Components/TicketHistoryDetailsCard/TicketHistoryDetailsCard';


/*

    Show more info about a project action from table

*/



const TicketHistoryDetails = ({user}) => {

    const location = useLocation();
    const { ticket, project, action, tickets, history, changeCount, userProfile } = location.state;

    return (
        <div style={{ marginLeft: '20px'}}>
                <div style={{marginTop: '90px'}}></div>

                {ticket ? 
                    <TicketHistoryDetailsCard action={action} user={user} ticket={ticket} project={project} tickets={tickets} history={history} changeCount={changeCount} userProfile={userProfile}/>
                    :
                    null
                }
        </div>
    )
}

export default TicketHistoryDetails