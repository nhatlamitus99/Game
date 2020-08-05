var MapView = cc.Layer.extend({
    _map:null,

    // on client
    _scale: null,   // scale of current screen view map
    _mapOriginSize: null,

    ctor:function() {
        this._super();

        // load map's sprite from MainScene.json
        var node = ccs.load('MainScene.json', '').node;
        ccui.Helper.doLayout(node);
        node.setAnchorPoint(0.5, 0.5);
        node.setPosition(cc.winSize.width/2, cc.winSize.height/2);

        // set scale
        MapConfig.MIN_SCALE = Math.max(cc.winSize.width/node.width, cc.winSize.height/node.height);
        this._scale = MapConfig.MIN_SCALE;
        node.setScale(this._scale);
        this.addChild(node);
        this._map = node;

        // add save origin size
        this._mapOriginSize = {
            w: this.scale*node.width,
            h: this.scale*node.height
        };

        //var panel = ccui.helper.seekWidgetByName(node, "Panel_1");
        //var map = panel.getChildren()[0];
        //map.setPosition(500, 500);

        // set Touch
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ALL_AT_ONCE,
            swallowTouches: true,
            onTouchesMoved: this.onTouchesMoved.bind(this)
        }, this);

        // set Mouse Scroll
        if ('mouse' in cc.sys.capabilities) {
            cc.eventManager.addListener({
                event: cc.EventListener.MOUSE,
                swallowTouches: true,
                onMouseScroll: function (event) {
                        var delta = -event.getScrollY()/MapConfig.ZOOM_MAXDELTA;
                        //cc.log("On Mouse Scroll: ", delta);
                        event.getCurrentTarget().setScaleMap(delta, event.getLocation());
                        return true;
                    }
                }
                , this
            );
        }
    },

    setScaleMap: function(delta, touch) {
        if (this._scale + delta > MapConfig.MAX_SCALE)
            delta = 0;
        if (this._scale + delta < MapConfig.MIN_SCALE)
            delta = 0;
        this._scale += delta;

        var scale = this._scale;
        var map = this._map;
        var originSize= this._mapOriginSize;
        // calculate newPoint (touchPoint after scaling)
        // Algorithm: transform the point, which is touched by mouse, from Screen's coordinate to Map's coordinate
        // then, we scale screen and set the newPoint at position of our mouse.
        var newPoint = {
            x: (touch.x - map.x + originSize.w*(scale-delta)/2)/(scale-delta)*(scale) - originSize.w*(scale)/2 + map.x,
            y: (touch.y - map.y + originSize.h*(scale-delta)/2)/(scale-delta)*(scale) - originSize.h*(scale)/2 + map.y
        };

        // scale map and move map in screen
        map.setScale(scale);
        if (map.x + map.width/2*scale < cc.winSize.width)
            map.x = cc.winSize.width - map.width/2*scale;

        if (map.x - map.width/2*scale > 0)
            map.x = map.width/2*scale;

        if (map.y + map.height/2*scale < cc.winSize.height)
            map.y = cc.winSize.height - map.height/2*scale;

        if (map.y - map.height/2*scale > 0)
            map.y = map.height/2*scale;

        // move to newPoint
        var distance = {
            x: -newPoint.x + touch.x,
            y: -newPoint.y + touch.y
        };
        this.moveMap(distance);
    },

    onTouchesMoved: function(touches, event) {
        var touch = touches[0];
        this.moveMap(touch.getDelta());
    },

    moveMap: function(delta) {
        var map = this._map;
        var scale = this._scale;
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

});