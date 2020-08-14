



var AAGunView = cc.Sprite.extend({

    _numAttack: 25,
    _numFrame: 5,

    ctor: function(level, view) {
        this._super();
        view.initWithFile("content/Art/Buildings/air_defense/DEF_5_" + level + "/DEF_5_" + level + "/idle/image0000.png");
        this.x = view.width / 2;
        this.y = view.height / 2;

        var animation = new cc.Animation();
        for (var i = 0; i < this._numFrame; i++) {
            var frameName = "content/Art/Buildings/air_defense/DEF_5_" + level + "/DEF_5_" + level + "/idle/image000"+ i +".png";
            animation.addSpriteFrameWithFile(frameName);
        }
        animation.setDelayPerUnit(30);
        animation.setRestoreOriginalFrame(true);

        var action = cc.animate(animation);
        view.addChild(this, 10);
        this.runAction((action).repeatForever());



    }

})