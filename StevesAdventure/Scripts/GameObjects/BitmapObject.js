﻿var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var GameObjects;
(function (GameObjects) {
    var BitmapObject = (function (_super) {
        __extends(BitmapObject, _super);
        function BitmapObject(imageAsset, positionIndex) {
            //            super(queue.getResult(imageAsset));
            _super.call(this, Managers.Assets.loader.getResult(imageAsset));
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
        return BitmapObject;
    })(createjs.Bitmap);
    GameObjects.BitmapObject = BitmapObject;
})(GameObjects || (GameObjects = {}));
//# sourceMappingURL=BitmapObject.js.map
