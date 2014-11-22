module Managers {
    export class CloudManager {
        clouds: Array<GameObjects.Cloud>;
        cloudCountBias: number;

        constructor(cloudCountBias: number) {
            this.cloudCountBias = cloudCountBias;
            this.clouds = [];
            this.initClouds();
        }

        initClouds(): void {
            var cloudCount = this.getCloudCount();
            for (var index = this.clouds.length; index < cloudCount; index++) {
                this.clouds.push(this.getNewCloud());
            }
        }

        getNewCloud(): GameObjects.Cloud {
            var cloudName = constants.CLOUDS[Math.floor(Math.random() * constants.CLOUDS.length)];
            var sky = stage.getChildByName("Sky");
            var index = stage.getChildIndex(sky) + 1;

            var newCloud = new GameObjects.Cloud(cloudName, index);
            var x = -newCloud.width;
            var y = Math.floor(Math.random() * (stage.canvas.height * 0.5));
            var speed = Math.floor(Math.random() * 4 + 2);

            newCloud.setPosition(x, y);
            newCloud.setSpeed(speed);

            newCloud.addEventListener("cloudOffScreen", { handleEvent: this.handleOffScreen, instance: this });
            return newCloud;
        }

        getCloudCount(): number {
            return this.cloudCountBias + Math.floor(Math.random() * 4) - 2;
        }

        handleOffScreen(event): void {
            var instance = this.instance;
            var index = instance.clouds.indexOf(event.target);
            if (index !== undefined) {
                var res = stage.removeChild(event.target);
                instance.clouds.splice(index, 1);
                //                console.log("Cloud #" + index + " is off screen");
                instance.initClouds();
            }
        }

        update(): void {
            for (var index = 0; index < this.clouds.length; index++) {
                this.clouds[index].update();
            }
        }

        moveLeft(): void {
            for (var index = 0; index < this.clouds.length; index++) {
                this.clouds[index].moveLeft();
            }
        }

        moveRight(): void {
            for (var index = 0; index < this.clouds.length; index++) {
                this.clouds[index].moveRight();
            }
        }

        show(): void {
            for (var index = 0; index < this.clouds.length; index++) {
                this.clouds[index].show();
            }
        }

        hide(): void {
            for (var index = 0; index < this.clouds.length; index++) {
                this.clouds[index].hide();
            }
        }

        getImages(): Array<createjs.Bitmap> {
            var cloudImages = [];
            for (var index = 0; index < this.clouds.length; index++) {
                cloudImages.push(this.clouds[index].getImage());
            }
            return cloudImages;
        }

        reset(): void {
            this.clouds = [];
            this.initClouds();
        }
    }
} 