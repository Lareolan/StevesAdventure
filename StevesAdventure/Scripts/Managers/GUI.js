var Managers;
(function (Managers) {
    var GUI = (function () {
        function GUI(canvas) {
            //            this.player = player;
            //            this.stage = stage;
            this.preloadScreen = new GameObjects.GUIPreloadScreen();

            //            this.startScreen = new GameObjects.GUIStartScreen();
            //            this.instructionScreen = new GameObjects.GUIInstructionScreen();
            //            this.gameScreen = new GameObjects.GUIGameScreen(player);
            //            this.deathScreen = new GameObjects.GUIDeathScreen();
            this.activeScreen = this.preloadScreen;
        }
        GUI.prototype.preloadComplete = function () {
            this.startScreen = new GameObjects.GUIStartScreen();
            this.instructionScreen = new GameObjects.GUIInstructionScreen();
            this.gameScreen = new GameObjects.GUIGameScreen(player);
            this.deathScreen = new GameObjects.GUIDeathScreen();
        };

        GUI.prototype.setPlayer = function (player) {
            this.player = player;
        };

        GUI.prototype.setStage = function (stage) {
            this.stage = stage;
        };

        GUI.prototype.update = function () {
            this.gameScreen.update();
        };

        GUI.prototype.playerHit = function (e) {
            this.gui.gameScreen.playerHit(this.gui.stage, this.gui.gameScreen);
        };

        GUI.prototype.playerDeath = function (e) {
            //            this.gui.show(this.gui.deathScreen, this.gui);
        };

        /*
        show(screen: GameObjects.Screen, gui: Managers.GUI): void {
        gui.activeScreen = screen;
        }
        */
        GUI.prototype.show = function (gameState) {
            switch (gameState) {
                case constants.GAME_STATE_INSTRUCTIONS:
                    this.activeScreen.hide();
                    this.activeScreen = this.instructionScreen;
                    this.activeScreen.show();
                    break;
            }
        };
        return GUI;
    })();
    Managers.GUI = GUI;
})(Managers || (Managers = {}));
//# sourceMappingURL=GUI.js.map
