/**
 * Created by CPU12744-local on 7/31/2020.
 */
var GameData = cc.Class.extend({
    _userInfo: null,
    _resources: null,
    _map: null,
    _builderManager: null,
    _shop: null,

    ctor: function(){
    },

    setAttributes: function(userInfo, resources, map, builderManager, shop){
        //if (userInfo == null || resources == null || map == null || objectManager == null || builderManager == null || shop == null)
        //    return false;
        this._userInfo = userInfo;
        this._resources = resources;
        this._map = map;
        this._builderManager = builderManager;
        this._shop = shop;
        return true;
    }
});


var GAME_DATA_ONLY_ONE = null;
GameData.getInstance = function () {
    if (GAME_DATA_ONLY_ONE === null) {
        GAME_DATA_ONLY_ONE = new GameData();
    }
    return GAME_DATA_ONLY_ONE;
};
