var GameObjects;
(function (GameObjects) {
    var Entity = (function () {
        function Entity() {
            var $mapData = $(Managers.Assets.loader.getResult("Level1Map"));
        }
        return Entity;
    })();
    GameObjects.Entity = Entity;
})(GameObjects || (GameObjects = {}));
//# sourceMappingURL=Entity.js.map
