/**
 * Represents a cloud object that moves across the screen.
 * @extends MovableObject
 */
class Cloud extends MovableObject {

    /**
     * The y-coordinate of the cloud.
     * @type {number}
     */
    y = 20;

    /**
     * The width of the cloud.
     * @type {number}
     */
    width = 500;

    /**
     * The height of the cloud.
     * @type {number}
     */
    height = 250;

    /**
     * Creates an instance of a Cloud.
     * @param {number} x - The initial x-coordinate of the cloud.
     */
    constructor(x) {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = x + Math.random() * 300;
        this.animate();
    }

    /**
     * Animates the cloud by moving it to the left.
     * @private
     */
    animate() {
        setStoppableInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }
}