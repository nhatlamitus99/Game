/**
 * Created by CPU12744-local on 7/31/2020.
 */

var GameScreen = cc.Layer.extend({
    _mapLayer:null,
    _lobbyLayer: null,

    ctor:function() {
        this._super();
        //loadSpriteFrame();
        this._lobbyLayer = new Lobby();
        this._mapLayer = new MapView();
        this.addChild(this._mapLayer, GameConfig.ZORDER_MAP);
        this.addChild(this._lobbyLayer, GameConfig.ZORDER_LOBBY);

        this.initCacheFrames();
    },

    initCacheFrames: function() {

    }
});