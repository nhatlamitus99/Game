

var BarrackView = cc.Sprite.extend({

    _numAttack: 5,
    _levelEffect: 4,

    ctor: function(level, view) {
        this._super();
        view.initWithFile("content/Art/Buildings/barrack/BAR_1_" + level + "/idle/image0000.png");
        this.x = view.width / 2;
        this.y = view.height / 2;

        if(level < this._levelEffect)
            return;

        var animation = new cc.Animation();
        for (var i = 0; i < this._numAttack; i++) {
            var frameName = "content/Art/Effects/BAR_1_" + level + "_effect/0"+ i +".png";
            animation.addSpriteFrameWithFile(frameName);
        }
        animation.setDelayPerUnit(0.1);
        animation.setRestoreOriginalFrame(true);

        var action = cc.animate(animation);
        view.addChild(this, 10);
        this.runAction((action).repeatForever());




    }

})