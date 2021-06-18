import React, { Component } from 'react'
import './Tags.css'
import {BrowserRouter as Router,Link} from 'react-router-dom'
export class Tags extends Component {

    constructor(){

        super()
        this.state={
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
    render() {
        return (
            <div>
                {
                    this.state.tags.map((tag,i)=>
                        <div key={tag}>
                            <Router>
                                <Link 
                                    className='tagLink' 
                                    to={`/events/${this.props.category}/${this.props.subCategory}`}>
                                    <p onClick={(e)=>this.props.addTags(e,tag)} className='tags'>{tag}</p>
                                </Link>
                            </Router>
                        </div>    
                    )
                }
            </div>
        )
    }
}

export default Tags
