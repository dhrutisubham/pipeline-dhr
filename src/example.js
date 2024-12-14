import React, { useState, useRef, useEffect } from 'react';
import CanvasDraw from 'react-canvas-draw';

function App() {
  const [image, setImage] = useState(null);  // to hold the uploaded image
  const [brushColor, setBrushColor] = useState('#000');  // for the brush color
  const [sliderValue, setSliderValue] = useState(100);  // Slider for brush opacity (0-100)
  const canvasRef = useRef(null);  // to reference the canvas
  const imageRef = useRef(null); // to reference the image element
  
  const [hexColor, setHexColor] = useState('#000000'); // Initial color (black)

  // Handle slider change to adjust the brush opacity
  const handleSliderChange = (event) => {
    const value = event.target.value;
    setSliderValue(value);  // Update slider value
    let newColor = getHexColor(value);
    setHexColor(newColor); // Update hex color based on slider value
    setBrushColor(newColor); // Update brush color based on slider value
  };

  // This function maps the slider value (0-100) to a grayscale hex color
  const getHexColor = (value) => {
    const grayValue = Math.round((value / 100) * 255); // Map value from 0-100 to 0-255
    return `#${grayValue.toString(16).padStart(2, '0')}${grayValue.toString(16).padStart(2, '0')}${grayValue.toString(16).padStart(2, '0')}`;
  };

  // Convert canvas drawing to an image opacity mask
  const applyMask = () => {
    const canvas = canvasRef.current.getCanvas();
    const ctx = canvas.getContext('2d');
    const imgCanvas = imageRef.current;
    const imgCtx = imgCanvas.getContext('2d');

    // Get the drawn pixels on the canvas
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Apply the mask effect to the image
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];   // Red
      const g = data[i+1]; // Green
      const b = data[i+2]; // Blue
      const brightness = (r + g + b) / 3; // Average of RGB values to get brightness (0 to 255)

      // Calculate the opacity of the image at this position
      const opacity = (brightness / 255) * sliderValue / 100; // Slider value influences opacity

      // Get the corresponding pixel in the image canvas
      const imgData = imgCtx.getImageData(i / 4 % imgCanvas.width, Math.floor(i / 4 / imgCanvas.width), 1, 1);
      const imgPixel = imgData.data;

      // Adjust the image opacity based on the mask
      imgPixel[3] = imgPixel[3] * opacity; // Adjust opacity of the image pixel

      imgCtx.putImageData(imgData, i / 4 % imgCanvas.width, Math.floor(i / 4 / imgCanvas.width));
    }
  };

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        const canvas = canvasRef.current.getCanvas();
        canvas.width = img.width;
        canvas.height = img.height;

        const imgCanvas = imageRef.current;
        imgCanvas.width = img.width;
        imgCanvas.height = img.height;
        const ctx = imgCanvas.getContext('2d');
        ctx.drawImage(img, 0, 0); // Draw image on canvas
      };
    };

    if (file) {
      reader.readAsDataURL(file); // Read file as data URL
    }
  };

  useEffect(() => {
    if (canvasRef.current) {
      applyMask(); // Apply mask whenever the canvas is updated
    }
  }, [sliderValue]);

  return (
    <div className="App">
      <h1>Image Masking with Canvas</h1>

      {/* Image Upload */}
      <input type="file" onChange={handleImageUpload} />

      {/* Image Canvas */}
      <canvas ref={imageRef} style={{ border: '1px solid black', marginTop: '20px' }} />

      {/* Drawing Canvas */}
      <div style={{ position: 'relative', marginTop: '20px' }}>
        <CanvasDraw
          ref={canvasRef}
          brushColor={brushColor}
          canvasWidth={500}
          canvasHeight={500}
          lazyRadius={0}
          hideGrid={true}
        />
      </div>

      {/* Slider input */}
      <input 
        type="range" 
        min="0" 
        max="100" 
        value={sliderValue} 
        onChange={handleSliderChange} 
        style={{ width: '50%' }} 
      />

      {/* Circle that reflects the color of the brush */}
      <div 
        className='shadow-md'
        style={{
          backgroundColor: hexColor,
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          marginLeft: '20px',
          border: '2px solid #00000030'  
        }}
      />

      {/* Buttons */}
      <button onClick={() => canvasRef.current.eraseAll()}>Clear Canvas</button>
      <button onClick={() => canvasRef.current.undo()}>Undo</button>

    </div>
  );
}

export default App;
