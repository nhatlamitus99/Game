var MapView = cc.Layer.extend({
    _map:null,

    // on client
    _scale: null,   // scale of current screen view map
    _screenPos: null,     // position of current screen view map

    ctor:function() {
        this._super();

        // load map's sprite from MainScene.json
        var node = ccs.load('MainScene.json', '').node;
        ccui.Helper.doLayout(node);
        node.setAnchorPoint(0.5, 0.5);
        node.setPosition(cc.winSize.width/2, cc.winSize.height/2);

        // set scale
        this._scale = Math.max(cc.winSize.width/node.width, cc.winSize.height/node.height);
        node.setScale(this._scale);
        this.addChild(node);
        this._map = node;

        // set position
        this._screenPos = [cc.winSize.width - node.width/2, cc.winSize.height - node.height/2];

        var TMXMap = ccui.helper.seekWidgetByName(node, "Panel_1");
        //TMXMap.setPosition(500, 500);

        // set touch
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ALL_AT_ONCE,
            onTouchesMoved: function (touches, event) {
                var touch = touches[0];
                var delta = touch.getDelta();

                var map = event.getCurrentTarget()._map;
                var screenPos = event.getCurrentTarget()._screenPos;
                var scale = event.getCurrentTarget()._scale;

                cc.log("sum", map.y + map.height/2*scale[1] + delta.y);
                cc.log("afterscale", map.height*scale);
                cc.log("winsize", cc.winSize.height);

                //if (map.x + map.width/2*scale + delta.x >= cc.winSize.width)
                //    return;
                //if (map.x - map.width/2*scale + delta.x <= 0)
                //    return;

                //if (map.y + map.height/2*scale + delta.y >= cc.winSize.height)
                //    return;

                map.x += delta.x;
                map.y += delta.y;
            }
        }, this);
    }
});