module GameObjects {
    export class Monster extends GameObjects.Entity {
        constructor(monster: Object, foreground: GameObjects.Layer) {
            super(monster, foreground);
        }
    }
}