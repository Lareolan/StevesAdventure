/// <reference path="lib/jquery.d.ts" />
/// <reference path="gameobjects/sky.ts" />
/// <reference path="gameobjects/cloud.ts" />

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
var sky;
var clouds = [];

//var tile: Tileset2;
var player;
var map;

// Input state
var input = {
    keyboard: {
        KEY_LEFT: false,
        KEY_RIGHT: false,
        KEY_UP: false
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
    MAX_CLOUDS: 5,
    CLOUDS: ["cloud1", "cloud2"],
    MOVE_SPEED: 4
};

var PLAYER = {
    FRAMES: {
        STAND: "SteveStand",
        STEP: "SteveStep",
        ATTACK: "SteveStepAttack"
    }
};

// Preload function
function preload() {
    stage = new createjs.Stage(document.getElementById("canvas"));
    progressBar = new createjs.Shape();
    text = new createjs.Text();
    text.font = "bold 36px Arial";
    text.color = "#C33";

    stage.addChild(progressBar);
    stage.addChild(text);

    queue = new createjs.LoadQueue();
    queue.installPlugin(createjs.Sound);

    //    queue.addEventListener("complete", init);
    queue.addEventListener("progress", handleProgress);
    queue.addEventListener("complete", handleComplete);
    queue.loadManifest([
        { id: "SteveStand", src: "Assets/images/SteveStand.png" },
        { id: "SteveStep", src: "Assets/images/SteveStep.png" },
        { id: "SteveStepAttack", src: "Assets/images/SteveStepAttack.png" },
        { id: "sky", src: "Assets/images/Sky.png" },
        { id: "cloud1", src: "Assets/images/Cloud_1.png" },
        { id: "cloud2", src: "Assets/images/Cloud_2.png" },
        { id: "MasterTileSet", src: "Assets/images/MasterTileSet.png", type: createjs.LoadQueue.IMAGE, data: 102955 },
        { id: "Character-Tileset", src: "Assets/images/MasterTileSet.png" },
        { id: "Level1Data", src: "Assets/data/Level1.json" },
        { id: "Level1Map", src: "Assets/data/Level1.tmx" }
    ]);
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
        map.moveLeft();
    }
    if (input.keyboard.KEY_RIGHT) {
        map.moveRight();
    }

    for (var cloud = 0; cloud < constants.MAX_CLOUDS; cloud++) {
        clouds[cloud].update();
        if (input.keyboard.KEY_LEFT) {
            clouds[cloud].moveLeft();
        }
        if (input.keyboard.KEY_RIGHT) {
            clouds[cloud].moveRight();
        }
    }

    stage.update();
}

/*
// Sky Class
class Sky {
image: createjs.Bitmap;
width: number;
height: number;
constructor() {
this.image = new createjs.Bitmap(queue.getResult("sky"));
this.width = this.image.getBounds().width;
this.height = this.image.getBounds().height;
stage.addChild(this.image);
}
}
*/
/*
// Cloud Class
class Cloud {
image: createjs.Bitmap;
width: number;
height: number;
dx: number;
constructor() {
var cloudIndex = constants.CLOUDS[Math.floor(Math.random() * constants.CLOUDS.length)];
this.image = new createjs.Bitmap(queue.getResult(cloudIndex));
this.width = this.image.getBounds().width;
this.height = this.image.getBounds().height;
this.image.regX = this.width * 0.5;
this.image.regY = this.height * 0.5;
stage.addChild(this.image);
this.reset();
}
reset() {
this.image.y = Math.floor(Math.random() * (stage.canvas.height - 320));
this.image.x = this.width;
this.dx = Math.floor(Math.random() * 4 + 2);
}
update() {
this.image.x += this.dx;
if (this.image.x > (this.width + stage.canvas.width)) {
this.reset();
}
}
moveLeft() {
this.image.x += constants.MOVE_SPEED;
}
moveRight() {
this.image.x -= constants.MOVE_SPEED;
}
}
*/
// Level Class
var Level = (function () {
    function Level() {
    }
    return Level;
})();

