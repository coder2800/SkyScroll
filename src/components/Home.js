import React from "react";
import Notes from "./Notes";
export default function Home(props) {
  return (
    <div className="mx-2 my-1">
      <Notes showAlert = {props.showAlert}/>
    </div>
  );
}
