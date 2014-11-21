/// <reference path="lib/jquery.d.ts" />
/// <reference path="gameobjects/sky.ts" />
/// <reference path="managers/cloudmanager.ts" />
/// <reference path="gameobjects/gamemap.ts" />
/// <reference path="gameobjects/player.ts" />
/// <reference path="gameobjects/button.ts" />
/// <reference path="managers/gui.ts" />

;

/*
stage.mouseX <--- use this
*/
// Global object references
var stage;
var queue;

// Game objects
var progressBar;
var text;

//var text2: createjs.Text;
var sky;
var cloudManager;
var player;
var map;
var gui;
var sound;
var mobs;
var gameState;
var startButton;
var instructionsButton;

// Input state
var input = {
    keyboard: {
        KEY_LEFT: false,
        KEY_RIGHT: false,
        KEY_UP: false,
        KEY_SPACE: false
    },
    mouse: {
        LEFT_BUTTON: false,
        RIGHT_BUTTON: false,
        MIDDLE_BUTTON: false
    },
    touch: {
        TOUCH: false
    }
};

// Game Constants
var constants = {
    FOREGROUND_LAYER_NAME: "Foreground",
    MAX_CLOUDS: 5,
    CLOUDS: ["cloud1", "cloud2"],
    MOVE_SPEED: 8,
    FACING_LEFT: 0,
    FACING_RIGHT: 1,
    AIR_BLOCK: 0,
    WATER_BLOCK: 206,
    LAVA_BLOCK: 238,
    AI_ACTION_IDLE: 0,
    AI_ACTION_MOVE_RIGHT: 1,
    AI_ACTION_MOVE_LEFT: 2,
    AI_ACTION_ATTACK: 3,
    GAME_STATE_START: 1,
    GAME_STATE_INSTRUCTIONS: 2,
    GAME_STATE_PLAY: 3,
    GAME_STATE_DEATH: 4,
    GAME_STATE_WIN: 5
};

// Preload function
function preload() {
    gui = new Managers.GUI(document.getElementById("canvas"));

    stage = new createjs.Stage(document.getElementById("canvas"));
    progressBar = new createjs.Shape();
    text = new createjs.Text();
    text.font = "bold 36px Arial";
    text.color = "#C33";

    stage.addChild(progressBar);
    stage.addChild(text);

    Managers.Assets.init();
    Managers.Assets.loader.addEventListener("progress", handleProgress);
    Managers.Assets.loader.addEventListener("complete", handleComplete);
}

function handleProgress(event) {
    var x = stage.canvas.width / 2 - 200;
    var y = stage.canvas.height / 2 - 25;
    var width = 400;
    var height = 50;
    var progress = event.loaded / event.total;

    progressBar.graphics.clear();
    progressBar.graphics.beginStroke("#000").drawRect(x, y, width, height);
    progressBar.graphics.beginFill("#CCC").drawRect(x, y, width * progress, height);

    text.text = (progress * 100).toFixed(0) + "% complete";
    text.x = x + width / 2;
    text.y = y + height / 2;
    text.textAlign = "center";
    text.textBaseline = "middle";

    stage.update();
}

function handleComplete(event) {
    setTimeout(init, 500);

    gui.preloadComplete();
}

function init() {
    stage = new createjs.Stage(document.getElementById("canvas"));
    stage.enableMouseOver(20);
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", gameLoop);

    initGameStart();

    //    initGamePlay();
    gameState = constants.GAME_STATE_START;
}

// Game Loop
function gameLoop(event) {
    switch (gameState) {
        case constants.GAME_STATE_PLAY:
            playGame();
            break;
        case constants.GAME_STATE_START:
            startMenu();
            break;
        case constants.GAME_STATE_INSTRUCTIONS:
            instructionsScreen();
            break;
        case constants.GAME_STATE_DEATH:
            deathScreen();
            break;
        case constants.GAME_STATE_WIN:
            winScreen();
            break;
    }
}

function playGame() {
    if (input.keyboard.KEY_LEFT) {
        if (player.moveLeft()) {
            map.moveLeft();
            cloudManager.moveLeft();
            mobs.shiftRight();
        }
    }
    if (input.keyboard.KEY_RIGHT) {
        if (player.moveRight()) {
            map.moveRight();
            cloudManager.moveRight();
            mobs.shiftLeft();
        }
    }
    if (input.keyboard.KEY_UP) {
        player.jump();
    }

    cloudManager.update();
    mobs.update();
    player.update();
    gui.update();
    stage.update();

    sound.update(player, map);
}

function startMenu() {
    cloudManager.update();

    //    gui.update();
    stage.update();
}

function instructionsScreen() {
    cloudManager.update();

    //    gui.update();
    stage.update();
}

function deathScreen() {
    //    gui.update();
    stage.update();
}

