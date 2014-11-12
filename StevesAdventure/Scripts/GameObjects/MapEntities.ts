/// <reference path="../lib/jquery.d.ts" />

module GameObjects {
    export class MapEntities {
        entityList: Array<Object>;

        constructor($entityGroup) {
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
        getEntity(entityName: string): Object {
            for (var index = 0; index < this.entityList.length; index++) {
                if (this.entityList[index]["name"] === entityName) {
                    return this.entityList[index];
                }
            }
            return null;
        }
    }
} 