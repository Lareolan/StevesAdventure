/// <reference path="../managers/assets.ts" />
var GameObjects;
(function (GameObjects) {
    // Player Class
    var Player = (function () {
        function Player() {
            this.spriteNames = [
                "steveStandRight",
                "steveStepRight",
                "steveStandRightAttack",
                "steveStepRightAttack",
                "steveStandLeft",
                "steveStepLeft",
                "steveStandLeftAttack",
                "steveStepLeftAttack"
            ];
            var spriteName;
            this.sprites = [];

            for (var frameID = 0; frameID < this.spriteNames.length; frameID++) {
                spriteName = this.spriteNames[frameID];
                this.sprites[spriteName] = new createjs.Sprite(Managers.Assets.characters, spriteName);
            }
            //            stage.addChild(this.sprite);
        }
        return Player;
    })();
    GameObjects.Player = Player;
})(GameObjects || (GameObjects = {}));
//# sourceMappingURL=Player.js.map
