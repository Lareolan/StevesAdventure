module GameObjects {
    export module Mobs {
        export class Zombie extends GameObjects.Monster {
            spriteNames: Array<string> = [
                "zombieStandRight",
                "zombieStepRight",
                "zombieStandLeft",
                "zombieStepLeft"
            ];
            attackFlag: boolean;
            attackCounter: number;

            constructor(zombie: Object, foreground: GameObjects.Layer) {
                super(zombie, foreground);
                
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
                this.attackCounter = 0;
                this.runDistanceIncrements = 16;
            }
        }
    }
}