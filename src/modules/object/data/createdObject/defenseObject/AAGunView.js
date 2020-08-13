



var AAGunView = cc.Sprite.extend({

    ctor: function(level, pos, view) {
        this._super();
        view.initWithFile("content/Art/Buildings/air_defense/DEF_5_" + level + "/DEF_5_" + level + "/idle/image0000.png");
    }

})