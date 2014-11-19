module GameObjects {
    export class GUIGameScreen {
        healthBar: createjs.Sprite;
        healthSprites: Array<createjs.Sprite>;
        player: GameObjects.Player;
        active: boolean;

        constructor(player: GameObjects.Player) {
            this.healthSprites = [];
            this.player = player;

            this.healthBar = new createjs.Sprite(Managers.Assets.guiComponents, "MeterBackground");
            this.healthBar.x = stage.canvas.width / 2 - 160;
            this.healthBar.y = 640;
            stage.addChild(this.healthBar);

            for (var i = 0; i < 10; i++) {
                this.healthSprites[i] = new createjs.Sprite(Managers.Assets.guiComponents, "FullHeart");
                this.healthSprites[i].x = (stage.canvas.width / 2) - 160 + (32 * i);
                this.healthSprites[i].y = 640;
                stage.addChild(this.healthSprites[i]);
            }

            this.active = true;
        }

        update() {
            var health = this.player.getHealth();

            if (health < this.healthSprites.length) {
                for (var i = this.healthSprites.length - 1; i >= health; i--) {
                    stage.removeChild(this.healthSprites[i]);
                    this.healthSprites.length = i;
                }
            }
        }

        playerHit(stage: createjs.Stage) {
            var color = new createjs.ColorFilter(1.0, 0.5, 0.5, 1, 0, 0, 0, 0);
            stage.filters = [color];
            stage.cache(0, 0, stage.canvas.width, stage.canvas.height);
        }

        isActive() {
            return this.active;
        }
    }
} 