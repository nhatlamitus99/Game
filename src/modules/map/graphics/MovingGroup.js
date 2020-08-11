/**
 * Created by CPU12744-local on 8/10/2020.
 */
var MovingGroup = cc.Class.extend({
    _subs: null,            // substructures list
    _object: null,          // objects list
    _oldRegion: null,       // regions before moving
    _newRegion: null,       // regions of objects and substructures
    _type: null,            // type of objects
    _id: null,              // id of each objects
    _arrow: null,
    flagOfMove: false,      // true when object is selecting, false otherwise

    ctor: function(subs, objects, oldRegion, newRegions, type, ids) {
        this._subs = subs;
        this._object = objects;
        this._oldRegion = oldRegion;
        this._newRegion = newRegions;
        this._type = type;
        this._id = ids;
    },

    setArrow: function(arrowSprite) {
        this._arrow = arrowSprite;
    },

    setAttributes: function(subs, object, oldRegion, newRegion, type, id) {
        this._subs = subs;
        this._object = object;
        this._oldRegion = oldRegion;
        this._newRegion = newRegion;
        this._type = type;
        this._id = id;
    },
    showMovingSubs: function() {
        this._arrow.setSizeArrow(this._oldRegion.w);
        this.setPosArrow();
        var mapData = MapData.getInstance();
        if (!mapData.checkOverlap(this._newRegion, {type:this._type, id:this._id}))
            this._subs.setGreenState();
        else
            this._subs.setRedState();
        this._subs.setZOrder(MapConfig.Z_ORDER_MOVING_SUBS);
    },
    goTo: function(cell) {
        if (this._newRegion.i == cell.i && this._newRegion.j == cell.j)
            return;
        this.setPosArrow();
        this._newRegion.i = cell.i;
        this._newRegion.j = cell.j;
        var mapData = MapData.getInstance();
        if (mapData.checkOverlap(this._newRegion, {type:this._type, id:this._id}))
            this._subs.setRedState();
        else
            this._subs.setGreenState();
        var mapView = MapView.getInstance();
        var posCenter = mapView.getCenterPosOfRegion(this._newRegion);
        this._object.x = posCenter.x;
        this._object.y = posCenter.y;
        this._subs.x = posCenter.x;
        this._subs.y = posCenter.y;

        this._object.setZOrder(mapView.calculateZOrderOfRegion(this._newRegion));
    },
    goBack: function () {
        this.setPosArrow();
        this._subs.setNormalState();
        var mapView = MapView.getInstance();
        var posCenter = mapView.getCenterPosOfRegion(this._oldRegion);
        this._object.x = posCenter.x;
        this._object.y = posCenter.y;
        this._subs.x = posCenter.x;
        this._subs.y = posCenter.y;

        this._object.setZOrder(mapView.calculateZOrderOfRegion(this._oldRegion));

    },
    showNormalSubs: function () {
        this._arrow.setSizeArrow(0);
        this._subs.setNormalState();
        this._subs.setZOrder(MapConfig.Z_ORDER_SUBSTRUCTURE);
    },
    isNULL: function () {
        return this._type == MapConfig.NULL_CELL.type;
    },
    setPosArrow: function() {
        var mapView = MapView.getInstance();
        //cc.log("new region of group " + this._newRegion.i + " " + this._newRegion.j);
        var posCenter = mapView.getCenterPosOfRegion(this._newRegion);
        this._arrow.x = posCenter.x;
        this._arrow.y = posCenter.y;
    },
    updateOldRegion: function() {
        this._oldRegion.i = this._newRegion.i;
        this._oldRegion.j = this._newRegion.j;
    },
    revertNewRegion: function() {
        this._newRegion.i = this._oldRegion.i;
        this._newRegion.j = this._oldRegion.j;
    },
    hasCell: function(cell) {
        if (this._type == MapConfig.NULL_CELL.type)
            return false;
        if (!(this._newRegion.i <= cell.i && cell.i < this._newRegion.i + this._newRegion.w))
            return false;
        return this._newRegion.j <= cell.j && cell.j < this._newRegion.j + this._newRegion.h;
    },
    isInMovingState: function() {
        return this._subs.isInMovingState();
    }
});