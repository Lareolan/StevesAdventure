var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var GameObjects;
(function (GameObjects) {
    var SpriteObject = (function (_super) {
        __extends(SpriteObject, _super);
        function SpriteObject(imageAsset, positionIndex) {
            _super.call(this, Managers.Assets.characters, imageAsset);
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;

            /*
            this.regX = this.width * 0.5;
            this.regY = this.height * 0.5;
            this.x = this.regX;
            this.y = this.regY;
            */
            if (positionIndex !== undefined) {
                stage.addChildAt(this, positionIndex);
            } else {
                stage.addChild(this);
            }
        }
        return SpriteObject;
    })(createjs.Sprite);
    GameObjects.SpriteObject = SpriteObject;
})(GameObjects || (GameObjects = {}));
//# sourceMappingURL=SpriteObject.js.map
