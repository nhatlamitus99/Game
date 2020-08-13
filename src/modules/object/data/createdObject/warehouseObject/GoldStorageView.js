

var GoldStorageView = cc.Sprite.extend({

    ctor: function(level, map) {
        this._super();
        map.initWithFile("content/Art/Buildings/gold storage/STO_1_" + level + "/idle/image0000.png");
    }

});