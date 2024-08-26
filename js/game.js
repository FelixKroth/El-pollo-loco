/**
 * The canvas element used for rendering the game.
 * @type {HTMLCanvasElement}
 */
let canvas;

/**
 * Keyboard input handler.
 * @type {Keyboard}
 */
let keyboard = new Keyboard();

/**
 * The main game world instance.
 * @type {World}
 */
let world;

/**
 * Flag indicating whether the game is running.
 * @type {boolean}
 */
let run = true;

/**
 * Array of interval IDs for stoppable intervals.
 * @type {number[]}
 */
let intervalIds = [];

/**
 * Sound to play when the player wins.
 * @type {HTMLAudioElement}
 */
let win_sound = new Audio('audio/win.ogg');

/**
 * Sound to play when the player loses.
 * @type {HTMLAudioElement}
 */
let lose_sound = new Audio('audio/lose.ogg');

/**
 * Flag indicating whether the game is muted.
 * @type {boolean}
 */
let isMuted = false;

/**
 * Flag indicating whether the game is in fullscreen mode.
 * @type {boolean}
 */
let fullscreen = false;

/**
 * Flag indicating whether a dropdown or imprint is visible.
 * @type {boolean}
 */
let isVisible = false;

/**
 * Initializes the game by loading the level and setting up the world and canvas.
 */
function init() {
    loadLevel();
    run = true;
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

/**
 * Adjusts the game layout based on device rotation or screen size.
 */
function rotateDevice() {
    let rotation = document.getElementById('rotation');
    let canvas = document.getElementById('canvas');
    let title = document.getElementById('game-title');
    if (window.innerWidth < 930 && window.innerHeight > window.innerWidth) {
        rotation.style.display = 'flex';
        if (!fullscreen) {
            canvas.style.cssText = 'width: 100%;';
            title.style.cssText = 'display: none;';
        } else {
            canvas.style.cssText = 'width: 100%; height: 100%;';
            title.style.cssText = 'display: none;';
        }
    } else {
        rotation.style.display = 'none';
    }
}

window.addEventListener('resize', rotateDevice);
window.addEventListener('orientationchange', rotateDevice);

/**
 * Updates the UI elements based on the current game state (e.g., fullscreen, game over).
 */
function updateUI() {
    let startScreen = document.getElementById('start-screen');
    let mobileButtons = document.getElementById('mobile-controls');
    let gameControls = document.getElementById('game-controls');
    let winScreen = document.getElementById('win-screen');
    let loseScreen = document.getElementById('lose-screen');
    let title = document.getElementById('game-title');
    let gameDisplay = document.getElementById('game-display');

    if (fullscreen) {
        gameDisplay.style.cssText = 'display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh;';
        canvas.style.cssText = 'width: 100%; height: 100%;';
        title.style.cssText = 'display: none;';
    } else {
        gameDisplay.style.cssText = 'display: flex; flex-direction: column; align-items: center;';
        canvas.style.cssText = 'width: 100%; height: auto;';
        title.style.cssText = 'display: none;';
    }

    if (startScreen.style.display === 'none') {
        mobileButtons.style.display = 'flex';
        gameControls.style.display = 'flex';
    }

    if (winScreen.style.display === 'flex' || loseScreen.style.display === 'flex') {
        mobileButtons.style.display = 'none';
        gameControls.style.display = 'none';
        title.style.display = 'none';
        canvas.style.display = 'none';
    } else {
        canvas.style.display = 'flex';
    }
}

/**
 * Hides the start screen and displays the game canvas.
 */
function showCanvas() {
    document.getElementById('start-screen').style.display = 'none';
    updateUI();
}

/**
 * Hides the win screen and displays the game canvas for a replay.
 */
function showCanvasReplay() {
    document.getElementById('win-screen').style.display = 'none';
    updateUI();
}

/**
 * Hides the lose screen and displays the game canvas for a restart.
 */
function showCanvasRestart() {
    document.getElementById('lose-screen').style.display = 'none';
    updateUI();
}

window.addEventListener('keydown', (e) => {
    switch (e.keyCode) {
        case 37: // Left arrow key
            keyboard.LEFT = true;
            break;
        case 39: // Right arrow key
            keyboard.RIGHT = true;
            break;
        case 32: // Space key
            e.preventDefault();
            keyboard.SPACE = true;
            break;
        case 68: // 'D' key
            keyboard.D = true;
            break;
    }
});

window.addEventListener('keyup', (e) => {
    switch (e.keyCode) {
        case 37: // Left arrow key
            keyboard.LEFT = false;
            break;
        case 39: // Right arrow key
            keyboard.RIGHT = false;
            break;
        case 32: // Space key
            e.preventDefault();
            keyboard.SPACE = false;
            break;
        case 68: // 'D' key
            keyboard.D = false;
            break;
    }
});

document.getElementById('button-left').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.LEFT = true;
});

