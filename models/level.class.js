/**
 * Represents a level in the game, containing enemies, objects, and environmental features.
 */
class Level {

    /**
     * An array of enemy objects present in the level.
     * @type {Array<MovableObject>}
     */
    enemies;

    /**
     * The end boss object for the level.
     * @type {MovableObject}
     */
    endboss;

    /**
     * An array of cloud objects in the level.
     * @type {Array<MovableObject>}
     */
    clouds;

    /**
     * An array of background objects in the level.
     * @type {Array<DrawableObject>}
     */
    backgroundObjects;

    /**
     * An array of coin objects in the level.
     * @type {Array<DrawableObject>}
     */
    coins;

    /**
     * An array of bottle objects in the level.
     * @type {Array<DrawableObject>}
     */
    bottles;

    /**
     * The x-coordinate marking the end of the level.
     * @type {number}
     */
    level_end_x = 2800;

    /**
     * Creates an instance of a Level.
     * @param {Array<MovableObject>} enemies - An array of enemies in the level.
     * @param {Array<MovableObject>} clouds - An array of clouds in the level.
     * @param {Array<DrawableObject>} coins - An array of coins in the level.
     * @param {Array<DrawableObject>} bottles - An array of bottles in the level.
     * @param {MovableObject} endboss - The end boss object for the level.
     * @param {Array<DrawableObject>} backgroundObjects - An array of background objects in the level.
     */
    constructor(enemies, clouds, coins, bottles, endboss, backgroundObjects) {
        this.enemies = enemies;
        this.endboss = endboss;
        this.clouds = clouds;
        this.coins = coins;
        this.bottles = bottles;
        this.backgroundObjects = backgroundObjects;
    }
}