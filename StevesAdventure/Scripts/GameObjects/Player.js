/// <reference path="../managers/assets.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var GameObjects;
(function (GameObjects) {
    // Player Class
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player() {
            _super.call(this, Managers.Assets);
            this.sprites = [];
            var frameName;
            for (var frameID in PLAYER.FRAMES) {
                frameName = PLAYER.FRAMES[frameID];
                this.sprites[frameName] = new createjs.Bitmap(Managers.Assets.loader.getResult(frameName));
            }

            this.spriteID = "SteveStand";
            this.sprite = this.sprites[this.spriteID].clone();
            this.sprite.x = 320;
            this.sprite.y = 800;
            stage.addChild(this.sprite);
        }
        return Player;
    })(GameObjects.SpriteObject);
    GameObjects.Player = Player;
})(GameObjects || (GameObjects = {}));
//# sourceMappingURL=Player.js.map
