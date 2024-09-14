// Setting up canvas...
const canvas = document.querySelector('canvas'); // Constant for canva
const canvasContext = canvas.getContext('2d'); // Canva drawing context
// in this case two-dimensional ('2d' of 2-dimensional)

// Creating the color filter canva
const colorCanvas = document.createElement("canvas"); // This canva is
// used to create a image copy with another color
const colorCanvasContext = colorCanvas.getContext("2d");


// Function to adjust the canvas size
function adjustCanvas() {
    canvas.width = window.innerWidth; // Canvas width receive window width value
    canvas.height = window.innerHeight; // Canvas height receive window height value
}

// Evoking adjustyPage when the page window is resized
window.addEventListener("resize", adjustCanvas);
// Resizes the canvas in its loading 
adjustCanvas();


// Function to generate a random number:
function randomizer(minimum, maximum) {
    // Calculation to obtain a number from minimum and maximum parameters:
    return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}


// Assinging the DVD logo as a image
const dvdLogo = new Image();
dvdLogo.src = 'assets/dvdLogo.svg';
// Creating a object for DVD with some parameters
const dvdInfo = {
    positionX: 100, // position in X plane
    positionY: 100, // position in Y plane
    width: 180, // logo width
    height: 90, // logo height
    speedX: 2, // speed in X plane
    speedY: 2, // speed in Y plane
    color: [255, 255, 255] // initial color white (rgb(255, 255, 255))
};


// Function to apply a color to the image using the color canvas
function applyColor(appliedColor) {
    // Defines the color canvas size
    colorCanvas.width = dvdInfo.width; // Color canvas width receive DVD logo image width value
    colorCanvas.height = dvdInfo.height; // Color canvas height receive DVD logo image height value
    
    colorCanvasContext.clearRect(0, 0, colorCanvas.width, colorCanvas.height); // Creates a clear retangle to draw the image 
    colorCanvasContext.drawImage(dvdLogo, 0, 0, dvdInfo.width, dvdInfo.height); // Draws the image in the center of color canvas

    // Obtaining the pixel color datas of image and stores in pixelData array
    const imagePixelData = colorCanvasContext.getImageData(0, 0, dvdInfo.width, dvdInfo.height);
    const pixelData = imagePixelData.data; // That is the array

    // Applies the color filter to each pixel (it changes the image color)
    // The loop skips 4 array indexes because rgba have 4 values (rgba(red, green, blue, alpha))
    for (let index = 0; index < pixelData.length; index += 4) {
        pixelData[index] = appliedColor[0] // Red index
        pixelData[index + 1] = appliedColor[1] // Green index
        pixelData[index + 2] = appliedColor[2] // Blue index
        // pixelData[index + 3] = appliedColor[3] // Alpha index (don't need change it)
    }

    // Puts the modified colors value to the canvas to obtain a different color image
    colorCanvasContext.putImageData(imagePixelData, 0, 0);
}


// Function to draw the DVD logo 
function drawDVDLogo() {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height); // Cleans the canvas area to the next drawing

    applyColor(dvdInfo.color); // Applies the current color
    // Draws the DVD logo in it's current position 
    canvasContext.drawImage(colorCanvas, dvdInfo.positionX, dvdInfo.positionY, dvdInfo.width, dvdInfo.height);
}

// Function to update the logo position and verify the collisions
function updateLogoPosition() {
    // Updates the logo position based in it's speed
    dvdInfo.positionX += dvdInfo.speedX; // X plane position
    dvdInfo.positionY += dvdInfo.speedY; // Y plane position

    // Verifies collision with left or right walls
    if (dvdInfo.positionX + dvdInfo.width >= canvas.width || dvdInfo.positionX <= 0) {
        dvdInfo.speedX *= -1; // Reverses horizintal direction
        changeLogoColor(); // Changes the logo color
    }
    // Verifies collision with top or bottom walls
    if (dvdInfo.positionY + dvdInfo.height >= canvas.height || dvdInfo.positionY <= 0) {
        dvdInfo.speedY *= -1; // Reverses vertical direction
        changeLogoColor(); // Changes the logo color
    }
};


// Function to randomly change the logo color
function changeLogoColor() {
    // Add a color to DVD logo
    dvdInfo.color = [randomizer(0, 255), randomizer(0, 255), randomizer(0, 255)];
    // Verifies if the color is darker than background so the logo can be seen
    if (dvdInfo.color[0] < 20 && dvdInfo.color[1] < 20 && dvdInfo.color[2] < 20) {
        return changeLogoColor(); // Evolkes the image color change function
    }
};


// Function to run the animation
function animationLoop() {
    drawDVDLogo(); // Drawing the DVD logo
    updateLogoPosition();  // Updating the DVD logo position

    // Requesting to repeat the loopCode function
    requestAnimationFrame(animationLoop); // This loop creates a animation
};

// Wait until the image loads to begin the animation
dvdLogo.onload = () => {
    animationLoop(); // Starts the animation
};