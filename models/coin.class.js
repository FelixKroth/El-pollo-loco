/**
 * Represents a collectible coin in the game.
 * @extends MovableObject
 */
class Coin extends MovableObject {

    /**
     * The width of the coin.
     * @type {number}
     */
    width = 100;

    /**
     * The height of the coin.
     * @type {number}
     */
    height = 100;

    /**
     * An array of image paths for the coin animation.
     * @type {string[]}
     */
    IMAGES_COINS = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    /**
     * Creates an instance of a Coin.
     * @param {number} x - The x-coordinate of the coin.
     * @param {number} y - The y-coordinate of the coin.
     */
    constructor(x, y) {
        super().loadImage('img/8_coin/coin_1.png');
        this.x = x;
        this.y = y;
        this.loadImages(this.IMAGES_COINS);
        this.animateCoins();
    }

    /**
     * Animates the coin by cycling through the coin images.
     * @private
     */
    animateCoins() {
        setStoppableInterval(() => {
            this.playAnimation(this.IMAGES_COINS);
        }, 350);
    }
}