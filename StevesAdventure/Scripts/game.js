/// <reference path="lib/jquery.d.ts" />
/// <reference path="gameobjects/sky.ts" />
/// <reference path="managers/cloudmanager.ts" />
/// <reference path="gameobjects/gamemap.ts" />
/// <reference path="gameobjects/player.ts" />
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
var text2;
var sky;

//var clouds: Array<GameObjects.Cloud> = [];
var cloudManager;
var player;
var map;
var gui;
var sound;
var mobs;

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
    LAVA_BLOCK: 238
};

/*
var PLAYER = {
FRAMES: {
STAND: "SteveStand",
STEP: "SteveStep",
ATTACK: "SteveStepAttack"
}
};
*/
// Preload function
function preload() {
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
    //    console.log((100 * progress).toFixed(0) + ": " + event.progress);
}

function handleComplete(event) {
    setTimeout(init, 500);
}

function init() {
    stage = new createjs.Stage(document.getElementById("canvas"));
    stage.enableMouseOver(20);
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", gameLoop);
    gameStart();
}

// Game Loop
function gameLoop(event) {
    if (input.keyboard.KEY_LEFT) {
        if (player.moveLeft()) {
            map.moveLeft();
            cloudManager.moveLeft();
            sound.playerWalk();
            mobs.shiftRight();
            //            map.move(player.mapX, player.mapY);
        }
    }
    if (input.keyboard.KEY_RIGHT) {
        if (player.moveRight()) {
            map.moveRight();
            cloudManager.moveRight();
            sound.playerWalk();
            mobs.shiftLeft();
            //            map.move(player.mapX, player.mapY);
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

// Level Class
var Level = (function () {
    function Level() {
    }
    return Level;
})();

// Initialize game images
function gameStart() {
    sky = new GameObjects.Sky();

    cloudManager = new Managers.CloudManager(5);

    map = new GameObjects.GameMap();

    mobs = new Managers.Mobs(map.entities.getEntitiesByType("Mob"), map.getLayer(constants.FOREGROUND_LAYER_NAME));

    player = new GameObjects.Player(map.entities.getEntityByName("Steve"), map.getLayer(constants.FOREGROUND_LAYER_NAME));
    stage.addEventListener("playerAttack", { handleEvent: player.attack, instance: player });

    text = new createjs.Text();

    //    text2.scaleX = 4;
    //    text2.scaleY = 4;
    text.font = "32px Minecrafter";

    //    text2.text = "Minecraft Text Testing";
    text.text = "Kill Count: 0";
    text.y = 640 + 16;
    text.textBaseline = "middle";
    stage.addChild(text);

    gui = new Managers.GUI(player);
    stage.addEventListener("playerDeath", { handleEvent: gui.playerDeath, instance: player });

    sound = new Managers.Sound();
}

$("canvas").click(function () {
    if (!isFullscreen()) {
        launchIntoFullscreen(this);
        var width = $(window).outerWidth();
        var scale = width / $(this).innerWidth();
        $(this).attr("style", "transform: scale(" + scale + ")");
        $(this).addClass("fullscreen");
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
