var formatIntToString = function (x) {
    if (x == 0)
        return "0";
    var str = "";
    var Len = 0;
    while (x >= 1) {
        if (Len % 3 == 0 && Len != 0)
            str = "," + str;
        str = (x % 10) + str;
        Len += 1;
        x /= 10;
        x = Math.floor(x);
    }
    return str;
}

var CustomTableViewCell = cc.TableViewCell.extend({
    draw: function (ctx) {
        this._super(ctx);
    }
});

var TableViewTestLayer = cc.Layer.extend({
    shopBackground: null,
    scaleBackground: 0.9,
    zOrder: 100,
    resources: [0, 0, 0],
    ratioX: 1,
    ratioY: 1,
    _slotItemWidth: 0,
    _slotItemHeight: 0,
    listItemsName: null,
    listItemsSource: null,
    _mainGUI: null,
    listItemsInfo: null,
    currentListItemsNameIndex: 0,
    ctor: function (mainGUI, listItemsSource, listItemsName, listItemsInfo) {
        this._super();
        this.readInfo(listItemsSource, listItemsName, listItemsInfo);
        this.popUpListGUI();
        this._mainGUI = mainGUI;
        //this.animatePopUpGUI();
        this.show();
        this.init();
    },
    readInfo: function (listItemsSource, listItemsName, listItemsInfo) {
        this.listItemsSource = listItemsSource;
        this.listItemsName = listItemsName;
        this.listItemsInfo = listItemsInfo;
        //cc.log(ResourcesData.getInstance()._resources);
        this.resources = ResourcesData.getInstance()._resources;
        
    },
    getResources: function () {
        
    },
    show: function () {
        this._mainGUI.shopBackground.visible = false;
        this.visible = true;
        this.animatePopUpGUI();
    },// 0.2 0.095
    animatePopUpGUI: function () {
        this.shopBackground.runAction(cc.sequence(
            cc.scaleTo(0, 0.8),
            cc.scaleTo(0.2, 1.05),
            cc.scaleTo(0.095, 1)
        ));
    },
    makeButton: function (Sprite, callBack) {
        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                if (this.visible == false)
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

            }
        });
        this.setUserObject(listener);
        cc.eventManager.addListener(listener, Sprite);
    },
    scaleTo: function (A, B, ratioX, ratioY) {
        var scale = new cc.Node();
        scale.x = (ratioX * B.width) / A.width;
        scale.y = (ratioY * B.height) / A.height;
        return scale;
    },
    addResources: function (footer, icon, amount, id) {
        var resBar = new cc.Scale9Sprite(shop_resources.RES_BAR);
        var icon = new cc.Scale9Sprite(icon);

        amount = formatIntToString(amount);
        var value = new cc.LabelBMFont(amount, "fonts/soji_16.fnt");

        // D: long distance, d: short distance between 2 resBar
        var D = 3 * this.shopBackground.width / 20;
        var d = D / 2;
        resBar.width = resBar.width * this.ratioX + icon.width;
        resBar.height = resBar.height * this.ratioY;
        resBar.x = D + id * resBar.width + id * d + resBar.width / 2;
        resBar.y = footer.height / 2;

        icon.x = resBar.width - icon.width/2;
        icon.y = resBar.height / 2;

        // Set value into resBar
        value.width *= this.ratioX;
        value.height *= this.ratioY;
        value.x = icon.x - value.width / 2 - icon.width / 2;
        value.y = resBar.height / 2;

        resBar.addChild(value);
        
        resBar.addChild(icon)
        return resBar;
    },
    popUpListGUI: function () {
        if (this.shopBackground != null) {
            this.shopBackground.visible = true;
        }
        else {
            if (this.shopBackground == null) {
                // Create background
                var title = "TREASURES";
                this.shopBackground = new cc.Scale9Sprite(shop_resources.NEN);
                //var scale = this.scaleTo(this.shopBackground, cc.winSize, this.scaleBackground, this.scaleBackground);
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

                var shopTitle = new cc.LabelBMFont(title, "fonts/soji_20.fnt");
                shopTitle.x = this.shopBackground.width / 2;
                shopTitle.y = this.shopBackground.height * 14 / 15;
                shopTitle.scale = shopTitle.height / (this.shopBackground.height / 20);
                this.shopBackground.addChild(shopTitle);

                // Add footer
                var footer = new cc.Scale9Sprite(shop_resources.RES_INFO);
                var scale = this.scaleTo(footer, this.shopBackground, 1, 1 / 7);
                footer.width = this.shopBackground.width;
                //footer.scaleX = scale.x;
                //footer.scaleY = scale.y;
                footer.x = this.shopBackground.width / 2;
                footer.y = footer.height / 2;
                this.shopBackground.addChild(footer);

                // Add Icon Resources
                resourcesImage = [shop_resources.ICON_GOLD_BAR, shop_resources.ICON_ELIXIR_BAR, shop_resources.ICON_G_BAR];
                for (var i = 0; i < this.resources.length; ++i) {
                    var barResource = this.addResources(footer, resourcesImage[i], this.resources[i], i);
                    this.shopBackground.addChild(barResource);
                }
            }
            // Add CLOSE button
            var closeBtn = cc.Scale9Sprite(shop_resources.CLOSE_BTN);
            //closeBtn.scale = closeBtn.width / (this.shopBackground.width / 20);
            closeBtn.x = this.shopBackground.width * 96 / 100;
            closeBtn.y = this.shopBackground.height * 94 / 100;
            this.shopBackground.addChild(closeBtn);
            this.makeButton(closeBtn, this.onSelectClose.bind(this));

            // Add BACK button
            var backBtn = cc.Scale9Sprite(shop_resources.BACK_BTN);
            backBtn.x = this.shopBackground.width * 5 / 100;
            backBtn.y = this.shopBackground.height * 94 / 100;
            this.shopBackground.addChild(backBtn);
            this.makeButton(backBtn, this.onSelectBack.bind(this));
        }
        

        // Animate pop-up
        /*this.shopBackground.runAction(cc.sequence(
            cc.scaleTo(0, 0.7),
            cc.scaleTo(0.2, 1.1),
            cc.scaleTo(0.095, 1)
        ));*/
    },
    init: function () {
        var tmp = new cc.Scale9Sprite(shop_resources.SLOT);
        this._slotItemHeight = tmp.height * this.ratioX;
        this._slotItemWidth = tmp.width * this.ratioY;

        var winSize = cc.director.getWinSize();
        var tableView = new cc.TableView(this, cc.size(this.shopBackground.width * 49 / 50, this._slotItemHeight));
        tableView.setDirection(cc.SCROLLVIEW_DIRECTION_HORIZONTAL);
        tableView.x = this.shopBackground.width / 50;
        tableView.y = this.shopBackground.height / 2 - tmp.height / 2;
        tableView.setDelegate(this);
        this.shopBackground.addChild(tableView);
        tableView.reloadData();
        
        return true;
    },

    toExtensionsMainLayer: function (sender) {
        var scene = new ExtensionsTestScene();
        scene.runThisTest();
    },

    scrollViewDidScroll: function (view) {
    },
    scrollViewDidZoom: function (view) {
    },

    tableCellTouched: function (table, cell) {
        cc.log("cell touched at index: " + cell.getIdx());
    },
    tableCellTouched2: function () {
        cc.log("cell touched at index: ");
    },

    tableCellSizeForIndex: function (table, idx) {
        return cc.size(this._slotItemWidth, this._slotItemHeight);
    },

    tableCellAtIndex: function (table, idx) {
        var strValue = idx.toFixed(0);
        var cell = table.dequeueCell();
        var label;

        if (!cell) {
            
            cell = new CustomTableViewCell();
            //var sprite = new cc.Sprite("shop_gui/back.png");
            var sprite = new Item(this.listItemsName[this.currentListItemsNameIndex], this.listItemsSource[this.currentListItemsNameIndex], this.listItemsInfo[this.currentListItemsNameIndex], this.ratioX, this.ratioY).itemBackground;
            sprite.anchorX = 0;
            sprite.anchorY = 0;
            sprite.x = 0;
            sprite.y = 0;
            cell.addChild(sprite);
            this.currentListItemsNameIndex += 1;
        }

        return cell;
    },
    numberOfCellsInTableView: function (table) {
        return this.listItemsSource.length;
    },
    onSelectClose: function () {
        this.shopBackground.runAction(cc.sequence(
            cc.scaleTo(0.2, 1.1),
            cc.callFunc(this.invisibleAll.bind(this)),
            cc.scaleTo(0, 1)
        ));
        
            
    },
    onSelectBack: function () {
        this.visible = false;
        this._mainGUI.shopBackground.visible = true;
    },
    invisibleAll: function () {
        this.visible = false;
        this._mainGUI.shopBackground.visible = true;
        this._mainGUI.visible = false;
    }
});
