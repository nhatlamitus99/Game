

var WallView = cc.Sprite.extend({

    ctor: function(level, view) {
        this._super();
        view.initWithFile("content/Art/Buildings/wall/WAL_1_" + level + "/WAL_1_" + level + "/idle/image0000.png");
    }

});