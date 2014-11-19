module Managers {
    export class SoundsList {
        static WALK1: string = "stone1";
        static WALK2: string = "stone2";
        static BACKGROUND: string = "piano3";
        static LAVA: string = "lava";
        static LAVA_POP: string = "lavapop";
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

        constructor() {
            this.background = createjs.Sound.play(SoundsList.BACKGROUND, createjs.Sound.INTERRUPT_NONE, 0, 0, -1, 1, 0);
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

        update(player: GameObjects.Player) {
        }
    }
}