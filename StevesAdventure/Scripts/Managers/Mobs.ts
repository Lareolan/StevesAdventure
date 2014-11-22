module Managers {
    export class Mobs {
        mobs: Array<GameObjects.Monster>;
        rawMobData: Array<Object>;
        foreground: GameObjects.Layer;
        sound: Managers.Sound;
        player: GameObjects.Player;

        constructor(mobList: Array<Object>, foreground: GameObjects.Layer, sound: Managers.Sound, player: GameObjects.Player) {
            this.rawMobData = mobList;
            this.foreground = foreground;
            this.sound = sound;
            this.player = player;

            this.mobs = [];

            for (var index = 0; index < mobList.length; index++) {
                if (mobList[index]["name"] === "Zombie") {
                    this.mobs.push(new GameObjects.Mobs.Zombie(mobList[index], foreground, sound, player));
                    this.mobs[index].name = "Zombie " + index;
                }
            }
        }

        /*
         * This function tests whether or not any of the mobs got his by the player's attack.
         * If Monster.hitTest() returns false, then the monster died from the attack.
         * Remove it from the game.
         */
        hitTest(damage: number) {
            var distance;
            var deadMobIdx = -1;
            for (var index = 0; index < this.mobs.length; index++) {
                if (!this.mobs[index].hitTest(damage)) {
                    deadMobIdx = index;
                    this.mobs[index].die();
                    break;
                }
            }

            if (deadMobIdx!= -1) {
                this.mobs.splice(deadMobIdx, 1);

            }
        }

        moveRight(): void {
            for (var index = 0; index < this.mobs.length; index++) {
                this.mobs[index].moveRight();
            }
        }

        moveLeft(): void {
            for (var index = 0; index < this.mobs.length; index++) {
                this.mobs[index].moveLeft();
            }
        }

        shiftRight(): void {
            for (var index = 0; index < this.mobs.length; index++) {
                this.mobs[index].shiftRight();
            }
        }

        shiftLeft(): void {
            for (var index = 0; index < this.mobs.length; index++) {
                this.mobs[index].shiftLeft();
            }
        }

        update(): void {
            for (var index = 0; index < this.mobs.length; index++) {
                this.mobs[index].update();
            }
        }

        show(): void {
            for (var index = 0; index < this.mobs.length; index++) {
                this.mobs[index].show();
            }
        }

        hide(): void {
            for (var index = 0; index < this.mobs.length; index++) {
                this.mobs[index].hide();
            }
        }

        reset(): void {
            this.hide();
            this.mobs = [];

            for (var index = 0; index < this.rawMobData.length; index++) {
                if (this.rawMobData[index]["name"] === "Zombie") {
                    this.mobs.push(new GameObjects.Mobs.Zombie(this.rawMobData[index], this.foreground, this.sound, this.player));
                    this.mobs[index].name = "Zombie " + index;
                }
            }
        }
    }
} 