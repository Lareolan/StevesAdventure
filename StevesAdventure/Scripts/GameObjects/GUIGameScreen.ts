﻿module GameObjects {
    export class GUIGameScreen extends GameObjects.Screen {
        healthBar: createjs.Sprite;
        healthSprites: Array<createjs.Sprite>;
        hitShape: createjs.Shape;
        player: GameObjects.Player;
        killDisplay: createjs.Text;
        lastKillCount: number;

        constructor(player: GameObjects.Player) {
            super();
            this.healthSprites = [];
            this.player = player;

            this.healthBar = new createjs.Sprite(Managers.Assets.guiComponents, "MeterBackground");
            this.healthBar.x = stage.canvas.width / 2 - 160;
            this.healthBar.y = 640;
            this.healthBar.name = "Health Bar";
            stage.addChild(this.healthBar);

            for (var i = 0; i < 10; i++) {
                this.healthSprites[i] = new createjs.Sprite(Managers.Assets.guiComponents, "FullHeart");
                this.healthSprites[i].x = (stage.canvas.width / 2) - 160 + (32 * i);
                this.healthSprites[i].y = 640;
                this.healthSprites[i].name = "Full Heart";
                stage.addChild(this.healthSprites[i]);
            }

            this.hitShape = new createjs.Shape();
            this.hitShape.graphics.beginFill("rgba(255,0,0,0.5)").drawRect(0, 0, stage.canvas.width, stage.canvas.height - 32);

            this.killDisplay = new createjs.Text();
            this.killDisplay.font = "32px Minecrafter";
            this.killDisplay.text = "Kill Count: 0";
            this.killDisplay.y = 640 + 16;
            this.killDisplay.textBaseline = "middle";
            this.killDisplay.name = "Kill Display";
            stage.addChild(this.killDisplay);
        }

        show() {
            super.show();
        }

        reset(): void {
            this.healthBar.x = stage.canvas.width / 2 - 160;
            this.healthBar.y = 640;
            this.healthBar.name = "Health Bar";
            stage.addChild(this.healthBar);

            for (var i = 0; i < 10; i++) {
                this.healthSprites[i] = new createjs.Sprite(Managers.Assets.guiComponents, "FullHeart");
                this.healthSprites[i].x = (stage.canvas.width / 2) - 160 + (32 * i);
                this.healthSprites[i].y = 640;
                this.healthSprites[i].name = "Full Heart";
                stage.addChild(this.healthSprites[i]);
            }

            this.hitShape = new createjs.Shape();
            this.hitShape.graphics.beginFill("rgba(255,0,0,0.5)").drawRect(0, 0, stage.canvas.width, stage.canvas.height - 32);

            this.killDisplay.font = "32px Minecrafter";
            this.killDisplay.text = "Kill Count: 0";
            this.killDisplay.y = 640 + 16;
            this.killDisplay.textBaseline = "middle";
            this.killDisplay.name = "Kill Display";
            stage.addChild(this.killDisplay);
        }

        update() {
            var health = this.player.getHealth();

            if ((health < this.healthSprites.length) && (health >= 0)) {
                for (var i = this.healthSprites.length - 1; i >= health; i--) {
                    stage.removeChild(this.healthSprites[i]);
                    this.healthSprites.length = i;
                }
            }

            if (this.lastKillCount != this.player.getKillcount()) {
                this.lastKillCount = this.player.getKillcount();
                this.killDisplay.text = "Kill Count: " + this.lastKillCount;
                stage.update();
            }

        }

        playerHit(stage: createjs.Stage, instance: GameObjects.GUIGameScreen) {
            stage.addChild(instance.hitShape);
            setTimeout(function () {
                stage.removeChild(instance.hitShape);
                stage.update();
            }, 100);
            
        }
    }
} 