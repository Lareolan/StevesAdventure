/// <reference path="../managers/assets.ts" />
var GameObjects;
(function (GameObjects) {
    // Player Class
    var Player = (function () {
        function Player(Steve) {
            this.spriteNames = [
                "steveStandRight",
                "steveStepRight",
                "steveStandRightAttack",
                "steveStepRightAttack",
                "steveStandLeft",
                "steveStepLeft",
                "steveStandLeftAttack",
                "steveStepLeftAttack"
            ];
            var spriteName;
            this.sprites = [];

            this.height = parseInt(Steve["height"]);
            this.width = parseInt(Steve["width"]);
            this.canvasX = parseInt(Steve["x"]);
            this.canvasY = parseInt(Steve["y"]) - this.height;
            this.mapX = this.canvasX;
            this.mapY = this.canvasY;

            for (var frameID = 0; frameID < this.spriteNames.length; frameID++) {
                spriteName = this.spriteNames[frameID];
                this.sprites[spriteName] = new createjs.Sprite(Managers.Assets.characters, spriteName);
            }
            this.sprites.length = this.spriteNames.length;

            this.facing = constants.FACING_RIGHT;
            this.falling = true;
            this.jumping = false;
            this.sprite = this.sprites["steveStandRight"].clone();
            this.sprite.x = this.canvasX;
            this.sprite.y = this.canvasY;
            this.sprite.regX = 0;
            this.sprite.regY = 0;

            stage.addChild(this.sprite);
        }
        Player.prototype.setMapData = function (foreground) {
            this.mapData = foreground;
        };
        Player.prototype.moveRight = function () {
            var result = false;
            if (this.facing !== constants.FACING_RIGHT) {
                this.facing = constants.FACING_RIGHT;
                this.spriteUpdate = true;
            }

            var newX = this.mapX + constants.MOVE_SPEED;
            if (this.testHorizontal(constants.MOVE_SPEED)) {
                if (this.mapX <= (stage.canvas.width / 2)) {
                    this.canvasX = this.mapX;
                    result = false;
                } else if (this.mapX >= (this.mapData.width * 32) - (stage.canvas.width / 2)) {
                    this.canvasX = (stage.canvas.width) - ((this.mapData.width * 32) - this.mapX);
                    result = false;
                } else {
                    this.canvasX = (stage.canvas.width / 2);
                    result = true;
                }
                this.mapX = newX;
                ////////////////////////////////
                //                result = true;
            }
            return result;
        };
        Player.prototype.moveLeft = function () {
            var result = false;
            if (this.facing !== constants.FACING_LEFT) {
                this.facing = constants.FACING_LEFT;
                this.spriteUpdate = true;
            }

            var newX = this.mapX - constants.MOVE_SPEED;
            if (this.testHorizontal(-constants.MOVE_SPEED)) {
                if (this.mapX <= (stage.canvas.width / 2)) {
                    this.canvasX = this.mapX;
                    result = false;
                } else if (this.mapX >= (this.mapData.width * 32) - (stage.canvas.width / 2)) {
                    this.canvasX = (stage.canvas.width) - ((this.mapData.width * 32) - this.mapX);
                    result = false;
                } else {
                    this.canvasX = (stage.canvas.width / 2);
                    result = true;
                }
                this.mapX = newX;
                ////////////////////////////////
                //                result = true;
            }
            return result;
        };
        Player.prototype.jump = function () {
            if ((!this.jumping) && (!this.falling)) {
                this.jumping = true;
                this.jumpedFrom = Math.ceil((this.mapY + this.height) / 32) - 1;
            }
        };
        Player.prototype.isPassable = function (tileID) {
            if ((tileID === constants.AIR_BLOCK) || (tileID === constants.WATER_BLOCK)) {
                return true;
            }
            return false;
        };
        Player.prototype.testVerticalCollision = function (direction) {
            var xOffset = (this.facing === constants.FACING_LEFT) ? 1 : 0;

            var mapBackX = Math.floor((this.mapX) / 32) + xOffset;
            var mapFrontX = Math.ceil((this.mapX) / 32) + xOffset;
            var mapY = Math.floor((this.mapY) / 32);

            var topBackIndex = this.mapData.width * (mapY - 1) + mapBackX;
            var bottomBackIndex = this.mapData.width * (mapY + 2) + mapBackX;
            var topFrontIndex = this.mapData.width * (mapY - 1) + mapFrontX;
            var bottomFrontIndex = this.mapData.width * (mapY + 2) + mapFrontX;

            var topBackTile = this.mapData.data[topBackIndex];
            var bottomBackTile = this.mapData.data[bottomBackIndex];
            var topFrontTile = this.mapData.data[topFrontIndex];
            var bottomFrontTile = this.mapData.data[bottomFrontIndex];

            if (!this.tempShape) {
                this.tempShape2 = new createjs.Shape();
                stage.addChild(this.tempShape2);
            }
            this.tempShape2.graphics.clear();
            this.tempShape2.graphics.beginStroke("#0000FF").drawRect(mapBackX * 32, (mapY - 1) * 32, 32, 32).drawRect(mapBackX * 32, (mapY + 2) * 32, 32, 32).drawRect(mapFrontX * 32, (mapY - 1) * 32, 32, 32).drawRect(mapFrontX * 32, (mapY + 2) * 32, 32, 32);

            if (direction.toLowerCase() === "top") {
                if (this.isPassable(topBackTile) && this.isPassable(topFrontTile)) {
                    return true;
                }
            } else if (direction.toLowerCase() === "bottom") {
                if (this.isPassable(bottomBackTile) && this.isPassable(bottomFrontTile)) {
                    return true;
                }
            }

            return false;
        };
        Player.prototype.testHorizontal = function (speed) {
            var xOffset = (this.facing === constants.FACING_LEFT) ? 1 : 0;

            var mapX;
            if (speed >= 0) {
                mapX = Math.ceil((this.mapX + speed) / 32) + xOffset;
            } else {
                mapX = Math.floor((this.mapX + speed) / 32) + xOffset;
            }
            var mapY = Math.floor((this.mapY) / 32);

            var topIndex = this.mapData.width * mapY + mapX;
            var bottomIndex = this.mapData.width * (mapY + 1) + mapX;

            var topTile = this.mapData.data[topIndex];
            var bottomTile = this.mapData.data[bottomIndex];

            if (!this.tempShape) {
                this.tempShape = new createjs.Shape();
                stage.addChild(this.tempShape);
            }
            this.tempShape.graphics.clear();
            this.tempShape.graphics.beginStroke("#FF0000").drawRect(mapX * 32, mapY * 32, 32, 64);

            if (this.isPassable(topTile) && this.isPassable(bottomTile)) {
                return true;
            }

            return false;
        };
        Player.prototype.findAltitude = function () {
            var mapY = Math.ceil((this.mapY + this.height) / 32) - 1;
            return (this.jumpedFrom - mapY);
        };
        Player.prototype.update = function () {
            var passable;

            if (this.spriteUpdate) {
                stage.removeChild(this.sprite);

                if (this.facing === constants.FACING_LEFT) {
                    this.sprite = this.sprites["steveStandLeft"].clone();
                    this.canvasX -= this.width;
                    this.mapX -= this.width;
                } else if (this.facing === constants.FACING_RIGHT) {
                    this.sprite = this.sprites["steveStandRight"].clone();
                    this.canvasX += this.width;
                    this.mapX += this.width;
                }

                this.sprite.x = this.canvasX;
                this.sprite.y = this.canvasY;
                stage.addChild(this.sprite);

                this.spriteUpdate = false;
            }

            if (this.jumping) {
                passable = this.testVerticalCollision("top");
                var newY = this.mapY - constants.MOVE_SPEED;
            } else {
                passable = this.testVerticalCollision("bottom");
                var newY = this.mapY + constants.MOVE_SPEED;
            }

            if (passable) {
                if (this.jumping && (this.findAltitude() >= 4)) {
                    this.jumping = false;
                } else {
                    this.falling = true;
                }
                this.mapY = newY;
                this.canvasY = newY;
                this.sprite.y = this.canvasY;
                this.sprite.x = this.canvasX;
                return true;
            } else {
                if (this.jumping) {
                    this.jumping = false;
                } else {
                    this.falling = false;
                }
            }

            //            var xOffset = (this.facing === constants.FACING_LEFT) ? -32 : 0;
            this.sprite.x = this.canvasX;
            return false;
        };
        return Player;
    })();
    GameObjects.Player = Player;
})(GameObjects || (GameObjects = {}));
//# sourceMappingURL=Player.js.map
