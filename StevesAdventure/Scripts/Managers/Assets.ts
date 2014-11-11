module Managers {
    export class Assets {
        static loader: createjs.LoadQueue;

        static assetList = [
            { id: "SteveStand", src: "Assets/images/SteveStand.png" },
            { id: "SteveStep", src: "Assets/images/SteveStep.png" },
            { id: "SteveStepAttack", src: "Assets/images/SteveStepAttack.png" },
            { id: "sky", src: "Assets/images/Sky.png" },
            { id: "cloud1", src: "Assets/images/Cloud_1.png" },
            { id: "cloud2", src: "Assets/images/Cloud_2.png" },
            { id: "MasterTileSet", src: "Assets/images/MasterTileSet.png", type: createjs.LoadQueue.IMAGE, data: 102955 },
            { id: "Character-Tileset", src: "Assets/images/MasterTileSet.png" },
            { id: "Level1Data", src: "Assets/data/Level1.json" },
            { id: "Level1Map", src: "Assets/data/Level1.tmx" }
        ];

        static init() {
            this.loader = new createjs.LoadQueue();
            this.loader.installPlugin(createjs.Sound);
//            this.loader.addEventListener("complete", init);
//            this.loader.addEventListener("progress", handleProgress);
//            this.loader.addEventListener("complete", handleComplete);
            this.loader.loadManifest(this.assetList);
        }
    }
}