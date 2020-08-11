var Item = cc.Class.extend({
    itemBackground: null,
    _ratioX: 1,
    _ratioY: 1,
    _state: 0,
    _resources: [],
    levelTownHall: 0,
    countBuilt: 0,
    available: 0,
    textColor: cc.color(255, 255, 255),
    maxBuilt: 0,
    requireLevel: 1,
    ctor: function (name, id, infoSource, ratioX, ratioY) {
        this._ratioX = ratioX;
        this._ratioY = ratioY;

        // Read info from JSON
        var info = cc.loader.getRes(infoSource);
        var townhall = cc.loader.getRes(itemInfo_resources.TOW);

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
        
        // Add title name
        var name = new cc.LabelBMFont(name, "fonts/soji_16.fnt");
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
            built.x = this.itemBackground.width - built.width;
            built.y = this.itemBackground.height * 0.3;
            built.scale *= this._ratioX;
            built.scale *= this._ratioY;
            this.itemBackground.addChild(built);
        }
        else {
            var noti = new cc.LabelBMFont("Require town hall level " + this.requireLevel, "fonts/soji_16.fnt");
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
    convertTimeToString: function(value) {
        if (value == undefined)
            return "0s";
        var time = ["d", "h", "m", "s"];
        var timeValue = [0, 0, 0, 0];
        for (var i = time.length - 1; i >= 0; --i) {
            timeValue[i] = value % 60;
            value = value / 60;
            value = Math.floor(value);
        }
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

        this.levelTownHall = 5;
        this.countBuilt = 2;
        if (id == "BDH_1")
            this.maxBuilt = 5;
        else
            this.maxBuilt = townhall["TOW_1"]["" + this.levelTownHall][id];
    },
    checkResources: function (info, id) {
        if (id == "BDH_1") {
            if (this._resources[2] < info[id]["" + (this.countBuilt + 1)]["coin"]) {
                this.textColor = cc.color(255, 0, 0);
                }
            else
                this.textColor = cc.color(255, 255, 255);
        }
        else {
            if (info[id]["1"]["gold"] != undefined && info[id]["1"]["gold"] > 0) {
                if (this._resources[0] < info[id]["1"]["gold"])
                    this.textColor = cc.color(255, 0, 0);
                else
                    this.textColor = cc.color(255, 255, 255);
            }
            else if (info[id]["1"]["elixir"] != undefined && info[id]["1"]["elixir"] > 0) {
                if (this._resources[1] < info[id]["1"]["elixir"])
                    this.textColor = cc.color(255, 0, 0);
                else
                    this.textcolor = cc.color(255, 255, 255);
            }
        }
    },
    checkLevelTownHall: function (townhall, id) {
        if (this.maxBuilt <= this.countBuilt) {
            this._state = 1;
        }
        if (id != "BDH_1") {
            for (var i = 1; i <= 15; ++i) {
                if (townhall["TOW_1"]["" + i][id] != 0) {
                    this.requireLevel = i;
                    //cc.log(id + "  " + townhall["TOW_1"]["" + i][id]);
                    break;
                }
            }
        }
    }
});