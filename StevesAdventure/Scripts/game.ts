/// <reference path="lib/jquery.d.ts" />
/// <reference path="gameobjects/sky.ts" />
/// <reference path="managers/cloudmanager.ts" />
/// <reference path="gameobjects/gamemap.ts" />
/// <reference path="gameobjects/player.ts" />



// Declare external functions for TypeScript
declare function Base64Decode(base64String);


declare function Zlib(): Zlib;
declare module Zlib {
    function Inflate(data): void;
}
interface Zlib { };


/*
	stage.mouseX <--- use this

*/

// Global object references
var stage: createjs.Stage;
var queue;

// Game objects
var progressBar: createjs.Shape;
var text: createjs.Text;
var sky: GameObjects.Sky;
//var clouds: Array<GameObjects.Cloud> = [];
var cloudManager: Managers.CloudManager;
var player: GameObjects.Player;
var map: GameObjects.GameMap;

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
}

// Game Constants
var constants = {
    MAX_CLOUDS: 5,
    CLOUDS: ["cloud1", "cloud2"],
    MOVE_SPEED: 8
};

var PLAYER = {
    FRAMES: {
        STAND: "SteveStand",
        STEP: "SteveStep",
        ATTACK: "SteveStepAttack"
    }
};


// Preload function
function preload(): void {
//    Managers.Assets.init();
//    Managers.Assets.loader.addEventListener("progress", handleProgress);
//    Managers.Assets.loader.addEventListener("complete", handleComplete);


    stage = new createjs.Stage(document.getElementById("canvas"));
    progressBar = new createjs.Shape();
    text = new createjs.Text();
    text.font = "bold 36px Arial";
    text.color = "#C33";

    stage.addChild(progressBar);
    stage.addChild(text);
/*
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
*/
    Managers.Assets.init();
    Managers.Assets.loader.addEventListener("progress", handleProgress);
    Managers.Assets.loader.addEventListener("complete", handleComplete);
}

function handleProgress(event: ProgressEvent): void {
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

function handleComplete(event: Event): void {
    setTimeout(init, 500);
}

function init(): void {
    stage = new createjs.Stage(document.getElementById("canvas"));
    stage.enableMouseOver(20);
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", gameLoop);
    gameStart();
}

// Game Loop
function gameLoop(event): void {
    if (input.keyboard.KEY_LEFT) {
        map.moveLeft();
    }
    if (input.keyboard.KEY_RIGHT) {
        map.moveRight();
    }

    cloudManager.update();

    /*
    for (var cloud = 0; cloud < constants.MAX_CLOUDS; cloud++) {
        clouds[cloud].update();
        if (input.keyboard.KEY_LEFT) {
            clouds[cloud].moveLeft();
        }
        if (input.keyboard.KEY_RIGHT) {
            clouds[cloud].moveRight();
        }
    }
*/

    stage.update();
}

// Level Class
class Level {
    levelData: JSON;
    constructor() {
    }
}

/*
// Map class
class GameMap {
    map: createjs.Bitmap;
    layers: Array<Layer>;
    tileset: Tileset;
    width: number;
    height: number;
    mapWidth: number;
    mapHeight: number;

    constructor() {
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

    getLayer(name: string): Layer {
        for (var index = 0; index < this.layers.length; index++) {
            if (this.layers[index].name == name) {
                return this.layers[index];
            }
        }
        return null;
    }

    moveLeft() {
        if (this.map.x <= -constants.MOVE_SPEED) {
            this.map.x += constants.MOVE_SPEED;
        }
    }

    moveRight() {
        if (this.map.x >= -(this.mapWidth - stage.canvas.width - constants.MOVE_SPEED)) {
            this.map.x -= constants.MOVE_SPEED;
        }
    }
}
*/

/*
// Layer Class
class Layer {
    data: Array<number>;
    name: string;
    width: number;
    height: number;

    constructor() {
    }

    fromXML($layer) {
        this.name = $layer.attr("name");
        this.width = parseInt($layer.attr("width"));
        this.height = parseInt($layer.attr("height"));
        this.data = this.getData($layer.find("data:first"));
    }

    getData($data): Array<number> {
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
    }

    flipGlobalIDs(data): Array<number> {
        var flippedGlobalIds = [];
        for (var n = 0; n < data.length; n += 4) {
            var flippedGlobalId = 0;
            flippedGlobalId += data[n + 0];// << 0;
            flippedGlobalId += data[n + 1] << 8;
            flippedGlobalId += data[n + 2] << 16;
            flippedGlobalId += data[n + 3] << 24;
            flippedGlobalIds.push(flippedGlobalId);
        }
        return flippedGlobalIds;
    }
}
*/

/*
// Tileset Class
class Tileset {
    tileInfo: Array<Object>;
    tileIndex: Array<createjs.Bitmap>;

    constructor($tilesets) {
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
                tileset.tileInfo[frameIdx] = { width: info["width"], height: info["height"] }
            }
        });
    }

    getTile(index: number): createjs.Bitmap {
        var tile = this.tileIndex[index];
        if (tile) {
            return tile.clone()
        }
        return null;
    }

    getTileInfo(index: number) {
        var info = this.tileInfo[index];
        if (info) {
            return info;
        }
        return null;
    }
}
*/

// Initialize game images
function gameStart(): void {
    sky = new GameObjects.Sky();

    cloudManager = new Managers.CloudManager(5);

    for (var cloud = 0; cloud < constants.MAX_CLOUDS; cloud++) {
//        clouds[cloud] = new GameObjects.Cloud();
    }

    map = new GameObjects.GameMap();

    player = new GameObjects.Player();
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

$("canvas").bind("touchstart", function (e: Event) {
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
        case 27:        // ESC
            break;
        case 37:        // Left Arrow
        case 65:        // "a" Key
            input.keyboard.KEY_LEFT = true;
            break;
        case 39:        // Right Arrow
        case 68:        // "d" Key
            input.keyboard.KEY_RIGHT = true;
            break;
        case 38:        // Up Arrow
        case 87:        // "w" Key
            input.keyboard.KEY_UP = true;
            break;
    }
});

$(document).keyup(function (e) {
    switch (e.keyCode) {
        case 27:        // ESC
            break;
        case 37:        // Left Arrow
        case 65:        // "a" Key
            input.keyboard.KEY_LEFT = false;
            break;
        case 39:        // Right Arrow
        case 68:        // "d" Key
            input.keyboard.KEY_RIGHT = false;
            break;
        case 38:        // Up Arrow
        case 87:        // "w" Key
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
};

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
