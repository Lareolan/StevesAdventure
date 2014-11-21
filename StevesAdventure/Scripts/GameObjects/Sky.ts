module GameObjects {
    // Sky Class
    export class Sky extends GameObjects.BitmapObject {
        name: string = "Sky";

        constructor() {
            super("sky", 0);
        }

        show(): void {
            stage.addChild(this.image);
        }

        hide(): void {
            stage.removeChild(this.image);
        }
    }
} 