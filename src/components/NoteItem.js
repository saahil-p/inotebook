import React, { useContext } from 'react'
import NoteContext from '../context/notes/noteContext';

const NoteItem = (props) => {
    const { note , updateNote } = props;
    const context = useContext(NoteContext);
    const {deleteNote} = context;
    return (
        <div className='col-md-3'>
            <div className="card">
                    <div className="card-body my-3">
                        <h5 className="card-title">{note.title}</h5>
                        <p className="card-text">{note.description}</p>
                        <i className="fa-solid fa-trash-can mx-3" onClick={()=>{deleteNote(note._id)
                        props.showAlert("Deleted successfully","success")}}></i>
                        <i className="fa-regular fa-pen-to-square" onClick={()=>{updateNote(note);}}></i>
                    </div>
            </div>
        </div>
    )
}

export default NoteItem
