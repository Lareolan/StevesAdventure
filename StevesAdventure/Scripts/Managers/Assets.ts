module Managers {
    export class Assets {
        static loader: createjs.LoadQueue;
        static characters: createjs.SpriteSheet;

        static assetList = [
            { id: "sky", src: "Assets/images/Sky.png" },
            { id: "cloud1", src: "Assets/images/Cloud_1.png" },
            { id: "cloud2", src: "Assets/images/Cloud_2.png" },
            { id: "MasterTileSet", src: "Assets/images/MasterTileSet.png", type: createjs.LoadQueue.IMAGE, data: 102955 },
            { id: "Character-Tileset", src: "Assets/images/MasterTileSet.png" },
            { id: "Level1Map", src: "Assets/data/Level1.tmx", type: createjs.LoadQueue.XML }
        ];

        static characterSpriteSheet = {
            images: ["Assets/images/Character-Tileset.png"],
            frames: { width: 32, height: 64 },
            animations: {
                steveStandRight: [0],
                steveStepRight: [1],
                steveStandRightAttack: [2],
                steveStepRightAttack: [3],
                steveStandLeft: [4],
                steveStepLeft: [5],
                steveStandLeftAttack: [6],
                steveStepLeftAttack: [7],
                zombieStandRight: [8],
                zombieStepRight: [9],
                zombieStandLeft: [10],
                zombieStepLeft: [11],
                creeper: [12]
            }
        };

        static init() {
            this.loader = new createjs.LoadQueue();
            this.loader.installPlugin(createjs.Sound);
//            this.loader.addEventListener("complete", init);
//            this.loader.addEventListener("progress", handleProgress);
//            this.loader.addEventListener("complete", handleComplete);
            this.loader.loadManifest(this.assetList);
            this.characters = new createjs.SpriteSheet(this.characterSpriteSheet);
        }
    }
}