module GameObjects {
    export class Entity {
        sprites: Array<createjs.Sprite>;
        sprite: createjs.Sprite;
        spriteID: string;
        spriteNames: Array<string> = [
            "steveStandRight",
            "steveStepRight",
            "steveStandRightAttack",
            "steveStepRightAttack",
            "steveStandLeft",
            "steveStepLeft",
            "steveStandLeftAttack",
            "steveStepLeftAttack"
        ];
        canvasX: number;
        canvasY: number;
        mapX: number;
        mapY: number;
        height: number;
        width: number;
        facing: number;
        facingChanged: boolean;
        spriteUpdate: boolean;
        jumping: boolean;
        jumpedFrom: number;
        falling: boolean;
        mapData: GameObjects.Layer;
        health: number;
        runDistance: number;
        attackFlag: boolean;
        attackCounter: number;

        constructor() {
            var $mapData = $(Managers.Assets.loader.getResult("Level1Map"));
        }
    }
} 