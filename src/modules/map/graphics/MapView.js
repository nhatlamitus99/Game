var MapView = cc.Layer.extend({
    _map:null,

    // on client
    _scale: null,   // scale of current screen view map
    _screenPos: null,     // position of current screen view map

    ctor:function() {
        this._super();

        // load map's sprite from MainScene.json
        var node = ccs.load('mapScene.json', '').node;
        node.setAnchorPoint(0.5, 0.5);
        node.setPosition(cc.winSize.width/2, cc.winSize.height/2);

        // set scale
        this._scale = Math.max(cc.winSize.width/node.width, cc.winSize.height/node.height);
        node.setScale(this._scale);
        this.addChild(node);
        this._map = node;

        // set position
        this._screenPos = [cc.winSize.width - node.width/2, cc.winSize.height - node.height/2];
    }
});