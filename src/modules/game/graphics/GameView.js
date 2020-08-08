/**
 * Created by CPU12744-local on 7/31/2020.
 */

var GameScreen = cc.Layer.extend({
    _mapLayer:null,
    _lobbyLayer: null,

    ctor:function() {
        this._super();
        //loadSpriteFrame();
        this._map = new MapView();
        this._lobby = new Lobby();
        this.addChild(this._map, GameConfig.ZORDER_MAP);
        this.addChild(this._lobby, GameConfig.ZORDER_LOBBY);

        GAME_SCREEN_ONLY_ONE = this;
    }

});


var GAME_SCREEN_ONLY_ONE = null;

GameScreen.getInstance = function(){
    if(GAME_SCREEN_ONLY_ONE == null){
        GAME_SCREEN_ONLY_ONE = new GameScreen();
        this._mapLayer = new MapView();
        this._lobbyLayer = new Lobby();
        this.addChild(this._mapLayer, GameConfig.ZORDER_MAP);
        this.addChild(this._lobbyLayer, GameConfig.ZORDER_LOBBY);

    }

    return GAME_SCREEN_ONLY_ONE;
}