


var CanonView = cc.Sprite.extend({



    _numFrame: 5,
    _checkBaseLevel: 4,

    ctor: function(level, view) {
        this._super();

        view.initWithFile("content/Art/Buildings/defense_base/DEF_1_"+ level +"_Shadow.png");

        if(level == this._checkBaseLevel)
            this.x = view.width * 0.5;
        else
            this.x = view.width * 0.55;
        this.y = view.height * 0.5;

        var animation = new cc.Animation();
        for (var i = 0; i < this._numFrame; i++) {
            var frameName = "content/Art/Buildings/cannon/canon_" + level + "/idle/image000"+ i +".png";
            animation.addSpriteFrameWithFile(frameName);
        }
        animation.setDelayPerUnit(30);
        animation.setRestoreOriginalFrame(true);

        var action = cc.animate(animation);
        view.addChild(this, 10);
        this.runAction((action).repeatForever());



    }

})