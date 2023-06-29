import React ,{useState,useContext} from 'react'
import noteContext from "../context/notes/noteContext"
// import Notes from './Notes';
function Addnote() { 
    const context = useContext(noteContext);
  const{addNote}=context
  const [note, setNote] = useState({title:"",description:"",tag:""})
  const handleclick=(e)=>{
    e.preventDefault()
addNote(note.title,note.description,note.tag);
setNote({title:"",description:"",tag:""})
  }
  const onChange=(e)=>{
    
    setNote({...note,[e.target.name]:e.target.value})
 
  }
  return (
    <div><div className="container my-3">
    <h1>Add a Note</h1>

    <form>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          aria-describedby="emailHelp"
          name="title"
          onChange={onChange}
          minLength={5} required
          value={note.title}
        />
        
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <input
          type="Text"
          className="form-control"
          id="description"
          onChange={onChange}
          name="description"
          value={note.description}
          
                    minLength={5} required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="tag" className="form-label">
          tag
        </label>
        <input
          type="Text"
          className="form-control"
          id="tag"
          onChange={onChange}
          name="tag"
          value={note.tag}
        />
      </div>
      
      <button disabled= {note.title.length<5||note.description.length<5}type="submit" className="btn btn-primary" onClick={handleclick}>
        Add
      </button>
    </form>
  </div></div>
  )
}

export default Addnote