function winScreen() {
    //    gui.update();
    stage.update();
}

/*
// Level Class
class Level {
levelData: JSON;
constructor() {
}
}
*/
function initGameStart() {
    gui.show(constants.GAME_STATE_START);

    if (!sound) {
        sound = new Managers.Sound();
    }

    if (!sky) {
        sky = new GameObjects.Sky();
    }

    if (!cloudManager) {
        cloudManager = new Managers.CloudManager(5);
    }

    if (!map) {
        map = new GameObjects.GameMap();
    }

    var buttonWidth = 400;
    var buttonHeight = 80;

    /*
    var button = new createjs.Shape();
    button.graphics.beginStroke("#5533DD").beginFill("rgba(100, 60, 200, 0.8)").drawRoundRect(0, 0, buttonWidth, buttonHeight, 40);
    button.x = (stage.canvas.width / 2) - (buttonWidth / 2);
    button.y = (stage.canvas.height / 2) - (buttonHeight * 2);
    var buttonText = new createjs.Text();
    buttonText.font = "32px Minecrafter";
    buttonText.text = "Start Game";
    buttonText.x = (stage.canvas.width / 2);
    buttonText.y = button.y + buttonHeight / 2;
    buttonText.textBaseline = "middle";
    buttonText.textAlign = "center";
    
    var color = new createjs.ColorFilter(1, 1, 1, 1);
    button.filters = [color];
    button.cache(0, 0, buttonWidth, buttonHeight);
    var buttonFade = "down";
    var buttonTimer;
    button.addEventListener("mouseover", function () {
    buttonTimer = setTimeout(tick, 50);
    function tick() {
    if (buttonFade === "down") {
    button.alpha -= 0.025;
    if (button.alpha <= 0.4) {
    buttonFade = "up";
    }
    } else {
    button.alpha += 0.025;
    if (button.alpha >= 1) {
    buttonFade = "down";
    }
    }
    button.updateCache();
    buttonTimer = setTimeout(tick, 50);
    }
    });
    button.addEventListener("mouseout", function () {
    button.alpha = 1;
    button.updateCache();
    clearTimeout(buttonTimer);
    });
    button.addEventListener("click", function () {
    stage.removeChild(button);
    stage.removeChild(buttonText);
    stage.removeChild(button2);
    stage.removeChild(button2Text);
    gameState = constants.GAME_STATE_PLAY;
    initGamePlay();
    });
    
    var button2 = new createjs.Shape();
    button2.graphics.beginStroke("#5533DD").beginFill("rgba(100, 60, 200, 0.8)").drawRoundRect(0, 0, buttonWidth, buttonHeight, 40);
    button2.x = (stage.canvas.width / 2) - (buttonWidth / 2);
    button2.y = (stage.canvas.height / 2);
    var button2Text = new createjs.Text();
    button2Text.font = "32px Minecrafter";
    button2Text.text = "Instructions";
    button2Text.x = (stage.canvas.width / 2);
    button2Text.y = button2.y + buttonHeight / 2;
    button2Text.textBaseline = "middle";
    button2Text.textAlign = "center";
    var color = new createjs.ColorFilter(1, 1, 1, 1);
    button2.filters = [color];
    button2.cache(0, 0, buttonWidth, buttonHeight);
    button2.addEventListener("mouseover", function () {
    buttonTimer = setTimeout(tick, 200);
    function tick() {
    if (buttonFade === "down") {
    button2.alpha -= 0.025;
    if (button2.alpha <= 0.4) {
    buttonFade = "up";
    }
    } else {
    button2.alpha += 0.025;
    if (button2.alpha >= 1) {
    buttonFade = "down";
    }
    }
    button2.updateCache();
    buttonTimer = setTimeout(tick, 50);
    }
    });
    button2.addEventListener("mouseout", function () {
    button2.alpha = 1;
    button2.updateCache();
    clearTimeout(buttonTimer);
    });
    button2.addEventListener("click", function () {
    stage.removeChild(button);
    stage.removeChild(buttonText);
    stage.removeChild(button2);
    stage.removeChild(button2Text);
    gameState = constants.GAME_STATE_INSTRUCTIONS;
    initInstructionScreen();
    });
    */
    var btnX = (stage.canvas.width / 2) - (buttonWidth / 2), btnY = (stage.canvas.height / 2) - (buttonHeight * 2);

    var startBtn = new GameObjects.Button("Start Game", buttonWidth, buttonHeight, btnX, btnY, GameObjects.Button.ROUNDED, "black", "#5533DD", "rgba(100, 60, 200, 0.8)");
    startBtn.setFadeEffect();
    startBtn.setClickHandler(function () {
        // TODO: Fix this later
        stage.removeChild(startBtn);
        stage.removeChild(instructBtn);

        gameState = constants.GAME_STATE_PLAY;
        initGamePlay();
    });
    stage.addChild(startBtn);

    btnY += buttonHeight * 2;
    var instructBtn = new GameObjects.Button("Instructions", buttonWidth, buttonHeight, btnX, btnY, GameObjects.Button.ROUNDED, "black", "#5533DD", "rgba(100, 60, 200, 0.8)");
    instructBtn.setFadeEffect();
    instructBtn.setClickHandler(function () {
        stage.removeChild(startBtn);
        stage.removeChild(instructBtn);

        gameState = constants.GAME_STATE_INSTRUCTIONS;
        initInstructionScreen();
    });
    stage.addChild(instructBtn);
    //    startButton = [];
    //    startButton.push(new createjs.Shape());
    //    instructionsButton = [];
    /*
    stage.addChild(button);
    stage.addChild(buttonText);
    stage.addChild(button2);
    stage.addChild(button2Text);
    */
}

