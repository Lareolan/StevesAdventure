var Managers;
(function (Managers) {
    var CloudManager = (function () {
        function CloudManager(cloudCountBias) {
            this.cloudCountBias = cloudCountBias;
            this.clouds = [];
            this.initClouds();
        }
        CloudManager.prototype.initClouds = function () {
            var cloudCount = this.getCloudCount();
            for (var index = this.clouds.length; index < cloudCount; index++) {
                this.clouds.push(this.getNewCloud());
            }
        };
        CloudManager.prototype.getNewCloud = function () {
            var cloudName = constants.CLOUDS[Math.floor(Math.random() * constants.CLOUDS.length)];
            var sky = stage.getChildByName("Sky");
            var index = stage.getChildIndex(sky) + 1;

            var newCloud = new GameObjects.Cloud(cloudName, index);
            var x = -newCloud.width;
            var y = Math.floor(Math.random() * (stage.canvas.height * 0.5));
            var speed = Math.floor(Math.random() * 4 + 2);

            newCloud.setPosition(x, y);
            newCloud.setSpeed(speed);

            newCloud.addEventListener("cloudOffScreen", { handleEvent: this.handleOffScreen, instance: this });
            return newCloud;
        };
        CloudManager.prototype.getCloudCount = function () {
            return this.cloudCountBias + Math.floor(Math.random() * 4) - 2;
        };
        CloudManager.prototype.handleOffScreen = function (event) {
            var instance = this.instance;
            var index = instance.clouds.indexOf(event.target);
            if (index !== undefined) {
                var res = stage.removeChild(event.target);
                instance.clouds.splice(index, 1);
                console.log("Cloud #" + index + " is off screen");
                instance.initClouds();
            }
        };
        CloudManager.prototype.update = function () {
            var removeIndex = -1;

            for (var index = 0; index < this.clouds.length; index++) {
                var result = this.clouds[index].update();
            }
        };
        return CloudManager;
    })();
    Managers.CloudManager = CloudManager;
})(Managers || (Managers = {}));
//# sourceMappingURL=CloudManager.js.map
