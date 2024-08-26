/**
     * Represents a bottle object in the game.
     * @extends MovableObject
     */
class Bottle extends MovableObject {

    /**
     * The width of the bottle.
     * @type {number}
     */
    width = 60;

    /**
     * The height of the bottle.
     * @type {number}
     */
    height = 60;
    
    /**
     * An array of image paths for the bottle animation.
     * @type {string[]}
     */
    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    /**
     * Creates an instance of a Bottle.
     * @param {number} x - The x-coordinate of the bottle.
     * @param {number} y - The y-coordinate of the bottle.
     */
    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.x = x;
        this.y = y;
        this.loadImages(this.IMAGES_BOTTLE);
        this.animateBottles();
    }

    /**
     * Animates the bottle by cycling through images or changing image based on position.
     * @private
     */
    animateBottles() {
        setStoppableInterval(() => {
            if (this.y < 360) {
                this.loadImage('img/6_salsa_bottle/salsa_bottle.png');
            } else {
                this.playAnimation(this.IMAGES_BOTTLE);
            }
        }, 350);
    }
}