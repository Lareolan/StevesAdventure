/// <reference path="../managers/assets.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var GameObjects;
(function (GameObjects) {
    // Player Class
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(Steve, foreground, sound) {
            _super.call(this, Steve, foreground);
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
            this.baseDamage = 5;
            this.killCount = 0;

            this.steveObject = Steve;
            this.name = "Steve";
            this.sound = sound;

            var spriteName;
            for (var frameID = 0; frameID < this.spriteNames.length; frameID++) {
                spriteName = this.spriteNames[frameID];
                this.sprites[spriteName] = new createjs.Sprite(Managers.Assets.characters, spriteName);
            }
            this.sprites.length = this.spriteNames.length;

            this.facing = constants.FACING_RIGHT;
            this.falling = true;
            this.jumping = false;
            this.sprite = this.sprites[this.spriteNames[0]].clone();
            this.sprite.x = this.canvasX;
            this.sprite.y = this.canvasY;
            this.sprite.regX = 0;
            this.sprite.regY = 0;

            stage.addChild(this.sprite);

            this.health = 10;
            this.attackCounter = 0;
            this.runDistanceIncrements = 4;
            this.useXOffsetHack = true;
            this.baseMovementSpeed = constants.MOVE_SPEED;
        }
        Player.prototype.moveRight = function () {
            this.sound.playerWalk();
            return _super.prototype.moveRight.call(this);
        };

        Player.prototype.moveLeft = function () {
            this.sound.playerWalk();
            return _super.prototype.moveLeft.call(this);
        };

        Player.prototype.jump = function () {
            if ((!this.jumping) && (!this.falling)) {
                this.jumping = true;
                this.jumpedFrom = Math.ceil((this.mapY + this.height) / 32) - 1;
            }
        };
        Player.prototype.attack = function (event) {
            this.player.attackFlag = true;
            this.player.spriteUpdate = true;
            this.mobs.hitTest(this.player.baseDamage);
        };
        Player.prototype.takeDamage = function (hearts) {
            this.health -= hearts;
            if (this.health <= 0) {
                var event = new createjs.Event("playerDeath", true, false);
                stage.dispatchEvent(event);
            } else {
                var event = new createjs.Event("playerHit", true, false);
                stage.dispatchEvent(event);
            }
            return true;
        };

        Player.prototype.die = function () {
            this.dead = true;
        };

        Player.prototype.addKill = function () {
            this.killCount++;
        };

        Player.prototype.getKillcount = function () {
            return this.killCount;
        };

        Player.prototype.findAltitude = function () {
            var mapY = Math.ceil((this.mapY + this.height) / 32) - 1;
            return (this.jumpedFrom - mapY);
        };
        Player.prototype.update = function () {
            var passable, result = false;

            if (this.dead) {
                return false;
            }

            if (!input.keyboard.KEY_LEFT && !input.keyboard.KEY_RIGHT) {
                this.runDistance = 0;
                this.spriteUpdate = true;
            }
            if (this.attackFlag) {
                if (this.attackCounter >= 8) {
                    this.spriteUpdate = true;
                    this.attackCounter = 0;
                    this.attackFlag = false;
                } else {
                    this.attackCounter++;
                }
            }

            if (this.spriteUpdate) {
                stage.removeChild(this.sprite);

                if (this.facing === constants.FACING_LEFT) {
                    if (Math.floor((this.runDistance % (this.runDistanceIncrements * 4)) / this.runDistanceIncrements * 2)) {
                        if (this.attackFlag) {
                            this.sprite = this.sprites["steveStepLeftAttack"].clone();
                        } else {
                            this.sprite = this.sprites["steveStepLeft"].clone();
                        }
                    } else {
                        if (this.attackFlag) {
                            this.sprite = this.sprites["steveStandLeftAttack"].clone();
                        } else {
                            this.sprite = this.sprites["steveStandLeft"].clone();
                        }
                    }
                    if (this.facingChanged) {
                        this.canvasX -= this.width;
                        this.facingChanged = false;
                    }
                } else if (this.facing === constants.FACING_RIGHT) {
                    if (Math.floor((this.runDistance % (this.runDistanceIncrements * 4)) / (this.runDistanceIncrements * 2))) {
                        if (this.attackFlag) {
                            this.sprite = this.sprites["steveStepRightAttack"].clone();
                        } else {
                            this.sprite = this.sprites["steveStepRight"].clone();
                        }
                    } else {
                        if (this.attackFlag) {
                            this.sprite = this.sprites["steveStandRightAttack"].clone();
                        } else {
                            this.sprite = this.sprites["steveStandRight"].clone();
                        }
                    }
                    if (this.facingChanged) {
                        this.canvasX += this.width;
                        this.facingChanged = false;
                    }
                }

                this.sprite.x = this.canvasX;
                this.sprite.y = this.canvasY;
                stage.addChild(this.sprite);

                this.spriteUpdate = false;
            }

            if (this.jumping) {
                passable = this.testVerticalCollision("top");
                var newY = this.mapY - this.baseMovementSpeed;
            } else {
                passable = this.testVerticalCollision("bottom");
                var newY = this.mapY + this.baseMovementSpeed;
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
                result = true;
            } else {
                if (this.jumping) {
                    this.jumping = false;
                } else {
                    this.falling = false;
                }
            }

            this.sprite.x = this.canvasX;

            // Test if player falls into lava
            var xOffset = (this.facing === constants.FACING_LEFT) ? 1 : 0;
            if (this.useXOffsetHack) {
                xOffset = 0;
            }

            var mapFrontX = Math.ceil((this.mapX) / 32) + xOffset;
            var mapY = Math.floor((this.canvasY) / 32);
            var charBottomIndex = this.mapData.width * (mapY + 1) + mapFrontX;
            var charBottomTile = this.mapData.data[charBottomIndex];

            if (charBottomTile === constants.LAVA_BLOCK) {
                this.takeDamage(10);
                result = false;
            }

            // Test if player reached the exit door
            if (gameObjects.checkExit(mapFrontX, mapY)) {
                gameState = constants.GAME_STATE_VICTORY;
                gui.show(constants.GAME_STATE_VICTORY);
            }

            return result;
        };

        Player.prototype.reset = function () {
            this.facing = constants.FACING_RIGHT;
            this.sprite = this.sprites[this.spriteNames[0]].clone();
            this.sprite.x = this.canvasX;
            this.sprite.y = this.canvasY;
            this.health = 10;
            this.killCount = 0;
            this.dead = false;
            this.canvasX = parseInt(this.steveObject["x"]);
            this.canvasY = parseInt(this.steveObject["y"]) - this.height;
            this.mapX = this.canvasX;
            this.mapY = this.canvasY;
        };
        return Player;
    })(GameObjects.Entity);
    GameObjects.Player = Player;
})(GameObjects || (GameObjects = {}));
//# sourceMappingURL=Player.js.map
