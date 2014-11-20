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
        };

        GUI.prototype.playerDeath = function (e) {
            this.gui.show(this.gui.deathScreen, this.gui);
        };

        GUI.prototype.show = function (screen, gui) {
            gui.activeScreen = screen;
        };
        return GUI;
    })();
    Managers.GUI = GUI;
})(Managers || (Managers = {}));
//# sourceMappingURL=GUI.js.map
