import React, {useContext} from 'react'
import noteContext from '../context/notes/noteContext';

export default function About() {
  const a = useContext(noteContext);
  return (
    <div className='mx-2 my-1'>
      This is about {a.name} from {a.class}
    </div>
  )
}
