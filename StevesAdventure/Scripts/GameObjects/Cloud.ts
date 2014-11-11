module GameObjects {
    // Cloud Class
    export class Cloud {
        image: createjs.Bitmap;
        width: number;
        height: number;
        dx: number;
        constructor() {
            var cloudIndex = constants.CLOUDS[Math.floor(Math.random() * constants.CLOUDS.length)];
            this.image = new createjs.Bitmap(queue.getResult(cloudIndex));
            this.width = this.image.getBounds().width;
            this.height = this.image.getBounds().height;
            this.image.regX = this.width * 0.5;
            this.image.regY = this.height * 0.5;
            stage.addChild(this.image);
            this.reset();
        }
        reset() {
            this.image.y = Math.floor(Math.random() * (stage.canvas.height - 320));
            this.image.x = this.width;
            this.dx = Math.floor(Math.random() * 4 + 2);
        }
        update() {
            this.image.x += this.dx;
            if (this.image.x > (this.width + stage.canvas.width)) {
                this.reset();
            }
        }
        moveLeft() {
            this.image.x += constants.MOVE_SPEED;
        }
        moveRight() {
            this.image.x -= constants.MOVE_SPEED;
        }
    }
}