


var CanonView = cc.Sprite.extend({

    ctor: function(level, pos, view) {
        this._super();
        view.initWithFile("content/Art/Buildings/cannon/canon_" + level + "/idle/image0000.png");
    }

})