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
                if (this._map[i][j][t] != MapConfig.NULL_CELL[t])
                    return true;
        return false;
    },

    insertObject2Map: function(x, y, w, h, type, id) {
        for (var i = x; i < x + w; ++i)
            for (var j = y; j < y + h; ++j) {
                this._map[i][j][0] = type;
                this._map[i][j][1] = id;
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
        //cc.log(this._map);
    }
});

var MAP_DATA_ONLY_ONE = null;
MapData.getInstance = function () {
    if (MAP_DATA_ONLY_ONE === null) {
        MAP_DATA_ONLY_ONE = new MapData();
    }
    return MAP_DATA_ONLY_ONE;
}