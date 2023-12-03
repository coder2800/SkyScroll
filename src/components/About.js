import React, {useContext} from 'react'
import noteContext from '../context/notes/noteContext';

export default function About() {
  const a = useContext(noteContext);
  return (
    <div className='mx-2 my-3' style={{"textAlign": "center", "fontSize" : "5vh"}}>
      Hello, Skyscroll is a safe and secure place to keep your notes. We assure you that your email, passwords and notes can never be accessed by anyone else not even by us.
    </div>
  )
}
