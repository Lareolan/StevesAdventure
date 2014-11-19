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
            }
            return Zombie;
        })(GameObjects.Monster);
        Mobs.Zombie = Zombie;
    })(GameObjects.Mobs || (GameObjects.Mobs = {}));
    var Mobs = GameObjects.Mobs;
})(GameObjects || (GameObjects = {}));
//# sourceMappingURL=Zombie.js.map
