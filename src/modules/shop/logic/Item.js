var Item = cc.Class.extend({
    ctor: function (id, ratioX, ratioY) {
        this._ratioX = ratioX;
        this._ratioY = ratioY;
        this.id = id;

        this.itemBackground = null;
        this._state = 0;
        this._resources = [];
        this.levelTownHall = 0;
        this.countBuilt = 0;
        this.available = 0;
        this.textColor = cc.color(255, 255, 255);
        this.maxBuilt = 0;
        this.requireLevel = 1;
        this.id = 0;
        this.available = true;
        this.need = 0;

        // Read info from JSON
        var info = CONFIG_DATA.file[id[0] + id[1] + id[2]]; 
        var townhall = CONFIG_DATA.file.TOW;//cc.loader.getRes(itemInfo_resources.TOW);

        this.loadUserInfo(townhall, id);

        this.checkLevelTownHall(townhall, id);
        this.checkResources(info, id);

        //cc.log("state: " + this._state + " -------max build: " + this.maxBuilt + "--------" + "count build: " + this.countBuilt + "-------requireLevel:" + this.requireLevel);

        // Add slot item background
        this.itemBackground = new cc.Scale9Sprite(shop_resources.SLOT);
        this.itemBackground.setState(this._state);
        this.itemBackground.width *= this._ratioX;
        this.itemBackground.height *= this._ratioY;

        // Add aura background
        var item_bg = new cc.Scale9Sprite(shop_resources.ITEM_BACKGROUND);
        item_bg.x = this.itemBackground.width / 2;
        item_bg.y = this.itemBackground.height / 2;
        item_bg.setState(this._state);
        //item_bg.scale = Math.max(this._ratioY, this._ratioY);
        this.itemBackground.addChild(item_bg, 1)

        // Add main image
        var mainImage = new cc.Scale9Sprite("content/Art/GUIs/icons/shop_gui/icon/" + id + ".png");
        mainImage.x = this.itemBackground.width / 2;
        mainImage.y = this.itemBackground.height / 2;
        mainImage.setState(this._state);
        //mainImage.setColor(cc.color(105, 105, 105))
        //mainImage.scale = Math.max(this._ratioX, this._ratioY);
        this.itemBackground.addChild(mainImage, 2);

        // Add info button
        var infoBtn = gv.lobbyButton(shop_resources.ICON_INFO, 1, 1);
        infoBtn.x = this.itemBackground.width - infoBtn.width / 2 - 15;
        infoBtn.y = this.itemBackground.height - infoBtn.height / 2 - 15;
        this.itemBackground.addChild(infoBtn, 1);
        infoBtn.addClickEventListener(this.onInfoClick.bind(this, id));

        // Add title name
        var name = new cc.LabelBMFont(OBJECT_MGR_CONFIG.getNameByID[id], "fonts/soji_16.fnt");
        name.x = this.itemBackground.width / 2;
        name.y = this.itemBackground.height * 90 / 100;
        name.scale *= this._ratioX;
        name.scale *= this._ratioY;
        // name.setState(this._state);
        this.itemBackground.addChild(name);
        if (this.requireLevel <= this.levelTownHall) {
            // Add time icon
            var timeIcon = new cc.Scale9Sprite(shop_resources.TIME_ICON);
            timeIcon.x = this.itemBackground.width / 7;
            timeIcon.y = this.itemBackground.height * 0.3;
            timeIcon.scale *= Math.max(this._ratioX, this._ratioY);
            timeIcon.setState(this._state);
            this.itemBackground.addChild(timeIcon);

            // Time 
            var time;
            if (id != "BDH_1") {
                time = new cc.LabelBMFont(this.convertTimeToString(info[id]["1"]["buildTime"]), "fonts/soji_16.fnt");
            }
            else {
                time = new cc.LabelBMFont("0s", "fonts/soji_16.fnt");
            }
            time.x = timeIcon.x + timeIcon.width / 2 + time.width / 2;
            time.y = timeIcon.y;
            time.scale *= this._ratioX;
            time.scale *= this._ratioY;
            this.itemBackground.addChild(time);
            //timeIcon.setColor(cc.color(105, 105, 105));

            // Current built  countBuilt + "/" + townhall[levelTownHall][id]
            var built;
            if (id != "BDH_1") {
                built = new cc.LabelBMFont(this.countBuilt + "/" + this.maxBuilt, "fonts/soji_16.fnt");
            }
            else {
                built = new cc.LabelBMFont(this.countBuilt + "/" + 5, "fonts/soji_16.fnt");
            }
            built.x = this.itemBackground.width - built.width / 2 - 15;
            built.y = this.itemBackground.height * 0.3;
            built.scale *= this._ratioX;
            built.scale *= this._ratioY;
            this.itemBackground.addChild(built);
        }
        else {
            var noti = new cc.LabelBMFont("Require town hall level " + this.requireLevel, "fonts/soji_12.fnt");
            noti.x = this.itemBackground.width / 2;
            noti.y = this.itemBackground.height * 0.3;

            noti.setColor(cc.color(255, 0, 0));
            this.itemBackground.addChild(noti);
        }

        // Add Price
        var price, type = "";
        if (id != "BDH_1") {
            if (info[id]["1"]["gold"] != undefined && info[id]["1"]["gold"] > 0) {
                type = shop_resources.ICON_GOLD;
                price = info[id]["1"]["gold"];
            }
            else if (info[id]["1"]["elixir"] != undefined && info[id]["1"]["elixir"] > 0) {
                type = shop_resources.ICON_ELIXIR;
                price = info[id]["1"]["elixir"];
            }
        }
        else {
            type = shop_resources.ICON_G;
            price = info[id]["" + (this.countBuilt + 1)]["coin"];
        }
        price = new cc.LabelBMFont(formatIntToString(price), "fonts/soji_16.fnt");
        price.x = this.itemBackground.width / 2;
        price.y = this.itemBackground.height / 10 + 3;
        price.setColor(this.textColor);
        this.itemBackground.addChild(price);

        var icon = new cc.Scale9Sprite(type);
        icon.x = price.width + icon.width / 2;
        icon.y = price.height / 2;
        icon.setState(this._state);
        price.addChild(icon);

    },
    convertTimeToString: function (value) {
        if (value == undefined || value == 0)
            return "0s";
        var time = ["d", "h", "m", "s"];
        var timeValue = [0, 0, 0, 0];
        for (var i = time.length - 1; i >= 2; --i) {
            timeValue[i] = value % 60;
            value = (value - value % 60) / 60;
        }
        timeValue[1] = value;
        timeValue[0] = (timeValue[1] - timeValue[1] % 24) / 24;
        timeValue[1] %= 24;
        var res = "";
        for (var i = 0; i < time.length; ++i) {
            if (timeValue[i] != 0)
                res += timeValue[i] + time[i];
        }
        if (timeValue[2] != 0 && timeValue[3] == 0)
            res += "0s";
        return res;

    },
    loadUserInfo: function (townhall, id) {
        this._resources = ResourcesData.getInstance()._resources;
        var listObject = ObjectMgrData.getInstance().getListObject();

        this.levelTownHall = listObject[OBJECT_MGR_CONFIG.buildingType.TOW_1][0].level;
        this.countBuilt = 0;
        for (var i = 0; i < listObject.length; ++i) {
            for (var j = 0; j < listObject[i].length; ++j) {
                if (listObject[i][j].code == id) {
                    this.countBuilt += 1;
                }
            }
        }
        if (id == "BDH_1")
            this.maxBuilt = 5;
        else
            this.maxBuilt = townhall["TOW_1"]["" + this.levelTownHall][id];
    },
    checkResources: function (info, id) {
        if (id == "BDH_1") {
            if (this._resources[2] < info[id]["" + (this.countBuilt + 1)]["coin"]) {
                this.textColor = cc.color(255, 0, 0);
                this.need = info[id]["" + (this.countBuilt + 1)]["coin"] - this._resources[2]
                }
            else
                this.textColor = cc.color(255, 255, 255);
        }
        else {
            if (info[id]["1"]["gold"] != undefined && info[id]["1"]["gold"] > 0) {
                if (this._resources[0] < info[id]["1"]["gold"]) {
                    this.textColor = cc.color(255, 0, 0);
                    this.need = info[id]["1"]["gold"] - this._resources[0]
                }
                else
                    this.textColor = cc.color(255, 255, 255);
            }
            else if (info[id]["1"]["elixir"] != undefined && info[id]["1"]["elixir"] > 0) {
                if (this._resources[1] < info[id]["1"]["elixir"]) {
                    this.textColor = cc.color(255, 0, 0);
                    this.need = info[id]["1"]["elixir"] - this._resources[1]
                }
                else
                    this.textcolor = cc.color(255, 255, 255);
            }
        }
    },
    checkLevelTownHall: function (townhall, id) {
        if (this.maxBuilt <= this.countBuilt) {
            this._state = 1;
            this.available = false;
        }
        if (id != "BDH_1") {
            for (var i = 1; i <= 11; ++i) {
                if (townhall["TOW_1"]["" + i][id] != 0) {
                    this.requireLevel = i;
                    //cc.log(id + "  " + townhall["TOW_1"]["" + i][id]);
                    break;
                }
            }
        }
    },
    isAvailable: function () {
        return this.available;
    },
    getNeed: function () {
        return this.need;
    },
    onInfoClick: function (id) {
        cc.log(id);
    }
});