function initInstructionScreen() {
    //    map.hide();
    gui.show(constants.GAME_STATE_INSTRUCTIONS);
}

// Initialize game play time elements
function initGamePlay() {
    player = new GameObjects.Player(map.entities.getEntityByName("Steve"), map.getLayer(constants.FOREGROUND_LAYER_NAME), sound);
    mobs = new Managers.Mobs(map.entities.getEntitiesByType("Mob"), map.getLayer(constants.FOREGROUND_LAYER_NAME), sound, player);

    stage.addEventListener("playerAttack", { handleEvent: player.attack, player: player, mobs: mobs });

    text = new createjs.Text();

    //    text2.scaleX = 4;
    //    text2.scaleY = 4;
    text.font = "32px Minecrafter";

    //    text2.text = "Minecraft Text Testing";
    text.text = "Kill Count: 0";
    text.y = 640 + 16;
    text.textBaseline = "middle";
    stage.addChild(text);

    //    gui = new Managers.GUI(document.getElementById("canvas"));
    gui.preloadComplete();
    gui.setPlayer(player);
    gui.setStage(stage);
    stage.addEventListener("playerHit", { handleEvent: gui.playerHit, player: player, gui: gui });
    stage.addEventListener("playerDeath", { handleEvent: gui.playerDeath, player: player });
}

$("#fullscreen").click(function () {
    if (!isFullscreen()) {
        var $canvas = $("canvas");
        launchIntoFullscreen($canvas[0]);
        var width = $(window).outerWidth();
        var scale = width / $canvas.innerWidth();
        $canvas.attr("style", "transform: scale(" + scale + ")");
        $canvas.addClass("fullscreen");
    }
});

$("canvas").mousedown(function (e) {
    var middle = $(window).outerWidth() / 2;
    var rect = this.getBoundingClientRect();
    var mouse = {
        x: (e.clientX - rect.left) / (rect.right - rect.left) * this.width,
        y: (e.clientY - rect.top) / (rect.bottom - rect.top) * this.height
    };

    if (mouse.x >= middle) {
        input.keyboard.KEY_RIGHT = true;
        input.keyboard.KEY_LEFT = false;
    } else if (mouse.x < middle) {
        input.keyboard.KEY_RIGHT = false;
        input.keyboard.KEY_LEFT = true;
    }

    switch (e.which) {
        case 1:
            input.mouse.LEFT_BUTTON = true;
            break;
        case 2:
            input.mouse.MIDDLE_BUTTON = true;
            break;
        case 3:
            input.mouse.RIGHT_BUTTON = true;
            break;
    }
});

$("canvas").mouseup(function (e) {
    input.keyboard.KEY_RIGHT = false;
    input.keyboard.KEY_LEFT = false;

    switch (e.which) {
        case 1:
            input.mouse.LEFT_BUTTON = false;
            break;
        case 2:
            input.mouse.MIDDLE_BUTTON = false;
            break;
        case 3:
            input.mouse.RIGHT_BUTTON = false;
            break;
    }
});

$("canvas").mousemove(function (e) {
    var middle = $(window).outerWidth() / 2;
    var rect = this.getBoundingClientRect();
    var mouse = {
        x: (e.clientX - rect.left) / (rect.right - rect.left) * this.width,
        y: (e.clientY - rect.top) / (rect.bottom - rect.top) * this.height
    };

    if (input.mouse.LEFT_BUTTON) {
        if ((input.keyboard.KEY_LEFT) && (mouse.x >= middle)) {
            input.keyboard.KEY_LEFT = false;
            input.keyboard.KEY_RIGHT = true;
        } else if ((input.keyboard.KEY_RIGHT) && (mouse.x < middle)) {
            input.keyboard.KEY_LEFT = true;
            input.keyboard.KEY_RIGHT = false;
        }
    }
});

