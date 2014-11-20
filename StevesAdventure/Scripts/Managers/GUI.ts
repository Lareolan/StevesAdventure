module Managers {
    export class GUI {
        player: GameObjects.Player;
        preloadScreen: GameObjects.GUIPreloadScreen;
        startScreen: GameObjects.GUIStartScreen;
        instructionScreen: GameObjects.GUIInstructionScreen;
        gameScreen: GameObjects.GUIGameScreen;
        deathScreen: GameObjects.GUIDeathScreen;
        stage: createjs.Stage;
        activeScreen: GameObjects.Screen;

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
        }

        playerDeath(e: Event) {
            this.gui.show(this.gui.deathScreen, this.gui);
        }

        show(screen: GameObjects.Screen, gui: Managers.GUI) {
            gui.activeScreen = screen;
        }
    }
} 