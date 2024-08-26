/**
 * Represents a character in the game with various states and animations.
 * @extends MovableObject
 */
class Character extends MovableObject {

    /**
     * The height of the character.
     * @type {number}
     */
    height = 300;
  
    /**
     * The width of the character.
     * @type {number}
     */
    width = 150;
  
    /**
     * The y-coordinate of the character's position.
     * @type {number}
     */
    y = 130;
  
    /**
     * The speed at which the character moves.
     * @type {number}
     */
    speed = 5;
  
    /**
     * Indicates whether the character is moving (0 means not moving).
     * @type {number}
     */
    isMoving = 0;
  
    /**
     * The world context in which the character exists.
     * @type {World}
     */
    world;
  
    /**
     * The offset values for collision detection.
     * @type {{top: number, bottom: number, left: number, right: number}}
     */
    offset = {
        top: 120,
        bottom: 20,
        left: 30,
        right: 40
    };
  
    /**
     * Array of image paths for the walking animation.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
  
    /**
     * Array of image paths for the jumping animation.
     * @type {string[]}
     */
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];
  
    /**
     * Array of image paths for the dead animation.
     * @type {string[]}
     */
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ];
  
    /**
     * Array of image paths for the hurt animation.
     * @type {string[]}
     */
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];
  
    /**
     * Array of image paths for the idle animation.
     * @type {string[]}
     */
    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];
  
    /**
     * Array of image paths for the long idle animation.
     * @type {string[]}
     */
    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];
  
    /**
     * Initializes a new character, loads images, and applies gravity and animation.
     */
    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.applyGravity();
        this.animate();
    }
  
    /**
     * Handles the character's movement and animation based on keyboard input and state.
     */
    animate() {
        setStoppableInterval(() => {
            this.world.sfx.walking_sound.pause();
  
            // Move right
            if (this.world.keyboard.RIGHT && this.world.level.level_end_x > this.x) {
                this.moveRight();
                this.otherDirection = false;
                this.world.sfx.walking_sound.play();
                this.isMoving = new Date().getTime();
            }
  
            // Move left
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
                this.world.sfx.walking_sound.play();
                this.isMoving = new Date().getTime();
            }
  
            // Jump
            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
                this.world.sfx.jumping_sound.play();
                this.isMoving = new Date().getTime();
            }
  
            this.world.camera_x = -this.x + 80;
        }, 1000 / 60);
  
        setStoppableInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
                this.world.sfx.hurt_sound.play();
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else if (this.idle()) {
                this.playAnimationIdle();
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 50);
    }
  
    /**
     * Determines if the character is idle based on keyboard input.
     * @returns {boolean} True if the character is idle, otherwise false.
     */
    idle() {
        return !this.world.keyboard.SPACE &&
               !this.world.keyboard.LEFT &&
               !this.world.keyboard.RIGHT &&
               !this.world.keyboard.D;
    }
  
    /**
     * Plays the idle animation based on the time since the last movement.
     */
    playAnimationIdle() {
        let timeSinceLastMove = new Date().getTime() - this.isMoving;
        if (timeSinceLastMove < 2000) {
            this.playAnimation(this.IMAGES_IDLE);
        } else {
            this.playAnimation(this.IMAGES_LONG_IDLE);
        }
    }
  }