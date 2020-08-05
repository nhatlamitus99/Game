var MapView = cc.Layer.extend({
    _map:null,

    // on client
    _scale: null,   // scale of current screen view map

    ctor:function() {
        this._super();

        // load map's sprite from MainScene.json
        var node = ccs.load('MainScene.json', '').node;
        ccui.Helper.doLayout(node);
        node.setAnchorPoint(0.5, 0.5);
        node.setPosition(cc.winSize.width/2, cc.winSize.height/2);

        // set scale
        this._scale = Math.max(cc.winSize.width/node.width, cc.winSize.height/node.height)*1.5;
        node.setScale(this._scale);
        this.addChild(node);
        this._map = node;

        //var panel = ccui.helper.seekWidgetByName(node, "Panel_1");
        //var map = panel.getChildren()[0];
        //map.setPosition(500, 500);

        // set Touch
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ALL_AT_ONCE,
            onTouchesMoved: function (touches, event) {
                var touch = touches[0];
                var delta = touch.getDelta();

                var map = event.getCurrentTarget()._map;
                var scale = event.getCurrentTarget()._scale;

                if (map.x + map.width/2*scale + delta.x <= cc.winSize.width)
                    delta.x = 0;
                if (map.x - map.width/2*scale + delta.x >= 0)
                    delta.x = 0;
                if (map.y + map.height/2*scale + delta.y <= cc.winSize.height)
                    delta.y = 0;
                if (map.y - map.height/2*scale + delta.y >= 0)
                    delta.y = 0;

                //cc.log("sum", map.y + map.height/2*scale + delta.y);
                //cc.log("winsize", cc.winSize.height);

                map.x += delta.x;
                map.y += delta.y;
            }
        }, this);

        // set Mouse
        if ('mouse' in cc.sys.capabilities) {

        }
    }
});