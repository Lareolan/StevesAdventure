module Managers {
    export class GUI {
        player: GameObjects.Player;
        gameScreen: GameObjects.GUIGameScreen;

        constructor(player: GameObjects.Player) {
            this.player = player;

            this.gameScreen = new GameObjects.GUIGameScreen(player);
        }

        update() {
            this.gameScreen.update();
        }
    }
} 