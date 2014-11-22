module GameObjects {
    export class Monster extends GameObjects.Entity {
        player: GameObjects.Player;

        constructor(monster: Object, foreground: GameObjects.Layer, player: GameObjects.Player) {
            super(monster, foreground);
            this.player = player;
        }

        takeDamage(hearts: number): boolean {
            this.health -= hearts;
            if (this.health <= 0) {
                return false;
            } else {
                if (this instanceof GameObjects.Mobs.Zombie) {
                    this.sound.zombieHurt(this, this.player);
                }
            }
            return true;
        }

        die(): void {
            if (this instanceof GameObjects.Mobs.Zombie) {
//                <GameObjects.Mobs.Zombie>this.die();
                this.sound.zombieDeath(this, this.player);
                stage.removeChild(this.sprite);
            }
            this.player.addKill();
        }

        hitTest(damage: number): boolean {
            var range;
            if (this.player.facing == constants.FACING_RIGHT) {
                range = 64;
            } else {
                range = 32;
            }

            // Execute an attack against the monster if the monster is close enough to be hit, and
            // player is facing the right direction, and player is eligible to make attack.
            var distanceH = Math.floor(this.player.mapX - this.mapX);
            if (Math.abs(distanceH) <= range) {
                if (((this.player.facing == constants.FACING_RIGHT) && (distanceH < 0)) || ((this.player.facing == constants.FACING_LEFT) && (distanceH >= 0))) {
                    var distanceV = Math.abs(Math.floor(this.mapY - this.player.mapY));
                    if (distanceV <= this.height / 2) {
                        return this.takeDamage(damage);
                    }
                }
            }
            return true;
        }
    }
}