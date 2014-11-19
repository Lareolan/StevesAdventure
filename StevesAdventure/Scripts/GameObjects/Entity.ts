module GameObjects {
    export class Entity {
        name: string;
        sprites: Array<createjs.Sprite>;
        sprite: createjs.Sprite;
        spriteID: string;
        
        canvasX: number;
        canvasY: number;
        mapX: number;
        mapY: number;
        height: number;
        width: number;
        facing: number;
        facingChanged: boolean;
        spriteUpdate: boolean;
        jumping: boolean;
        jumpedFrom: number;
        falling: boolean;
        mapData: GameObjects.Layer;
        health: number;
        baseMovementSpeed: number;
        runDistance: number;
        runDistanceIncrements: number;
        attackFlag: boolean;
        attackCounter: number;
        useXOffsetHack: boolean;

        constructor(entity: Object, foreground: GameObjects.Layer) {
            this.mapData = foreground;

            var spriteName: string;
            this.sprites = [];

            this.height = parseInt(entity["height"]);
            this.width = parseInt(entity["width"]);
            this.canvasX = parseInt(entity["x"]);
            this.canvasY = parseInt(entity["y"]) - this.height;
            this.mapX = this.canvasX;
            this.mapY = this.canvasY;

            this.spriteUpdate = false;
            this.runDistance = 0;
            this.baseMovementSpeed = 0;
        }

        moveRight(): boolean {
            var result = false;
            if (this.facing !== constants.FACING_RIGHT) {
                this.facing = constants.FACING_RIGHT;
                this.spriteUpdate = true;
                this.runDistance = 0;
                this.facingChanged = true;
            }

            var newX = this.mapX + this.baseMovementSpeed;
            if (this.testHorizontal(this.baseMovementSpeed)) {
                if (this instanceof GameObjects.Player) {
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
                } else {
                    this.canvasX += this.baseMovementSpeed;
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

            var newX = this.mapX - this.baseMovementSpeed;
            if (this.testHorizontal(-this.baseMovementSpeed)) {
                if (this instanceof GameObjects.Player) {
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
                } else {
                    this.canvasX -= this.baseMovementSpeed;
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

        testHorizontal(speed: number): boolean {
            var xOffset = (this.facing === constants.FACING_LEFT) ? 1 : 0;
            if (!this.useXOffsetHack) {
                xOffset = 0;
            }

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

            if (this.isPassable(topTile) && this.isPassable(bottomTile)) {
                return true;
            }

            return false;
        }

        testVerticalCollision(direction: string): boolean {
            var xOffset = (this.facing === constants.FACING_LEFT) ? 1 : 0;
            if (!this.useXOffsetHack) {
                xOffset = 0;
            }

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

        shiftRight(): void {
            this.canvasX += constants.MOVE_SPEED;
        }

        shiftLeft(): void {
            this.canvasX -= constants.MOVE_SPEED;
        }

        getHealth(): number {
            return this.health;
        }

        update(): boolean {
            this.sprite.x = this.canvasX;
            this.sprite.y = this.canvasY;
            return false;
        }
    }
} 