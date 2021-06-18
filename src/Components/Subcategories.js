import React, { Component } from 'react'
import './Subcategories.css'
import {BrowserRouter as Router,NavLink} from 'react-router-dom'


const Subcategories = React.forwardRef((props,ref)=>{

    return (
            

        <Router>
            <div className='sub-cat-container'>
                
                <NavLink 
                    exact activeClassName='activeClass' 
                    to={`/events/${props.category}/Upcoming`} 
                    onClick={()=>{
                            props.changeSubCategory('Upcoming');
                        }
                    } 
                    ref ={ref}>Upcoming</NavLink>

                <NavLink 
                    exact activeClassName='activeClass' 
                    to={`/events/${props.category}/Archived`} 
                    onClick={()=>{
                        props.changeSubCategory('Archived');
                        }
                    }
                >Archieved</NavLink>

                <NavLink 
                    exact activeClassName='activeClass' 
                    to={`/events/${props.category}/All Time Favorites`}
                    onClick={()=>{
                        props.changeSubCategory('All Time Favorites');
                        }
                    }
                >All Time Favourites</NavLink>
            </div>
        </Router>
        
    )
})


export default Subcategories
