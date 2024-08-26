/**
 * Represents a chicken enemy in the game, which moves towards the player and can die.
 * @extends MovableObject
 */
class Chicken extends MovableObject {

    /**
     * The y-coordinate of the chicken's position.
     * @type {number}
     */
    y = 360;

    /**
     * The width of the chicken.
     * @type {number}
     */
    width = 60;

    /**
     * The height of the chicken.
     * @type {number}
     */
    height = 60;

    /**
     * The energy level of the chicken.
     * @type {number}
     */
    energy = 5;

    /**
     * Indicates whether the chicken is dead.
     * @type {boolean}
     */
    chicken_dead;

    /**
     * Array of image paths for the dead animation of the chicken.
     * @type {string[]}
     */
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    /**
     * Array of image paths for the walking animation of the chicken.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    /**
     * Creates an instance of a chicken.
     * Loads images for the walking and dead animations and initializes the chicken's position and speed.
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.chicken_dead = false;
        this.x = 250 + Math.random() * 2500;
        this.speed = 0.15 + Math.random() * 10;
        this.animate();
    }

    /**
     * Animates the chicken's movement and appearance based on its state.
     * Moves the chicken towards the player and handles the chicken's animation (walking or dead).
     */
    animate() {
        /**
         * Updates the chicken's movement based on the player's position.
         * Moves the chicken towards the player or in the opposite direction if needed.
         */
        setStoppableInterval(() => {
            if (this.world.character.x > this.x) {
                this.moveRight();
                this.otherDirection = true;
            } else if (this.world.character.x < this.x) {
                this.moveLeft();
                this.otherDirection = false;
            } else if (this.world.character.x == this.x) {
                this.moveRight();
                this.otherDirection = true;
            } 
        }, 200);

        /**
         * Updates the chicken's animation based on its state.
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
}