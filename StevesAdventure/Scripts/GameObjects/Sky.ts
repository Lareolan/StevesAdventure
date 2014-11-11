module GameObjects {
    // Sky Class
    export class Sky {
        image: createjs.Bitmap;
        width: number;
        height: number;
        constructor() {
            this.image = new createjs.Bitmap(queue.getResult("sky"));
            this.width = this.image.getBounds().width;
            this.height = this.image.getBounds().height;
            stage.addChild(this.image);
        }
    }
} 