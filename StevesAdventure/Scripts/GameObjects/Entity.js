var GameObjects;
(function (GameObjects) {
    var Entity = (function () {
        function Entity() {
            this.spriteNames = [
                "steveStandRight",
                "steveStepRight",
                "steveStandRightAttack",
                "steveStepRightAttack",
                "steveStandLeft",
                "steveStepLeft",
                "steveStandLeftAttack",
                "steveStepLeftAttack"
            ];
            var $mapData = $(Managers.Assets.loader.getResult("Level1Map"));
        }
        return Entity;
    })();
    GameObjects.Entity = Entity;
})(GameObjects || (GameObjects = {}));
//# sourceMappingURL=Entity.js.map
