

var ClanCastleView = cc.Sprite.extend({

    ctor: function(level, view) {
        this._super();
        view.initWithFile("content/Art/Buildings/clan_castle/CLC_1_" + level + "/idle/image0000.png");
    }

});