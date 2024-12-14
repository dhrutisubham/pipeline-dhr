// Function to calculate hex color from slider value
export default getHexColor = (value) => {
    // Calculate the RGB component based on slider value
    const rgbValue = Math.round((value / 100) * 255); // Convert to range 0-255
    // Convert to hex and pad with 0 if necessary
    const hex = rgbValue.toString(16).padStart(2, '0');
    // Return the color in hex format (#RRGGBB)
    return `#${hex}${hex}${hex}`;
  };