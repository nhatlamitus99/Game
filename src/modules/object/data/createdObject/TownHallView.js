

var TownHallView = cc.Sprite.extend({

    _numFlame: 7,

    ctor: function(level, view) {
        this._super();
        view.initWithFile("content/Art/Buildings/townhall/TOW_1_"+ level +"/idle/image0000.png");
        this.x = view.width / 2;
        this.y = view.height / 2;

        //var animation = new cc.Animation();
        //for (var i = 0; i < 7; i++) {
        //    var frameName = "content/Art/Effects/towhall_flame/0"+ i +".png";
        //    animation.addSpriteFrameWithFile(frameName);
        //}
        //animation.setDelayPerUnit(0.1);
        //animation.setRestoreOriginalFrame(true);
        //
        //var action = cc.animate(animation);
        //view.addChild(this);
        //this.runAction((action).repeatForever());




    }


});