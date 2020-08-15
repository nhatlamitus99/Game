var ObjectInfo = cc.Layer.extend({
    ctor: function (id, level, value, description = "Nothing to show ...") {
        this._super();
        this.infoBackground = null;
        this.ratioX = 1;
        this.ratioY = 1;
        this.createInfoGUI(id, level, value, description);
        this.animatePopUpGUI();
    },
    animatePopUpGUI: function () {
        this.infoBackground.runAction(cc.sequence(
            cc.scaleTo(0, 0.8),
            cc.scaleTo(0.2, 1.05),
            cc.scaleTo(0.095, 1)
        ));

    },
    show: function () {
        //this.animatePopUpGUI();
    },
    createInfoGUI: function (id, level, value, description) {
        cc.log(id);
        cc.log(level);
        cc.log(value);
        // Create background
        this.infoBackground = new cc.Scale9Sprite(GUIInfo_resources.BACKGROUND);
        this.infoBackground.x = cc.winSize.width / 2;
        this.infoBackground.y = cc.winSize.height / 2;

        var ratio = cc.winSize.width / cc.winSize.height;
        var standardRatio = 960 / 640;
        var width = 0, height = 0;
        if (ratio > standardRatio) {
            height = Math.min(560, cc.winSize.height);
            width = height * standardRatio;
        }
        else {
            width = Math.min(800, cc.winSize.width);
            height = width * 1 / standardRatio;
        }

        this.ratioX = width / 960;
        this.ratioY = height / 640;

        this.infoBackground.width = width;
        this.infoBackground.height = height;

        this.addChild(this.infoBackground);

        // Add title
        var title = new cc.LabelBMFont("", font_resources.SOJI_24_NON);
        title.setString(OBJECT_MGR_CONFIG.getNameByID[id] + " level " + level);
        title.x = this.infoBackground.width / 2;
        title.y = this.infoBackground.height - title.height / 2 - 5;
        this.infoBackground.addChild(title);

        // Add SpriteFrameCache
        var scale = 1;
        if (id == "BDH_1") {
            width = 2;
            height = 2;
            scale = 2.5;
        }
        else if (id == "TOW_1") {
            width = 4;
            height = 4;
            scale = 1.5;
        }
        else if (id == "AMC_1") {
            width = 5;
            height = 5;
            scale = 1.3;
        }
        else {
            width = 3;
            height = 3;
            scale = 2;
        }

        var attributes = {
            type: OBJECT_MGR_CONFIG.buildingType[id],
            level: level,
            size: { h: width, w: height }
        };
        var objectBackground = new Substructure(attributes);
        objectBackground.width *= scale;
        objectBackground.height *= scale;
        objectBackground.scale = scale;
        objectBackground.x = this.infoBackground.width * 18 / 100;;
        objectBackground.y = this.infoBackground.height * 70 / 100;


        var attributes = {
            type: OBJECT_MGR_CONFIG.buildingType[id],
            level: level
        };
        var object = new MapObjectView();
        object.initObject(attributes);
        object.x = objectBackground.width / 2;
        object.y = objectBackground.height / 2;
        objectBackground.addChild(object);

        this.infoBackground.addChild(objectBackground);

        //
        var list = OBJECT_MGR_CONFIG.detailedInfo[id];
        var iconList = [];
        var read = CONFIG_DATA.file[id[0] + id[1] + id[2]];
        for (var i = 0; i < list.length; ++i) {
            iconList.push(list[i].toUpperCase());
            if (iconList[i] == "CAPACITY") {
                if (id[0] + id[1] + id[2] == "BAR" || id[0] + id[1] + id[2] == "AMC") {
                    iconList[i] += "_TROOP";
                }
                else {
                    if (id[id.length - 1] == "1") {
                        iconList[i] += "_GOLD";
                    }
                    else if (id[id.length - 1] == "2") {
                        iconList[i] += "_ELIXIR";
                    }
                }
            }
            if (iconList[i] == "PRODUCTIVITY") {
                if (id[id.length - 1] == "1") {
                    iconList[i] += "_GOLD";
                }
                else if (id[id.length - 1] == "2") {
                    iconList[i] += "_ELIXIR";
                }
            }
        }

        var start = this.infoBackground.height * 4 / 5;
        
        for (var i = 0; i < list.length; ++i) {
            var resBar = this.createResBar(iconList[i], list[i], read[id][level][list[i]], value[list[i]]);
            resBar.x = this.infoBackground.width * 70 / 100;
            resBar.y = start;
            start -= 60;
            this.infoBackground.addChild(resBar);
        }

        // Add info button
        var closeBtn = gv.lobbyButton(GUIInfo_resources.BTN_CLOSE, 1, 1);
        closeBtn.x = this.infoBackground.width - closeBtn.width / 2 - 10;
        closeBtn.y = this.infoBackground.height - closeBtn.height / 2;
        this.infoBackground.addChild(closeBtn, 1);
        closeBtn.addClickEventListener(this.onCloseClick.bind(this));

    },
    createResBar: function (icon, title, max, value = null) {

        var infoBar = new cc.Scale9Sprite(GUIInfo_resources.INFO_BAR);
        infoBar.scale = 1.2;

        if (icon == "CAPACITYGOLD") {
            icon = "CAPACITY_GOLD";
        }
        if (icon == "CAPACITYELIXIR") {
            icon = "CAPACITY_ELIXIR";
        }
        var infoIcon = new cc.Scale9Sprite(GUIInfo_resources[icon]);
        infoIcon.x = -infoIcon.width/2;
        infoIcon.y = infoBar.height / 2;
        infoBar.addChild(infoIcon);

        var content;
        var infoBarBG = new ccui.LoadingBar(GUIInfo_resources.INFO_BAR_BG);
        infoBarBG.setDirection(ccui.LoadingBar.TYPE_LEFT);

        title = title[0].toUpperCase() + title.slice(1);
        if (title == "CapacityGold" || title == "CapacityElixir") {
            title = "Capacity";
        }
        if (title.slice(0, 6) == "Damage") {
            title = "Damage";
        }

        if (title == "Productivity") {
            title = "Productive rate";
        }
        if (icon != "HITPOINTS" && icon != "DAMAGEPERSHOT" && icon.slice(0, 12) != "PRODUCTIVITY") {
            content = new cc.LabelBMFont(title + ": " + formatIntToString(value) + "/" + formatIntToString(max), font_resources.SOJI_12_NON);
            infoBarBG.setPercent(Math.min(100, value * 100 / max));
        }
        else {
            
            content = new cc.LabelBMFont(title + ": " + formatIntToString(max), font_resources.SOJI_12_NON);
            infoBarBG.setPercent(100);
        }
        infoBarBG.x = infoBar.width / 2;
        infoBarBG.y = infoBar.height / 2;
        infoBar.addChild(infoBarBG);

        content.x = infoBar.width * 1 / 6 + content.width / 2;
        content.y = infoBar.height / 2 + 1;
        infoBar.addChild(content);

        return infoBar;
    },
    onCloseClick: function () {
        this.infoBackground.runAction(cc.sequence(
            cc.scaleTo(0.2, 1.1),
            cc.callFunc(this.closeInfoBackground.bind(this)),
            cc.scaleTo(0, 1)
        ));
        
    },
    closeInfoBackground: function (sender) {
        this.infoBackground.removeFromParent();
    }
});