var Managers;
(function (Managers) {
    var GUI = (function () {
        function GUI(player) {
            this.player = player;

            this.preloadScreen = new GameObjects.GUIPreloadScreen();
            this.startScreen = new GameObjects.GUIStartScreen();
            this.instructionScreen = new GameObjects.GUIInstructionScreen();
            this.gameScreen = new GameObjects.GUIGameScreen(player);
            this.deathScreen = new GameObjects.GUIDeathScreen();
        }
        GUI.prototype.update = function () {
            this.gameScreen.update();
        };

        GUI.prototype.playerDeath = function (e) {
        };
        return GUI;
    })();
    Managers.GUI = GUI;
})(Managers || (Managers = {}));
//# sourceMappingURL=GUI.js.map
