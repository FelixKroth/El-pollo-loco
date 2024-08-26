/**
 * Represents the game world, managing the game state, characters, interactions, and rendering.
 */
class World {
  /**
 * Represents the character in the game.
 * @type {Character}
 */
character = new Character();

/**
 * The canvas element where the game is rendered.
 * @type {HTMLCanvasElement}
 */
canvas;

/**
 * The 2D rendering context for the canvas.
 * @type {CanvasRenderingContext2D}
 */
ctx;

/**
 * The keyboard object handling input from the player.
 * @type {Keyboard}
 */
keyboard;

/**
 * The x-coordinate of the camera, which determines the viewport's position in the game world.
 * @type {number}
 */
camera_x = 0;

/**
 * The current level of the game.
 * @type {Level}
 */
level = level1;

/**
 * The number of coins collected by the player.
 * @type {number}
 */
coins = 0;

/**
 * The number of bottles available to the player.
 * @type {number}
 */
bottles = 0;

/**
 * Sound effects used in the game.
 * @type {Object}
 * @property {HTMLAudioElement} background_music - The background music for the game.
 * @property {HTMLAudioElement} coin_sound - The sound effect for collecting coins.
 * @property {HTMLAudioElement} bottle_sound - The sound effect for collecting bottles.
 * @property {HTMLAudioElement} chicken_dead_sound - The sound effect for defeating enemies.
 * @property {HTMLAudioElement} walking_sound - The sound effect for walking.
 * @property {HTMLAudioElement} jumping_sound - The sound effect for jumping.
 * @property {HTMLAudioElement} hurt_sound - The sound effect for taking damage.
 * @property {HTMLAudioElement} splash_sound - The sound effect for throwing bottles.
 * @property {HTMLAudioElement} endboss_hurt_sound - The sound effect for damaging the endboss.
 * @property {HTMLAudioElement} throw_sound - The sound effect for throwing objects.
 */
sfx = {
  background_music: Object.assign(document.createElement("audio"), {
    src: "audio/background-intro.ogg",
    volume: 0.25,
    loop: true,
  }),

  coin_sound: Object.assign(document.createElement("audio"), {
    src: "audio/coins.ogg",
    volume: 1,
    loop: false,
  }),
  bottle_sound: Object.assign(document.createElement("audio"), {
    src: "audio/collect-bottle.ogg",
    volume: 1,
    loop: false,
  }),
  chicken_dead_sound: Object.assign(document.createElement("audio"), {
    src: "audio/chicken.ogg",
    volume: 0.6,
    loop: false,
  }),
  walking_sound: Object.assign(document.createElement("audio"), {
    src: "audio/walking-NEW.ogg",
    volume: 1,
    loop: false,
    length: 2,
  }),
  jumping_sound: Object.assign(document.createElement("audio"), {
    src: "audio/jumping.ogg",
    volume: 1,
    loop: false,
  }),
  hurt_sound: Object.assign(document.createElement("audio"), {
    src: "audio/hurt-NEW.ogg",
    volume: 1,
    loop: false,
  }),
  splash_sound: Object.assign(document.createElement("audio"), {
    src: "audio/impact.ogg",
    volume: 1,
    loop: false,
  }),
  endboss_hurt_sound: Object.assign(document.createElement("audio"), {
    src: "audio/endboss-hurt.ogg",
    volume: 1,
    loop: false,
  }),
  throw_sound: Object.assign(document.createElement("audio"), {
    src: "audio/throw.ogg",
    volume: 1,
    loop: false,
  }),
};

/**
 * List of throwable objects in the game.
 * @type {ThrowableObject[]}
 */
throwableObjects = [];

/**
 * Offset values for the camera or object positions.
 * @type {Object}
 * @property {number} top - The top offset.
 * @property {number} left - The left offset.
 * @property {number} right - The right offset.
 * @property {number} bottom - The bottom offset.
 */
offset = {
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
};

/**
 * Status bar displaying the character's health.
 * @type {StatusBar}
 */
status_bar_health = new StatusBar(10, 0, 100, [
  "img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
  "img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
  "img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
  "img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
  "img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
  "img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
]);

/**
 * Status bar displaying the number of bottles collected.
 * @type {StatusBar}
 */
status_bar_bottles = new StatusBar(10, 50, 0, [
  "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png",
  "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png",
  "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png",
  "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png",
  "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png",
  "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png",
]);

/**
 * Status bar displaying the number of coins collected.
 * @type {StatusBar}
 */
status_bar_coins = new StatusBar(10, 100, 0, [
  "img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png",
  "img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png",
  "img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png",
  "img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png",
  "img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png",
  "img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png",
]);

/**
 * Status bar displaying the endboss's health.
 * @type {StatusBar}
 */
status_bar_endboss = new StatusBar(550, 10, 100, [
  "img/7_statusbars/2_statusbar_endboss/green/green0.png",
  "img/7_statusbars/2_statusbar_endboss/green/green20.png",
  "img/7_statusbars/2_statusbar_endboss/green/green40.png",
  "img/7_statusbars/2_statusbar_endboss/green/green60.png",
  "img/7_statusbars/2_statusbar_endboss/green/green80.png",
  "img/7_statusbars/2_statusbar_endboss/green/green100.png",
]);

