import React, { useContext } from 'react'
import NoteContext from '../context/notes/noteContext';
import Notes from './Notes';


export default function Home(props) {
  const context = useContext(NoteContext);
  const {notes,setNote} = context;
  const {showAlert} = props;
  return ( 
    <div>
    <Notes showAlert = {showAlert}/>
    </div>
  )
}
