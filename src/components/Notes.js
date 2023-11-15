import React, { useEffect } from 'react'
import { useContext } from 'react';
import noteContext from "../context/notes/noteContext";
import Noteitem from './Noteitem';
import AddNote from './AddNote';

export default function Notes() {
    const context = useContext(noteContext)
    const {notes, getNote} = context
    useEffect(()=>{
      getNote();
      // eslint-disable-next-line
    }, [])
  return (
    <>
    <AddNote/>
    <div className="row text-center">
        <h3> Your Notes: </h3>
        {notes.map((note)=>{
            return <Noteitem key={note._id} note={note}/>;
        })}
    </div>
    </>
  )
}
