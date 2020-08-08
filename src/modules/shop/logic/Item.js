var Item = cc.Class.extend({
    itemBackground: null,
    _ratioX: 1,
    _ratioY: 1,
    ctor: function (name, imageSource, listInfo, ratioX, ratioY) {
        this._ratioX = ratioX;
        this._ratioY = ratioY;

        // Add slot item background
        this.itemBackground = new cc.Scale9Sprite(shop_resources.SLOT);
        this.itemBackground.width *= this._ratioX;
        this.itemBackground.height *= this._ratioY;

        // Add aura background
        var item_bg = new cc.Scale9Sprite(shop_resources.ITEM_BACKGROUND);
        item_bg.x = this.itemBackground.width / 2;
        item_bg.y = this.itemBackground.height / 2;
        //item_bg.scale = Math.max(this._ratioY, this._ratioY);
        this.itemBackground.addChild(item_bg, 1)

        // Add main image
        var mainImage = new cc.Scale9Sprite(imageSource);
        mainImage.x = this.itemBackground.width / 2;
        mainImage.y = this.itemBackground.height / 2;
        //mainImage.scale = Math.max(this._ratioX, this._ratioY);
        this.itemBackground.addChild(mainImage, 2);

        // Add title name
        var name = new cc.LabelBMFont(name, "fonts/soji_16.fnt");
        name.x = this.itemBackground.width / 2;
        name.y = this.itemBackground.height * 90 / 100;
        name.scale *= this._ratioX;
        name.scale *= this._ratioY;
        this.itemBackground.addChild(name);

        // Add time icon
        var timeIcon = new cc.Scale9Sprite(shop_resources.TIME_ICON);
        timeIcon.x = this.itemBackground.width / 7;
        timeIcon.y = this.itemBackground.height * 0.3;
        timeIcon.scale *= Math.max(this._ratioX, this._ratioY);
        this.itemBackground.addChild(timeIcon);
    },
    loadInfo: function () {

    },
    checkResources: function () {

    },
    checkLevelTownHall: function () {

    }
});