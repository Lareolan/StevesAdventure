var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var GameObjects;
(function (GameObjects) {
    var Monster = (function (_super) {
        __extends(Monster, _super);
        function Monster(monster, foreground) {
            _super.call(this, monster, foreground);
        }
        return Monster;
    })(GameObjects.Entity);
    GameObjects.Monster = Monster;
})(GameObjects || (GameObjects = {}));
//# sourceMappingURL=Monster.js.map
