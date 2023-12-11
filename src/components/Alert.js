import React from 'react'

export default function Alert(props) {
  const handleClick = ()=>{
    props.setIsAlert(false);
  }
  return (
    <div>
        <div className={`alert alert-${props.type}`} role="alert" style={{display: "flex", "justifyContent": "space-between", position: "absolute", width: "100vw"}}>
            {props.msg} 
            <button onClick={handleClick} style={{cursor: "pointer", border: "none", background: "none"}}>X</button>
        </div>
    </div>
  )
}
