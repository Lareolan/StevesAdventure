﻿var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var GameObjects;
(function (GameObjects) {
    // Sky Class
    var Sky = (function (_super) {
        __extends(Sky, _super);
        function Sky() {
            _super.call(this, "sky");
            this.name = "Sky";
        }
        return Sky;
    })(GameObjects.BitmapObject);
    GameObjects.Sky = Sky;
})(GameObjects || (GameObjects = {}));
//# sourceMappingURL=Sky.js.map