/*
// Tileset Class
class Tileset2 {
image: createjs.Bitmap;
tiles: createjs.SpriteSheet;
tile: createjs.Bitmap;
constructor() {
this.image = new createjs.Bitmap(queue.getResult("MasterTileSet"));
this.image.setBounds(0, 32, 32, 32);
this.tiles = new createjs.SpriteSheet({
images: [queue.getResult("MasterTileSet")],
frames: { width: 32, height: 32 }
});
var canvas = document.createElement("canvas");
canvas.width = 3200;
canvas.height = 640;
var bitmapStage = new createjs.Stage(canvas);
// Testing
var json = queue.getResult("Level1Data");
for (var y = 0; y < json.layers[0].height; y++) {
for (var x = 0; x < 100; x++) {
var idx = json.layers[0].width * y + x;
var frameID = json.layers[0].data[idx];
if (frameID !== 0) {
var frame = createjs.SpriteSheetUtils.extractFrame(this.tiles, frameID - 1);
var image = new createjs.Bitmap(frame);
image.x = x * 32;
image.y = y * 32;
bitmapStage.addChild(image);
}
}
}
bitmapStage.update();
this.image = new createjs.Bitmap(canvas);
stage.addChild(this.image);
}
moveLeft() {
if (this.image.x <= -constants.MOVE_SPEED) {
this.image.x += constants.MOVE_SPEED;
}
}
moveRight() {
if (this.image.x >= -(3200 - stage.canvas.width - constants.MOVE_SPEED)) {
this.image.x -= constants.MOVE_SPEED;
}
}
}
*/
// Map class
var GameMap = (function () {
    function GameMap() {
        this.layers = [];
        var index, tileID, tile;

        var $mapData = $(queue.getResult("Level1Map"));
        var $tilesets = $mapData.find("tileset");
        var $layers = $mapData.find("layer");
        var gameMap = this;

        this.tileset = new Tileset($tilesets);

        $layers.each(function () {
            var newLayer = new Layer();
            newLayer.fromXML($(this));
            gameMap.layers.push(newLayer);
        });

        var background = this.getLayer("Background");
        var foreground = this.getLayer("Foreground");

        this.width = foreground.width;
        this.height = foreground.height;

        var canvas = document.createElement("canvas");
        var tilesetInfo = this.tileset.getTileInfo(1);
        this.mapWidth = canvas.width = this.width * tilesetInfo["width"];
        this.mapHeight = canvas.height = this.height * tilesetInfo["height"];

        var bitmapStage = new createjs.Stage(canvas);

        var layerList = [background, foreground];

        for (var layer = 0; layer < this.layers.length; layer++) {
            for (var y = 0; y < this.height; y++) {
                for (var x = 0; x < this.width; x++) {
                    index = this.width * y + x;
                    tileID = layerList[layer].data[index];
                    tile = this.tileset.getTile(tileID);
                    tilesetInfo = this.tileset.getTileInfo(tileID);

                    if (tile) {
                        tile.x = x * tilesetInfo["width"];
                        tile.y = y * tilesetInfo["height"];
                        bitmapStage.addChild(tile);
                    }
                }
            }
        }

        bitmapStage.update();
        this.map = new createjs.Bitmap(canvas);
        stage.addChild(this.map);
    }
    GameMap.prototype.getLayer = function (name) {
        for (var index = 0; index < this.layers.length; index++) {
            if (this.layers[index].name == name) {
                return this.layers[index];
            }
        }
        return null;
    };

    GameMap.prototype.moveLeft = function () {
        if (this.map.x <= -constants.MOVE_SPEED) {
            this.map.x += constants.MOVE_SPEED;
        }
    };

    GameMap.prototype.moveRight = function () {
        if (this.map.x >= -(this.mapWidth - stage.canvas.width - constants.MOVE_SPEED)) {
            this.map.x -= constants.MOVE_SPEED;
        }
    };
    return GameMap;
})();

