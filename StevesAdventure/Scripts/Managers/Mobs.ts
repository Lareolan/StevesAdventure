module Managers {
    export class Mobs {
        mobs: Array<GameObjects.Monster>;

        constructor(mobList: Array<Object>, foreground: GameObjects.Layer, sound: Managers.Sound, player: GameObjects.Player) {
            this.mobs = [];

            for (var index = 0; index < mobList.length; index++) {
                if (mobList[index]["name"] === "Zombie") {
                    this.mobs.push(new GameObjects.Mobs.Zombie(mobList[index], foreground, sound, player));
                }
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
    }
} 