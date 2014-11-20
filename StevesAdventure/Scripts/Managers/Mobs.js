﻿var Managers;
(function (Managers) {
    var Mobs = (function () {
        function Mobs(mobList, foreground, sound, player) {
            this.mobs = [];

            for (var index = 0; index < mobList.length; index++) {
                if (mobList[index]["name"] === "Zombie") {
                    this.mobs.push(new GameObjects.Mobs.Zombie(mobList[index], foreground, sound, player));
                }
            }
        }
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
        return Mobs;
    })();
    Managers.Mobs = Mobs;
})(Managers || (Managers = {}));
//# sourceMappingURL=Mobs.js.map
