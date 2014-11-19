var Managers;
(function (Managers) {
    var SoundsList = (function () {
        function SoundsList() {
        }
        SoundsList.WALK1 = "stone1";
        SoundsList.WALK2 = "stone2";
        SoundsList.BACKGROUND = "piano3";
        SoundsList.LAVA = "lava";
        SoundsList.LAVA_POP = "lavapop";
        SoundsList.WATER = "water";
        SoundsList.ZOMBIE_WALK1 = "zombie_step1";
        SoundsList.ZOMBIE_WALK2 = "zombie_step2";
        SoundsList.ZOMBIE_TALK1 = "zombie_say1";
        SoundsList.ZOMBIE_TALK2 = "zombie_say2";
        SoundsList.ZOMBIE_TALK3 = "zombie_say3";
        SoundsList.ZOMBIE_HURT1 = "zombie_hurt1";
        SoundsList.ZOMBIE_HURT2 = "zombie_hurt2";
        SoundsList.ZOMBIE_DEATH = "zombie_death";
        return SoundsList;
    })();
    Managers.SoundsList = SoundsList;

    var Sound = (function () {
        function Sound() {
            this.background = createjs.Sound.play(SoundsList.BACKGROUND, createjs.Sound.INTERRUPT_NONE, 0, 0, -1, 1, 0);
            this.lavaSound = createjs.Sound.createInstance(SoundsList.LAVA);
            this.lavaPopSound = createjs.Sound.createInstance(SoundsList.LAVA_POP);
            this.waterSound = createjs.Sound.createInstance(SoundsList.WATER);
        }
        Sound.prototype.playerWalk = function () {
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
        };

        Sound.prototype.update = function (player, map) {
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
        };
        return Sound;
    })();
    Managers.Sound = Sound;
})(Managers || (Managers = {}));
//# sourceMappingURL=Sound.js.map
