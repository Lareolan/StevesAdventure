var Managers;
(function (Managers) {
    var GUI = (function () {
        function GUI(player) {
            this.player = player;

            this.gameScreen = new GameObjects.GUIGameScreen(player);
        }
        GUI.prototype.update = function () {
            this.gameScreen.update();
        };
        return GUI;
    })();
    Managers.GUI = GUI;
})(Managers || (Managers = {}));
//# sourceMappingURL=GUI.js.map
