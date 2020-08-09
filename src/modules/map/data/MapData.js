/**
 * Created by CPU12744-local on 7/31/2020.
 */
var MapData = cc.Class.extend({
    // data in both server & client
    _map: [],
    _objectMgrData: null,   // manager of object
    _troopMgrData: null, // troop manager

    ctor: function(map, objectMgrData, troopMgrData){
        //if (map == null)
        //    return false;
        this._map = map;
        this._objectMgrData = objectMgrData;
        this._troopMgrData = troopMgrData;
    },

    checkOverlap: function(attributes){
        var x = attributes.position.i;
        var y = attributes.position.j;
        var w = attributes.size.w;
        var h = attributes.size.h;
        for (var i = x; i < x+w; ++i)
            for (var j = y; j < y+h; ++j)
                if (this._map[i][j].type != MapConfig.NULL_CELL.type || this._map[i][j].id != MapConfig.NULL_CELL.id)
                    return true;
        return false;
    },

    insertObject2Map: function(attributes) {
        if (this.checkOverlap(attributes))
            return false;
        attributes.id = this._objectMgrData.getNextIdOfType(attributes.type);
        var x = attributes.position.i;
        var y = attributes.position.j;
        var w = attributes.size.w;
        var h = attributes.size.h;
        for (var i = x; i < x+w; ++i)
            for (var j = y; j < y+h; ++j) {
                this._map[i][j] = {
                    type: attributes.type,
                    id: attributes.id
                };
            }
        this._objectMgrData.createItemToList(attributes);
        //cc.log("adding object type-id" + attributes.type + " " + attributes.id);
        return true;
    },

    // using for fake data and testing
    customInit: function(){
        this._map = [];
        for (var i = 0; i < MapConfig.MAP_SIZE.h; ++i) {
            this._map.push([]);
            for (var j = 0; j < MapConfig.MAP_SIZE.w; ++j) {
                this._map[i].push(MapConfig.getNullCell());
            }
        }
    },

    getTypeIDFromCell: function(cell){
        return {
            type: this._map[cell.i][cell.j].type,
            id: this._map[cell.i][cell.j].id
        };
    }
});

var MAP_DATA_ONLY_ONE = null;
MapData.getInstance = function () {
    if (MAP_DATA_ONLY_ONE === null) {
        MAP_DATA_ONLY_ONE = new MapData();
    }
    return MAP_DATA_ONLY_ONE;
};