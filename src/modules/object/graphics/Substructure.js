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
    _listResTime: [],
    _pos: null,
    _flag: false,
    _listSprite: [],
    _attributes: null,

    ctor: function(attributes, list) {
        this._super();
        this._attributes = attributes;
        this._listSprite = list;
        this._time = 3;
        this._type = attributes.type;
        this._id = attributes.id;
        this._resTime = new cc.LabelBMFont("0", font_resources.SOJI_16_NON);

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

    createGround: function() {
        var fixLocation = 5;
        if(this._attributes.type < OBJECT_MGR_CONFIG.buildingType.BDH_1 || this._attributes.type == OBJECT_MGR_CONFIG.buildingType.TOW_1) {
            var path = "content/Art/Map/map_obj_bg/upgrading.png";
            this._ground = new cc.Sprite(path);
            var scale = 4;
            var cellX = MapConfig.getCellSize().w / scale;
            var cellY = MapConfig.getCellSize().h / scale;

            this._distance = Math.sqrt(cellX*cellX + cellY*cellY) * this._attributes.size.w/2;

            this._ground.y -= Math.floor(this._distance) - fixLocation;
            this.addChild(this._ground, 5);
        }
    },

    createProgressBar: function() {

        var fixLocation = 15;
        if(this._attributes.type < OBJECT_MGR_CONFIG.buildingType.BDH_1 || this._attributes.type == OBJECT_MGR_CONFIG.buildingType.TOW_1) {
            var barPath = "content/Art/GUIs/upgrade_building_gui/building_time_bar.png";
            var bgPath = "content/Art/GUIs/upgrade_building_gui/building_time_bg.png";

            this._bg = new cc.Sprite(bgPath);
            this._bar = new ccui.LoadingBar(barPath, 0);
            this._bar.setDirection(ccui.LoadingBar.TYPE_LEFT);

            this._bar.y += this._distance + fixLocation;
            this._bg.y += this._distance + fixLocation;

            this.schedule(this.doLoadingBar, 1);

            this._resTime.y = this._bar.height + this._resTime.height / 2;
            this._resTime.x = this._bar.width / 2;
            this._bar.addChild(this._resTime);
            this.addChild(this._bg, 3);
            this.addChild(this._bar, 4);


        }
    },

    doLoadingBar:function(){

        cc.log("schedule", this._time);
        var percent = this._bar.getPercent();
        this._time -= 1;
        this._resTime.setString(this._time + "s");
        percent = percent + 1;
        this._bar.setPercent(percent);
        if(this._time < 0){
            this.unschedule(this.doLoadingBar);
            this._bar.removeFromParent();
            this._bg.removeFromParent();

            this.doEffectCompletely();
            this.doEffectUpgrade();

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
        animationFlame.setDelayPerUnit(0.3);
        animationFlame.setRestoreOriginalFrame(true);
        var actionFlame = cc.animate(animationFlame);
        sprite.x = 0;
        sprite.y = 50;
        this.addChild(sprite, 1);
        sprite.runAction(actionFlame);

    },

    doEffectUpgrade: function() {

        for(var i = 0; i < this._listSprite.length; i++) {
            if(this._attributes.type == this._listSprite[i]._type && this._attributes.id == this._listSprite[i]._id) {
                this._listSprite[i]._level++;
                this.loadTexture(i);
            }
        }
        this._attributes.level++;

    },

    loadTexture: function(pos) {

        cc.log(this._listSprite[pos]._level);

        var config = OBJECT_TYPE_CONFIG.buildingType;
        var type = OBJECT_MGR_CONFIG.getCodeByType;
        var path = OBJECT_MGR_CONFIG.buildingType;


        switch (this._listSprite[pos]._type) {
            case path.AMC_1:
                this._listSprite[pos].setTexture("content/Art/Buildings/"+ config.AMC_1 +"/" + type[path.AMC_1] + "_" + this._listSprite[pos]._level + "/idle/image0000.png");
                break;
            case path.BAR_1:
                this._listSprite[pos].setTexture("content/Art/Buildings/"+ config.BAR_1 +"/" + type[path.BAR_1] + "_" + this._listSprite[pos]._level + "/idle/image0000.png");
                break;
            case path.BDH_1:
                this._listSprite[pos].setTexture("content/Art/Buildings/"+ config.BDH_1 +"/" + type[path.BDH_1] + "_" + this._listSprite[pos]._level + "/idle/image0000.png");
                break;
            case path.CLC_1:
                this._listSprite[pos].setTexture("content/Art/Buildings/"+ config.CLC_1 +"/" + type[path.CLC_1] + "_" + this._listSprite[pos]._level + "/idle/image0000.png");
                break;
            case path.DEF_1:
                this._listSprite[pos].setTexture("content/Art/Buildings/"+ config.DEF_1 +"/" + type[path.DEF_1] + "_" + this._listSprite[pos]._level + "/idle/image0000.png");
                break;
            case path.DEF_2:
                this._listSprite[pos].setTexture("content/Art/Buildings/"+ config.DEF_2 +"/" + type[path.DEF_2] + "_" + this._listSprite[pos]._level + "/idle/image0000.png");
                break;
            case path.DEF_3:
                this._listSprite[pos].setTexture("content/Art/Buildings/"+ config.DEF_3 +"/" + type[path.DEF_3] + "_" + this._listSprite[pos]._level + "/idle/image0000.png");
                break;
            case path.DEF_5:
                this._listSprite[pos].setTexture("content/Art/Buildings/"+ config.DEF_5 +"/" + type[path.DEF_5] + "_" + this._listSprite[pos]._level + "/idle/image0000.png");
                break;
            case path.RES_1:
                this._listSprite[pos].setTexture("content/Art/Buildings/"+ config.RES_1 +"/" + type[path.RES_1] + "_" + this._listSprite[pos]._level + "/idle/image0000.png");
                break;
            case path.RES_2:
                this._listSprite[pos].setTexture("content/Art/Buildings/"+ config.RES_2 +"/" + type[path.RES_2] + "_" + this._listSprite[pos]._level + "/idle/image0000.png");
                break;
            case path.STO_1:
                this._listSprite[pos].setTexture("content/Art/Buildings/"+ config.STO_1 +"/" + type[path.STO_1] + "_" + this._listSprite[pos]._level + "/idle/image0000.png");
                break;
            case path.STO_2:
                this._listSprite[pos].setTexture("content/Art/Buildings/"+ config.STO_2 +"/" + type[path.STO_2] + "_" + this._listSprite[pos]._level + "/idle/image0000.png");
                break;
            case path.TOW_1:
                this._listSprite[pos].setTexture("content/Art/Buildings/"+ config.TOW_1 +"/" + type[path.TOW_1] + "_" + this._listSprite[pos]._level + "/idle/image0000.png");
                break;
        }
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