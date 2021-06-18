import React, { Component } from 'react'
import EventCard from './EventCard'
import './AllEvents.css'
class AllEvents extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             events:[]
        }
    }
    
    static getDerivedStateFromProps(props,state){

        return{
            events:props.events
        }
    }
    
    render() {
        if(this.state.events.length!==0){
            return (
                <div className='event-container'>
                    {    
                        this.props.events.map((event)=>{
                        return <EventCard key={event.id} eventData={event}/>
                        })
                    }  
                </div>
            )
        }else{
            return(
                <h1>No Events Found!</h1>
            )
        }
    }
}

export default AllEvents
