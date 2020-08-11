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
    },

    loadDataFromServer: function(jsonFile) {
        cc.log(jsonFile);
        var jsonContent = JSON.parse(jsonFile);

        cc.log("Loading JSON from server");

        cc.log("Loading Resources");
        var resourcesData = ResourcesData.getInstance();
        resourcesData.setAttributes(jsonContent.resource);
        resourcesData.showInfo();

        cc.log("Loading UserInfor");
        var user = User.getInstance();
        user.setAttributes(jsonContent.playerInfo);
        user.showInfor();

        cc.log("Loading listObject");
        var objectMgrData = ObjectMgrData.getInstance();
        var mapData = MapData.getInstance();
        mapData.setObjectMgrData(objectMgrData);
        for (var i = 0; i < jsonContent.listObject.length; ++i) {
            var attributes = this.updateObjectJson(jsonContent.listObject[i]);
            //cc.log(attributes.position.i + " " + attributes.position.j + " " + attributes.size.h + " " + attributes.size.w);
            //for (var key in attributes) {
            //    cc.log(key + ": " + attributes[key]);
            //}
            //if (mapData.insertObject2Map(attributes))
            //    cc.log("Failed to load object " + i);
        }
        mapData.customInit();

        this.setAttributes(user, resourcesData, mapData, null, null);
        cc.log("Loading done <3");
    },
    updateObjectJson: function(json) {
        var fileCategory = CONFIG_DATA.getData(json.typeCategory, json.typeObject, json.level);
        var res = {
            position: {
                i:json.position.x,
                j:json.position.y
            },
            size: {
                w: fileCategory.width,
                h: fileCategory.height
            }
        };
        for (var key in json)
            if (key != "position")
                res[key] = json[key];
        for (key in fileCategory)
            if (key != "height" && key != "width")
                res[key] = fileCategory[key];
        return res;
    }
});


var GAME_DATA_ONLY_ONE = null;
GameData.getInstance = function () {
    if (GAME_DATA_ONLY_ONE === null) {
        GAME_DATA_ONLY_ONE = new GameData();
    }
    return GAME_DATA_ONLY_ONE;
};
