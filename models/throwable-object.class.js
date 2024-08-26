/**
 * Represents an object that can be thrown, such as a bottle, with rotation and splash animations.
 * @extends MovableObject
 */
class ThrowableObject extends MovableObject {
    
    /**
     * The height of the throwable object.
     * @type {number}
     */
    height = 60;

    /**
     * The width of the throwable object.
     * @type {number}
     */
    width = 60;

    /**
     * Array of image paths for the rotation animation of the throwable object.
     * @type {string[]}
     */
    IMAGES_ROTATE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    /**
     * Array of image paths for the splash animation of the throwable object.
     * @type {string[]}
     */
    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    /**
     * The world context in which the throwable object exists.
     * @type {World}
     */
    world;

    /**
     * Indicates whether the throwable object has collided with an enemy.
     * @type {boolean}
     */
    collisionEnemy;

    /**
     * Creates an instance of a throwable object.
     * @param {number} x - The x-coordinate of the initial position of the throwable object.
     * @param {number} y - The y-coordinate of the initial position of the throwable object.
     * @param {boolean} direction - The direction in which the object will be thrown (true for left, false for right).
     */
    constructor(x, y, direction) {
        super().loadImage('img/7_statusbars/3_icons/icon_salsa_bottle.png');
        this.loadImages(this.IMAGES_ROTATE);
        this.loadImages(this.IMAGES_SPLASH);
        this.collisionEnemy = false;
        this.x = x - 60;
        this.y = y + 60;
        this.direction = direction;
        this.throw();
    }

    /**
     * Starts the throwing motion of the throwable object, applying gravity and animating rotation and splash effects.
     */
    throw() {
        this.speedY = 10;
        this.applyGravity();
        setStoppableInterval(() => {
            this.playAnimation(this.IMAGES_ROTATE);
            if (this.collisionEnemy) {
                this.playAnimation(this.IMAGES_SPLASH);
            }
            if (this.direction) {
                this.x -= 20;
            } else {
                this.x += 20;
            }
        }, 25);
    }
}