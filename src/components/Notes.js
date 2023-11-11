import { React, createRef, useContext, useEffect,useState } from 'react'
import NoteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';


const Notes = (props) => {
  const context = useContext(NoteContext);
  const { notes, fetchNote,editNote } = context;
  // const {showAlert} = props;
  const ref = createRef(null);
  const refClose = createRef(null);

  const updateNote = (currNote) => {
    ref.current.click();
    setNote({id: currNote._id,etitle:currNote.title,edescription:currNote.description,etag:currNote.tag})

  }
  
  const navigate = useNavigate()

  useEffect(() => {
    if(localStorage.getItem("token")){
        fetchNote()
    }
    else{
       navigate("/login")
    }
    // eslint-disable-next-line
  }, [])


  const [note, setNote] = useState({id:"", etitle: "", edescription: "",etag: "default" })



  const newnotehandler = (e) => {
    console.log("Updating the note....",note)
    editNote(note.id,note.etitle,note.edescription,note.etag)
    refClose.current.click();
    props.showAlert("Updated Successfully","success")
    e.preventDefault();
  }

  const onChangeHandler = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }


  return (
    <>
      <AddNote showAlert = {props.showAlert}/>
      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Edit Note
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" onChange={onChangeHandler} value={note.etitle} minLength={5} required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" onChange={onChangeHandler} value={note.edescription}  minLength={5} required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="e tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" onChange={onChangeHandler} value={note.etag} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled = {note.etitle.length < 5 | note.edescription.length < 5} type="button" className="btn btn-primary" onClick={newnotehandler}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h1>Your Notes</h1>
        <p>{notes.length === 0 && "No notes to display"}</p>
        {notes.map((note) => {
          return <NoteItem key={note._id} updateNote={updateNote} note={note} showAlert = {props.showAlert} />
        })}
      </div>
    </>
  )
}

export default Notes
