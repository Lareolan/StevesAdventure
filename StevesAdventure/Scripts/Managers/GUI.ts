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

        constructor(canvas: Element) {
//            this.player = player;
//            this.stage = stage;

            this.preloadScreen = new GameObjects.GUIPreloadScreen();
            //            this.startScreen = new GameObjects.GUIStartScreen();
            //            this.instructionScreen = new GameObjects.GUIInstructionScreen();
            //            this.gameScreen = new GameObjects.GUIGameScreen(player);
            //            this.deathScreen = new GameObjects.GUIDeathScreen();
            this.activeScreen = this.preloadScreen;
        }

        preloadComplete(): void {
            this.startScreen = new GameObjects.GUIStartScreen();
            this.instructionScreen = new GameObjects.GUIInstructionScreen();
            this.gameScreen = new GameObjects.GUIGameScreen(player);
            this.deathScreen = new GameObjects.GUIDeathScreen();
        }

        setPlayer(player: GameObjects.Player): void {
            this.player = player;
        }

        setStage(stage: createjs.Stage): void {
            this.stage = stage;
        }

        update(): void {
            this.gameScreen.update();
        }

        playerHit(e: Event) {
            this.gui.gameScreen.playerHit(this.gui.stage, this.gui.gameScreen);
        }

        playerDeath(e: Event): void {
//            this.gui.show(this.gui.deathScreen, this.gui);
        }
/*
        show(screen: GameObjects.Screen, gui: Managers.GUI): void {
            gui.activeScreen = screen;
        }
*/
        show(gameState: number): void {
            switch (gameState) {
                case constants.GAME_STATE_INSTRUCTIONS:
                    this.activeScreen.hide();
                    this.activeScreen = this.instructionScreen;
                    this.activeScreen.show();
                    break;
            }
        }
    }
} 