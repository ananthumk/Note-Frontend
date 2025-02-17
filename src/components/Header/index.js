import './index.css'

const Header = ({addNotes}) => {
  
 

  const addNewNote = () => {
    addNotes()
  } 
    
  return(
    <div className="header-container">
       <h1 className="note-header-title">My Notes</h1>
       <button className="newNoteBtn" onClick = {addNewNote} >
           + New Note
       </button>
    </div>
  )
}

export default Header