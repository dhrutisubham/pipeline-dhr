export const handleImageDownload = (maskedCanvasRef, originalImageUrl) => {
    if (!maskedCanvasRef.current || !originalImageUrl) return;
  
    
      const maskedLink = document.createElement('a');
      maskedLink.download = `masked.png`;
      maskedLink.href = maskedCanvasRef.current.toDataURL('image/png');
      maskedLink.click();
    
  
    
      const originalLink = document.createElement('a');
      originalLink.download = `original.png`;
      originalLink.href = originalImageUrl;
      originalLink.click();
    
  };
  