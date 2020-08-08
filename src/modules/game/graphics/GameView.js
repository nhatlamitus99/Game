/**
 * Created by CPU12744-local on 7/31/2020.
 */

var GameScreen = cc.Layer.extend({
    _map:null,
    _lobby: null,

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
    }

    return GAME_SCREEN_ONLY_ONE;
}