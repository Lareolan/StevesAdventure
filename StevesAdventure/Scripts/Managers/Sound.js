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

        Sound.prototype.update = function (player) {
        };
        return Sound;
    })();
    Managers.Sound = Sound;
})(Managers || (Managers = {}));
//# sourceMappingURL=Sound.js.map
