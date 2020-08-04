/**
 * Created by CPU12744-local on 7/31/2020.
 */
var GameData = cc.Class.extend()({
    _userInfo: null,
    _resources: null,
    _map: null,
    _objectManager: null,
    _builderManager: null,
    _shop: null,

    ctor: function(userInfo, resources, map, objectManager, builderManager, shop){
        if (userInfo == null || resources == null || map == null || objectManager == null || builderManager == null || shop == null)
            return false;
        this._userInfo = userInfo;
        this._resources = resources;
        this._map = map;
        this._objectManager = objectManager;
        this._builderManager = builderManager;
        this._shop = shop;
        return true;
    }
});