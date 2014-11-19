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
            function Zombie(zombie, foreground, sound, player) {
                _super.call(this, zombie, foreground);
                this.spriteNames = [
                    "zombieStandRight",
                    "zombieStepRight",
                    "zombieStandLeft",
                    "zombieStepLeft"
                ];
                this.AIActions = [0.4, 0.7, 1.0, 0.5];
                this.damage = 2;

                this.name = "Zombie";
                this.sound = sound;
                this.player = player;

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
                this.attackTimer = 0;
                this.runDistanceIncrements = 16;
                this.baseMovementSpeed = 1;
                this.useXOffsetHack = false;
                this.currentAIAction = constants.AI_ACTION_IDLE;
                this.currentAITimer = new Date().getTime() + 1000;
            }
            Zombie.prototype.attack = function () {
                this.player.takeDamage(this.damage);
                this.attackTimer = new Date().getTime() + 1000;
                this.sound.playerHit();
            };

            /*
            * This function makes zombies "speak" at random with a rough median of
            * approximately every 4 seconds
            */
            Zombie.prototype.speak = function () {
                if (Math.floor(Math.random() * 240) == 0) {
                    this.sound.zombieSpeak(this, player);
                }
            };

            /*
            * This function handles all the updates for the zombie. Animating its movements,
            * determining AI actions and executing those actions as well as falling down
            * if the zombie walks off a ledge. This function also executes the zombie's "speech".
            * Lastly, this function also executes attacks against the player.
            */
            Zombie.prototype.update = function () {
                _super.prototype.update.call(this);

                this.speak();

                // Animate zombie facing/walking sprites
                if (this.spriteUpdate) {
                    stage.removeChild(this.sprite);

                    if (this.facing === constants.FACING_LEFT) {
                        if (Math.floor((this.runDistance % (this.runDistanceIncrements * 4)) / this.runDistanceIncrements * 2)) {
                            this.sprite = this.sprites["zombieStepLeft"].clone();
                        } else {
                            this.sprite = this.sprites["zombieStandLeft"].clone();
                        }
                    } else if (this.facing === constants.FACING_RIGHT) {
                        if (Math.floor((this.runDistance % (this.runDistanceIncrements * 4)) / (this.runDistanceIncrements * 2))) {
                            this.sprite = this.sprites["zombieStepRight"].clone();
                        } else {
                            this.sprite = this.sprites["zombieStandRight"].clone();
                        }
                    }

                    this.sprite.x = this.canvasX;
                    this.sprite.y = this.canvasY;
                    stage.addChild(this.sprite);

                    this.spriteUpdate = false;
                }

                // Determine if it's time to switch actions, if it is then switch actions
                var time = new Date().getTime();
                if (time >= this.currentAITimer) {
                    if (this.currentAIAction == constants.AI_ACTION_IDLE) {
                        var action = Math.random();

                        if (action <= this.AIActions[constants.AI_ACTION_MOVE_LEFT]) {
                            this.currentAIAction = constants.AI_ACTION_MOVE_LEFT;
                        }
                        if (action <= this.AIActions[constants.AI_ACTION_MOVE_RIGHT]) {
                            this.currentAIAction = constants.AI_ACTION_MOVE_RIGHT;
                        }
                        if (action <= this.AIActions[constants.AI_ACTION_IDLE]) {
                            this.currentAIAction = constants.AI_ACTION_IDLE;
                            this.runDistance = 0;
                            this.spriteUpdate = true;
                        }
                    } else {
                        this.currentAIAction = constants.AI_ACTION_IDLE;
                        this.runDistance = 0;
                        this.spriteUpdate = true;
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

                // If zombie is in the air, make it fall to the ground (such as walking off ledges)
                var passable;
                passable = this.testVerticalCollision("bottom");
                var newY = this.mapY + constants.MOVE_SPEED;

                if (passable) {
                    this.falling = true;
                    this.mapY = newY;
                    this.canvasY = newY;
                    this.sprite.y = this.canvasY;
                    this.sprite.x = this.canvasX;
                } else {
                    this.falling = false;
                }

                // Execute an attack against the player if the player is close enough to be hit, and
                // zombie is facing the right direction, and hasn't hit the player for long enough
                // and hits a random number equal to chance to hit (50%).
                if (time >= this.attackTimer) {
                    var distance = Math.floor(this.mapX - this.player.mapX);
                    if (Math.abs(distance) <= 40) {
                        if (((this.facing == constants.FACING_RIGHT) && (distance < 0)) || ((this.facing == constants.FACING_LEFT) && (distance >= 0))) {
                            if (Math.random() <= this.AIActions[constants.AI_ACTION_ATTACK]) {
                                this.attack();
                            }
                        }
                    }
                }

                return true;
            };
            return Zombie;
        })(GameObjects.Monster);
        Mobs.Zombie = Zombie;
    })(GameObjects.Mobs || (GameObjects.Mobs = {}));
    var Mobs = GameObjects.Mobs;
})(GameObjects || (GameObjects = {}));
//# sourceMappingURL=Zombie.js.map