  /**
   * Creates an instance of the World class.
   * @param {HTMLCanvasElement} canvas - The canvas element where the game is rendered.
   * @param {Keyboard} keyboard - The keyboard object handling input.
   */
  constructor(canvas, keyboard) {
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.ctx = canvas.getContext("2d");
    this.draw();
    this.setWorld();
    this.run();
    this.mute(isMuted);
    this.sfx.background_music.play();
  }

  /**
   * Sets up the world with initial configurations.
   */
  setWorld() {
    this.character.world = this;
    this.level.endboss.world = this;
    this.level.enemies.forEach((enemy) => {
      enemy.world = this;
    });
  }

  /**
   * Starts the game loop to check collisions and update the game state.
   */
  run() {
    setStoppableInterval(() => {
      this.checkCollisionCharacter();
      this.checkThrowableObjects();
      this.checkCollisionCoins();
      this.checkCollisionBottles();
      this.checkCollisionCharacterEndboss();
      this.checkCollisionBottleEndboss();
      this.checkCollisionBottleEnemy();
      this.checkCollisionJump();
      this.gameStatus();
    }, 200);
  }

  /**
   * Updates the game status based on the character and endboss health.
   */
  gameStatus() {
    if (this.character.energy === 0) {
      run = false;
      lose();
      this.sfx.background_music.pause();
    } else if (this.level.endboss.energy === 0) {
      run = false;
      win();
      this.sfx.background_music.pause();
    }
  }

  /**
   * Mutes or unmutes all sound effects.
   * @param {boolean} isMuted - Whether the sound should be muted.
   */
  mute(isMuted) {
    for (let key in this.sfx) {
      this.sfx[key].muted = isMuted;
    }
  }

  /**
   * Checks for throwable objects and handles their interactions.
   */
  checkThrowableObjects() {
    if (this.keyboard.D && this.bottles > 0) {
      this.sfx.throw_sound.play();
      let direction = this.character.otherDirection;
      let bottle = new ThrowableObject(
        this.character.x + 100,
        this.character.y + 100,
        direction
      );
      this.throwableObjects.push(bottle);
      this.bottles -= 10;
      this.status_bar_bottles.setPercentage(
        this.bottles,
        this.status_bar_bottles.images
      );
      this.checkCollisionBottleEndboss();
    }
  }

  /**
   * Checks for collisions between the character and coins.
   */
  checkCollisionCoins() {
    this.level.coins.forEach((coin, index) => {
      if (this.character.isColliding(coin)) {
        if (this.coins < 100) {
          this.sfx.coin_sound.play();
          this.coins += 5;
          this.status_bar_coins.setPercentage(
            this.coins,
            this.status_bar_coins.images
          );
          this.level.coins.splice(index, 1);
        }
      }
    });
  }

  /**
   * Checks for collisions between the character and bottles.
   */
  checkCollisionBottles() {
    this.level.bottles.forEach((bottle, index) => {
      if (this.character.isColliding(bottle)) {
        if (this.bottles < 100) {
          this.sfx.bottle_sound.play();
          this.bottles += 10;
          this.status_bar_bottles.setPercentage(
            this.bottles,
            this.status_bar_bottles.images
          );
          this.level.bottles.splice(index, 1);
        }
      }
    });
  }

