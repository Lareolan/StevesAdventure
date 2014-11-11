var GameObjects;
(function (GameObjects) {
    // Cloud Class
    var Cloud = (function () {
        function Cloud() {
            var cloudIndex = constants.CLOUDS[Math.floor(Math.random() * constants.CLOUDS.length)];
            this.image = new createjs.Bitmap(queue.getResult(cloudIndex));
            this.width = this.image.getBounds().width;
            this.height = this.image.getBounds().height;
            this.image.regX = this.width * 0.5;
            this.image.regY = this.height * 0.5;
            stage.addChild(this.image);
            this.reset();
        }
        Cloud.prototype.reset = function () {
            this.image.y = Math.floor(Math.random() * (stage.canvas.height - 320));
            this.image.x = this.width;
            this.dx = Math.floor(Math.random() * 4 + 2);
        };
        Cloud.prototype.update = function () {
            this.image.x += this.dx;
            if (this.image.x > (this.width + stage.canvas.width)) {
                this.reset();
            }
        };
        Cloud.prototype.moveLeft = function () {
            this.image.x += constants.MOVE_SPEED;
        };
        Cloud.prototype.moveRight = function () {
            this.image.x -= constants.MOVE_SPEED;
        };
        return Cloud;
    })();
    GameObjects.Cloud = Cloud;
})(GameObjects || (GameObjects = {}));
//# sourceMappingURL=Cloud.js.map
