/**
 * Created by CPU12744-local on 7/31/2020.
 */
var MapData = cc.Class.extend({
    // data in both server & client
    _map: [],

    ctor: function(map){
        //if (map == null)
        //    return false;
        this._map = map;
        return true;
    },

    checkOverlap: function(x, y, w, h){
        for (var i = x; i < x+w; ++i)
        for (var j = y; j < y+h; ++j)
            for (var t = 0; t < MapConfig.NULL_CELL.length; ++t)
                if (this._map[i][j] != MapConfig.NULL_CELL)
                    return true;
        return false;
    },

    insertObject2Map: function(x, y, w, h, type, id) {
        for (var i = x; i < x + w; ++i)
            for (var j = y; j < y + h; ++j) {
                this._map[i][j] = {
                    type: type,
                    id: id
                };
            }
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