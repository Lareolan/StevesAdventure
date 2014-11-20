module GameObjects {
    export class Screen {
        stage: createjs.Stage;
        screenObjects: Array <createjs.DisplayObject>;

        constructor() {
            this.screenObjects = [];
//        constructor(stage: createjs.Stage) {
//            this.stage = stage;
        }

        hide() {
            for (var index = 0; index < stage.getNumChildren(); index++) {
                this.screenObjects.push(stage.getChildAt(index));
            }
            stage.removeAllChildren();
        }

        show() {
            stage.removeAllChildren();
            for (var index = 0; index < this.screenObjects.length; index++) {
                stage.addChild(this.screenObjects[index]);
            }
        }
    }
}