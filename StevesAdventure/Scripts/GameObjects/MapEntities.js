/// <reference path="../lib/jquery.d.ts" />
var GameObjects;
(function (GameObjects) {
    var MapEntities = (function () {
        function MapEntities($entityGroup) {
            var $entities = $entityGroup.find("object");
            var entityList = this.entityList = [];

            $entities.each(function () {
                var $this = $(this);
                var obj = {};

                var attributes = $this[0].attributes;
                for (var index = 0; index < attributes.length; index++) {
                    var attribute = attributes[index];
                    obj[attribute.name] = attribute.value;
                }

                entityList.push(obj);
            });
        }
        MapEntities.prototype.getEntityByName = function (entityName) {
            for (var index = 0; index < this.entityList.length; index++) {
                if (this.entityList[index]["name"] === entityName) {
                    return this.entityList[index];
                }
            }
            return null;
        };

        MapEntities.prototype.getEntitiesByType = function (entityType) {
            var entityList = null;

            for (var index = 0; index < this.entityList.length; index++) {
                if (this.entityList[index]["type"] === entityType) {
                    if (!entityList) {
                        entityList = [];
                    }

                    //                    return this.entityList[index];
                    entityList.push(this.entityList[index]);
                }
            }
            return entityList;
        };

        MapEntities.prototype.getAllEntities = function () {
            return this.entityList;
        };
        return MapEntities;
    })();
    GameObjects.MapEntities = MapEntities;
})(GameObjects || (GameObjects = {}));
//# sourceMappingURL=MapEntities.js.map
