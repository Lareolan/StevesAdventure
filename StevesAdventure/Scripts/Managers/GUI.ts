module Managers {
    export class GUI {
        player: GameObjects.Player;
        preloadScreen: GameObjects.GUIPreloadScreen;
        startScreen: GameObjects.GUIStartScreen;
        instructionScreen: GameObjects.GUIInstructionScreen;
        gameScreen: GameObjects.GUIGameScreen;
        deathScreen: GameObjects.GUIDeathScreen;
        stage: createjs.Stage;

        constructor(player: GameObjects.Player, stage: createjs.Stage) {
            this.player = player;
            this.stage = stage;

            this.preloadScreen = new GameObjects.GUIPreloadScreen();
            this.startScreen = new GameObjects.GUIStartScreen();
            this.instructionScreen = new GameObjects.GUIInstructionScreen();
            this.gameScreen = new GameObjects.GUIGameScreen(player);
            this.deathScreen = new GameObjects.GUIDeathScreen();
        }

        update() {
            this.gameScreen.update();
        }

        playerHit(e: Event) {
            this.gui.gameScreen.playerHit(this.gui.stage, this.gui.gameScreen);

//            var stage = this.instance.stage;
//            var color = new createjs.ColorFilter(1.0, 0.5, 0.5, 1, 0, 0, 0, 0);
//            stage.filters = [color];
//            stage.cache(0, 0, stage.canvas.width, stage.canvas.height);
        }

        playerDeath(e: Event) {
        }
    }
} 