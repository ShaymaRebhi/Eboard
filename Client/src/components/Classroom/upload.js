import axios from "axios";
import React from "react";
import b64toBlob  from "b64-to-blob"
import ImageUploading from "react-images-uploading";
import { updatePic } from "../../utils/Class";


export default function Upload(prop) {
  
    const [images, setImages] = React.useState([]);
    const maxNumber = 69;
    const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    var block = imageList[0].data_url.split(";");
    var contentType = block[0].split(":")[1];
    var realData = block[1].split(",")[1];
    var blob = b64toBlob(realData, contentType);
    var formDataToUpload = new FormData();
    formDataToUpload.append("file", blob);
    let data={
      file:formDataToUpload
    }
   console.log(imageList[0].file)
    setImages(imageList);
    axios.put(`${updatePic}${prop.id}`,formDataToUpload,{
      headers: {
          'content-type': 'multipart/form-data',
          'Authorization':`Bearer ${JSON.parse(localStorage.getItem("login")).AccessToken}`
      },
      mode: 'no-cors'
  }).then(res=>{
    if(res) console.log("don");
  }).catch(err=>{
    console.log(err)
  })
  };
  return (
   <div className="App">
     
     {console.log(images.length)}
      <ImageUploading
        
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            { imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img className="img" onClick={onImageUpload} {...dragProps} src={image.data_url} alt="profile pic"/>
              </div>
            ))
             

            }
            {images.length===0 ? <img className="img" onClick={onImageUpload} {...dragProps} src={prop.src ? prop.src: ""} alt="profile pic" onError={(e) => e.target.src=`https://i.ibb.co/KryG66q/classroom.jpg`}/> : ""}
          </div>
        )}
      </ImageUploading>
    </div>
  )
}

