/**
 * Represents an object that can move in the game. Inherits from `DrawableObject`.
 * @extends DrawableObject
 */
class MovableObject extends DrawableObject {

    /**
     * The speed of the movable object.
     * @type {number}
     */
    speed = 0.15;

    /**
     * The vertical speed of the movable object.
     * @type {number}
     */
    speedY = 0;

    /**
     * The acceleration applied to the movable object for gravity.
     * @type {number}
     */
    acceleration = 2.5;

    /**
     * Indicates if the object is facing the opposite direction.
     * @type {boolean}
     */
    otherDirection = false;

    /**
     * The amount of energy the movable object has.
     * @type {number}
     */
    energy = 100;

    /**
     * The timestamp of the last hit received by the object.
     * @type {number}
     */
    lastHit = 0;

    /**
     * Offset values used for collision detection.
     * @type {Object}
     * @property {number} top - The top offset.
     * @property {number} left - The left offset.
     * @property {number} right - The right offset.
     * @property {number} bottom - The bottom offset.
     */
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

    /**
     * Applies gravity to the movable object, affecting its vertical position and speed.
     * Gravity is applied by reducing the vertical speed and moving the object upward.
     */
    applyGravity() {
        setStoppableInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * Determines if the movable object is above the ground.
     * For `ThrowableObject` instances, it always returns true.
     * For other objects, it checks if the object's vertical position is above a certain threshold.
     * @returns {boolean} - True if the object is above the ground, false otherwise.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 130;
        }
    }

    /**
     * Checks if the movable object is colliding with another object.
     * @param {MovableObject} mo - The object to check for collision with.
     * @returns {boolean} - True if there is a collision, false otherwise.
     */
    isColliding(mo) {
        return (
            this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
        );
    }

    /**
     * Plays an animation by cycling through a series of images.
     * @param {string[]} images - Array of image paths for the animation.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Reduces the object's energy when hit and updates the last hit timestamp.
     * The energy is reduced by 5 units and cannot go below 0.
     */
    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Determines if the object is currently hurt based on the time since the last hit.
     * @returns {boolean} - True if the object was hit within the last second, false otherwise.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    /**
     * Checks if the object is dead, i.e., its energy is 0.
     * @returns {boolean} - True if the object's energy is 0, false otherwise.
     */
    isDead() {
        return this.energy === 0;
    }

    /**
     * Moves the object to the right by its speed.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left by its speed.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Makes the object jump by setting its vertical speed.
     * @returns {number} - The vertical speed applied for the jump.
     */
    jump() {
        return this.speedY = 30;
    }
}