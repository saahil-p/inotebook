import React, { useState } from "react";
import noteContext from "./noteContext";


const NoteState = (props) => {
  const host = "http://localhost:5100"
  const notesInitial = []

  const [notes, setNotes] = useState(notesInitial);

  //Fetch note

  const fetchNote = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token") 
      }
    });
    const json = await response.json()
    console.log(json[0])
    setNotes(json[0])
  }


  //Add note
  const addNote = async (title, description, tag) => {
    //API needs to be called
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token") 
      },
      body: JSON.stringify({ title, description, tag })
    });
    const note = await response.json();   
    console.log(note)
    setNotes(notes.concat(note))
  }



  //Delete a note
  const deleteNote =async (id) => {
    //API call:
    const response = await fetch(`${host}/api/notes/deletenote/${id}`,{
      method:"DELETE",
      headers:{
        'Content-Type': "application/json",
        "auth-token" : localStorage.getItem("token") 
      }
    });
 
    const json = await response.json();
    console.log(json);


    //logic to delete from front end
    console.log("Delte function called for id" + id);
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }
  // Edit the note
  const editNote = async (id, title, description, tag) => {
    //API call:

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token") 
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
    console.log(json);

    //logic for the edit note
    let Newnotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < Newnotes.length; index++) {
      const element = Newnotes[index];
      if (element._id  === id) {
        Newnotes[index].title = title;
        Newnotes[index].description = description;
        Newnotes[index].tag = tag;
        break;
      }
    }
    setNotes(Newnotes)
  }
  return (
    <noteContext.Provider value={{ notes, setNotes, addNote, editNote, deleteNote, fetchNote }}>
      {props.children}
    </noteContext.Provider>
  )
}


export default NoteState