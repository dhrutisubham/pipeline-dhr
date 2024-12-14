
import {React, useState, useRef} from "react";
import ImageMasking from "./components/ImageMask";
import {handleImageUpload} from "./utils/handleImageUpload"


function App(){


  const [image, setImage] = useState(null);
  const [canvasWidth, setCanvasWidth] = useState(400);
  const [canvasHeight, setCanvasHeight] = useState(400);
  
  return (
    <>
    {!image && 
    (
      <input 
          type="file" 
          accept="image/*" 
          onChange={(e)=>handleImageUpload(e, setCanvasWidth, setCanvasHeight, setImage)} 
      />

    )}
        {
          image && (
            <ImageMasking image={image} canvasHeight={canvasHeight} canvasWidth={canvasWidth}></ImageMasking>

          )
        }
    </>
  )
};


export default App