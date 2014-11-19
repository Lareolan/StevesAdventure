var Managers;
(function (Managers) {
    var GUI = (function () {
        function GUI(player, stage) {
            this.player = player;
            this.stage = stage;

            this.preloadScreen = new GameObjects.GUIPreloadScreen();
            this.startScreen = new GameObjects.GUIStartScreen();
            this.instructionScreen = new GameObjects.GUIInstructionScreen();
            this.gameScreen = new GameObjects.GUIGameScreen(player);
            this.deathScreen = new GameObjects.GUIDeathScreen();
        }
        GUI.prototype.update = function () {
            this.gameScreen.update();
        };

        GUI.prototype.playerHit = function (e) {
            this.gui.gameScreen.playerHit(this.gui.stage, this.gui.gameScreen);
            //            var stage = this.instance.stage;
            //            var color = new createjs.ColorFilter(1.0, 0.5, 0.5, 1, 0, 0, 0, 0);
            //            stage.filters = [color];
            //            stage.cache(0, 0, stage.canvas.width, stage.canvas.height);
        };

        GUI.prototype.playerDeath = function (e) {
        };
        return GUI;
    })();
    Managers.GUI = GUI;
})(Managers || (Managers = {}));
//# sourceMappingURL=GUI.js.map
