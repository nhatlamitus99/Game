
var ArmyCampView = cc.Sprite.extend({

    _numAttack: 4,

    ctor: function(level, view) {
        this._super();
        view.initWithFile("content/Art/Buildings/army camp/AMC_1_" + level + "/idle/image0000.png");
        view.addChild(this);
        this.x = view.width * 0.5;
        this.y = view.height * 0.63;

        if(level == 1) {
            var animationFlame = new cc.Animation();
            for (var i = 0; i < this._numAttack; i++) {
                var frameName = "content/Art/Effects/armycam_1/0"+ i +".png";
                animationFlame.addSpriteFrameWithFile(frameName);
            }
            animationFlame.setDelayPerUnit(0.1);
            animationFlame.setRestoreOriginalFrame(true);
            var actionFlame = cc.animate(animationFlame);
            this.runAction((actionFlame).repeatForever());

        }
        else{
            var animationSmoke = new cc.Animation();
            for (var i = 0; i < this._numAttack; i++) {
                var frameName = "content/Art/Effects/armycam_2/0"+ i +".png";
                animationSmoke.addSpriteFrameWithFile(frameName);
            }
            animationSmoke.setDelayPerUnit(0.1);
            animationSmoke.setRestoreOriginalFrame(true);
            var actionSmoke = cc.animate(animationSmoke);
            this.runAction((actionSmoke).repeatForever());

        }
        //this.buildObject(view);
    },

    //buildObject: function(view) {
    //    var path = "content/Art/Map/map_obj_bg/upgrading.png";
    //    var ground = new cc.Sprite(path);
    //    ground.x = view.width / 2;
    //    ground.y = 25;
    //    view.addChild(ground);
    //    ground.runAction(cc.ScaleTo(0, 2, 2, 2));
    //
    //
    //
    //},

    upgradeObject: function(attributes) {

    }

})