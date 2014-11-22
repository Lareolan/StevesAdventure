module Managers {
    export class SoundsList {
        static WALK1: string = "stone1";
        static WALK2: string = "stone2";
        static BACKGROUND: string = "piano3";
        static LAVA: string = "lava";
        static LAVA_POP: string = "lavapop";
        static WATER: string = "water";
        static HIT: string = "hit";
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
        private playerHitInstance: createjs.SoundInstance;
        private zombieSpeakSound: string;
        private zombieSpeakInstance: createjs.SoundInstance;
        private lavaInstance: createjs.SoundInstance;
        private lavaPopInstance: createjs.SoundInstance;
        private waterInstance: createjs.SoundInstance;

        constructor() {
            this.background = createjs.Sound.play(SoundsList.BACKGROUND, createjs.Sound.INTERRUPT_NONE, 0, 0, -1, 1, 0);
            this.lavaInstance = createjs.Sound.createInstance(SoundsList.LAVA);
            this.lavaPopInstance = createjs.Sound.createInstance(SoundsList.LAVA_POP);
            this.waterInstance = createjs.Sound.createInstance(SoundsList.WATER);
            this.playerHitInstance = createjs.Sound.createInstance(SoundsList.HIT);
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

        playerHit() {
            this.playerHitInstance.play(createjs.Sound.INTERRUPT_NONE, 0, 0, 0, 1, 0);
        }

        zombieSpeak(zombie: GameObjects.Mobs.Zombie, player: GameObjects.Player) {
            var distance, volume, pan;
            var halfScreenWidth = stage.canvas.width / 2;


            distance = zombie.mapX - player.mapX;
            if (Math.abs(distance) > halfScreenWidth) {
                return;
            }

            pan = distance / halfScreenWidth;
            volume = Math.abs(pan) * 0.8;

            if (!this.zombieSpeakSound) {
                this.zombieSpeakSound = SoundsList.ZOMBIE_TALK1;
                this.zombieSpeakInstance = createjs.Sound.play(this.zombieSpeakSound, createjs.Sound.INTERRUPT_NONE, 0, 0, 0, volume, pan);
            } else {
//            if (this.zombieSpeakInstance.playState === createjs.Sound.PLAY_FINISHED) {
                var sound = Math.floor(Math.random() * 3);
                switch (sound) {
                    case 0:
                        this.zombieSpeakSound = SoundsList.ZOMBIE_TALK1;
                        break;
                    case 1:
                        this.zombieSpeakSound = SoundsList.ZOMBIE_TALK2;
                        break;
                    case 2:
                        this.zombieSpeakSound = SoundsList.ZOMBIE_TALK3;
                        break;
                }

            this.zombieSpeakInstance = createjs.Sound.play(this.zombieSpeakSound, createjs.Sound.INTERRUPT_NONE, 0, 0, 0, volume, pan);
            }
        }

        zombieHurt(zombie: GameObjects.Mobs.Zombie, player: GameObjects.Player) {
            var distance, volume, pan;
            var halfScreenWidth = stage.canvas.width / 2;


            distance = zombie.mapX - player.mapX;
            pan = distance / halfScreenWidth;
            volume = Math.abs(pan) * 0.8;
            var soundID;
            if (Math.floor(Math.random() * 2) == 0) {
                soundID = SoundsList.ZOMBIE_HURT1;
            } else {
                soundID = SoundsList.ZOMBIE_HURT2;
            }

            this.zombieSpeakInstance = createjs.Sound.play(soundID, createjs.Sound.INTERRUPT_NONE, 0, 0, 0, volume, pan);
        }

        zombieDeath(zombie: GameObjects.Mobs.Zombie, player: GameObjects.Player) {
            var distance, volume, pan;
            var halfScreenWidth = stage.canvas.width / 2;


            distance = zombie.mapX - player.mapX;
            pan = distance / halfScreenWidth;
            volume = Math.abs(pan) * 0.8;
            this.zombieSpeakInstance = createjs.Sound.play(SoundsList.ZOMBIE_DEATH, createjs.Sound.INTERRUPT_NONE, 0, 0, 0, volume, pan);
        }

        update(player: GameObjects.Player, map: GameObjects.GameMap) {
            var lavaX, relativeDistance, volume, pan, index, lavaFound, waterFound;
            var mapData = map.getLayer("Foreground");
            var halfStage = (stage.canvas.width / 2) * 2;

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
                if (this.lavaInstance.playState !== createjs.Sound.PLAY_SUCCEEDED) {
                    this.lavaInstance.play(createjs.Sound.INTERRUPT_NONE, 0, 0, 0, volume, pan);
                }
                if (Math.floor(Math.random() * 60) === 0) {
                    this.lavaPopInstance.play(createjs.Sound.INTERRUPT_NONE, 0, 0, 0, volume, pan);
                }
            }
            if (waterFound) {
                if (this.waterInstance.playState !== createjs.Sound.PLAY_SUCCEEDED) {
                    this.waterInstance.play(createjs.Sound.INTERRUPT_NONE, 0, 0, 0, volume, pan);
                }
            }
        }
    }
}




















