/**
 * Created by CPU12744-local on 7/31/2020.
 */

var GameScreen = cc.Layer.extend({
    _mapLayer:null,
    _lobbyLayer: null,

    ctor:function() {
        this._super();
        this.initCacheFrames();
        this._lobbyLayer = new Lobby();
        this._mapLayer = MapView.getInstance();
        this.addChild(this._mapLayer, GameConfig.ZORDER_MAP);
        this.addChild(this._lobbyLayer, GameConfig.ZORDER_LOBBY);
    },

    initCacheFrames: function() {
        // troop resources
        for(var i = 0; i < TROOP_RESOURCES.length; i++){
            cc.SpriteFrameCache.getInstance().addSpriteFrames(
                TROOP_RESOURCES[i].plist,
                TROOP_RESOURCES[i].png
            );
        }
        // lobby resources
        for(var ii = 0; ii < LOBBY_RESOURCES.length; ii++){
            cc.SpriteFrameCache.getInstance().addSpriteFrames(
                LOBBY_RESOURCES[ii].plist,
                LOBBY_RESOURCES[ii].png
            );
        }
    }
});

var GAME_SCREEN_ONLY_ONE = null;
GameScreen.getInstance = function(){
    if(GAME_SCREEN_ONLY_ONE == null){
        GAME_SCREEN_ONLY_ONE = new GameScreen();
    }
    return GAME_SCREEN_ONLY_ONE;
};