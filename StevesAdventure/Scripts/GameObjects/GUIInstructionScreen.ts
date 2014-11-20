module GameObjects {
    export class GUIInstructionScreen extends GameObjects.Screen {
        text: Array<createjs.Text>;
        images: Array<createjs.Sprite>;
        intro: Array<string> = [
            "To play the game you must navigate your",
            "character - Steve, through a series of obstacles",
            "on the map and get him to the exit.",
            "Along the way, Steve will have to battle hordes",
            "of zombies.",
            "Steve's survival is in your hands!"
        ];
        instructions: Object = {
            AKey: { x: 128, y: 352 },
            LeftArrowKey: { x: 160, y: 352 },
            LeftText: { x: 288, y: 352, text: "Move Steve Left" },
            DKey: { x: 128, y: 416 },
            RightArrowKey: { x: 160, y: 416 },
            RightText: { x: 288, y: 416, text: "Move Steve Right" },
            WKey: { x: 128, y: 480},
            UpArrowKey: { x: 160, y: 480},
            JumpText: { x: 288, y: 480, text: "Make Steve Jump" },
            SpaceBar: { x: 64, y: 544 },
            AttackText: { x: 288, y: 544, text: "Make Steve Slash With His Sword" },
        };
        instructionsList: Array<string> = [
            "AKey",
            "LeftArrowKey",
            "LeftText",
            "DKey",
            "RightArrowKey",
            "RightText",
            "WKey",
            "UpArrowKey",
            "JumpText",
            "SpaceBar",
            "AttackText"
        ];

        constructor() {
            super();


            this.text = [];
            var textLine,
                index,
                textSize = 32;

            for (index = 0; index < this.intro.length; index++) {
                textLine = new createjs.Text();
                textLine.font = textSize + "px Minecrafter";
                textLine.text = this.intro[index];
                textLine.x = 128;
                textLine.y = 64 + (textSize * index);
//                this.text.push(textLine);
                this.screenObjects.push(textLine);
            }
            textLine.color = "#ff0000";

            var resourceName, instructionData, resource;
            for (index = 0; index < this.instructionsList.length; index++) {
                resourceName = this.instructionsList[index];
                instructionData = this.instructions[resourceName];
                if (instructionData.text) {
                    resource = new createjs.Text();
                    resource.font = textSize + "px Minecrafter";
                    resource.text = instructionData.text;
                } else {
                    resource = new createjs.Sprite(Managers.Assets.guiComponents, resourceName);
                }
                resource.x = instructionData.x;
                resource.y = instructionData.y;
                this.screenObjects.push(resource);
            }

            var shape = new createjs.Shape();
            shape.graphics.beginFill("#FF0000").drawRoundRect(0, 0, 160, 64, 32);
            shape.x = stage.canvas.width - 160 - 64;
            shape.y = stage.canvas.height - 128;
            this.screenObjects.push(shape);


            textLine = new createjs.Text();
            textLine.font = textSize + "px Minecrafter";
            textLine.text = "Back";
            textLine.x = stage.canvas.width - 160 + 16;
            textLine.y = stage.canvas.height - 128 + 32;
            textLine.textBaseline = "middle";
            textLine.textAlign = "center";
            this.screenObjects.push(textLine);
        }
    }
}  