  /**
   * Checks for collisions between the character and the endboss.
   */
  checkCollisionCharacterEndboss() {
    if (this.character.isColliding(this.level.endboss)) {
      this.character.energy -= 5;
      this.character.hit();
      this.status_bar_health.setPercentage(
        this.character.energy,
        this.status_bar_health.images
      );
    }
  }

  /**
   * Checks for collisions between throwable objects and the endboss.
   */
  checkCollisionBottleEndboss() {
    this.throwableObjects.forEach((bottle) => {
      if (bottle.isColliding(this.level.endboss) && !bottle.collisionEnemy) {
        bottle.collisionEnemy = true;
        if (this.level.endboss.energy > 0) {
          this.level.endboss.energy -= 10;
          this.level.endboss.hit();
          this.sfx.splash_sound.play();
          this.sfx.endboss_hurt_sound.play();
          this.status_bar_endboss.setPercentage(
            this.level.endboss.energy,
            this.status_bar_endboss.images
          );
        }
      }
    });
  }

  /**
   * Checks for collisions between throwable objects and enemies.
   */
  checkCollisionBottleEnemy() {
    this.throwableObjects.forEach((bottle) => {
      this.level.enemies.forEach((enemy) => {
        if (bottle.isColliding(enemy) && !bottle.collisionEnemy) {
          bottle.collisionEnemy = true;
          this.sfx.splash_sound.play();
          this.sfx.chicken_dead_sound.play();
          enemy.chicken_dead = true;
          enemy.hit();
          setTimeout(() => {
            let index = this.level.enemies.indexOf(enemy);
            if (index > -1) {
              this.level.enemies.splice(index, 1);
            }
          }, 500);
        }
      });
    });
  }

  /**
   * Checks for collisions between the character and enemies.
   */
  checkCollisionCharacter() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        if (!enemy.chicken_dead && !this.character.isAboveGround()) {
          this.character.energy -= 5;
          this.character.hit();
          this.status_bar_health.setPercentage(
            this.character.energy,
            this.status_bar_health.images
          );
        }
      }
    });
  }

  /**
   * Checks for collisions between the character and enemies while jumping.
   */
  checkCollisionJump() {
    this.level.enemies.forEach((enemy, index) => {
      if (this.character.isColliding(enemy, index) && this.character.isAboveGround()) {
        setTimeout(() => {
          this.level.enemies.splice(index, 1);
          this.keyboard.SPACE = false;
        }, 250);
        this.sfx.chicken_dead_sound.play();
        enemy.chicken_dead = true;
        enemy.hit();
        this.character.jump(0.1);
      }
      if (this.character.y > 130) {
        this.character.y = 130;
      }
    });
  }

  /**
   * Clears the canvas and draws the game objects.
   */
  draw() {
    if (run) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.translate(this.camera_x, 0);
      this.addObjectsToMap(this.level.backgroundObjects);
      this.addObjectsToMap(this.level.clouds);

      this.ctx.translate(-this.camera_x, 0);

      this.addToMap(this.status_bar_health);
      this.addToMap(this.status_bar_coins);
      this.addToMap(this.status_bar_bottles);
      this.addToMap(this.status_bar_endboss);

      this.ctx.translate(this.camera_x, 0);

      this.addToMap(this.character);
      this.addToMap(this.level.endboss);
      this.addObjectsToMap(this.throwableObjects);
      this.addObjectsToMap(this.level.bottles);
      this.addObjectsToMap(this.level.enemies);
      this.addObjectsToMap(this.level.coins);

      this.ctx.translate(-this.camera_x, 0);

      let self = this;
      requestAnimationFrame(() => {
        self.draw();
      });
    }
  }

  /**
   * Adds multiple objects to the map.
   * @param {Array} objects - The array of objects to add to the map.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Adds a single object to the map and handles its drawing.
   * @param {Object} mo - The object to add to the map.
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   * Flips the image horizontally for rendering.
   * @param {Object} mo - The object whose image is to be flipped.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Restores the flipped image to its original orientation.
   * @param {Object} mo - The object whose image orientation is to be restored.
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}