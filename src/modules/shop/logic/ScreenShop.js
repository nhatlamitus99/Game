var ScreenShop = cc.Layer.extend({
    listCategories: null,
    listItemsName: null,
    zOrder: 0,
    scaleBackground: 0.9,
    scaleSlotBackground: 0.3,
    shopBackground: null,
    ratioX: 0,
    ratioY: 0,
    viewListResources: null,
    viewListArmy: null,
    viewListDefense: null,
    isViewing: false,
    itemInfo: null,
    ctor: function () {
        this._super();
        //var tmp = new ObjectInfo("DEF_1", 1, false);
        //this.addChild(tmp);
        
        //tmp.show();
        this.viewList = null;
        this.init();
        this.popUpShopGUI();
        this.show();
    },
    animatePopUpGUI: function () {
        this.shopBackground.runAction(cc.sequence(
            cc.scaleTo(0, 0.8),
            cc.scaleTo(0.2, 1.05),
            cc.scaleTo(0.095, 1)
        ));
    },
    show: function () {
        this.animatePopUpGUI();
        this.visible = true;
        this.shopBackground.visible = true;
    },
    init: function () {
        if (this.listCategories != null)
            return;
        this.viewList = new TableViewTestLayer(this);
        this.viewList.visible = false;
        this.addChild(this.viewList);

        this.listCategories = new Map();
        this.listItemsName = new Map();
        this.itemInfo = new Map();

        this.listCategories["Treasures"] = ["gold_10", "gold_50", "gold_100", "elixir_10", "elixir_50", "elixir_100"];
        
        this.listCategories["Resources"] = ["BDH_1", "RES_1", "RES_2", "STO_1", "STO_2"];
        //this.listItemsName["Resources"] = ["Builder hut", "Gold mine", "Elixir mine", "Gold storage", "Elixir storage"];
        //this.itemInfo["Resources"] = [itemInfo_resources.BDH, itemInfo_resources.RES, itemInfo_resources.RES, itemInfo_resources.STO, itemInfo_resources.STO];

        this.listCategories["Army"] = ["AMC_1", "BAR_1", "BAR_2", "LAB_1"];
        this.listItemsName["Army"] = ["Army camps", "Barrack", "X-men house", "Laboratory"];
        this.itemInfo["Army"] = [itemInfo_resources.AMC, itemInfo_resources.BAR, itemInfo_resources.BAR, itemInfo_resources.LAB];

        this.listCategories["Decorations"] = [];
        this.listItemsName["Decorations"] = [];

        this.listCategories["Defense"] = ["WAL_1", "DEF_1", "DEF_2", "DEF_3", "DEF_5", "DEF_4", "DEF_7", "DEF_8", "DEF_9", "DEF_12"];
        this.listItemsName["Defense"] = ["Wall", "Canon", "Archer tower", "Trebuchet", "A.A gun", "Wizard tower", "Bow machine", "Lightning tower", "Laser tower", "Dragon cannon"];
        this.itemInfo["Defense"] = [itemInfo_resources.WAL, itemInfo_resources.DEF, itemInfo_resources.DEF, itemInfo_resources.DEF, itemInfo_resources.DEF, itemInfo_resources.DEF, itemInfo_resources.DEF, itemInfo_resources.DEF, itemInfo_resources.DEF, itemInfo_resources.DEF];

        this.listCategories["Shield"] = [];

        /*listName = ["Treasures", "Resources", "Army", "Decorations", "Defense", "Shield"];
        for (var i = 0; i < listName.length; ++i) {
            this.listCategories.set(listName[i], []);
            this.loadListCategory(this.listCategories.get(listName[i]));
        }*/
    },
    loadListCategory: function (list) {

    },
    makeButton: function (Sprite, callBack) {
        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                if (this.visible == false || this.shopBackground.visible == false)
                    return false;
                
                var locationInNode = Sprite.convertToNodeSpace(touch.getLocation());
                var s = Sprite.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);

                if (cc.rectContainsPoint(rect, locationInNode)) {
                    Sprite.runAction(cc.scaleTo(0.1, 1.1));
                    return true;
                }
                return false;
            }.bind(this),
            onTouchEnded: function (touch, event) {
                var locationInNode = Sprite.convertToNodeSpace(touch.getLocation());
                var s = Sprite.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);

                Sprite.runAction(cc.scaleTo(0.1, 1));
                if (cc.rectContainsPoint(rect, locationInNode)) {
                    callBack();
                }
                return true;
            }
        });
        this.setUserObject(listener);
        cc.eventManager.addListener(listener, Sprite);
    }
    ,
    createCategoryImage: function (row, col, image, callBack, titleContent) {
        // Create background
        var categoryBackground = new cc.Scale9Sprite(shop_resources.SLOT_CATALOGY);

        categoryBackground.width *= this.ratioX + 0.1;
        categoryBackground.height *= this.ratioY + 0.1;
        var gapX = (this.shopBackground.width - 3 * categoryBackground.width) / 4;
        var gapY = (this.shopBackground.height / 8);
        categoryBackground.x = (col + 1) * gapX + col * categoryBackground.width + categoryBackground.width / 2;
        categoryBackground.y = (2 - row) * gapY + (1 - row) * categoryBackground.height * 7 / 8 + categoryBackground.height * 7 / 8 / 2;

        // Add aura background
        var category_bg = new cc.Scale9Sprite(shop_resources.CATALOY_BG);
        category_bg.width = categoryBackground.width;
        category_bg.height = categoryBackground.height;
        category_bg.x = categoryBackground.width / 2;
        category_bg.y = categoryBackground.height / 2;
        categoryBackground.addChild(category_bg, 0);

        // Add main image
        var mainImage = new cc.Scale9Sprite(image);
        mainImage.x = categoryBackground.width / 2;
        mainImage.y = categoryBackground.height / 2;
        if (this.ratioX == 1)
            mainImage.scale = this.ratioY + 0.2;
        else
            mainImage.scale = this.ratioX + 0.2;
        categoryBackground.addChild(mainImage, 1);

        // Add title
        var title = new cc.Scale9Sprite(shop_resources.TITLE_BACKGROUND);
        title.width = categoryBackground.width;
        title.height *= this.ratioY;
        title.x = categoryBackground.width / 2;
        title.y = categoryBackground.height / 7;
        categoryBackground.addChild(title, 2);

        // Add title content
        var name = new cc.LabelBMFont(titleContent, "fonts/soji_20.fnt");
        name.x = title.width / 2;
        name.y = title.height / 2;
        name.scale *= this.ratioX;
        name.scale *= this.ratioY;
        //name.width *= this.ratioX;
        //name.height *= this.ratioY;
        //name.scale = (cc.winSize.width / cc.winSize.height) / (960 / 640);
        title.addChild(name);

        // Add listener
        this.makeButton(categoryBackground, callBack);

        return categoryBackground;
    },
    scaleTo: function (A, B, ratioX, ratioY) {
        scale = new cc.Node();
        scale.x = (ratioX * B.width) / A.width;
        scale.y = (ratioY * B.height) / A.height;
        return scale;
    },
    popUpShopGUI: function () {
        if (this.shopBackground != null) {
            this.shopBackground.visible = true;
        }
        else {
            // Create background
            this.shopBackground = new cc.Scale9Sprite(shop_resources.NEN);
            var ratio = cc.winSize.width / cc.winSize.height;
            var standardRatio = 960 / 640;
            var width = 0, height = 0;
            if (ratio > standardRatio) {
                height = Math.min(640 * 2, cc.winSize.height);
                width = height * standardRatio;
            }
            else {
                width = Math.min(960 * 2, cc.winSize.width);
                height = width * 1 / standardRatio;
            }
            this.ratioX = width / 960;
            this.ratioY = height / 640;

            this.shopBackground.width = width;
            this.shopBackground.height = height;
            this.shopBackground.x = cc.winSize.width / 2;
            this.shopBackground.y = cc.winSize.height / 2;
            this.addChild(this.shopBackground, this.zOrder);
            var shopTitle = new cc.LabelBMFont("SHOP", "fonts/soji_24.fnt");
            shopTitle.scale *= this.ratioX;
            shopTitle.scale *= this.ratioY;
            shopTitle.x = this.shopBackground.width / 2;
            shopTitle.y = this.shopBackground.height * 14 / 15;
            shopTitle.scale = shopTitle.height / (this.shopBackground.height / 20);
            this.shopBackground.addChild(shopTitle);
      

            // Add content
            var titleContent = ["TREASURES", "RESOURCES", "DECORATIONS", "ARMY", "DEFENSE", "SHIELD"];
            var mainImage = [shop_resources.TYPE_BUY_RES, shop_resources.TYPE_RES, shop_resources.TYPE_DC, shop_resources.TYPE_ARMY, shop_resources.TYPE_DEFENSE, shop_resources.TYPE_SHIELD];
            var listCallback = [this.onSelectTreasures.bind(this), this.onSelectResources.bind(this), this.onSelectDecorations.bind(this), this.onSelectArmy.bind(this), this.onSelectDefense.bind(this), this.onSelectShield.bind(this)];
            var id = 0;
            for (var i = 0; i < 2; ++i)
                for (var j = 0; j < 3; ++j) {
                    var slotCat = this.createCategoryImage(i, j, mainImage[id], listCallback[id], titleContent[id]);
                    this.shopBackground.addChild(slotCat, this.zOrder + 1);
                    id += 1;
                }

            // Add CLOSE button
            var closeBtn = cc.Scale9Sprite(shop_resources.CLOSE_BTN);
            //closeBtn.scaleX = closeBtn.width / (this.shopBackground.width / 20);
            //closeBtn.scaleY = closeBtn.width / (this.shopBackground.width / 20);
            closeBtn.x = this.shopBackground.width - closeBtn.width + 10;
            closeBtn.y = this.shopBackground.height - closeBtn.height + 10;
            this.shopBackground.addChild(closeBtn);
            this.makeButton(closeBtn, this.onSelectClose.bind(this));
        }

        
        
    },
    popUpListView: function (category) {

    },
    onSelectTreasures: function () {
        if (this.shopBackground.visible == true && this.visible == true)
            cc.log("1");
    },
    onSelectResources: function () {
        this.viewList.show("Resources", this.listCategories["Resources"]);
    },
    onSelectDecorations: function () {
        if (this.shopBackground.visible == true && this.visible == true)
            cc.log("3");
    },
    onSelectArmy: function () {
        this.viewList.show("Army", this.listCategories["Army"]);
    },
    onSelectDefense: function () {
        this.viewList.show("Defense", this.listCategories["Defense"]);
    },
    onSelectShield: function () {
        if (this.shopBackground.visible == true && this.visible == true)
            cc.log("6");
    },
    onSelectClose: function () {
        if (this.shopBackground.visible == true && this.visible == true)
            this.shopBackground.runAction(cc.sequence(
                cc.scaleTo(0.2, 1.1),
                cc.callFunc(this.closeBackground.bind(this)),
                cc.scaleTo(0, 1)
            ));
    },
    closeBackground: function (sender) {
        if (this.visible == true)
            this.visible = false;
    }
});