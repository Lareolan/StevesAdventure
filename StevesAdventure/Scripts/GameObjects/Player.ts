/// <reference path="../managers/assets.ts" />

module GameObjects {
    // Player Class
    export class Player extends GameObjects.Entity {
        spriteNames: Array<string> = [
            "steveStandRight",
            "steveStepRight",
            "steveStandRightAttack",
            "steveStepRightAttack",
            "steveStandLeft",
            "steveStepLeft",
            "steveStandLeftAttack",
            "steveStepLeftAttack"
        ];
        attackFlag: boolean;
        attackCounter: number;


        constructor(Steve: Object, foreground: GameObjects.Layer) {
            super(Steve, foreground);
/*
            this.mapData = foreground;

            var spriteName: string;
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
*/


            var spriteName: string;
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
//            this.spriteUpdate = false;
//            this.runDistance = 0;
            this.attackCounter = 0;
            this.runDistanceIncrements = 4;
            this.useXOffsetHack = true;
        }
/*
        moveRight(): boolean {
            var result = false;
            if (this.facing !== constants.FACING_RIGHT) {
                this.facing = constants.FACING_RIGHT;
                this.spriteUpdate = true;
                this.runDistance = 0;
                this.facingChanged = true;
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
                    this.canvasX = Math.floor((stage.canvas.width / 2) / 32) * 32;
                    result = true;
                }
                this.mapX = newX;

                this.runDistance++;
                if ((this.runDistance % this.runDistanceIncrements) === 0) {
                    this.spriteUpdate = true;
                }
            }
            return result;
        }
        moveLeft(): boolean {
            var result = false;
            if (this.facing !== constants.FACING_LEFT) {
                this.facing = constants.FACING_LEFT;
                this.spriteUpdate = true;
                this.runDistance = 0;
                this.facingChanged = true;
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
                    this.canvasX = Math.floor((stage.canvas.width / 2) / 32) * 32;
                    result = true;
                }
                this.mapX = newX;

                this.runDistance++;
                if ((this.runDistance % this.runDistanceIncrements) === 0) {
                    this.spriteUpdate = true;
                }
            }
            return result;
        }
*/
        jump(): void {
            if ((!this.jumping) && (!this.falling)) {
                this.jumping = true;
                this.jumpedFrom = Math.ceil((this.mapY + this.height) / 32) - 1;
            }
        }
        attack(event: Event): void {
            this.instance.attackFlag = true;
            this.instance.spriteUpdate = true;
        }
/*
        isPassable(tileID: number): boolean {
            if (
                (tileID === constants.AIR_BLOCK) ||
                (tileID === constants.WATER_BLOCK) ||
                (tileID === constants.LAVA_BLOCK)
                ) {
                return true;
            }
            return false;
        }
*/
        takeDamage(hearts: number): boolean {
            this.health -= hearts;
            if (this.health <= 0) {
                var event = new createjs.Event("playerDeath", true, false);
                stage.dispatchEvent(event);
            }
            return;
        }

/*
        testVerticalCollision(direction: string): boolean {
            var response = super.testVerticalCollision(direction);

            var mapFrontX = Math.ceil((this.mapX) / 32) + xOffset;
            var mapY = Math.floor((this.mapY) / 32);
            var charBottomIndex = this.mapData.width * (mapY + 1) + mapFrontX;

            return response;
        }
*/

/*
        testVerticalCollision(direction: string): boolean {
            var xOffset = (this.facing === constants.FACING_LEFT) ? 1 : 0;
//            var xOffset = 0;

            var mapBackX = Math.floor((this.mapX) / 32) + xOffset;
            var mapFrontX = Math.ceil((this.mapX) / 32) + xOffset;
            var mapY = Math.floor((this.mapY) / 32);

            var topBackIndex = this.mapData.width * (mapY - 1) + mapBackX;
            var bottomBackIndex = this.mapData.width * (mapY + 2) + mapBackX;
            var topFrontIndex = this.mapData.width * (mapY - 1) + mapFrontX;
            var bottomFrontIndex = this.mapData.width * (mapY + 2) + mapFrontX;

            var charBottomIndex = this.mapData.width * (mapY + 1) + mapFrontX;


            var topBackTile = this.mapData.data[topBackIndex];
            var bottomBackTile = this.mapData.data[bottomBackIndex];
            var topFrontTile = this.mapData.data[topFrontIndex];
            var bottomFrontTile = this.mapData.data[bottomFrontIndex];

            var charBottomTile = this.mapData.data[charBottomIndex];

            if (charBottomTile === constants.LAVA_BLOCK) {
                this.takeDamage(10);
            }

            if (!this.tempShape2) {
                this.tempShape2 = new createjs.Shape();
                stage.addChild(this.tempShape2);
            }
            this.tempShape2.graphics.clear();
            mapBackX = -map.map.x - (Math.floor((this.mapX) / 32) + xOffset);
            mapFrontX = (Math.ceil((this.mapX) / 32) + xOffset) + map.map.x;
//            this.tempShape2.graphics.beginStroke("#0000FF").drawRect(mapBackX * 32, (mapY - 1) * 32, 32, 32).drawRect(mapBackX * 32, (mapY + 2) * 32, 32, 32).drawRect(mapFrontX * 32, (mapY - 1) * 32, 32, 32).drawRect(mapFrontX * 32, (mapY + 2) * 32, 32, 32);

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
        }
*/

/*
        testHorizontal(speed: number): boolean {
            var xOffset = (this.facing === constants.FACING_LEFT) ? 1 : 0;
//            var xOffset = 0;

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


//            if (!this.tempShape) {
//                this.tempShape = new createjs.Shape();
//                stage.addChild(this.tempShape);
//            }
//            this.tempShape.graphics.clear();
//            this.tempShape.graphics.beginStroke("#FF0000").drawRect(mapX * 32, mapY * 32, 32, 64);

            if (this.isPassable(topTile) && this.isPassable(bottomTile)) {
                return true;
            }

            return false;
        }
*/
        findAltitude(): number {
            var mapY = Math.ceil((this.mapY + this.height) / 32) - 1;
            return (this.jumpedFrom - mapY);
        }
        update(): boolean {
            var passable,
                result = false;

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
//                    this.mapX -= this.width;
//                    this.sprite.x = this.canvasX-32;
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
//                    this.mapX += this.width;
//                    this.sprite.x = this.canvasX;
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


            return result;
        }
    }
} 