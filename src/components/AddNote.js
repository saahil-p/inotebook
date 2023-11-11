import React, { useContext ,useState} from 'react'
import NoteContext from '../context/notes/noteContext'

const AddNote = (props) => {
    const context = useContext(NoteContext)
    const {addNote} = context;

    const [note,setNote] = useState({"title": "","description": "","tag":""})
    const newnotehandler = (e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag)
        setNote({"title": "","description": "","tag":""})
        props.showAlert("Note Added Successfully","success") 
    }

    const onChangeHandler = (e)=>{
        setNote({...note,[e.target.name]: e.target.value})
    }
    return (
        <div>
            <h1>Add a Note</h1>

            <div className="container">
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value = {note.title}  onChange={onChangeHandler} minLength={5} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="desc" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name="description" value = {note.description} onChange={onChangeHandler} minLength={5} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" value = {note.tag} onChange={onChangeHandler}/>
                    </div>
                    <button disabled = {note.title.length < 5 || note.description.length < 5 || note.tag.length < 3} type="submit" className="btn btn-primary" onClick={newnotehandler}>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote
