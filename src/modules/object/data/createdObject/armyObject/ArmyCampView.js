
var ArmyCampView = cc.Sprite.extend({

    ctor: function(level, map) {
        this._super();
        map.initWithFile("content/Art/Buildings/army camp/AMC_1_" + level + "/idle/image0000.png");
    }

})