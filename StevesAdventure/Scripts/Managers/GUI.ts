module Managers {
    export class GUI {
        player: GameObjects.Player;
        preloadScreen: GameObjects.GUIPreloadScreen;
        startScreen: GameObjects.GUIStartScreen;
        instructionScreen: GameObjects.GUIInstructionScreen;
        gameScreen: GameObjects.GUIGameScreen;
        deathScreen: GameObjects.GUIDeathScreen;

        constructor(player: GameObjects.Player) {
            this.player = player;

            this.preloadScreen = new GameObjects.GUIPreloadScreen();
            this.startScreen = new GameObjects.GUIStartScreen();
            this.instructionScreen = new GameObjects.GUIInstructionScreen();
            this.gameScreen = new GameObjects.GUIGameScreen(player);
            this.deathScreen = new GameObjects.GUIDeathScreen();
        }

        update() {
            this.gameScreen.update();
        }

        playerDeath(e: Event) {
        }
    }
} 