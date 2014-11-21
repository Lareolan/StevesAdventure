var GameObjects;
(function (GameObjects) {
    var Screen = (function () {
        function Screen() {
            this.screenObjects = [];
            //        constructor(stage: createjs.Stage) {
            //            this.stage = stage;
        }
        Screen.prototype.hide = function () {
            for (var index = 0; index < stage.getNumChildren(); index++) {
                this.screenObjects.push(stage.getChildAt(index));
            }
            stage.removeAllChildren();
        };

        Screen.prototype.show = function () {
            stage.removeAllChildren();
            for (var index = 0; index < this.screenObjects.length; index++) {
                stage.addChild(this.screenObjects[index]);
            }
        };

        Screen.prototype.addChild = function (image) {
            this.screenObjects.push(image);
        };

        Screen.prototype.addChildArray = function (images) {
            this.screenObjects.concat(images);
        };
        return Screen;
    })();
    GameObjects.Screen = Screen;
})(GameObjects || (GameObjects = {}));
//# sourceMappingURL=Screen.js.map
