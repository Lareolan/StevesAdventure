﻿/**
* This file contains game's sound manager
* Author:              Konstantin Koton
* Filename:            Sound.ts
* Last Modified By:    Konstantin Koton
* Date Last Modified:  Nov. 22, 2014
* Revision History:    Too numerous to mention
*/
var Managers;
(function (Managers) {
    // An internal class containing static names of the various sound assets.
    var SoundsList = (function () {
        function SoundsList() {
        }
        SoundsList.WALK1 = "stone1";
        SoundsList.WALK2 = "stone2";
        SoundsList.BACKGROUND = "piano3";
        SoundsList.LAVA = "lava";
        SoundsList.LAVA_POP = "lavapop";
        SoundsList.WATER = "water";
        SoundsList.HIT = "hit";
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

    // Sound manager class
    var Sound = (function () {
        // The constructor
        function Sound() {
            this.background = createjs.Sound.play(SoundsList.BACKGROUND, createjs.Sound.INTERRUPT_NONE, 0, 0, -1, 1, 0);
            this.lavaInstance = createjs.Sound.createInstance(SoundsList.LAVA);
            this.lavaPopInstance = createjs.Sound.createInstance(SoundsList.LAVA_POP);
            this.waterInstance = createjs.Sound.createInstance(SoundsList.WATER);
            this.playerHitInstance = createjs.Sound.createInstance(SoundsList.HIT);
        }
        // Play a random walk sound whenever player's avatar is moving
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

        // Play sound when player is getting hit
        Sound.prototype.playerHit = function () {
            this.playerHitInstance.play(createjs.Sound.INTERRUPT_NONE, 0, 0, 0, 1, 0);
        };

        /*
        * Play a random "speak" sound for zombies at random intervals. This function also calculates
        * the relative distance from the player, and calculates volume and pan accordingly.
        */
        Sound.prototype.zombieSpeak = function (zombie, player) {
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
        };

        /*
        * Play a random "hurt" sound for zombies when they get hit by the player. This function also
        * calculates the relative distance from the player, and calculates volume and pan accordingly.
        */
        Sound.prototype.zombieHurt = function (zombie, player) {
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
        };

        /*
        * Play a random "hurt" sound for zombies when they get hit by the player. This function also
        * calculates the relative distance from the player, and calculates volume and pan accordingly.
        */
        Sound.prototype.zombieDeath = function (zombie, player) {
            var distance, volume, pan;
            var halfScreenWidth = stage.canvas.width / 2;

            distance = zombie.mapX - player.mapX;
            pan = distance / halfScreenWidth;
            volume = Math.abs(pan) * 0.8;
            this.zombieSpeakInstance = createjs.Sound.play(SoundsList.ZOMBIE_DEATH, createjs.Sound.INTERRUPT_NONE, 0, 0, 0, volume, pan);
        };

        /*
        * This function checks if there are any lava or water blocks near the player. If there are, then it plays
        * water and/or lava sounds. This function also calculates the relative distance to calculate panning
        * and volume of the sounds.
        */
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

                // If lava is nearby, set lava flag
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
                    // If water is nearby, set water flag
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

            // If lava blocks were found, play lava sounds
            if (lavaFound) {
                if (this.lavaInstance.playState !== createjs.Sound.PLAY_SUCCEEDED) {
                    this.lavaInstance.play(createjs.Sound.INTERRUPT_NONE, 0, 0, 0, volume, pan);
                }
                if (Math.floor(Math.random() * 60) === 0) {
                    this.lavaPopInstance.play(createjs.Sound.INTERRUPT_NONE, 0, 0, 0, volume, pan);
                }
            }

            // If water blocks were found, play water sounds
            if (waterFound) {
                if (this.waterInstance.playState !== createjs.Sound.PLAY_SUCCEEDED) {
                    this.waterInstance.play(createjs.Sound.INTERRUPT_NONE, 0, 0, 0, volume, pan);
                }
            }
        };
        return Sound;
    })();
    Managers.Sound = Sound;
})(Managers || (Managers = {}));
//# sourceMappingURL=Sound.js.map
