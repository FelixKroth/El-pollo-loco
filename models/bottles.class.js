class Bottle extends MovableObject {
    constructor(x, y) {
      super().loadImage('img/6_salsa_bottle/salsa_bottle.png'); 
      this.x = x;
      this.y = y;
      this.height = 100;
      this.width = 50;
      this.throwSpeed = 15;
    }
  
    throw() {
      this.speedY = 20;
      this.applyGravity();
      setInterval(() => {
        this.x += this.throwSpeed;
      }, 1000 / 25);
    }
  }