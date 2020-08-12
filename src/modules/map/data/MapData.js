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
        //cc.log("test1")
        attributes.id = this._objectMgrData.getNextIdOfType(attributes.type);
        //cc.log("test2")

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
        //cc.log("test3")

        this._objectMgrData.createItemToList(attributes);
        //cc.log("test4")

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
        //cc.log("update: oldR:"+oldRegion.i + " " + oldRegion.j + " -- " + oldRegion.w + " " + oldRegion.h);
        this.setValuesCells(oldRegion, MapConfig.getNullCell());
        //cc.log("update: newR:"+newRegion.i + " " + newRegion.j + " -- " + newRegion.w + " " + newRegion.h);
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
    },

    findRegionForBuilding: function(centerCell, size) {
        var res = [];
        var data = this._map;
        var mapSize = MapConfig.MAP_SIZE;
        var nullCell = MapConfig.NULL_CELL;

        for (var i = 0; i < mapSize.h; ++i) {
            res[i] = [];
            for (var j = 0; j < mapSize.w; ++j)
                res[i][j] = 0;
        }

        var minFunc = function (a,b,c) {
            if (a < b && a < c) return a;
            if (b < a && b < c) return b;
            return c;
        };
        var getDistance = function(cell, region) {
            return Math.abs(cell.i - (region.i+region.w/2)) + Math.abs(cell.j - (region.j+region.h/2));
        };

        for (i = 0; i < mapSize.h; ++i)
            if (data[i][0].type == nullCell.type)
                res[i][0] = 1;
        for (j = 0; j < mapSize.w; ++j)
            if (data[0][j].type == nullCell.type)
                res[0][j] = 1;

        var nearestRegion = {i:-100, j:-100, h:size, w:size};
        for (i = 1; i < mapSize.h; ++i)
        for (j = 1; j < mapSize.w; ++j)
            if (data[i][j].type == nullCell.type) {
                res[i][j] = minFunc(res[i][j - 1], res[i - 1][j], res[i - 1][j - 1]) + 1;
                var newRegion = {i: i-size+1, j: j-size+1, w: size, h: size};
                if (res[i][j]>=size && getDistance(centerCell, newRegion) <= getDistance(centerCell, nearestRegion)) {
                    //cc.log("distance: " + newRegion.i + " " + newRegion.j + " = " + getDistance(centerCell, newRegion));
                    nearestRegion.i = newRegion.i;
                    nearestRegion.j = newRegion.j;
                }
            }
            else res[i][j] = 0;
        return nearestRegion;
    }
});

var MAP_DATA_ONLY_ONE = null;
MapData.getInstance = function () {
    if (MAP_DATA_ONLY_ONE === null) {
        MAP_DATA_ONLY_ONE = new MapData();
    }
    return MAP_DATA_ONLY_ONE;
};