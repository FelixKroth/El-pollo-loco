/**
 * Represents a status bar in the game, showing the player's status (health, etc.).
 * @extends DrawableObject
 */
class StatusBar extends DrawableObject {

    /**
     * The width of the status bar.
     * @type {number}
     */
    width = 150;

    /**
     * The height of the status bar.
     * @type {number}
     */
    height = 50;

    /**
     * The current percentage value represented by the status bar.
     * @type {number}
     */
    percentage;

    /**
     * Array of image paths used to represent different states of the status bar.
     * @type {string[]}
     */
    images;

    /**
     * Creates an instance of StatusBar.
     * @param {number} x - The x-coordinate of the status bar.
     * @param {number} y - The y-coordinate of the status bar.
     * @param {number} percentage - The initial percentage value of the status bar.
     * @param {string[]} images - Array of image paths representing different states of the status bar.
     */
    constructor(x, y, percentage, images) {
        super();
        this.x = x;
        this.y = y;
        this.percentage = percentage;
        this.images = images;
        this.loadImages(images);
        this.setPercentage(percentage);
    }

    /**
     * Updates the status bar's appearance based on the current percentage.
     * @param {number} percentage - The new percentage to set.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.images[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the index of the image to display based on the current percentage.
     * @returns {number} - The index of the image to display.
     * @private
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}