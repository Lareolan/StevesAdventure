var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var GameObjects;
(function (GameObjects) {
    // Cloud Class
    var Cloud = (function (_super) {
        __extends(Cloud, _super);
        function Cloud(cloudName, index) {
            _super.call(this, cloudName, null, index);
            this.name = "Cloud";
            createjs.EventDispatcher.initialize(this);
        }
        Cloud.prototype.update = function () {
            this.x += this.dx;
            if (this.x > (this.width + stage.canvas.width)) {
                var event = new createjs.Event("cloudOffScreen", true, false);
                this.dispatchEvent(event);
            }
        };

        Cloud.prototype.setPosition = function (x, y) {
            this.x = x;
            this.y = y;
        };

        Cloud.prototype.setSpeed = function (speed) {
            this.dx = speed;
        };

        Cloud.prototype.moveLeft = function () {
            this.x += constants.MOVE_SPEED;
        };

        Cloud.prototype.moveRight = function () {
            this.x -= constants.MOVE_SPEED;
        };
        return Cloud;
    })(GameObjects.BitmapObject);
    GameObjects.Cloud = Cloud;
})(GameObjects || (GameObjects = {}));
//# sourceMappingURL=Cloud.js.map
