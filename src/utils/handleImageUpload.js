export const handleImageUpload = (event, setCanvasWidth, setCanvasHeight, setImage) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            // Set the image source
            setImage(e.target.result);
            
            // Create an Image object to get its dimensions
            const img = new Image();
            img.onload = () => {
                // Set canvas dimensions based on image size
                setCanvasWidth(img.width);
                setCanvasHeight(img.height);
            };
            img.src = e.target.result; // Set source to read data URL
        };
        reader.readAsDataURL(file); // Read file as Data URL
    }
};
