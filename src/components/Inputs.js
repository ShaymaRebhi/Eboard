import React, { useState } from 'react'

const Inputs = (props) => {
    const [focused,setFocused]=useState(false);

    const {onChange,id,errorMessage,hide, ...inputProps}=props;

    
   const handleFocus=(e)=>{
       setFocused(true);
   }
  return (
    <div>
        
      <input {...inputProps} onChange={onChange} onBlur={handleFocus} hidden={hide} focused={focused.toString()}></input>
      <span className="text-danger spanLogin">{errorMessage}</span>
   
    </div>
  )
}

export default Inputs
