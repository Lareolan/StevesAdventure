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
            }

            var newX = this.mapX + constants.MOVE_SPEED;
            if (this.canPass(newX, this.mapY + this.height)) {
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
            }
            return result;
        };
        Player.prototype.moveLeft = function () {
            var result = false;
            if (this.facing !== constants.FACING_LEFT) {
                this.facing = constants.FACING_LEFT;
            }

            var newX = this.mapX - constants.MOVE_SPEED;
            if (this.canPass(newX, this.mapY + this.height)) {
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
            }
            return result;
        };
        Player.prototype.jump = function () {
            if ((!this.jumping) && (!this.falling)) {
                this.jumping = true;
                this.jumpedFrom = Math.ceil((this.mapY + this.height) / 32) - 1;
            }
        };
        Player.prototype.canPass = function (x, y) {
            var mapFrontX = Math.ceil((x - 4) / 32);
            var mapBackX = Math.ceil((x - 28) / 32);
            var mapY = Math.ceil(y / 32) - 1;
            var topIndex = this.mapData.width * (mapY - 1) + mapFrontX;
            var bottomFrontIndex = this.mapData.width * (mapY - 0) + mapFrontX;
            var bottomBackIndex = this.mapData.width * (mapY - 0) + mapBackX;

            var topTile = this.mapData.data[topIndex];
            var bottomFrontTile = this.mapData.data[bottomFrontIndex];
            var bottomBackTile = this.mapData.data[bottomBackIndex];

            if (((topTile === constants.AIR_BLOCK) || (topTile === constants.WATER_BLOCK)) && ((bottomFrontTile === constants.AIR_BLOCK) || (bottomFrontTile === constants.WATER_BLOCK)) && ((bottomBackTile === constants.AIR_BLOCK) || (bottomBackTile === constants.WATER_BLOCK))) {
                return true;
            }

            return false;
        };
        Player.prototype.testVerticalCollision = function (x, y) {
            var mapFrontX = Math.ceil((x - 4) / 32);
            var mapBackX = Math.ceil((x - 28) / 32);
            var mapY = Math.ceil(y / 32) - 1;
            var topIndex = this.mapData.width * (mapY - 2) + mapFrontX;
            var bottomFrontIndex = this.mapData.width * (mapY - 0) + mapFrontX;
            var bottomBackIndex = this.mapData.width * (mapY - 0) + mapBackX;

            var topTile = this.mapData.data[topIndex];
            var bottomFrontTile = this.mapData.data[bottomFrontIndex];
            var bottomBackTile = this.mapData.data[bottomBackIndex];

            if (((topTile === constants.AIR_BLOCK) || (topTile === constants.WATER_BLOCK)) && ((bottomFrontTile === constants.AIR_BLOCK) || (bottomFrontTile === constants.WATER_BLOCK)) && ((bottomBackTile === constants.AIR_BLOCK) || (bottomBackTile === constants.WATER_BLOCK))) {
                return true;
            }

            return false;
        };
        Player.prototype.findAltitude = function () {
            var mapY = Math.ceil((this.mapY + this.height) / 32) - 1;
            return (this.jumpedFrom - mapY);
        };
        Player.prototype.update = function () {
            if (this.jumping) {
                var newY = this.mapY - constants.MOVE_SPEED;
            } else {
                var newY = this.mapY + constants.MOVE_SPEED;
            }

            //            var passable = this.canPass(this.mapX, newY + this.height);
            var passable = this.testVerticalCollision(this.mapX, newY + this.height);
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

            this.sprite.x = this.canvasX;
            return false;
        };
        return Player;
    })();
    GameObjects.Player = Player;
})(GameObjects || (GameObjects = {}));
//# sourceMappingURL=Player.js.map
