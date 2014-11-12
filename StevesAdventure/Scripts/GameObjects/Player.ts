/// <reference path="../managers/assets.ts" />

module GameObjects {
    // Player Class
    export class Player extends GameObjects.SpriteObject {
        sprites: createjs.Bitmap[] = [];
        sprite: createjs.Bitmap;
        spriteID: string;
        constructor() {
            super(Managers.Assets);
            var frameName;
            for (var frameID in PLAYER.FRAMES) {
                frameName = PLAYER.FRAMES[frameID];
                this.sprites[frameName] = new createjs.Bitmap(Managers.Assets.loader.getResult(frameName));
            }

            this.spriteID = "SteveStand";
            this.sprite = this.sprites[this.spriteID].clone();
            this.sprite.x = 320;
            this.sprite.y = 800;
            stage.addChild(this.sprite);
        }

    }
} 