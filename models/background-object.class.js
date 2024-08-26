/**
 * Represents a background object in the game.
 * @extends MovableObject
 */
class BackgroundObject extends MovableObject {

  /**
   * The width of the background object.
   * @type {number}
   */
  width = 720;

  /**
   * The height of the background object.
   * @type {number}
   */
  height = 480;

  /**
   * Creates an instance of a BackgroundObject.
   * @param {string} imgPath - The path to the image representing the background object.
   * @param {number} x - The x-coordinate of the background object.
   */
  constructor(imgPath, x) {
      super().loadImage(imgPath);
      this.x = x;
      this.y = 480 - this.height;
  }
}