var GameObjects;
(function (GameObjects) {
    // Sky Class
    var Sky = (function () {
        function Sky() {
            this.image = new createjs.Bitmap(queue.getResult("sky"));
            this.width = this.image.getBounds().width;
            this.height = this.image.getBounds().height;
            stage.addChild(this.image);
        }
        return Sky;
    })();
    GameObjects.Sky = Sky;
})(GameObjects || (GameObjects = {}));
//# sourceMappingURL=Sky.js.map
