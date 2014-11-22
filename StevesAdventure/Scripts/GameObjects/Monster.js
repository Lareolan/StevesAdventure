var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var GameObjects;
(function (GameObjects) {
    var Monster = (function (_super) {
        __extends(Monster, _super);
        function Monster(monster, foreground, player) {
            _super.call(this, monster, foreground);
            this.player = player;
        }
        Monster.prototype.takeDamage = function (hearts) {
            this.health -= hearts;
            if (this.health <= 0) {
                return false;
            } else {
                if (this instanceof GameObjects.Mobs.Zombie) {
                    this.sound.zombieHurt(this, this.player);
                }
            }
            return true;
        };

        Monster.prototype.die = function () {
            if (this instanceof GameObjects.Mobs.Zombie) {
                //                <GameObjects.Mobs.Zombie>this.die();
                this.sound.zombieDeath(this, this.player);
                stage.removeChild(this.sprite);
            }
            this.player.addKill();
        };

        Monster.prototype.hitTest = function (damage) {
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
        };
        return Monster;
    })(GameObjects.Entity);
    GameObjects.Monster = Monster;
})(GameObjects || (GameObjects = {}));
//# sourceMappingURL=Monster.js.map
