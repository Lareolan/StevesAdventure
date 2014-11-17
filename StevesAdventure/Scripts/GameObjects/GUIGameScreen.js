var GameObjects;
(function (GameObjects) {
    var GUIGameScreen = (function () {
        function GUIGameScreen(player) {
            this.healthSprites = [];
            this.player = player;

            this.healthBar = new createjs.Sprite(Managers.Assets.guiComponents, "MeterBackground");
            this.healthBar.x = stage.canvas.width / 2 - 160;
            this.healthBar.y = 640;
            stage.addChild(this.healthBar);

            for (var i = 0; i < 10; i++) {
                this.healthSprites[i] = new createjs.Sprite(Managers.Assets.guiComponents, "FullHeart");
                this.healthSprites[i].x = (stage.canvas.width / 2) - 160 + (32 * i);
                this.healthSprites[i].y = 640;
                stage.addChild(this.healthSprites[i]);
            }
        }
        GUIGameScreen.prototype.update = function () {
            var health = this.player.getHealth();

            if (health < this.healthSprites.length) {
                for (var i = this.healthSprites.length - 1; i >= health; i--) {
                    stage.removeChild(this.healthSprites[i]);
                    this.healthSprites.length = i;
                }
            }
        };
        return GUIGameScreen;
    })();
    GameObjects.GUIGameScreen = GUIGameScreen;
})(GameObjects || (GameObjects = {}));
//# sourceMappingURL=GUIGameScreen.js.map
