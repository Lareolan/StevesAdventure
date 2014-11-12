var GameObjects;
(function (GameObjects) {
    // Layer Class
    var Layer = (function () {
        function Layer() {
        }
        Layer.prototype.fromXML = function ($layer) {
            this.name = $layer.attr("name");
            this.width = parseInt($layer.attr("width"));
            this.height = parseInt($layer.attr("height"));
            this.data = this.getData($layer.find("data:first"));
        };

        Layer.prototype.getData = function ($data) {
            var encoding = $data.attr("encoding");
            var compression = $data.attr("compression");
            var bytes = $.trim($data.text());

            if (encoding) {
                if (encoding == "base64") {
                    bytes = Base64Decode(bytes);
                }
            }

            if (compression) {
                if (compression == "zlib") {
                    bytes = new Zlib.Inflate(bytes).decompress();
                    return this.flipGlobalIDs(bytes);
                }
            }

            return null;
        };

        Layer.prototype.flipGlobalIDs = function (data) {
            var flippedGlobalIds = [];
            for (var n = 0; n < data.length; n += 4) {
                var flippedGlobalId = 0;
                flippedGlobalId += data[n + 0]; // << 0;
                flippedGlobalId += data[n + 1] << 8;
                flippedGlobalId += data[n + 2] << 16;
                flippedGlobalId += data[n + 3] << 24;
                flippedGlobalIds.push(flippedGlobalId);
            }
            return flippedGlobalIds;
        };
        return Layer;
    })();
    GameObjects.Layer = Layer;
})(GameObjects || (GameObjects = {}));
//# sourceMappingURL=Layer.js.map
