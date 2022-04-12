import React, { useState } from 'react'

const Inputs = (props) => {
    const [focused,setFocused]=useState(false);

    const {defaults,label,onChange,id,errorMessage,hide, ...inputProps}=props;

    
   const handleFocus=(e)=>{
       setFocused(true);
   }
  return (
    <div>
      {label ? <label>{label}</label>:null}
      <input defaultValue={defaults} {...inputProps} onChange={onChange} onBlur={handleFocus} hidden={hide} focused={focused.toString()}></input>
      <span className="text-danger spanLogin">{errorMessage}</span>
   
    </div>
  )
}

export default Inputs
