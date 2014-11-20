module GameObjects {
    export module Mobs {
        export class Zombie extends GameObjects.Monster {
            spriteNames: Array<string> = [
                "zombieStandRight",
                "zombieStepRight",
                "zombieStandLeft",
                "zombieStepLeft"
            ];
//            attackFlag: boolean;
//            attackCounter: number;
            attackTimer: number;
            sound: Managers.Sound;
            currentAIAction: number;
            currentAITimer: number;
            AIActions: Array<number> = [0.4, 0.7, 1.0, 0.5];
            damage: number = 2;
            player: GameObjects.Player;


            constructor(zombie: Object, foreground: GameObjects.Layer, sound: Managers.Sound, player: GameObjects.Player) {
                super(zombie, foreground);
                
                this.name = "Zombie";
                this.sound = sound;
                this.player = player;

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
                this.attackTimer = 0;
                this.runDistanceIncrements = 16;
                this.baseMovementSpeed = 1;
                this.useXOffsetHack = false;
                this.currentAIAction = constants.AI_ACTION_IDLE;
                this.currentAITimer = new Date().getTime() + 1000;
            }

            attack() {
                this.player.takeDamage(this.damage);
                this.attackTimer = new Date().getTime() + 1000;
                this.sound.playerHit();
            }

            /*
             * This function makes zombies "speak" at random with a rough median of
             * approximately every 4 seconds
             */
            speak() {
                if (Math.floor(Math.random() * 240) == 0) {
                    this.sound.zombieSpeak(this, player);
                }
            }

            /*
             * This function handles all the updates for the zombie. Animating its movements,
             * determining AI actions and executing those actions as well as falling down
             * if the zombie walks off a ledge. This function also executes the zombie's "speech".
             * Lastly, this function also executes attacks against the player.
             */
            update(): boolean {
                super.update();

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

                // Execute currently chosen action
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
                    var distanceH = Math.floor(this.mapX - this.player.mapX);
                    if (Math.abs(distanceH) <= 40) {
                        if (((this.facing == constants.FACING_RIGHT) && (distanceH < 0)) || ((this.facing == constants.FACING_LEFT) && (distanceH >= 0))) {
                            var distanceV = Math.abs(Math.floor(this.mapY - this.player.mapY));
                            if (distanceV <= this.height / 2) {
                                if (Math.random() <= this.AIActions[constants.AI_ACTION_ATTACK]) {
                                    this.attack();
                                }
                            }
                        }
                    }
                }

                return true;
            }
        }
    }
}