document.getElementById('button-left').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.LEFT = false;
});

document.getElementById('button-right').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.RIGHT = true;
});

document.getElementById('button-right').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.RIGHT = false;
});

document.getElementById('button-jump').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.SPACE = true;
});

document.getElementById('button-jump').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.SPACE = false;
});

document.getElementById('button-throw').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.D = true;
});

document.getElementById('button-throw').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.D = false;
});

/**
 * Stops the event from propagating further.
 * @param {Event} event - The event to stop.
 */
function doNotClose(event) {
    event.stopPropagation();
}

/**
 * Sets an interval that can be stopped later by adding it to a list of interval IDs.
 * @param {Function} fn - The function to execute at each interval.
 * @param {number} time - The interval time in milliseconds.
 */
function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
}

/**
 * Clears all intervals that were previously set using setStoppableInterval.
 */
function stopIntervals() {
    intervalIds.forEach(clearInterval);
    intervalIds = [];
}

/**
 * Stops the game by clearing all intervals.
 */
function stopGame() {
    stopIntervals();
}

/**
 * Displays the lose screen, stops the game, and plays the lose sound.
 */
function lose() {
    if (fullscreen) {
        closeFullscreen();
    }
    document.getElementById('lose-screen').style.display = 'flex';
    updateUI();
    stopGame();
    lose_sound.play();
}

/**
 * Displays the win screen, stops the game, and plays the win sound.
 */
function win() {
    if (fullscreen) {
        closeFullscreen();
    }
    document.getElementById('win-screen').style.display = 'flex';
    updateUI();
    stopGame();
    win_sound.play();
}

/**
 * Toggles the mute state of the game audio.
 */
function toggleMute() {
    if (!isMuted) {
        document.getElementById('button-mute-image').src = 'img/SOUND-MUTE.png';
        win_sound.muted = true;
        lose_sound.muted = true;
        isMuted = true;
    } else {
        document.getElementById('button-mute-image').src = 'img/SOUND-UNMUTE.png';
        win_sound.muted = false;
        lose_sound.muted = false;
        isMuted = false;
    }
    world.mute(isMuted);
}

/**
 * Toggles the visibility of the information dropdown.
 */
function toggleInfo() {
    let infoDropdown = document.getElementById('dropdown-info');
    infoDropdown.style.display = isVisible ? 'none' : 'flex';
    isVisible = !isVisible;
}

/**
 * Toggles the visibility of the imprint section.
 */
function toggleImprint() {
    let imprintSection = document.getElementById('imprint');
    imprintSection.style.display = isVisible ? 'none' : 'flex';
    isVisible = !isVisible;
}

/**
 * Toggles the visibility of the main imprint section.
 */
function toggleImprintMain() {
    let imprintSection = document.getElementById('imprint-main');
    imprintSection.style.display = isVisible ? 'none' : 'flex';
    isVisible = !isVisible;
}

/**
 * Toggles the visibility of the win screen imprint section.
 */
function toggleImprintWin() {
    let imprintSection = document.getElementById('imprint-win');
    imprintSection.style.display = isVisible ? 'none' : 'flex';
    isVisible = !isVisible;
}

/**
 * Toggles the visibility of the lose screen imprint section.
 */
function toggleImprintLose() {
    let imprintSection = document.getElementById('imprint-lose');
    imprintSection.style.display = isVisible ? 'none' : 'flex';
    isVisible = !isVisible;
}

/**
 * Toggles fullscreen mode for the game display container.
 */
function toggleFullscreen() {
    let container = document.getElementById('game-display');
    if (!fullscreen) {
        openFullscreen(container);
    } else {
        closeFullscreen();
    }
}

/**
 * Opens the fullscreen mode for the provided element.
 * @param {HTMLElement} elem - The element to display in fullscreen.
 */
function openFullscreen(elem) {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    }
    fullscreen = true;
    updateUI();
}

/**
 * Exits fullscreen mode.
 */
function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
    fullscreen = false;
    updateUI();
}

document.addEventListener('fullscreenchange', () => {
    fullscreen = !!document.fullscreenElement;
    updateUI();
});