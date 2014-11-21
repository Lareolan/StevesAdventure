module GameObjects {
    // Cloud Class
    export class Cloud extends GameObjects.BitmapObject {
        width: number;
        height: number;
        dx: number;
        name: string = "Cloud";

        constructor(cloudName: string, index: number) {
            super(cloudName, index);
            createjs.EventDispatcher.initialize(this);
        }

        update(): void {
            this.x += this.dx;
            if (this.x > (this.width + stage.canvas.width)) {
                var event = new createjs.Event("cloudOffScreen", true, false);
                this.dispatchEvent(event);
            }
        }

        setPosition(x: number, y: number): void {
            this.x = x;
            this.y = y;
        }

        setSpeed(speed: number): void {
            this.dx = speed;
        }

        moveLeft(): void {
            this.x += constants.MOVE_SPEED;
        }

        moveRight(): void {
            this.x -= constants.MOVE_SPEED;
        }
    }
}