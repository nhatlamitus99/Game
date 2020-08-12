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
    _defaultColor: null,
    flagOfMove: false,      // true when object is selecting, false otherwise

    ctor: function(subs, objects, oldRegion, newRegions, type, ids) {
        // set attributes
        this._subs = subs;
        this._object = objects;
        this._oldRegion = oldRegion;
        this._newRegion = newRegions;
        this._type = type;
        this._id = ids;
    },

    // select new group
    setAttributes: function(subs, object, oldRegion, newRegion, type, id) {
        this.endActionGroup();

        this._subs = subs;
        this._object = object;
        this._oldRegion = oldRegion;
        this._newRegion = newRegion;
        this._type = type;
        this._id = id;
        this._arrow = null;

        if (this._type != MapConfig.NULL_CELL.type) {
            var arrowPool = ArrowPool.getInstance();
            this._arrow = arrowPool.getArrow();
            this._arrow.setSizeArrow(this._oldRegion.w);
            this.setPosArrow();
        }

        this.beginActionGroup();
    },
    endActionGroup: function() {
        if (this._type == MapConfig.NULL_CELL.type)
            return;
        var arrow = this._arrow;
        this._arrow = null;
        // action of object
        this._object.stopAllActions();
        this._object.setScale(OBJECT_MGR_CONFIG.SCALE_BUILDING);
        this._object.setColor(this._defaultColor);
        // action of arrow
        var scaleAR = cc.scaleBy(0.1, 0.4);
        var sendBackToPool = function () {
            var arrowPool = ArrowPool.getInstance();
            arrowPool.sendToPool(this);
        };
        var scaleARSeq = cc.sequence(scaleAR, cc.callFunc(sendBackToPool.bind(arrow)));
        arrow.runAction(scaleARSeq);
    },
    beginActionGroup: function () {
        if (this._type == MapConfig.NULL_CELL.type)
            return;
        // action of object
        var scale = cc.scaleBy(0.1, 1.2);
        var scaleSeq = cc.sequence(scale, scale.reverse());
        var tintBy = cc.tintBy(0.7, -100, -100, -100);
        var tintBySeq = cc.sequence(tintBy, tintBy.reverse()).repeatForever();
        this._defaultColor = this._object.getColor();
        // run action
        this._object.runAction(scaleSeq);
        this._object.runAction(tintBySeq);
        // action of arrow
        this._arrow.setScale(0.5);
        this._arrow.opacity = 0;
        var scaleAR_1 = cc.scaleBy(0.1, 2.5);
        var scaleAR_2 = cc.scaleBy(0.1, 2/2.5);
        var scaleAR_Seq = cc.sequence(scaleAR_1, scaleAR_2);
        // run action
        this._arrow.runAction(scaleAR_Seq);
    },
    showMovingSubs: function() {
        var mapData = MapData.getInstance();
        if (!mapData.checkOverlap(this._newRegion, {type:this._type, id:this._id}))
            this._subs.setGreenState();
        else
            this._subs.setRedState();
        this._subs.setLocalZOrder(MapConfig.Z_ORDER_MOVING_SUBS);
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
        this.updateGroupPos(posCenter);
        this._object.setLocalZOrder(mapView.calculateZOrderOfRegion(this._newRegion));
    },
    goBack: function () {
        this.setPosArrow();
        this._subs.setNormalState();
        var mapView = MapView.getInstance();
        var posCenter = mapView.getCenterPosOfRegion(this._oldRegion);
        this.updateGroupPos(posCenter);
        this._object.setLocalZOrder(mapView.calculateZOrderOfRegion(this._oldRegion));

    },
    updateGroupPos: function(posCenter) {
        this._object.x = posCenter.x;
        this._object.y = posCenter.y;
        this._subs.x = posCenter.x;
        this._subs.y = posCenter.y;
        this._arrow.x = posCenter.x;
        this._arrow.y = posCenter.y;
    },
    showNormalSubs: function () {
        this._subs.setNormalState();
        this._subs.setLocalZOrder(MapConfig.Z_ORDER_SUBSTRUCTURE);
    },
    isNULL: function () {
        return this._type == MapConfig.NULL_CELL.type;
    },
    setPosArrow: function() {
        var mapView = MapView.getInstance();
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
    },
    getType: function() {
        return this._type;
    },
    getID: function() {
        return this._id;
    }
});