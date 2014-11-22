module GameObjects {
    export class BitmapObject extends createjs.Bitmap {
        width: number;
        height: number;
        posX: number;
        posY: number;

//        constructor(bitmapAsset: createjs.Bitmap, positionIndex: number = null);
        constructor(imageAsset?: string, bitmapAsset?: createjs.Bitmap, positionIndex: number = null) {
            if (imageAsset) {
                super(<string>Managers.Assets.loader.getResult(imageAsset));
            } else if (bitmapAsset) {
                super(bitmapAsset.image);
            } else {
                return;
            }
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.regX = this.width * 0.5;
            this.regY = this.height * 0.5;
            this.x = this.regX;
            this.y = this.regY;

            if (positionIndex !== null) {
                stage.addChildAt(this, positionIndex);
            } else {
                stage.addChild(this);
            }
        }

        getImage(): createjs.Bitmap {
            return this;
        }

        show(): void {
            stage.addChild(this);
        }

        hide(): void {
            stage.removeChild(this);
        }
    }
}  