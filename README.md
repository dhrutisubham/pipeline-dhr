# Mask Your Image - Image Pipeline

**Mask Your Image - Image Pipeline** is a web application built using React that allows users to upload an image, mask it interactively using a canvas, and download both the original and masked images. The tool is designed to be simple, intuitive, and efficient, providing users with the flexibility to manipulate their images as needed.

### Features
- Upload any image from your device.
- Interactive masking with a user-friendly interface.
- Alter layer settings such as opacity and layer blending to customize your masking.
- Adjust brush settings, including size, color, and opacity, for precise masking.
- Download both the original and masked images.
- Built with modern technologies like React, React Icons, and TailwindCSS.


### Purpose
This project demonstrates a simple yet effective approach to image manipulation in the browser using React. It can be a foundational tool for similar applications like photo editing, annotation tools, or creative drawing platforms.

### Tech Stack
- **Frontend**: 
  - React.js
  - React Icons
  - TailwindCSS
  - react-canvas-draw (for canvas-based image masking)

- **Tools & Libraries**:
  - npm (Node package manager)
  - react-scripts (for build and development)

- **Development Environment**:
  - VS Code or any text editor of your choice
  - Browser (for testing and deployment)

### Setup Instructions

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/image-line.git
    cd image-line
    ```

2. **Install dependencies**:
    Run the following command to install the required dependencies:
    ```bash
    npm install --force
    ```

    > Note: The `--force` flag might be required to avoid potential dependency conflicts.

3. **Start the development server**:
    After the installation is complete, start the development server with the following command:
    ```bash
    npm start
    ```

4. **Open the application**:
    Open your browser and go to `http://localhost:3000` to see the application in action.

### Usage

1. **Upload an Image**:
   - Click the "Upload Image" button to select and upload an image file from your device. The image will be displayed on the screen.

2. **Mask the Image**:
   - Once the image is uploaded, you can mask parts of the image using the canvas and brush tools.
   - Adjust the brush size and opacity as needed to control the masking.

3. **Download the Images**:
   - After masking the image, click the "Download" button to download both the original and the masked image as PNG files.

4. **Reset**:
   - If you want to start over, click the "Reset" button to clear the canvas and upload a new image.



### Scripts

These are the scripts available for use with this project:

- `npm start`: Starts the development server and opens the app in the browser at `http://localhost:3000`.
- `npm run build`: Bundles the application for production, optimizing and minifying the code.
- `npm test`: Runs the tests for the application (if any are defined).
- `npm run eject`: Ejects the project from `create-react-app` configurations, exposing webpack and other config files.

> **Note**: You should use `npm start` for local development and `npm run build` when preparing the app for production.


### Future Enhancements

1. **Eraser Tool**:
   - Implement an eraser tool that allows users to erase parts of the image that were previously masked, providing more control and flexibility in image editing.

2. **Canvas and Image Scaling**:
   - Add functionality to scale the canvas and the uploaded image. This will allow users to adjust the canvas size to fit different image dimensions and work more efficiently with large or small images.

3. **Different Brush Shapes**:
   - Introduce different brush shapes (e.g., round, square, or custom shapes) to give users more variety and precision in masking different areas of the image.

4. **Multilayer Support**:
   - Implement support for multiple layers in the masking process, allowing users to work with different layers separately. This would provide advanced control over image manipulation, enabling users to apply masks to different layers independently.


## Author

This project was developed by Dhrutisundar Sahoo [dhrutisundar.me](https://dhrutisundar.me). Feel free to reach out if you have any questions or suggestions!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
