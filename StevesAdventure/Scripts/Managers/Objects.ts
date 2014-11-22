module Managers {
    export class Objects {
        originalList: Array<Object>;
        objectList: Array<GameObjects.BitmapObject>;
        doors: Array<GameObjects.BitmapObject>;
        torches: Array<GameObjects.BitmapObject>;
        ladders: Array<GameObjects.BitmapObject>;
        miscObjects: Array<GameObjects.BitmapObject>;

        constructor(objects: Array<Object>, tileset: GameObjects.Tileset) {
            this.originalList = objects;
            this.doors = [];
            this.torches = [];
            this.miscObjects = [];
            this.objectList = [];

            var bitmap: createjs.Bitmap;
            var gid: number;
            var index: number;
            var obj: GameObjects.BitmapObject;
            for (index = 0; index < objects.length; index++) {
                gid = parseInt(objects[index]["gid"]);

                if (objects[index]["type"] === "Door") {
                    bitmap = tileset.getTile(gid);
                    obj = new GameObjects.BitmapObject(null, bitmap);
                    this.doors.push(obj);
                } else if (objects[index]["type"] === "Torch") {
                    bitmap = tileset.getTile(gid);
                    obj = new GameObjects.BitmapObject(null, bitmap);
                    this.torches.push(obj);
                } else if ((objects[index]["type"] !== "Mob") && (objects[index]["type"] !== "Steve")) {
                    bitmap = tileset.getTile(gid);
                    obj = new GameObjects.BitmapObject(null, bitmap);
                    this.miscObjects.push(obj);
                } else {
                    continue;
                }
                obj.x = parseInt(objects[index]["x"]);
                obj.y = parseInt(objects[index]["y"]) - 32;
                obj.posX = obj.x;
                obj.posY = obj.y;
                obj.regX = 0;
                obj.regY = 0;
                obj.name = objects[index]["name"];
            }

            for (index = 0; index < this.doors.length; index++) {
                stage.addChild(this.doors[index]);
                this.objectList.push(this.doors[index]);
            }
            for (index = 0; index < this.torches.length; index++) {
                stage.addChild(this.torches[index]);
                this.objectList.push(this.torches[index]);
            }
            for (index = 0; index < this.miscObjects.length; index++) {
                stage.addChild(this.miscObjects[index]);
                this.objectList.push(this.miscObjects[index]);
            }
        }

        moveLeft(): void {
            for (var index = 0; index < this.objectList.length; index++) {
                this.objectList[index].x += constants.MOVE_SPEED;
            }
        }

        moveRight(): void {
            for (var index = 0; index < this.objectList.length; index++) {
                this.objectList[index].x -= constants.MOVE_SPEED;
            }
        }

        show(): void {
            for (var index = 0; index < this.objectList.length; index++) {
                this.objectList[index].show();
            }
        }

        hide(): void {
            for (var index = 0; index < this.objectList.length; index++) {
                this.objectList[index].hide();
            }
        }

        checkExit(x: number, y: number): boolean {
            for (var index = 0; index < this.doors.length; index++) {
                if (this.doors[index].name === "Exit") {
                    var distanceH = Math.abs(Math.floor(this.doors[index].posX / 32) - x);
                    var distanceV = Math.abs(Math.floor(this.doors[index].posY / 32) - y);
                    if ((distanceH === 0) && (distanceV === 0)) {
                        return true;
                    }
                }
            }
            return false;
        }
    }
} 