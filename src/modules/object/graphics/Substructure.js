/**
 * Created by CPU12744-local on 8/9/2020.
 */
var Substructure = cc.Sprite.extend({
    _type: null,
    _id: null,
    _distance: null,
    _normalSubs: null,
    _greenSubs: null,
    _redSubs: null,
    _ground: null,
    _bar: null,
    _bg: null,
    _resTime: null,
    _listResTime: [],
    _pos: null,

    ctor: function(attributes) {
        this._super();
        this._type = attributes.type;
        this._id = attributes.id;
        // create subs
        var sizeSubs = attributes.size.h;
        var indexSubsPath = sizeSubs - 1;
        // normal Subs
        this._normalSubs = new cc.Node();
        this._pos = attributes.position;


        if (sizeSubs > 1) {

            if(attributes.type <= 13) {
                var subs = cc.Sprite(res.object_mgr.normal_substructures.subs[indexSubsPath]);
                this._normalSubs.addChild(subs, 0);
                var shadow = cc.Sprite(res.object_mgr.normal_substructures.shadow[indexSubsPath]);
                this._normalSubs.addChild(shadow, 1);
            }
            else{
                var subs = cc.Sprite(res.object_mgr.normal_obstacle.subs[indexSubsPath]);
                this._normalSubs.addChild(subs, 0);
            }
        }
        // create red green subs
        this._greenSubs = new cc.Sprite(res.object_mgr.green_substructures[indexSubsPath]);
        this._redSubs = new cc.Sprite(res.object_mgr.red_substructures[indexSubsPath]);



        this.addChild(this._normalSubs);
        this.addChild(this._greenSubs, 0);
        this.addChild(this._redSubs, 0);
        this._normalSubs.setVisible(true);
        this._greenSubs.setVisible(false);
        this._redSubs.setVisible(false);


    },

    createGround: function(attributes) {
        var fixLocation = 5;
        if(attributes.type < OBJECT_MGR_CONFIG.buildingType.BDH_1 || attributes.type == OBJECT_MGR_CONFIG.buildingType.TOW_1) {
            var path = "content/Art/Map/map_obj_bg/upgrading.png";
            this._ground = new cc.Sprite(path);
            var scale = 4;
            var cellX = MapConfig.getCellSize().w / scale;
            var cellY = MapConfig.getCellSize().h / scale;

            this._distance = Math.sqrt(cellX*cellX + cellY*cellY) * attributes.size.w/2;

            this._ground.y -= Math.floor(this._distance) - fixLocation;
            this.addChild(this._ground, 5);
        }
    },

    createProgressBar: function(attributes) {
        var fixLocation = 15;
        if(attributes.type < OBJECT_MGR_CONFIG.buildingType.BDH_1 || attributes.type == OBJECT_MGR_CONFIG.buildingType.TOW_1) {
            var barPath = "content/Art/GUIs/upgrade_building_gui/building_time_bar.png";
            var bgPath = "content/Art/GUIs/upgrade_building_gui/building_time_bg.png";

            this._bg = new cc.Sprite(bgPath);
            this._bar = new ccui.LoadingBar(barPath, 0);
            this._bar.setDirection(ccui.LoadingBar.TYPE_LEFT);

            this._bar.y += this._distance + fixLocation;
            this._bg.y += this._distance + fixLocation;

            this.schedule(this.doLoadingBar, 1);

            this.addChild(this._bg, 3);
            this.addChild(this._bar, 4);
        }
    },

    doLoadingBar:function(){
        var percent = this._bar.getPercent();
        var resPercent = 5 - percent;
        this._resTime = new cc.LabelBMFont(resPercent + "s", font_resources.SOJI_16_NON);
        this._resTime.y += this._distance + 35;
        this.addChild(this._resTime, 2);
        this._resTime.runAction(cc.sequence(
            cc.delayTime(1),
            cc.moveTo(0,cc.p(0,0)))
        );

        percent = percent + 1;
        this._bar.setPercent(percent);
        if(percent >= 5){
            this.unschedule(this.doLoadingBar);
            this._bar.removeFromParent();
            this._bg.removeFromParent();
            this._resTime.runAction(
                    cc.moveTo(0,cc.p(0,0))
            );

            // removeFromParent();
            //this.doEffectCompletely();

        }
    },

    doEffectCompletely: function() {
        var sprite = new cc.Sprite();
        var numEffect = 7;
        var animationFlame = new cc.Animation();
        for (var i = 0; i < numEffect; i++) {
            var frameName = "content/Art/Effects/construct_levelup/0" + i + ".png";
            animationFlame.addSpriteFrameWithFile(frameName);
        }
        animationFlame.setDelayPerUnit(0.1);
        animationFlame.setRestoreOriginalFrame(true);
        var actionFlame = cc.animate(animationFlame);
        sprite.runAction(actionFlame);
        sprite.x = this._pos.x;
        sprite.y = this._pos.y;
        this.addChild(sprite);
    },

    getType: function(){
        return this._type;
    },
    getID: function(){
        return this._id;
    },
    setGreenState: function () {
        this._greenSubs.setVisible(true);
        this._redSubs.setVisible(false);
        this._normalSubs.setVisible(false);
    },
    setRedState: function () {
        this._greenSubs.setVisible(false);
        this._redSubs.setVisible(true);
        this._normalSubs.setVisible(false);
    },
    setNormalState: function() {
        this._greenSubs.setVisible(false);
        this._redSubs.setVisible(false);
        this._normalSubs.setVisible(true);

    },
    isInMovingState: function() {
        return !this._normalSubs.isVisible();
    }
});