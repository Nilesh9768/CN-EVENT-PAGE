
import React, { Component } from 'react'
import './FilterEvents.css'
import {BrowserRouter as Router,Link} from 'react-router-dom'

class FilterEvents extends Component {

    constructor(props) {
        super(props)
        this.filterContainer = React.createRef();
        this.state = {
             show:false,
             tags:[]
        }
    }

    componentDidMount(){
        fetch('https://api.codingninjas.com/api/v3/event_tags').then((response)=>{
            response.json().then((result)=>{
                this.setState({tags:result.data.tags})
            })
        })
    }

    showTags=(e)=>{
        this.setState({show:true})
    }
    hideTags =() =>{
        this.setState({show:false})
    }

    render() {

        return (
            this.state.show ?
            <div className='filter-main-container'>
                
                    <div className='filter-events-container-header' ref={this.filterContainer}>
                        <div className='filter-events-h'>
                            <img onClick={()=>{this.hideTags(); this.props.showEvents()}} className='filter-icon' src='https://www.codingninjas.com/assets-landing/images/events-back.svg' alt=''/>
                            <p className='header-p'>Filter Events</p>
                        </div>  
                    </div>
                    
                    {this.state.show ?<div className='tag-container-mobile'>
                    {
                        this.state.tags.map((tag,i)=>
                            <div key={tag}>
                                <Router>
                                    <Link
                                        className='tag-link' 
                                        to='#'>
                                        <p onClick={(e)=>this.props.addTags(e,tag)}>{tag}</p>
                                    </Link>
                                </Router>
                            </div>    
                        )
                    }
                    </div>:null}
                    <Router>
                        <Link to={`/events/${this.props.category}/${this.props.subCategory}`}>
                            <div className='filter-button' onClick={()=>{this.hideTags(); this.props.addTagsForMobile() ;this.props.showEvents()}}>
                                Apply Filter
                            </div>
                        </Link>
                    </Router>
            </div>
            :<div className='filter-events-container-footer' ref={this.filterContainer}>
                <div className='filter-events-f'>
                    <img onClick= {() =>{this.showTags(); this.props.hideEvents()}} className='filter-icon' src='https://www.codingninjas.com/assets-landing/images/filter-events-wave.svg' alt=''/>
                    <p className='footer-p' onClick={() =>{this.showTags(); this.props.hideEvents()}}>Filter Events</p>
                </div> 
            </div>
        )
    }
}

export default FilterEvents
