/**
 * Represents an object that can be drawn on the canvas.
 */
class DrawableObject {

    /**
     * The x-coordinate of the object's position.
     * @type {number}
     */
    x = 120;

    /**
     * The y-coordinate of the object's position.
     * @type {number}
     */
    y = 290;

    /**
     * The height of the object.
     * @type {number}
     */
    height = 150;

    /**
     * The width of the object.
     * @type {number}
     */
    width = 100;

    /**
     * The image associated with the object.
     * @type {HTMLImageElement}
     */
    img;

    /**
     * Cache for storing images to avoid reloading them.
     * @type {Object.<string, HTMLImageElement>}
     */
    imageCache = {};

    /**
     * Index of the current image in the animation sequence.
     * @type {number}
     */
    currentImage = 0;

    /**
     * Percentage of the object's status (e.g., health or energy).
     * @type {number}
     */
    percentage;

    /**
     * Loads an image from the specified path and sets it as the object's image.
     * @param {string} path - The path to the image file.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Loads multiple images from an array of paths and stores them in the image cache.
     * @param {string[]} arr - An array of image file paths.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Draws the object on the canvas.
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}