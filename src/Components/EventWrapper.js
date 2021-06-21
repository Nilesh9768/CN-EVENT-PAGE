import React, { Component } from 'react'
import {BrowserRouter as Router,Route,Switch,Redirect} from 'react-router-dom'
import AllEvents from './AllEvents'
import './EventWrapper.css'
import ReactPaginate from 'react-paginate';
class EventWrapper extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             events:[],
             selectedTags:[],
            
        }
    }
    
    static getDerivedStateFromProps(props,state){

        return({
            events : props.events,
            selectedTags:props.selectedTags
        })
        
    }
    render() {
        return (
            
                <div className='event-wrapper'>
                    <Router>
                        <Switch>
                            <Route path={`/events/${this.props.category}/${this.props.subCategory}`}>
                                <AllEvents events={this.state.events} tags={this.state.selectedTags}/>
                            </Route>
                            <Route path={'/'}>
                                <Redirect to={`/events/${this.props.category}/${this.props.subCategory}`} />
                            </Route>
                            <Route path={`/events/${this.props.category}/${this.props.subCategory}/${this.props.selectedTags}`}>
                                <AllEvents events={this.state.events}  tags={this.props.selectedTags}/>
                            </Route>
                        </Switch>
                    </Router>
                    {
                        

                        this.state.events.length !==0 ?
                        <ReactPaginate className='page-container'
                        previousLabel={"←"}
                        nextLabel={"→"}
                        pageCount={this.props.pageCount}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={0}
                        onPageChange={this.props.handlePageClick}
                        containerClassName={"pagination"}
                        previousLinkClassName={"pagination__link"}
                        nextLinkClassName={"pagination__link"}
                        disabledClassName={"pagination__link--disabled"}
                        activeClassName={"pagination__link--active"}/>:null
                    }
                </div>
        )
    }
}

export default EventWrapper
