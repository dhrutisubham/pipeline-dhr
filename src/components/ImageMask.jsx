import React, { useRef, useState, useEffect, useCallback } from 'react';
import CanvasDraw from 'react-canvas-draw';
import _ from 'lodash';
import { handleImageDownload } from '../utils/handleImageDownload';
import { FiSettings, FiPenTool, FiDownload, FiEye, FiEyeOff, FiTrash2, FiCornerUpLeft } from 'react-icons/fi';

const ImageMasking = ({ image, canvasHeight, canvasWidth }) => {
  const canvasRef = useRef(null);
  const maskedCanvasRef = useRef(null);

  // Mask Layer Properties
  const [showMask, setShowMask] = useState(true);
  const [layerHue, setLayerHue] = useState(0); // Hue value from 0 to 360
  const [layerSaturation, setLayerSaturation] = useState(100); // Saturation value from 0 to 100
  const [layerLightness, setLayerLightness] = useState(50); // Lightness value from 0 to 100
  const [layerOpacity, setLayerOpacity] = useState(50); // Opacity value from 0 to 100

  // Brush Properties
  const [brushSize, setBrushSize] = useState(20); // Brush Size from 0 to 100
  const [brushOpacity, setBrushOpacity] = useState(100); // Opacity value from 0 to 1

  const updateMaskedImage = useCallback(() => {
    const canvas = canvasRef.current?.canvas?.drawing;
    const maskedCanvas = maskedCanvasRef.current;
    if (!image || !canvas || !maskedCanvas) return;

    const maskedCtx = maskedCanvas.getContext('2d');
    maskedCtx.clearRect(0, 0, canvasWidth, canvasHeight);

    const img = new Image();
    img.onload = () => {
      maskedCtx.drawImage(img, 0, 0, img.width, img.height);
      maskedCtx.globalCompositeOperation = 'destination-out';
      maskedCtx.drawImage(canvas, 0, 0);
      maskedCtx.globalCompositeOperation = 'source-over';
    };
    img.src = image;
  }, [image, canvasHeight, canvasWidth]);

  const throttledUpdateMaskedImage = useCallback(
    _.throttle(updateMaskedImage, 100),
    [updateMaskedImage]
  );

  useEffect(() => {
    if (image) updateMaskedImage();
  }, [image, updateMaskedImage]);

  useEffect(() => {
    const handleKeyDown = (event) => {
        if ((event.ctrlKey || event.metaKey) && event.key === 'z') {
        event.preventDefault(); // Prevent the default undo behavior in the browser
        canvasRef.current.undo();
        }
    };

    // Add event listener for keydown
    window.addEventListener('keydown', handleKeyDown);

    // Clean up event listener when component is unmounted
    return () => {
        window.removeEventListener('keydown', handleKeyDown);
    };
}, []);

  return (
    <div className="flex flex-row h-screen gap-4">
      {/* Left Section: Layer and Brush Settings */}
      <div className="flex flex-col gap-10 w-1/4 p-6 bg-gray-100 rounded-xl shadow-lg">
        {/* Layer Settings */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <FiSettings size={24} />
            <h2 className="font-bold text-lg">Layer Settings</h2>
          </div>
          <div>
            <label className="block">Layer Hue:</label>
            <input
              type="range"
              min="0"
              max="360"
              value={layerHue}
              onChange={(e) => setLayerHue(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <label className="block">Layer Saturation:</label>
            <input
              type="range"
              min="0"
              max="100"
              value={layerSaturation}
              onChange={(e) => setLayerSaturation(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <label className="block">Layer Lightness:</label>
            <input
              type="range"
              min="0"
              max="100"
              value={layerLightness}
              onChange={(e) => setLayerLightness(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <label className="block">Layer Opacity:</label>
            <input
              type="range"
              min="0"
              max="100"
              value={layerOpacity}
              onChange={(e) => setLayerOpacity(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        {/* Brush Settings */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <FiPenTool size={24} />
            <h2 className="font-bold text-lg">Brush Settings</h2>
          </div>
          <div>
            <label className="block">Brush Size:</label>
            <input
              type="range"
              min="0"
              max="100"
              value={brushSize}
              onChange={(e) => setBrushSize(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <label className="block">Brush Opacity:</label>
            <input
              type="range"
              min="0"
              max="100"
              value={brushOpacity}
              onChange={(e) => setBrushOpacity(e.target.value)}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Middle Section: Canvas */}
      <div className="flex flex-1 justify-center items-center cursor-crosshair bg-white">
        <div className="relative z-0">
            <div className={`${showMask?'opacity-100':'opacity-0'}`}>
                <CanvasDraw
                    ref={canvasRef}
                    canvasWidth={canvasWidth}
                    canvasHeight={canvasHeight}
                    style={{ border: '1px solid black' }}
                    brushRadius={brushSize}
                    lazyRadius={0}
                    brushColor={`rgba(0, 0, 0, ${brushOpacity / 100})`}
                    onChange={throttledUpdateMaskedImage}
                    disabled={!image}
                    backgroundColor={`hsl(${layerHue} ${layerSaturation}% ${layerLightness}% / ${layerOpacity}%)`}
                />

            </div>
          {image && (
            <canvas
              ref={maskedCanvasRef}
              width={canvasWidth}
              height={canvasHeight}
              className="absolute top-0 left-0"
              style={{ zIndex: -1 }}
            />
          )}
        </div>
      </div>

      {/* Right Section: Canvas Options and Download */}
      <div className="flex flex-col w-1/4 p-6 bg-gray-100 gap-10 rounded-xl shadow-lg">
        {/* Canvas Options */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <FiEye size={24} />
            <h2 className="font-bold text-lg">Canvas Options</h2>
          </div>
          <button
            onClick={() => setShowMask((prev) => !prev)}
            className="w-full flex items-center justify-center bg-blue-500 text-white py-2 rounded"
          >
            {showMask ? <FiEyeOff className="mr-2" /> : <FiEye className="mr-2" />}
            {showMask ? 'Hide Mask' : 'Show Mask'}
          </button>
          <button
            onClick={() => canvasRef.current.eraseAll()}
            className="w-full flex items-center justify-center bg-red-500 text-white py-2 rounded"
          >
            <FiTrash2 className="mr-2" />
            Clear Canvas
          </button>
          <button
            onClick={() => canvasRef.current.undo()}
            className="w-full flex items-center justify-center bg-gray-500 text-white py-2 rounded"
          >
            <FiCornerUpLeft className="mr-2" />
            Undo (Ctrl+Z)
          </button>
        </div>

        {/* Download Options */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <FiDownload size={24} />
            <h2 className="font-bold text-lg">Download</h2>
          </div>
          {image && (
            <button
              onClick={() => handleImageDownload(maskedCanvasRef)}
              className="w-full flex items-center justify-center bg-green-500 text-white py-2 rounded"
            >
              <FiDownload className="mr-2" />
              Download Image
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageMasking;
