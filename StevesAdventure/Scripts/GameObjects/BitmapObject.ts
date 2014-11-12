module GameObjects {
    export class BitmapObject extends createjs.Bitmap {
        width: number;
        height: number;

        constructor(imageAsset: string, positionIndex: number) {
            super(Managers.Assets.loader.getResult(imageAsset));
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.regX = this.width * 0.5;
            this.regY = this.height * 0.5;
            this.x = this.regX;
            this.y = this.regY;

            if (positionIndex !== undefined) {
                stage.addChildAt(this, positionIndex);
            } else {
                stage.addChild(this);
            }
        }
    }
}  