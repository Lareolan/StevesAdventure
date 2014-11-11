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
        function SpriteObject() {
            _super.apply(this, arguments);
        }
        return SpriteObject;
    })(createjs.Sprite);
    GameObjects.SpriteObject = SpriteObject;
})(GameObjects || (GameObjects = {}));
//# sourceMappingURL=SpriteObject.js.map
