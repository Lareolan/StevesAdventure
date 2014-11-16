/// <reference path="tileset.ts" />
/// <reference path="../managers/assets.ts" />

module GameObjects {
    // Map class
    export class GameMap {
        map: createjs.Bitmap;
        layers: Array<GameObjects.Layer>;
        tileset: GameObjects.Tileset;
        entities: GameObjects.MapEntities;
        width: number;
        height: number;
        mapWidth: number;
        mapHeight: number;

        constructor() {
            this.layers = [];
            var index, tileID;
            var tile: createjs.Bitmap;

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
                            // If processing a background layer, then darken it by 25% to
                            // differentiate it from the foreground.
                            if (layer !== this.layers.length - 1) {
                                var color = new createjs.ColorFilter(0.75, 0.75, 0.75, 1, 0, 0, 0, 0);
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

        moveLeft(): void {
            if (this.map.x <= -constants.MOVE_SPEED) {
                this.map.x += constants.MOVE_SPEED;
            }
        }

        moveRight(): void {
            if (this.map.x >= -(this.mapWidth - stage.canvas.width - constants.MOVE_SPEED)) {
                this.map.x -= constants.MOVE_SPEED;
            }
        }

        move(x: number, y: number): void {
            if ((this.map.x <= 0) || (this.map.x >= -(this.mapWidth - stage.canvas.width))) {
//                this.map.x = -x;
//                this.map.y = y;
            }
        }
    }
} 