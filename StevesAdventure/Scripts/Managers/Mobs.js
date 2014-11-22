var Managers;
(function (Managers) {
    var Mobs = (function () {
        function Mobs(mobList, foreground, sound, player) {
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
        Mobs.prototype.hitTest = function (damage) {
            var distance;
            var deadMobIdx = -1;
            for (var index = 0; index < this.mobs.length; index++) {
                if (!this.mobs[index].hitTest(damage)) {
                    deadMobIdx = index;
                    this.mobs[index].die();
                    break;
                }
            }

            if (deadMobIdx != -1) {
                this.mobs.splice(deadMobIdx, 1);
            }
        };

        Mobs.prototype.moveRight = function () {
            for (var index = 0; index < this.mobs.length; index++) {
                this.mobs[index].moveRight();
            }
        };

        Mobs.prototype.moveLeft = function () {
            for (var index = 0; index < this.mobs.length; index++) {
                this.mobs[index].moveLeft();
            }
        };

        Mobs.prototype.shiftRight = function () {
            for (var index = 0; index < this.mobs.length; index++) {
                this.mobs[index].shiftRight();
            }
        };

        Mobs.prototype.shiftLeft = function () {
            for (var index = 0; index < this.mobs.length; index++) {
                this.mobs[index].shiftLeft();
            }
        };

        Mobs.prototype.update = function () {
            for (var index = 0; index < this.mobs.length; index++) {
                this.mobs[index].update();
            }
        };

        Mobs.prototype.show = function () {
            for (var index = 0; index < this.mobs.length; index++) {
                this.mobs[index].show();
            }
        };

        Mobs.prototype.hide = function () {
            for (var index = 0; index < this.mobs.length; index++) {
                this.mobs[index].hide();
            }
        };

        Mobs.prototype.reset = function () {
            this.hide();
            this.mobs = [];

            for (var index = 0; index < this.rawMobData.length; index++) {
                if (this.rawMobData[index]["name"] === "Zombie") {
                    this.mobs.push(new GameObjects.Mobs.Zombie(this.rawMobData[index], this.foreground, this.sound, this.player));
                    this.mobs[index].name = "Zombie " + index;
                }
            }
        };
        return Mobs;
    })();
    Managers.Mobs = Mobs;
})(Managers || (Managers = {}));
//# sourceMappingURL=Mobs.js.map
