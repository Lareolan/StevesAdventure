﻿/// <reference path="tileset.ts" />
/// <reference path="../managers/assets.ts" />
var GameObjects;
(function (GameObjects) {
    // Map class
    var GameMap = (function () {
        function GameMap() {
            this.layers = [];
            var index, tileID;
            var tile;

            //            var $mapData = $(queue.getResult("Level1Map"));
            var $mapData = $(Managers.Assets.loader.getResult("Level1Map"));
            var $tilesets = $mapData.find("tileset");
            var $layers = $mapData.find("layer");
            var $entityGroup = $mapData.find("objectgroup");
            var gameMap = this;

            this.tileset = new GameObjects.Tileset($tilesets);

            $layers.each(function () {
                var newLayer = new GameObjects.Layer();
                newLayer.fromXML($(this));
                gameMap.layers.push(newLayer);
            });

            this.entities = new GameObjects.MapEntities($entityGroup);

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
                            // If processing a background layer, then darken it by 40% to
                            // differentiate it from the foreground.
                            if (layer !== this.layers.length - 1) {
                                var color = new createjs.ColorFilter(0.60, 0.60, 0.60, 1, 0, 0, 0, 0);
                                tile.filters = [color];
                                tile.cache(0, 0, tilesetInfo["width"], tilesetInfo["height"]);
                            }
                            tile.x = x * tilesetInfo["width"];
                            tile.y = y * tilesetInfo["height"];
                            bitmapStage.addChild(tile);
                        }
                    }
                }
            }

            bitmapStage.update();
            this.map = new createjs.Bitmap(canvas);
            this.map.name = "Map";
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

        GameMap.prototype.move = function (x, y) {
            if ((this.map.x <= 0) || (this.map.x >= -(this.mapWidth - stage.canvas.width))) {
                //                this.map.x = -x;
                //                this.map.y = y;
            }
        };

        GameMap.prototype.show = function () {
            stage.addChild(this.map);
        };

        GameMap.prototype.hide = function () {
            stage.removeChild(this.map);
        };

        GameMap.prototype.getImage = function () {
            return this.map;
        };

        GameMap.prototype.reset = function () {
            this.map.x = 0;
            this.map.y = 0;
        };
        return GameMap;
    })();
    GameObjects.GameMap = GameMap;
})(GameObjects || (GameObjects = {}));
//# sourceMappingURL=GameMap.js.map
