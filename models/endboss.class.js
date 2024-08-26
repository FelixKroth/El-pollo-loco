/**
 * Represents the Endboss character in the game.
 * @extends MovableObject
 */
class Endboss extends MovableObject {

    /**
     * The initial x-coordinate of the Endboss.
     * @type {number}
     */
    x = 2500;

    /**
     * The initial y-coordinate of the Endboss.
     * @type {number}
     */
    y = 55;

    /**
     * The width of the Endboss.
     * @type {number}
     */
    width = 250;

    /**
     * The height of the Endboss.
     * @type {number}
     */
    height = 400;

    /**
     * The energy level of the Endboss.
     * @type {number}
     */
    energy = 100;

    /**
     * Reference to the game world object.
     * @type {object}
     */
    world;

    /**
     * Indicates whether the Endboss had its first contact with the player.
     * @type {boolean}
     */
    hadFirstContact = false;

    /**
     * Array of image paths for the Endboss's walking animation.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    /**
     * Array of image paths for the Endboss's alert animation.
     * @type {string[]}
     */
    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    /**
     * Array of image paths for the Endboss's attack animation.
     * @type {string[]}
     */
    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    /**
     * Array of image paths for the Endboss's hurt animation.
     * @type {string[]}
     */
    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    /**
     * Array of image paths for the Endboss's death animation.
     * @type {string[]}
     */
    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    /**
     * Creates an instance of the Endboss.
     */
    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_ATTACK);
        this.speed = 30;
        this.animate();
    }

    /**
     * Animates the Endboss with different behaviors based on its state.
     * @private
     */
    animate() {
        let contact = 0;
        setStoppableInterval(() => {
            this.playAnimation(this.IMAGES_ATTACK);
            if (contact < 10) {
                this.playAnimation(this.IMAGES_ALERT);
            } else {
                if (this.hadFirstContact) {
                    this.playAnimationEndboss();
                }
            }
            contact++;

            if (this.firstContact()) {
                this.contactEndboss(contact);
            }
        }, 200);
    }

    /**
     * Determines if the Endboss has made first contact with the player.
     * @returns {boolean} - True if first contact has been made, otherwise false.
     */
    firstContact() {
        return this.world.character.x > 2100 && !this.hadFirstContact;
    }

    /**
     * Handles the actions taken when the Endboss makes first contact with the player.
     * @param {number} contact - The current contact counter.
     * @private
     */
    contactEndboss(contact) {
        contact = 0;
        this.hadFirstContact = true;
    }

    /**
     * Controls the Endboss's movement and animation based on the player's position.
     * @private
     */
    playAnimationEndboss() {
        if (this.world.character.x > this.x) {
            this.moveRight();
            this.otherDirection = true;
        } else if (this.world.character.x <= this.x) {
            this.moveLeft();
            this.otherDirection = false;
        } else if (this.world.character.x === this.x) {
            this.moveRight();
            this.otherDirection = true;
            this.playAnimation(this.IMAGES_ALERT);
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
        } else if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD);
        }
    }
}