$("canvas").bind("touchstart", function (e) {
    var middle = $(window).outerWidth() / 2;
    var touch = e.originalEvent.touches[0];

    var rect = this.getBoundingClientRect();
    var touchPoint = {
        x: (touch.clientX - rect.left) / (rect.right - rect.left) * this.width,
        y: (touch.clientY - rect.top) / (rect.bottom - rect.top) * this.height
    };

    if (touchPoint.x >= middle) {
        input.keyboard.KEY_RIGHT = true;
        input.keyboard.KEY_LEFT = false;
    } else if (touchPoint.x < middle) {
        input.keyboard.KEY_RIGHT = false;
        input.keyboard.KEY_LEFT = true;
    }

    if (input.touch.TOUCH) {
        var touch2 = e.originalEvent.touches[1];
        alert("Second touch event at (" + touch2.clientX + ", " + touch2.clientY + ")\n Touches: " + e.originalEvent.touches.length);
    }

    input.touch.TOUCH = true;
});

$("canvas").bind("touchmove", function (e) {
    var middle = $(window).outerWidth() / 2;
    var touch = e.originalEvent.touches[0];

    var rect = this.getBoundingClientRect();
    var touchPoint = {
        x: (touch.clientX - rect.left) / (rect.right - rect.left) * this.width,
        y: (touch.clientY - rect.top) / (rect.bottom - rect.top) * this.height
    };

    if (input.touch.TOUCH) {
        if ((input.keyboard.KEY_LEFT) && (touchPoint.x >= middle)) {
            input.keyboard.KEY_LEFT = false;
            input.keyboard.KEY_RIGHT = true;
        } else if ((input.keyboard.KEY_RIGHT) && (touchPoint.x < middle)) {
            input.keyboard.KEY_LEFT = true;
            input.keyboard.KEY_RIGHT = false;
        }
    }
});

$("canvas").bind("touchend", function (e) {
    input.keyboard.KEY_RIGHT = false;
    input.keyboard.KEY_LEFT = false;
    input.touch.TOUCH = false;
});

$(document).keydown(function (e) {
    switch (e.keyCode) {
        case 27:
            break;
        case 37:
        case 65:
            input.keyboard.KEY_LEFT = true;
            break;
        case 39:
        case 68:
            input.keyboard.KEY_RIGHT = true;
            break;
        case 38:
        case 87:
            input.keyboard.KEY_UP = true;
            break;
        case 32:
            if (!input.keyboard.KEY_SPACE) {
                input.keyboard.KEY_SPACE = true;
                var event = new createjs.Event("playerAttack", true, false);
                stage.dispatchEvent(event);
            }
            break;
    }
});

$(document).keyup(function (e) {
    switch (e.keyCode) {
        case 27:
            break;
        case 37:
        case 65:
            input.keyboard.KEY_LEFT = false;
            break;
        case 39:
        case 68:
            input.keyboard.KEY_RIGHT = false;
            break;
        case 38:
        case 87:
            input.keyboard.KEY_UP = false;
            break;
        case 32:
            input.keyboard.KEY_SPACE = false;
            break;
    }
});

$(window).bind("orientationchange", function (e) {
    switch (window.orientation) {
        case -90:
            $(document.body).removeClass("turnCW");
            break;
        case 90:
            $(document.body).removeClass("turnCW");
            break;
        case 0:
            $(document.body).addClass("turnCW");
            break;
    }
});

function isFullscreen() {
    return document.fullscreen || document.mozFullScreen || document.webkitIsFullScreen || document.webkitIsFullScreen;
}

document.addEventListener("fullscreenchange", function () {
    if (!document.fullscreen) {
        exitFullscreen();
    }
}, false);

document.addEventListener("mozfullscreenchange", function () {
    if (!document.mozFullScreen) {
        exitFullscreen();
    }
}, false);

document.addEventListener("webkitfullscreenchange", function () {
    if (!document.webkitIsFullScreen) {
        exitFullscreen();
    }
}, false);

document.addEventListener("msfullscreenchange", function () {
    if (!document.msFullscreenElement) {
        exitFullscreen();
    }
}, false);

// Find the right method, call on correct element
function launchIntoFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
}

function exitFullscreen() {
    $("canvas").removeAttr("style").removeClass("fullscreen");
}
;
/*
// Whack fullscreen
function exitFullscreen() {
if (document.exitFullscreen) {
document.exitFullscreen();
} else if (document.mozCancelFullScreen) {
document.mozCancelFullScreen();
} else if (document.webkitExitFullscreen) {
document.webkitExitFullscreen();
}
}
Step 1: Query the window.orientation property to see if you're in landscape or portrait mode
Step 2: If you're in portrait mode use a -webkit-transform rotate (-90) on a div that's wrapping your entire page to force it into a landscape layout.
<body onorientationchange="testOrientation();" onload="testOrientation();">
*/
//# sourceMappingURL=game.js.map
