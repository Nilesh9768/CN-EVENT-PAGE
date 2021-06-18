import React from 'react'
import './Categories.css'
import {BrowserRouter as Router,NavLink} from 'react-router-dom'
import DateRangeIcon from '@material-ui/icons/DateRange';
import CodeIcon from '@material-ui/icons/Code';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import DeveloperModeIcon from '@material-ui/icons/DeveloperMode';


const Categories=React.forwardRef((props,ref)=>{
    return (
        <Router>
            <div className='cat-container-wrapper'>
                <ul className='catContainer'>
                    <li className='categories' id='allEvents'>
                        <NavLink 
                            activeClassName='activeClass' 
                            to="/events/ALL_EVENTS/Upcoming" 
                            onClick={(e)=>{props.changeCategory(e,'ALL_EVENTS');}} 
                            ref={ref} >
                            <DateRangeIcon className='icon' id='allEvent-icon'/>All Events
                        </NavLink>
                    </li>

                    <li className='categories'>
                        <NavLink 
                            activeClassName='activeClass' 
                            to="/events/WEBINAR/Upcoming"
                            onClick={(e)=>{props.changeCategory(e,'WEBINAR');}
                            }>
                            <LaptopMacIcon className='icon'/> Webinars
                        </NavLink>
                    </li>
                    <li className='categories'>
                        <NavLink 
                            activeClassName='activeClass' 
                            to="/events/CODING_EVENT/Upcoming"
                            onClick={(e)=>{props.changeCategory(e,'CODING_EVENT');}
                            }>
                            <CodeIcon className='icon'/> Coding Events
                        </NavLink>
                    </li>
                    <li className='categories' id='bootcamp'>
                        <NavLink 
                            activeClassName='activeClass' 
                            to="/events/BOOTCAMP_EVENT/Upcoming"
                            onClick={(e)=>{props.changeCategory(e,'BOOTCAMP_EVENT');}
                            }>
                            <DeveloperModeIcon className='icon' /> Bootcamp Events
                        </NavLink>
                    </li>
                    <li className='categories'>
                        <NavLink 
                            activeClassName='activeClass' 
                            to="/events/WORKSHOP/Upcoming"
                            onClick={(e)=>{props.changeCategory(e,'WORKSHOP');}
                            }>
                            <LaptopMacIcon className='icon' id='workshop-icon'/>Workshops
                        </NavLink>
                    </li>
                </ul>
            </div>
        </Router>
        
    )
})



export default Categories
