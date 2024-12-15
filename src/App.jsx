
import {React, useState} from "react";
import ImageMasking from "./components/ImageMask";
import {handleImageUpload} from "./utils/handleImageUpload"
import { FiUpload } from "react-icons/fi"; // Import the upload icon



function App(){


  const [image, setImage] = useState(null);
  const [canvasWidth, setCanvasWidth] = useState(400);
  const [canvasHeight, setCanvasHeight] = useState(400);
  
  return (
    <section className='mainApp'>
    <h3>Mask your Image</h3>
    <h6 className='mb-6'>Image Pipeline</h6>
    {!image && 
    (
      <div>
        <button 
            onClick={() => document.getElementById('imageUploadInput').click()} 
            className="btn_outline"
        >
            <FiUpload  /> 
            Upload Image
        </button>
        <input 
            id="imageUploadInput" 
            type="file" 
            accept="image/*" 
            onChange={(e) => handleImageUpload(e, setCanvasWidth, setCanvasHeight, setImage)} 
            style={{ display: 'none' }} 
        />
    </div>


    )}
        {
          image && (
            <ImageMasking image={image} canvasHeight={canvasHeight} canvasWidth={canvasWidth}></ImageMasking>

          )
        }
    </section>
  )
};


export default App