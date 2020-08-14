


var TrebuchetView = cc.Sprite.extend({


    _numFrame: 5,

    ctor: function(level, view) {
        this._super();

        this.x = view.width * 0.55;
        this.y = view.height * 0.5;

        var animation = new cc.Animation();
        for (var i = 0; i < this._numFrame; i++) {
            var frameName = "content/Art/Buildings/Motar/DEF_3_" + level + "/DEF_3_" + level+"/idle/image000"+ i +".png";
            animation.addSpriteFrameWithFile(frameName);
        }
        animation.setDelayPerUnit(30);
        animation.setRestoreOriginalFrame(true);

        var action = cc.animate(animation);
        view.addChild(this);
        this.runAction((action).repeatForever());



    }

})