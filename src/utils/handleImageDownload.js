export const handleImageDownload = (maskedCanvasRef) => {
        if (!maskedCanvasRef.current) return;

        // Convert canvas to data URL
        const link = document.createElement('a');
        link.download = 'masked-image.png';
        link.href = maskedCanvasRef.current.toDataURL('image/png');
        link.click();
    };