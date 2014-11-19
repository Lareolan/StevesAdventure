var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var GameObjects;
(function (GameObjects) {
    (function (Mobs) {
        var Zombie = (function (_super) {
            __extends(Zombie, _super);
            function Zombie(zombie, foreground) {
                _super.call(this, zombie, foreground);
                this.spriteNames = [
                    "zombieStandRight",
                    "zombieStepRight",
                    "zombieStandLeft",
                    "zombieStepLeft"
                ];
                this.AIActions = [0.4, 0.7, 1.0, 0.5];
                this.AIActionList = [
                    constants.AI_ACTION_IDLE,
                    constants.AI_ACTION_MOVE_RIGHT,
                    constants.AI_ACTION_MOVE_LEFT,
                    constants.AI_ACTION_ATTACK
                ];

                this.name = "Zombie";

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
                this.runDistanceIncrements = 16;
                this.baseMovementSpeed = 1;
                this.useXOffsetHack = false;
                this.currentAIAction = constants.AI_ACTION_IDLE;
                this.currentAITimer = new Date().getTime() + 1000;
            }
            Zombie.prototype.update = function () {
                _super.prototype.update.call(this);

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
            };
            return Zombie;
        })(GameObjects.Monster);
        Mobs.Zombie = Zombie;
    })(GameObjects.Mobs || (GameObjects.Mobs = {}));
    var Mobs = GameObjects.Mobs;
})(GameObjects || (GameObjects = {}));
//# sourceMappingURL=Zombie.js.map
