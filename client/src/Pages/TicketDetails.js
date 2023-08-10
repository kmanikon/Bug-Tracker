import React from 'react'
import { useLocation } from 'react-router-dom'

import TopNavBar from '../Components/TopNavBar/TopNavBar'

import TicketDetailsCard from '../Components/TicketDetailsCard/TicketDetailsCard'

/*
   page to display more info about a ticket from ticket table

*/


const TicketDetails = ({user}) => {


    const location = useLocation();
    const { ticket, ticketNum, project, devList, changeCount, myTickets } = location.state;

  
    
  
    return (
      <div style={{ marginLeft: '20px', marginRight: '20px'}}>
          <div style={{marginTop: '110px'}}></div>
  
          <div>
            <TicketDetailsCard ticket={ticket} ticketNum={ticketNum} project={project} devList={devList} changeCount={changeCount} user={user} myTickets={myTickets}/>
          </div>

          
      </div>
    )

}

export default TicketDetails