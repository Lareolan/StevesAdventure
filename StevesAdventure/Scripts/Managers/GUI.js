var Managers;
(function (Managers) {
    var GUI = (function () {
        function GUI(canvas) {
            this.preloadScreen = new GameObjects.GUIPreloadScreen();
            this.activeScreen = this.preloadScreen;
        }
        GUI.prototype.preloadComplete = function () {
            this.startScreen = new GameObjects.GUIStartScreen();
            this.instructionScreen = new GameObjects.GUIInstructionScreen();
            this.gameScreen = new GameObjects.GUIGameScreen(player);
            this.deathScreen = new GameObjects.GUIDeathScreen();
            this.victoryScreen = new GameObjects.GUIVictoryScreen();
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
            gameState = constants.GAME_STATE_DEATH;
            this.player.die();
            this.gui.show(constants.GAME_STATE_DEATH);
        };

        GUI.prototype.show = function (gameState) {
            switch (gameState) {
                case constants.GAME_STATE_INSTRUCTIONS:
                    this.activeScreen.hide();

                    this.instructionScreen.addChild(sky.getImage());
                    this.instructionScreen.addChildArray(cloudManager.getImages());

                    this.instructionScreen.init();
                    this.activeScreen = this.instructionScreen;
                    this.activeScreen.show();
                    break;
                case constants.GAME_STATE_START:
                    this.activeScreen.hide();
                    this.activeScreen = this.startScreen;
                    this.activeScreen.show();
                    break;
                case constants.GAME_STATE_DEATH:
                    this.activeScreen.hide();

                    this.deathScreen.addChild(sky.getImage());
                    this.deathScreen.addChildArray(cloudManager.getImages());

                    this.deathScreen.init(this.player.getKillcount());
                    this.activeScreen = this.deathScreen;
                    this.activeScreen.show();
                    break;
                case constants.GAME_STATE_VICTORY:
                    this.activeScreen.hide();

                    this.victoryScreen.addChild(sky.getImage());
                    this.victoryScreen.addChildArray(cloudManager.getImages());

                    this.victoryScreen.init(this.player.getKillcount(), worldTimer);
                    this.activeScreen = this.victoryScreen;
                    this.activeScreen.show();
                    break;
                case constants.GAME_STATE_PLAY:
                    worldTimer = new Date().getTime();
                    this.activeScreen.hide();

                    this.gameScreen.addChild(sky.getImage());
                    this.gameScreen.addChildArray(cloudManager.getImages());
                    this.gameScreen.addChild(map.getImage());

                    this.activeScreen = this.gameScreen;
                    this.activeScreen.show();
                    break;
            }
        };
        return GUI;
    })();
    Managers.GUI = GUI;
})(Managers || (Managers = {}));
//# sourceMappingURL=GUI.js.map
