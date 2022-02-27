import React, { useState } from 'react'

const Inputs = (props) => {
    const [focused,setFocused]=useState(false);

    const {onChange,id,errorMessage, ...inputProps}=props;

    
   const handleFocus=(e)=>{
       setFocused(true);
       console.log("hello");
   }
  return (
    <div>
        
      <input {...inputProps} onChange={onChange} onBlur={handleFocus} focused={focused.toString()}></input>
      <span className="text-danger">{errorMessage}</span>
   
    </div>
  )
}

export default Inputs
