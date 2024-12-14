import React, { useRef, useState, useEffect, useCallback } from 'react';
import CanvasDraw from 'react-canvas-draw';
import _ from 'lodash';

import { handleImageDownload } from '../utils/handleImageDownload';

const ImageMasking = ({image, canvasHeight, canvasWidth}) => {

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

    // Improved mask update function with comprehensive checks
    const updateMaskedImage = () => {
        // Extensive logging and early return checks
        // console.log('Attempting to update masked image');
        // console.log('Image exists:', !!image);
        // console.log('Canvas ref exists:', !!canvasRef.current);
        // console.log('Masked canvas ref exists:', !!maskedCanvasRef.current);

        // Early returns with detailed logging
        if (!image) {
            console.warn('No image loaded');
            return;
        }
        if (!canvasRef.current) {
            console.warn('Canvas ref is not set');
            return;
        }
        if (!maskedCanvasRef.current) {
            console.warn('Masked canvas ref is not set');
            return;
        }

        // Safely get canvas elements
        const canvas = canvasRef.current?.canvas?.drawing;
        const maskedCanvas = maskedCanvasRef.current;

        // More checks
        if (!canvas) {
            console.warn('Drawing canvas not found');
            return;
        }
        if (!maskedCanvas) {
            console.warn('Masked canvas not found');
            return;
        }

        const maskedCtx = maskedCanvas.getContext('2d');

        // Clear previous content
        maskedCtx.clearRect(0, 0, canvasHeight, canvasWidth);

        // Create image and handle loading
        const img = new Image();
        img.crossOrigin='anonymous';
        img.onload = () => {
            try {
                // Draw original image
                maskedCtx.drawImage(img, 0, 0, img.width, img.height);
                
                // Apply mask
                maskedCtx.globalCompositeOperation = 'destination-out';
                maskedCtx.drawImage(canvas, 0, 0);
                
                // Reset composite operation
                maskedCtx.globalCompositeOperation = 'source-over';
                
                // console.log('Masked image updated successfully');
            } catch (error) {
                console.error('Error in updateMaskedImage:', error);
            }
        };
        img.onerror = (error) => {
            console.error('Failed to load image for masking', error);
        };
        img.src = image;
    };

    // Throttled version of the mask update function
    const throttledUpdateMaskedImage = useCallback(
        _.throttle(updateMaskedImage, 100),
        [updateMaskedImage]
    );

    // Effect to trigger initial mask update when image loads
    useEffect(() => {
        if (image) {
            updateMaskedImage();
        }
    }, [image, updateMaskedImage]);

    return (
        <>
                <div className='flex flex-col gap-2 justify-start'>
                    <div>
                        <label>
                            Layer Color (Hue):
                            <input
                                type="range"
                                min="0"
                                max="360"
                                value={layerHue}
                                onChange={(e) => setLayerHue(e.target.value)}
                            />
                        </label>
                        <span>{` Hue: ${layerHue}`}</span>
                    </div>
                    <div>
                        <label>
                            Layer Saturation:
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={layerSaturation}
                                onChange={(e) => setLayerSaturation(e.target.value)}
                            />
                        </label>
                        <span>{` Saturation: ${layerSaturation}`}</span>
                    </div>
                    <div>
                        <label>
                            Layer Lightness:
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={layerLightness}
                                onChange={(e) => setLayerLightness(e.target.value)}
                            />
                        </label>
                        <span>{` Lightness: ${layerLightness}%`}</span>
                    </div>
                    <div>
                        <label>
                            Layer Opacity:
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={layerOpacity}
                                onChange={(e) => setLayerOpacity(e.target.value)}
                            />
                        </label>
                        <span>{` Opacity: ${layerOpacity}%`}</span>
                    </div>
                    
                    <div>
                        <label>
                            Brush Size:
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={brushSize}
                                onChange={(e) => setBrushSize(e.target.value)}
                            />
                        </label>
                        <span>{` Brush Size: ${brushSize}`}</span>
                    </div>
                    <div>
                        <label>
                            Brush Opacity:
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={brushOpacity}
                                onChange={(e) => setBrushOpacity(e.target.value)}
                            />
                        </label>
                        <span>{` Brush Opacity: ${brushOpacity}%`}</span>
                    </div>

                    <div className='relative cursor-crosshair'>
                        <section className='relative'>
                            <div style={{ 
                                border: '1px solid black',  
                                }} 
                                className={`${showMask?'opacity-100':'opacity-0'} w-fit`}
                            >
                                <CanvasDraw
                                    ref={canvasRef}
                                    canvasWidth={canvasWidth}
                                    canvasHeight={canvasHeight}
                                    style={{ border: '1px solid black' }}
                                    // mouseZoomFactor={-0.005}
                                    brushRadius={brushSize}
                                    catenaryColor='#000000'
                                    // enablePanAndZoom={true}
                                    lazyRadius={0}
                                    backgroundColor={`hsl(${layerHue} ${layerSaturation}% ${layerLightness}% / ${layerOpacity}%)`}
                                    brushColor={`rgba(0, 0, 0, ${brushOpacity/100}`}
                                    onChange={throttledUpdateMaskedImage}
                                    disabled={image?false:true}
                                />


                            </div>

                            <div 
                                style={{ 
                                    position: 'absolute', 
                                    top: '0%',
                                    left: 0,
                                    zIndex:-10, 
                                    transition: 'opacity 0.3s ease' 
                                }}
                            >
                                {image && (
                                    <>
                                        <canvas
                                            ref={maskedCanvasRef}
                                            width={canvasWidth}
                                            height={canvasHeight}
                                            style={{ 
                                                border: '1px solid black', 
                                                maxWidth: '100%' 
                                            }}
                                        />
                                    </>
                                )}
                            </div>

                        </section>

                        <section className='space-x-2'>
                            <button className='w-fit bg-slate-200 border-2 rounded-md border-black px-4 py-2 my-4' onClick={() => setShowMask(prev => !prev)}>
                            {showMask ? 'Hide Mask' : 'Show Mask'}
                            </button>
                            <button className='w-fit bg-slate-200 border-2 rounded-md border-black px-4 py-2 my-4' 
                            onClick={() => canvasRef.current.eraseAll()}>
                            Clear Canvas
                            </button>
                            <button className='w-fit bg-slate-200 border-2 rounded-md border-black px-4 py-2 my-4' 
                            onClick={() => canvasRef.current.undo()}>
                            Undo
                            </button>

                            {image && (
                                <button className='w-fit bg-slate-200 border-2 rounded-md border-black px-4 py-2 my-4'
                                    onClick={handleImageDownload}
                                >
                                Download Image
                                </button>

                            )}

                        </section>
                    

                    </div>

                    
                </div>

            
        
        </>
    );
};

export default ImageMasking;
