import { Component } from 'react'
import { MdDelete } from "react-icons/md";
import Cookies from 'js-cookie'
import { Redirect } from 'react-router-dom'
import Header from '../Header'
import './index.css'

class Note extends Component {

    state =  {
        notes: [],
        title: '',
        details: '',
        searchInputs: '',
        showCreateNote: false
    }

    componentDidMount() {
        this.getNoteDetails()
    }

    addNotes = () => {
      this.setState(prevState => ({showCreateNote: !prevState.showCreateNote}))
    }

    handleSearchNotes = (event) => {
        this.setState({searchInputs: event.target.value })
    }

    handleDeleteNote = (id) => {
        const {notes} = this.state
        const remaingNotes = notes.filter(eachNote => eachNote.id !== id)
        this.setState({notes: remaingNotes})
    }

    handleSaveBtn = async () => {
        const {title ,details} = this.state
        const newNote = { title, details}
        const url = 'https://finalnotebackend-3.onrender.com/notes'
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'

            },
            body: JSON.stringify(newNote)
        }

        const response = await fetch( url, options )
        if (response.ok){
            console.log(response)
            this.setState({showCreateNote: false}, this.getNoteDetails)
        } else {
            console.error("Error saving note:", response.status)
        }


    }

    onChangeTitle = event => this.setState({title: event.target.value})

    onChangeNoteDetails = event => this.setState({details: event.target.value})


    getNoteDetails = async () => {
        const JwtToken = Cookies.get('jwtToken')
        console.log(JwtToken)
        const url = 'https://finalnotebackend-3.onrender.com/notes'
        const options = {
            method:"GET",
            headers: {
                Authorization: `Bearer ${JwtToken}`
            }
        }

        const response = await fetch(url,options)

        if (!response.ok) {
            console.error("Failed to fetch notes:", response.status);
        }

        const fetchData = await response.json()
        console.log(fetchData)
        this.setState({notes: fetchData})

    }

    renderCreateNote = () => {
        return(
            <div className='create-note-container'>
                <h2 className='create-title'>Create New Note</h2>
                <input type="text" placeholder='Write Title' className='details-input' onChange = {this.onChangeTitle} />
                <textarea type='text' placeholder='Write Content' className='textarea' onChange =  {this.onChangeNoteDetails} />
                <button type='button' className='savebtn' onClick={this.handleSaveBtn} >
                    Save
                </button>
            </div>
        )
    }

    render(){
        const { notes , searchInputs , showCreateNote } = this.state
        const filteredNoteList = Array.isArray(notes)
            ? notes.filter(eachNote =>
                eachNote.title && eachNote.title.toLowerCase().includes(searchInputs.toLowerCase())
            )
            : [];
        console.log(notes)

        const jwtToken = Cookies.get('jwttoken')
        if (!jwtToken) {
            return <Redirect to='/login' />
        }

        return(
            <>
             <Header addNotes = { this.addNotes } />
           <div className="note-container" >

               <input type="search" className = "note-search-input" placeholder = "Search Notes.." onChange = {this.handleSearchNotes} />
               {showCreateNote && this.renderCreateNote()}
                {filteredNoteList.map(eachNotesList => (
                    <div className = "noteCard" key = {eachNotesList.id} >
                       <div className="note-details-container">
                        <div className='ntd-section' >
                        <h1 className = "note-title" > {eachNotesList.title} </h1>
                        <MdDelete className='delete-icon' onClick = {() => this.handleDeleteNote(eachNotesList.id)}/>
                        </div>
                        <p className = "note-descrption"> {eachNotesList.content} </p>
                       </div>
                    </div>
                ))}

           </div>
           </>
        )
    }
}

export default Note
