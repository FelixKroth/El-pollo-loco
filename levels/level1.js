/**
 * Represents the first level of the game.
 * @type {Level}
 */
let level1;

/**
 * Loads the configuration and initializes level 1 with enemies, collectibles, and background objects.
 */
function loadLevel() {
  level1 = new Level(
    [
      new Chicken(),
      new Chicken(),
      new SmallChicken(),
      new Chicken(),
      new Chicken(),
      new SmallChicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new SmallChicken(),
      new SmallChicken(),
      new Chicken(),
      new Chicken(),
    ],
    [
      new Cloud(0),
      new Cloud(500),
      new Cloud(1000),
      new Cloud(1500),
      new Cloud(2000),
      new Cloud(2500),
      new Cloud(3000),
      new Cloud(3500),
    ],
    [
      new Coin(300, 155),
      new Coin(450, 250),
      new Coin(400, 165),
      new Coin(500, 120),
      new Coin(700, 145),
      new Coin(800, 195),
      new Coin(900, 125),
      new Coin(1000, 170),
      new Coin(1100, 150),
      new Coin(1250, 165),
      new Coin(1300, 100),
      new Coin(1400, 150),
      new Coin(1500, 200),
      new Coin(1600, 150),
      new Coin(1700, 100),
      new Coin(1800, 165),
      new Coin(1975, 135),
      new Coin(2000, 115),
      new Coin(2155, 190),
      new Coin(2235, 150)
    ],
    [
      new Bottle(250, 360),
      new Bottle(350, 360),
      new Bottle(450, 360),
      new Bottle(500, 360),
      new Bottle(600, 360),
      new Bottle(650, 360),
      new Bottle(850, 360),
      new Bottle(1000, 360),
      new Bottle(1200, 360),
      new Bottle(1250, 360),
      new Bottle(1300, 360),
      new Bottle(1550, 360),
      new Bottle(1600, 360),
      new Bottle(1650, 360),
      new Bottle(1700, 360),
      new Bottle(1800, 360),
      new Bottle(1950, 360),
      new Bottle(2150, 360),
      new Bottle(2200, 360),
      new Bottle(2250, 360),
    ],
    new Endboss(),
    [
      new BackgroundObject("img/5_background/layers/air.png", -719),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png", -719),
      new BackgroundObject("img/5_background/layers/2_second_layer/2.png", -719),
      new BackgroundObject("img/5_background/layers/1_first_layer/2.png", -719),

      new BackgroundObject("img/5_background/layers/air.png", 0),
      new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 0),
      new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 0),
      new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 0),

      new BackgroundObject("img/5_background/layers/air.png", 719),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719),
      new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719),
      new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719),

      new BackgroundObject("img/5_background/layers/air.png", 719 * 2),
      new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 719 * 2),
      new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 719 * 2),
      new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 719 * 2),

      new BackgroundObject("img/5_background/layers/air.png", 719 * 3),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719 * 3),
      new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719 * 3),
      new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719 * 3),

      new BackgroundObject("img/5_background/layers/air.png", 719 * 4),
      new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 719 * 4),
      new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 719 * 4),
      new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 719 * 4)
    ]
  );
}