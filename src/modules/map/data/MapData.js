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
    setObjectMgrData: function(mgr) {
        this._objectMgrData = mgr;
    },
    // true - > overlap
    checkOverlap: function(region, typeID){
        var x = region.i;
        var y = region.j;
        var w = region.w;
        var h = region.h;
        if (x < 0 || x + w > MapConfig.MAP_SIZE.w)
            return true;
        if (y < 0 || y + h > MapConfig.MAP_SIZE.h)
            return true;
        for (var i = x; i < x+w; ++i)
            for (var j = y; j < y+h; ++j)
                if ((this._map[i][j].type != MapConfig.NULL_CELL.type
                        && this._map[i][j].type != typeID.type)
                    || (this._map[i][j].id != MapConfig.NULL_CELL.id
                        && this._map[i][j].id != typeID.id))
                    return true;
        return false;
    },

    insertObject2Map: function(attributes) {
        if (this.checkOverlap(attributes))
            return false;
        cc.log("test1")
        attributes.id = this._objectMgrData.getNextIdOfType(attributes.type);
        cc.log("test2")

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
        cc.log("test3")

        this._objectMgrData.createItemToList(attributes);
        cc.log("test4")

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
        if (cell == null)
            return MapConfig.getNullCell();
        if (cell.i < 0 || cell.i > MapConfig.MAP_SIZE.w)
            return MapConfig.getNullCell();
        if (cell.j < 0 || cell.j > MapConfig.MAP_SIZE.h)
            return MapConfig.getNullCell();
        return {
            type: this._map[cell.i][cell.j].type,
            id: this._map[cell.i][cell.j].id
        };
    },

    getObjectFromTypeID: function(type, id) {
        if (type == MapConfig.NULL_CELL.type)
            return null;
        return this._objectMgrData.getObject(type, id);
    },

    moveObject: function(oldRegion, newRegion, typeID) {
        //cc.log("update position object in MapData");
        cc.log("update: oldR:"+oldRegion.i + " " + oldRegion.j + " -- " + oldRegion.w + " " + oldRegion.h);
        this.setValuesCells(oldRegion, MapConfig.getNullCell());
        cc.log("update: newR:"+newRegion.i + " " + newRegion.j + " -- " + newRegion.w + " " + newRegion.h);
        this.setValuesCells(newRegion, typeID);
        this._objectMgrData.setPosOfObject(typeID, newRegion);
    },

    setValuesCells: function(region, typeID) {
        var x = region.i;
        var y = region.j;
        var w = region.w;
        var h = region.h;
        //cc.log(typeID.type + " " + typeID.id + " : " + x + " " + y + " " + h + " " + w);
        for (var i = x; i < x+w; ++i)
            for (var j = y; j < y+h; ++j) {
                this._map[i][j].type = typeID.type;
                this._map[i][j].id = typeID.id;
            }
    }
});

var MAP_DATA_ONLY_ONE = null;
MapData.getInstance = function () {
    if (MAP_DATA_ONLY_ONE === null) {
        MAP_DATA_ONLY_ONE = new MapData();
    }
    return MAP_DATA_ONLY_ONE;
};