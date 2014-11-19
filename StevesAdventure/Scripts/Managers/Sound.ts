﻿module Managers {
    export class SoundsList {
        static WALK1: string = "stone1";
        static WALK2: string = "stone2";
        static BACKGROUND: string = "piano3";
        static LAVA: string = "lava";
        static LAVA_POP: string = "lavapop";
        static WATER: string = "water";
        static ZOMBIE_WALK1: string = "zombie_step1";
        static ZOMBIE_WALK2: string = "zombie_step2";
        static ZOMBIE_TALK1: string = "zombie_say1";
        static ZOMBIE_TALK2: string = "zombie_say2";
        static ZOMBIE_TALK3: string = "zombie_say3";
        static ZOMBIE_HURT1: string = "zombie_hurt1";
        static ZOMBIE_HURT2: string = "zombie_hurt2";
        static ZOMBIE_DEATH: string = "zombie_death";
    }

    export class Sound {
        private background: createjs.SoundInstance;
        private playerWalkSound: string;
        private playerWalkInstance: createjs.SoundInstance;
        private lavaSound: createjs.SoundInstance;
        private lavaPopSound: createjs.SoundInstance;
        private waterSound: createjs.SoundInstance;

        constructor() {
            this.background = createjs.Sound.play(SoundsList.BACKGROUND, createjs.Sound.INTERRUPT_NONE, 0, 0, -1, 1, 0);
            this.lavaSound = createjs.Sound.createInstance(SoundsList.LAVA);
            this.lavaPopSound = createjs.Sound.createInstance(SoundsList.LAVA_POP);
            this.waterSound = createjs.Sound.createInstance(SoundsList.WATER);
        }

        playerWalk() {
            if (!this.playerWalkSound) {
                this.playerWalkSound = SoundsList.WALK1;
                this.playerWalkInstance = createjs.Sound.play(this.playerWalkSound, createjs.Sound.INTERRUPT_NONE, 0, 0, 0, 1, 0);
            }
            if (this.playerWalkInstance.playState === createjs.Sound.PLAY_FINISHED) {
                if (this.playerWalkSound === SoundsList.WALK1) {
                    this.playerWalkSound = SoundsList.WALK2;
                } else {
                    this.playerWalkSound = SoundsList.WALK1;
                }
                this.playerWalkInstance = createjs.Sound.play(this.playerWalkSound, createjs.Sound.INTERRUPT_NONE, 0, 0, 0, 1, 0);
            }
        }

        update(player: GameObjects.Player, map: GameObjects.GameMap) {
            var lavaX, relativeDistance, volume, pan, index, lavaFound, waterFound;
            var mapData = map.getLayer("Foreground");
            var halfStage = (stage.canvas.width / 2) * 2;

//            for (var index = 0; index < mapData.data.length; index++) {
            var screenTileWidth = Math.floor(stage.canvas.width / 32) * 2;
            var screenTileHeight = mapData.height;
            var totalScreenTiles = screenTileWidth * screenTileHeight;
            var xOffset = Math.floor(player.mapX / 32) - Math.floor(halfStage / 32);
            if (xOffset < 0) {
                xOffset = 0;
            }

            for (var tileCount = 0; tileCount < totalScreenTiles; tileCount++) {
                index = xOffset + (tileCount % screenTileWidth) + Math.floor(tileCount / screenTileWidth) * mapData.width;

                if (mapData.data[index] === constants.LAVA_BLOCK) {
                    lavaX = (index % mapData.width) * 32;
                    relativeDistance = lavaX - player.mapX;

                    if (Math.abs(relativeDistance) <= halfStage) {
                        pan = (halfStage - Math.abs(relativeDistance)) / halfStage;
                        volume = pan;

                        if (relativeDistance < 0) {
                            pan = -pan;
                        }

                        lavaFound = true;
                        break;
                    }
                } else if (mapData.data[index] === constants.WATER_BLOCK) {
                    lavaX = (index % mapData.width) * 32;
                    relativeDistance = lavaX - player.mapX;

                    if (Math.abs(relativeDistance) <= halfStage) {
                        pan = (halfStage - Math.abs(relativeDistance)) / halfStage;
                        volume = pan;

                        if (relativeDistance < 0) {
                            pan = -pan;
                        }

                        waterFound = true;
                        break;
                    }
                }
            }

            if (lavaFound) {
                if (this.lavaSound.playState !== createjs.Sound.PLAY_SUCCEEDED) {
                    this.lavaSound.play(createjs.Sound.INTERRUPT_NONE, 0, 0, 0, volume, pan);
                }
                if (Math.floor(Math.random() * 60) === 0) {
                    this.lavaPopSound.play(createjs.Sound.INTERRUPT_NONE, 0, 0, 0, volume, pan);
                }
            }
            if (waterFound) {
                if (this.waterSound.playState !== createjs.Sound.PLAY_SUCCEEDED) {
                    this.waterSound.play(createjs.Sound.INTERRUPT_NONE, 0, 0, 0, volume, pan);
                }
            }
        }
    }
}




