// Layer Class
var Layer = (function () {
    function Layer() {
    }
    Layer.prototype.fromXML = function ($layer) {
        this.name = $layer.attr("name");
        this.width = parseInt($layer.attr("width"));
        this.height = parseInt($layer.attr("height"));
        this.data = this.getData($layer.find("data:first"));
    };

    Layer.prototype.getData = function ($data) {
        var encoding = $data.attr("encoding");
        var compression = $data.attr("compression");
        var bytes = $.trim($data.text());

        if (encoding) {
            if (encoding == "base64") {
                bytes = Base64Decode(bytes);
            }
        }

        if (compression) {
            if (compression == "zlib") {
                bytes = new Zlib.Inflate(bytes).decompress();
                return this.flipGlobalIDs(bytes);
            }
        }

        return null;
    };

    Layer.prototype.flipGlobalIDs = function (data) {
        var flippedGlobalIds = [];
        for (var n = 0; n < data.length; n += 4) {
            var flippedGlobalId = 0;
            flippedGlobalId += data[n + 0]; // << 0;
            flippedGlobalId += data[n + 1] << 8;
            flippedGlobalId += data[n + 2] << 16;
            flippedGlobalId += data[n + 3] << 24;
            flippedGlobalIds.push(flippedGlobalId);
        }
        return flippedGlobalIds;
    };
    return Layer;
})();

// Tileset Class
var Tileset = (function () {
    function Tileset($tilesets) {
        this.tileInfo = [];
        this.tileIndex = [];

        var tileset = this;

        $tilesets.each(function () {
            var $tileset = $(this);
            var info = {};

            info["name"] = $tileset.attr("name");
            info["firstgid"] = parseInt($tileset.attr("firstgid"));
            info["width"] = parseInt($tileset.attr("tilewidth"));
            info["height"] = parseInt($tileset.attr("tileheight"));

            var spriteSheet = new createjs.SpriteSheet({
                images: [queue.getResult(info["name"])],
                frames: { width: info["width"], height: info["height"] }
            });

            var frame;
            for (var frameIdx = info["firstgid"]; frameIdx < info["firstgid"] + spriteSheet.getNumFrames(null); frameIdx++) {
                frame = createjs.SpriteSheetUtils.extractFrame(spriteSheet, frameIdx - 1);
                tileset.tileIndex[frameIdx] = new createjs.Bitmap(frame);
                tileset.tileInfo[frameIdx] = { width: info["width"], height: info["height"] };
            }
        });
    }
    Tileset.prototype.getTile = function (index) {
        var tile = this.tileIndex[index];
        if (tile) {
            return tile.clone();
        }
        return null;
    };

    Tileset.prototype.getTileInfo = function (index) {
        var info = this.tileInfo[index];
        if (info) {
            return info;
        }
        return null;
    };
    return Tileset;
})();

// Player Class
var Player = (function () {
    function Player() {
        this.sprites = [];
        var frameName;
        for (var frameID in PLAYER.FRAMES) {
            frameName = PLAYER.FRAMES[frameID];
            this.sprites[frameName] = new createjs.Bitmap(queue.getResult(frameName));
        }

        this.spriteID = "SteveStand";
        this.sprite = this.sprites[this.spriteID].clone();
        this.sprite.x = 320;
        this.sprite.y = 800;
        stage.addChild(this.sprite);
    }
    return Player;
})();

// Initialize game images
function gameStart() {
    sky = new GameObjects.Sky();

    for (var cloud = 0; cloud < constants.MAX_CLOUDS; cloud++) {
        clouds[cloud] = new GameObjects.Cloud();
    }

    map = new GameMap();

    player = new Player();
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
    ;
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
