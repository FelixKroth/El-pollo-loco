/**
 * Represents a small chicken enemy in the game, which can move, jump, and die.
 * @extends MovableObject
 */
class SmallChicken extends MovableObject {

    /**
     * The y-coordinate of the small chicken's position.
     * @type {number}
     */
    y = 360;

    /**
     * The width of the small chicken.
     * @type {number}
     */
    width = 60;

    /**
     * The height of the small chicken.
     * @type {number}
     */
    height = 60;

    /**
     * The vertical speed of the small chicken.
     * @type {number}
     */
    speedY = 5;

    /**
     * The energy level of the small chicken.
     * @type {number}
     */
    energy = 5;

    /**
     * Array of image paths for the dead animation of the small chicken.
     * @type {string[]}
     */
    IMAGES_DEAD = ['img/3_enemies_chicken/chicken_small/2_dead/dead.png'];

    /**
     * Array of image paths for the walking animation of the small chicken.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    /**
     * Creates an instance of a small chicken.
     * Initializes the small chicken by loading images, setting its position, speed, and applying gravity and jumping behavior.
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 300 + Math.random() * 3000;
        this.speed = 0.15 + Math.random() * 7;
        this.animate();
        this.applyGravity();
        this.jumpChicken();
    }

    /**
     * Applies gravity to the small chicken, affecting its vertical position and speed.
     * The interval updates the vertical position and speed based on whether the chicken is above ground.
     */
    applyGravity() {
        setStoppableInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } else {
                this.speedY = 0;
            }
        }, 1000 / 25);
    }

    /**
     * Checks if the small chicken is above the ground.
     * @returns {boolean} True if the chicken's y-coordinate is less than 360, otherwise false.
     */
    isAboveGround() {
        return this.y < 360;
    }

    /**
     * Animates the small chicken's movement and appearance based on its state.
     * Moves the chicken towards the player and handles the chicken's animation (walking or dead).
     */
    animate() {
        /**
         * Updates the small chicken's movement based on the player's position.
         * Moves the chicken towards the player or in the opposite direction if needed.
         */
        setStoppableInterval(() => {
            if (this.world.character.x > this.x) {
                this.moveRight();
                this.otherDirection = true;
            } else if (this.world.character.x < this.x) {
                this.moveLeft();
                this.otherDirection = false;
            } else if (this.world.character.x === this.x) {
                this.moveRight();
                this.otherDirection = true;
            }
        }, 200);

        /**
         * Updates the small chicken's animation based on its state.
         * Plays the dead animation if the chicken is hurt, otherwise plays the walking animation.
         */
        setStoppableInterval(() => {
            if (this.isHurt()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 100);
    }

    /**
     * Makes the small chicken jump periodically.
     * Sets an interval to periodically call the jump method.
     */
    jumpChicken() {
        setStoppableInterval(() => {
            this.jump();
        }, 2000);
    }
}