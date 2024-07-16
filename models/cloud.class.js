class Cloud extends MovableObject {
    y = 20;
    width = 720;
    height = 300;

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/full.png')

        this.x = Math.random() * 500;
        this.animate();
    }

    animate() {
        this.moveLeft();
    }
}