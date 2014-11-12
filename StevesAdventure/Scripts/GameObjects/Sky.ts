module GameObjects {
    // Sky Class
    export class Sky extends GameObjects.BitmapObject {
        name: string = "Sky";

        constructor() {
            super("sky");
        }
    }
} 