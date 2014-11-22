﻿module GameObjects {
    export class GUIDeathScreen extends GameObjects.Screen {
        redOverlay: createjs.Shape;

        epilogue: Object = {
            line1: { text: "Despite your best efforts, Steve is dead.", textSize: 32, color: "#000000", x: 128, y: 64 },
            line2: { text: "You have Failed Steve after all...", textSize: 32, color: "#000000", x: 128, y: 128 },
            line3: { text: "R.I.P Steve", textSize: 32, color: "#ff0000", x: 128, y: 192 },
            line4: { text: "Game Over", textSize: 128, color: "#ff0000", x: stage.canvas.width / 2, y: 256 }
        };
        epilogueList: Array<string> = [
            "line1",
            "line2",
            "line3",
            "line4"
        ];

        constructor() {
            super();
        }

        init(killCount: number): void {
            var textLine,
                lineData,
                index,
                textSize = 32;



            this.redOverlay = new createjs.Shape();
            this.redOverlay.graphics.beginFill("rgba(255,0,0,0.5)").drawRect(0, 0, stage.canvas.width, stage.canvas.height);
            this.screenObjects.push(this.redOverlay);

            for (index = 0; index < this.epilogueList.length; index++) {
                lineData = this.epilogue[this.epilogueList[index]];

                textLine = new createjs.Text();
                textLine.font = lineData.textSize + "px Minecrafter";
                textLine.text = lineData.text;
                textLine.color = lineData.color;
                textLine.x = lineData.x;
                textLine.y = lineData.y;
                this.screenObjects.push(textLine);
            }
            textLine.textAlign = "center";

            textLine = new createjs.Text("On the bright side, at least you killed " + killCount + " zombies!", "32px Minecrafter", "#000000");
            textLine.x = 128;
            textLine.y = 512;
            this.screenObjects.push(textLine);

            var btn = new GameObjects.Button("Play Again?", 256, 64, (stage.canvas.width / 2 - 128), 576, GameObjects.Button.ROUNDED, "black", "#5533DD", "rgba(100, 60, 200, 0.8)");
            btn.setFadeEffect();
            btn.setClickHandler(function () {
                gameState = constants.GAME_STATE_PLAY;
                gui.show(constants.GAME_STATE_PLAY);
                cloudManager.reset();
                player.reset();
                map.reset();
                mobs.reset();
                gui.gameScreen.reset();
            });
            this.screenObjects.push(btn);
        }

        show(): void {
            super.show();
        }
   }
}  