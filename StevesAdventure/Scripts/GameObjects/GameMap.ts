/// <reference path="tileset.ts" />
/// <reference path="../managers/assets.ts" />

module GameObjects {
    // Map class
    export class GameMap {
        map: createjs.Bitmap;
        layers: Array<GameObjects.Layer>;
        tileset: GameObjects.Tileset;
        width: number;
        height: number;
        mapWidth: number;
        mapHeight: number;

        constructor() {
            this.layers = [];
            var index, tileID, tile;

//            var $mapData = $(queue.getResult("Level1Map"));
            var $mapData = $(Managers.Assets.loader.getResult("Level1Map"));
            var $tilesets = $mapData.find("tileset");
            var $layers = $mapData.find("layer");
            var gameMap = this;

            this.tileset = new GameObjects.Tileset($tilesets);

            $layers.each(function () {
                var newLayer = new GameObjects.Layer();
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

        getLayer(name: string): GameObjects.Layer {
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
} 