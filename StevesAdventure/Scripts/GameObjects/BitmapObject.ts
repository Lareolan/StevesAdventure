module GameObjects {
    export class BitmapObject extends createjs.Bitmap {
        width: number;
        height: number;
        constructor(imageAsset: string) {
            super(queue.getResult(imageAsset));
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.regX = this.width * 0.5;
            this.regY = this.height * 0.5;
            this.x = this.regX;
            this.y = this.regY;
            stage.addChild(this);
        }
    }
}  