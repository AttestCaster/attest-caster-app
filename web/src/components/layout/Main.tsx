import { clsx } from 'clsx';
import Button from "../Button/Button";
import InputText from 'app/home/_components/InputText';
import React, { useState } from "react";



export default function Main(props) {

  if (!props.cast) {
    return <></>;
  }

  const [comment, setComment] = useState("");

  function sign() {
    console.log(props.cast);
    console.log(comment);
  }

  function updateComment(event) {
    setComment(event.target.value);
  }

  // console.log(props.cast);
  return (<div className="container mx-auto flex flex-col gap-8 px-8 py-6">
    <text>{props.cast}</text>
    <InputText placeholder='Input comment here(optional)' onChange={updateComment}/>
    <Button buttonContent={"Attest"} onClick={sign} />
  </div>);
}
