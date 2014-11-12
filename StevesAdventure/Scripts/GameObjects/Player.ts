/// <reference path="../managers/assets.ts" />

module GameObjects {
    // Player Class
    export class Player {
        sprites: createjs.Sprite[];
        sprite: createjs.Bitmap;
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

        constructor() {
            var spriteName: string;
            this.sprites = [];

            for (var frameID = 0; frameID < this.spriteNames.length; frameID++) {
                spriteName = this.spriteNames[frameID];
                this.sprites[spriteName] = new createjs.Sprite(Managers.Assets.characters, spriteName);
            }

//            stage.addChild(this.sprite);
        }

    }
} 