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
            currentAIAction: number;
            currentAITimer: number;
            AIActions: Array<number> = [0.4, 0.7, 1.0, 0.5];
            AIActionList: Array<number> = [
                constants.AI_ACTION_IDLE,
                constants.AI_ACTION_MOVE_RIGHT,
                constants.AI_ACTION_MOVE_LEFT,
                constants.AI_ACTION_ATTACK
            ];

            constructor(zombie: Object, foreground: GameObjects.Layer) {
                super(zombie, foreground);
                
                this.name = "Zombie";

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
                this.baseMovementSpeed = 1;
                this.useXOffsetHack = false;
                this.currentAIAction = constants.AI_ACTION_IDLE;
                this.currentAITimer = new Date().getTime() + 1000;
            }

            update(): boolean {
                super.update();
/*
                if (Math.floor(Math.random() * 20) === 0) {
                    this.moveLeft();
                }
*/
                var time = new Date().getTime();
                if (time >= this.currentAITimer) {
                    var action = Math.random();

                    if (action <= this.AIActions[constants.AI_ACTION_MOVE_LEFT]) {
                        this.currentAIAction = constants.AI_ACTION_MOVE_LEFT;
                    }
                    if (action <= this.AIActions[constants.AI_ACTION_MOVE_RIGHT]) {
                        this.currentAIAction = constants.AI_ACTION_MOVE_RIGHT;
                    }
                    if (action <= this.AIActions[constants.AI_ACTION_IDLE]) {
                        this.currentAIAction = constants.AI_ACTION_IDLE;
                    }
                    this.currentAITimer = time + Math.floor(Math.random() * 3000) + 1000;
                }

                switch (this.currentAIAction) {
                    case constants.AI_ACTION_MOVE_RIGHT:
                        if (!this.moveRight()) {
                            this.currentAIAction = constants.AI_ACTION_IDLE;
                            this.currentAITimer = time + 1000;
                        }
                        break;
                    case constants.AI_ACTION_MOVE_LEFT:
                        if (!this.moveLeft()) {
                            this.currentAIAction = constants.AI_ACTION_IDLE;
                            this.currentAITimer = time + 1000;
                        }
                        break;
                    default:
                        break;
                }

                /*
                 *
            currentAIAction: number;
            currentAITimer: number;
            AIActions: Array<number> = [0.4, 0.7, 1.0, 0.5];
            AIActionList: Array<number> = [
                constants.AI_ACTION_IDLE,
                constants.AI_ACTION_MOVE_RIGHT,
                constants.AI_ACTION_MOVE_LEFT,
                constants.AI_ACTION_ATTACK
            ];

                 * 
                 */
                return true;
            }
        }
    }
}