

var ProgressBar = cc.Sprite.extend({
    _type: 0,
    _id: 0,
    _bar: null,
    _bg: null,
    _resTime: null,
    _distance: 0,
    _listSprite: [],
    _attributes: null,


    ctor: function(attributes, list) {
        this._super();
        this._listSprite = list;
        this._attributes = attributes;
        this.type = attributes.type;
        this._time = 5;
        var fixLocation = 15;
        var scale = 4;
        var cellX = MapConfig.getCellSize().w / scale;
        var cellY = MapConfig.getCellSize().h / scale;
        this._distance = Math.sqrt(cellX*cellX + cellY*cellY) * attributes.size.w/2;

        cc.log("Progress Bar");

        this._resTime = new cc.LabelBMFont("0", font_resources.SOJI_16_NON);

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
    },

    doLoadingBar:function(){
        cc.log("Schedule_______________");
        cc.log(this._time);

        var percent = this._bar.getPercent();
        this._time -= 1;
        this._resTime.setString(this._time + "s");
        percent = percent + 1;
        this._bar.setPercent(percent);
        if(this._time < 0){
            this.unschedule(this.doLoadingBar);
            this._bar.removeFromParent();
            this._bg.removeFromParent();
            this.doUpgrade();
        }
    },

    doUpgrade: function() {
        cc.log("Upgrade_______________");
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


    getType: function() {
        cc.log("type progressbar:", this._type);
        return this._type;
    }


})