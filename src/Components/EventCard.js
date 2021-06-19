import React, { Component } from 'react'
import './EventCard.css'
import Tippy from '@tippyjs/react'
// import Tippy from '@tippyjs/react/headless';
// import 'tippy.js/dist/tippy.css';
class EventCard extends Component {

    convertTimeStamp=(timeStamp)=>{

        let months =  ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
         "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let date = new Date(timeStamp*1000);

        let dd = date.getDate()
        let mon = months[date.getMonth()];
        let year = date.getFullYear();
        let hh = date.getHours();
        let min = date.getMinutes();
        let ampm = hh>=12?'PM':'AM'
        hh= hh%12;
        hh = hh?hh:12;
        hh = hh<10?'0'+hh:hh;
        min = min<10?'0'+min:min

        return(`${hh}:${min} ${ampm},${dd} ${mon} ${year}`)
    }
    render() {
        const {eventData} =this.props
        const fees = eventData.fees===0?'Free':eventData.fees
        return (
            <div className='event-card'>
                <div className='cover-picture-container'>
                    <img src={eventData.cover_picture} alt=''/>
                    {Date.now()>= eventData.registration_start_time*1000 && Date.now() < eventData.registration_end_time*1000 ?
                    <div className='circle-container'>
                        <div className='circle'></div>
                       <p className='registration-end-time'>Registration <strong>open</strong> till <strong>{this.convertTimeStamp(eventData.registration_end_time)}</strong></p>
                    </div>:null
                    }
                    
                </div>
                
                <div className='event-details'>
                    <p className='event-name'>{eventData.name}</p>
                    <div className='about-event'>
                        <div className='time-container'>
                            <p className='start-fee-venue'>Starts on</p>
                            <p>{this.convertTimeStamp(eventData.event_start_time)}</p>
                        </div>
                        <div className='fee-container'>
                            <p className='start-fee-venue'>Entry Fee</p>
                            <p>{fees}</p>
                        </div>
                        <div className='venue-container'>
                            <p className='start-fee-venue'>Venue</p>
                            <p>{eventData.venue}</p>
                        </div>
                    </div>
                    <p className='description'>{eventData.short_desc}</p>
                    <div key={Math.random()} className='tags-container'>
                        {
                                eventData.card_tags.map(tag =>{
                                    return(<div key={tag} className='tag'>{tag}</div>)    
                                })    
                        }
                    </div>
                       
                </div> 
                <div className='footer'>
                        <div className='users-button-container'>
                            <div className='users-image-container'>
                                {
                                    eventData.registered_users.top_users.map(user=>{

                                    user.image_url =user.image_url===null?'https://files.codingninjas.in/0000000000001270.png':user.image_url;
                                        return(
                                            
                                            <div key={Math.random()} className='user-image-container'>
                                                <Tippy className='tooltip' content={user.name}>
                                                    <img className='user-image' src={user.image_url} alt=''/>
                                                </Tippy>
                                            </div>     
                                        )
                                    })
                                    
                                }
                            </div>
                            <div className='register-button'>
                               {Date.now()>= eventData.registration_start_time*1000 && Date.now() < eventData.registration_end_time*1000 ? <img src="https://files.codingninjas.in/0000000000001272.png" alt="" /> :null}
                            </div> 
                               
                        </div>
                        <p>and <strong>{eventData.registered_users.other_users_count}</strong> others registered</p>
                </div>   
            </div>
        )
    }
}

export default EventCard
