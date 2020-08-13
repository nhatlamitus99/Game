

var BarrackView = cc.Sprite.extend({

    ctor: function(level, map) {
        this._super();
        this.initWithFile("content/Art/Buildings/barrack/BAR_1_" + level + "/idle/image0000.png");
    }

})