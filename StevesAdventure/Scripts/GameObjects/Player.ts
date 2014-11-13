/// <reference path="../managers/assets.ts" />

module GameObjects {
    // Player Class
    export class Player {
        sprites: Array<createjs.Sprite>;
        sprite: createjs.Sprite;
        spriteID: string;
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
        canvasX: number;
        canvasY: number;
        mapX: number;
        mapY: number;
        height: number;
        width: number;
        facing: number;
        jumping: boolean;
        jumpedFrom: number;
        falling: boolean;
        mapData: GameObjects.Layer;

        constructor(Steve: Object) {
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
        }
        setMapData(foreground: GameObjects.Layer): void {
            this.mapData = foreground;
        }
        moveRight(): boolean {
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
        }
        moveLeft(): boolean {
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
        }
        jump(): void {
            if ((!this.jumping) && (!this.falling)) {
                this.jumping = true;
                this.jumpedFrom = Math.ceil((this.mapY + this.height) / 32) - 1;
            }
        }
        canPass(x: number, y: number): boolean {
            var mapFrontX = Math.ceil((x - 4) / 32);
            var mapBackX = Math.ceil((x - 28) / 32);
            var mapY = Math.ceil(y / 32) - 1;   // Map grid starts at 1, not 0
            var topIndex = this.mapData.width * (mapY - 1) + mapFrontX;
            var bottomFrontIndex = this.mapData.width * (mapY - 0) + mapFrontX;
            var bottomBackIndex = this.mapData.width * (mapY - 0) + mapBackX;

            var topTile = this.mapData.data[topIndex];
            var bottomFrontTile = this.mapData.data[bottomFrontIndex];
            var bottomBackTile = this.mapData.data[bottomBackIndex];

            if (((topTile === constants.AIR_BLOCK) || (topTile === constants.WATER_BLOCK)) &&
                ((bottomFrontTile === constants.AIR_BLOCK) || (bottomFrontTile === constants.WATER_BLOCK)) &&
                ((bottomBackTile === constants.AIR_BLOCK) || (bottomBackTile === constants.WATER_BLOCK))) {
                return true;
            }

            return false;
        }
        testVerticalCollision(x: number, y: number): boolean {
            var mapFrontX = Math.ceil((x - 4) / 32);
            var mapBackX = Math.ceil((x - 28) / 32);
            var mapY = Math.ceil(y / 32) - 1;   // Map grid starts at 1, not 0
            var topIndex = this.mapData.width * (mapY - 2) + mapFrontX;
            var bottomFrontIndex = this.mapData.width * (mapY - 0) + mapFrontX;
            var bottomBackIndex = this.mapData.width * (mapY - 0) + mapBackX;

            var topTile = this.mapData.data[topIndex];
            var bottomFrontTile = this.mapData.data[bottomFrontIndex];
            var bottomBackTile = this.mapData.data[bottomBackIndex];

            if (((topTile === constants.AIR_BLOCK) || (topTile === constants.WATER_BLOCK)) &&
                ((bottomFrontTile === constants.AIR_BLOCK) || (bottomFrontTile === constants.WATER_BLOCK)) &&
                ((bottomBackTile === constants.AIR_BLOCK) || (bottomBackTile === constants.WATER_BLOCK))) {
                return true;
            }

            return false;
        }
        findAltitude(): number {
            var mapY = Math.ceil((this.mapY + this.height) / 32) - 1;
            return (this.jumpedFrom - mapY);
        }
        update(): boolean {
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
        }
    }
} 