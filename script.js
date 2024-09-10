// Creating the main canva
const canvas = document.querySelector("canvas");
const canvasContext = canvas.getContext("2d");

// Creating the color filter canva
const colorCanvas = document.createElement("canvas");
const colorCanvasContext = colorCanvas.getContext("2d");


// Function to adjust the canvas size
function adjustCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// evoking adjustyPage when the page window is resized
window.addEventListener("resize", adjustCanvas);
// resize the canvas in its loading
adjustCanvas();


// Function to generate a random number:
function randomizer(minimum, maximum) {
    // calculation to obtain a number from minimum and maximum params:
    return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}


// Assinging the DVD logo as a image
const dvdLogo = new Image();
dvdLogo.src = 'assets/dvdLogo.svg';
// creating a object for DVD with some params
const dvdInfo = {
    // position in X plane
    positionX: 100,
    // position in Y plane
    positionY: 100,
    // logo width
    width: 180,
    // logo height
    height: 90,
    // speed in X plane
    speedX: 2,
    // speed in Y plane
    speedY: 2,
    // initial color (white)
    color: [255, 255, 255]
};


// Function to apply a color to the image using the color canvas
function applyColor(appliedColor) {
    // defines the color canvas size
    colorCanvas.width = dvdInfo.width;
    colorCanvas.height = dvdInfo.height;

    // creates a clear retangle to draw the image 
    colorCanvasContext.clearRect(0, 0, colorCanvas.width, colorCanvas.height);
    // draws the image in center of color canvas
    colorCanvasContext.drawImage(dvdLogo, 0, 0, dvdInfo.width, dvdInfo.height);

    // obtaining the pixel color datas of image and stores in pixelData array
    const imagePixelData = colorCanvasContext.getImageData(0, 0, dvdInfo.width, dvdInfo.height);
    const pixelData = imagePixelData.data;

    // applies the color filter to each pixel
    // the for skips 4 array indexes because rgba have 4 values (red, green, blue, alpha)
    for (let index = 0; index < pixelData.length; index += 4) {
        pixelData[index] = appliedColor[0] // red index
        pixelData[index + 1] = appliedColor[1] // green index
        pixelData[index + 2] = appliedColor[2] // blue index
        // pixelData[index + 3] = appliedColor[3] // alpha index (we don't need change it)
    }

    // puts the modified colors value to the canvas to obtain a colored image
    colorCanvasContext.putImageData(imagePixelData, 0, 0);
}


// Function to draw the DVD logo 
function drawDVDLogo() {
    // cleans the canvas area to the next drawing
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);

    // aplies the current color
    applyColor(dvdInfo.color);
    // draws the DVD logo in it's current position 
    canvasContext.drawImage(colorCanvas, dvdInfo.positionX, dvdInfo.positionY, dvdInfo.width, dvdInfo.height);
}

// Function to update the logo position and verify the collisions
function updateLogoPosition() {
    // updates the logo position based in it's speed
    dvdInfo.positionX += dvdInfo.speedX;
    dvdInfo.positionY += dvdInfo.speedY;

    // verifies collision with left or right walls
    if (dvdInfo.positionX + dvdInfo.width >= canvas.width || dvdInfo.positionX <= 0) {
        // reverses horizintal direction
        dvdInfo.speedX *= -1;
        // changes the logo color
        changeLogoColor();
    }

    // verifies collision with top or bottom walls
    if (dvdInfo.positionY + dvdInfo.height >= canvas.height || dvdInfo.positionY <= 0) {
        // reverses horizintal direction
        dvdInfo.speedY *= -1;
        // changes the logo color
        changeLogoColor();
    }
};


// Function to randomly change the logo color
function changeLogoColor() {
    // add a color to DVD logo
    dvdInfo.color = [randomizer(0, 255), randomizer(0, 255), randomizer(0, 255)];
    // verifies if the color is black
    if (dvdInfo.color[0] < 20 && dvdInfo.color[1] < 20 && dvdInfo.color[2] < 20) {
        return changeLogoColor();
    }
};


// Function to node the animation
function animationLoop() {
    // drawing the DVD logo
    drawDVDLogo();
    // updating the DVD logo position
    updateLogoPosition();

    // requesting to browser to run te animation in next frame
    requestAnimationFrame(animationLoop);
};

// wait until the image loads to begin the animation
dvdLogo.onload = () => {
    // starts the animation
    animationLoop();
};

// Handle image load errors
dvdLogo.onerror = () => {
    console.error('Error loading the image.');
};