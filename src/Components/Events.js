import React,{Component } from 'react'
import Categories from './Categories'
import Subcategories from './Subcategories'
import EventWrapper from './EventWrapper'
import Tags from './Tags'
import './EventWrapper.css'
class Events extends Component {

    constructor(props) {
        super(props)
        this.catRef = React.createRef();
        this.subCatRef = React.createRef();
        
        this.prevCategory = localStorage.getItem('prevCategory') || 'ALL_EVENTS'
        this.prevSubCategory = localStorage.getItem('prevSubCategory') || 'Upcoming'

        this.state = {
            category:this.prevCategory, 
            sub_category:this.prevSubCategory,
            events:[],
            copiedEvents:[],
            selectedTags:[],

            perPage: 20,
            currentPage: 1,
            offset:0,
            pageCount:0
        }
    }

    setCategory =(category) =>{
        localStorage.setItem('prevCategory',category)
    }

    setSubCategory =(subCategory) =>{
        localStorage.setItem('prevSubCategory',subCategory)
    }

    changeCategory = (e,Category) =>{

        if(Category!=='ALL_EVENTS'){
            this.catRef.current.style.color ='#9e9e9e';
            this.catRef.current.style.fontWeight='400';
            
        }else{
            this.catRef.current.style.color ='#f9601e';
            this.catRef.current.style.fontWeight='600';
        }
        this.subCatRef.current.style.color ='#f9601e';
        this.subCatRef.current.style.fontWeight='600';

        this.setState({category:Category,sub_category:'Upcoming'},()=>{
            this.fetchEvents()
        })
        this.setCategory(Category);
        this.setSubCategory('Upcoming');
    }
    changeSubCategory = (subcategory) =>{

        if(subcategory!=='Upcoming'){
            this.subCatRef.current.style.color ='#9e9e9e';
            this.subCatRef.current.style.fontWeight='400';
            
        }else{
            this.subCatRef.current.style.color ='#f9601e';
            this.subCatRef.current.style.fontWeight='600';
        }
        this.setState({sub_category:subcategory},()=>{
            this.fetchEvents()
        })
        this.setSubCategory(subcategory);
    }

    addTags = (e,tag) =>{
        console.log(tag)
        let newTagsArray;
        if(this.state.selectedTags.includes(tag)){
            newTagsArray = this.removeTag(e,tag);
        }else{
            newTagsArray= this.pushTagInArray(e,tag)
        }
        
        this.setState({selectedTags:newTagsArray},()=>{
                
            if(this.state.selectedTags.length===0){
                this.setState({events:this.state.copiedEvents});
            }else{
                let updatedEvents=this.state.copiedEvents.filter((event)=>{
                    return event.card_tags.some((t)=>this.state.selectedTags.includes(t));
                })
                this.setState({events:updatedEvents});
            }
                
        });
        
    }

    pushTagInArray=(e,tag)=>{
        this.state.selectedTags.push(tag); 
        e.target.style.color ='#fff';
        e.target.style.backgroundColor ='#fa7328';
        console.log(e.target)
        return this.state.selectedTags;
    }

    removeTag = (e,tag) =>{
        let ind = this.state.selectedTags.indexOf(tag);
        this.state.selectedTags.splice(ind,1);
        e.target.style.color ='#5c5c5d';
        e.target.style.backgroundColor ='rgb(241, 241, 241)';
        console.log(e.target)
        return this.state.selectedTags;
    }
    fetchEvents=()=>{

        console.log(this.state.category , this.state.sub_category)
        
        fetch(
            `https://api.codingninjas.com/api/v3/events?event_category=${this.state.category}&event_sub_category=${this.state.sub_category}&tag_list=Career Guidance,Coding Concepts,Competitive Programming,Futuristic Tech&offset=0`
        ).then((response)=>{
            response.json().then((result)=>{
                
                const slicedEvents =result.data.events.slice(this.state.offset, this.state.offset + this.state.perPage)
                this.setState({
                    events:slicedEvents,
                    copiedEvents:result.data.events,
                    pageCount: Math.ceil(result.data.events.length / this.state.perPage)
                })
                
            })
        }).catch((err)=>console.log(err))
    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.fetchEvents()
        });

    };
    
    componentDidMount(){

        if(this.state.category === 'ALL_EVENTS'){
            this.catRef.current.style.color ='#f9601e';
            this.catRef.current.style.fontWeight='600';
        }
        
        if(this.state.sub_category==='Upcoming'){
            this.subCatRef.current.style.color ='#f9601e';
            this.subCatRef.current.style.fontWeight='600';
        }
        

        this.fetchEvents();
    }
    render() {
        
        return (
            
            <div>
                
                <Categories 
                changeCategory={this.changeCategory} 
                ref={this.catRef}/>

                <Subcategories 
                changeSubCategory={this.changeSubCategory} 
                category={this.state.category} 
                ref={this.subCatRef}/>

                <div className='event-tag-wrapper'>
                    <EventWrapper 
                    selectedTags={this.state.selectedTags} 
                    events={this.state.events} 
                    category={this.state.category} 
                    subCategory={this.state.sub_category}
                    handlePageClick={this.handlePageClick}
                    pageCount={this.state.pageCount}/>

                    <div className='tag-wrapper'>
                        <Tags selectedTags={this.state.selectedTags} addTags={this.addTags} category={this.state.category} subCategory={this.state.sub_category}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Events
