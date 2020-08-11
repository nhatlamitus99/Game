// this variables will be used for moving object
var selectedGroup = new MovingGroup(null, null, null, null, MapConfig.NULL_CELL.type, null);

var MapView = cc.Layer.extend({
    _map:null,

    // on client
    _scale: null,                           // scale of current screen view map
    _mapOriginSize: null,                   // size of screen after the first scaling
    _matrixMap: null,                       // matrixMap (matrix of cell)
    _objectMgrView: null,                   // manager of object
    _troopMgrView: null,                    // troop manager
    _arrowMove: null,                       // arrow Moving which are used for moving

    _movingSpeed: {                         // using for smoothly action
        x: 0,
        y: 0,
        unitX: 0,                           // x -= unitX each frame
        unitY: 0                            // y -= unitY each frame
    },
    _scalingSpeed: 0,                       // acceleration of Zoom screen

    // Using for synchronize
    _flagOfEditMovingSpeed: false,          // boolean value: true-touching, false- no touch
    _flagOfMovingScreen: false,             // boolean value: true-screen was moving, false-screen was not moving

    _troop_batches: null,

    ctor:function() {
        this._super();
        //this.giaLapLoadListObject();
        this._objectMgrView = new ObjectMgrView();
        //this._troopMgr = new ..
        this.loadMapGUI();
        this.buildTroopBatches();
        this.setUserActions();

        this.schedule(this.updatePerFrame);
    },

    //onEnter: function() {
    //},
    loadMapGUI: function() {
        // load map's sprite from MainScene.json
        this.loadMapAndMatrixMap();
        // load buildings, substructures & troop to map
        this.loadBuilding();
        this.loadTroops();
        // load Arrow Move
        this.loadArrowMove();
    },
    buildTroopBatches: function()
    {
        this._troop_batches = [];
        for (var i = 0; i <= 3; i++)
        {
            var node = new cc.Node();
            this._map.addChild(node);

            this._troop_batches[i] = node;
        }
    },
    updatePerFrame: function() {
        this.moveMapPerFrame();
        this.zoomMapPerFrame();
    },
    moveMapPerFrame: function() {
        if (!this._flagOfEditMovingSpeed && !this._flagOfMovingScreen) {
            if (Math.abs(this._movingSpeed.x) > Math.abs(this._movingSpeed.unitX)*MapConfig.MOVING_ACCELERATION_ALPHA)
                this._movingSpeed.x -= this._movingSpeed.unitX;
            else
                this._movingSpeed.x = 0;
            if (Math.abs(this._movingSpeed.y) > Math.abs(this._movingSpeed.unitY)*MapConfig.MOVING_ACCELERATION_ALPHA)
                this._movingSpeed.y -= this._movingSpeed.unitY;
            else
                this._movingSpeed.y = 0;
            this.moveMap(this._movingSpeed);
        }
    },
    zoomMapPerFrame: function() {

    },
    loadMapAndMatrixMap: function() {
        var node = ccs.load(res.map.tmx_map, '').node;
        ccui.Helper.doLayout(node);
        node.setAnchorPoint(0.5, 0.5);
        node.setPosition(cc.winSize.width/2, cc.winSize.height/2);
        // set scale
        MapConfig.MIN_SCALE = Math.max(cc.winSize.width/node.width, cc.winSize.height/node.height);
        this._scale = MapConfig.MIN_SCALE;
        node.setScale(this._scale);
        this.addChild(node);
        this._map = node;
        // add save origin size
        this._mapOriginSize = {
            w: this.scale*node.width,
            h: this.scale*node.height
        };
        // get matrixMap (matrix of cells)
        var panel = ccui.helper.seekWidgetByName(node, res.map.name_node_has_matrix_map);
        this._matrixMap = panel.getChildren()[0];
    },

    loadBuilding: function() {
        var objectMgrData = this.getObjectMgrData();
        var listObject = this.getListObjectView();
        var listSubs = this.getListObjectSubs();
        // add object to map
        for (var i = 0; i < listObject.length; ++i) {
            for (var j = 0; j < listObject[i].length; ++j) {
                // calculate Position
                var region = objectMgrData.getRegionOfObject(listObject[i][j].getType(), listObject[i][j].getID());
                cc.log("loadBuilding, type - id = " + listObject[i][j].getType() + listObject[i][j].getID());
                // addChild and set ZOrder
                var zOrder = this.calculateZOrderOfRegion(region);
                this._map.addChild(listObject[i][j], zOrder);
                this._map.addChild(listSubs[i][j], MapConfig.Z_ORDER_SUBSTRUCTURE);
                // set position
                this.setPositionObjectSubs(listObject[i][j], listSubs[i][j], region);
            }
        }
    },

    setPositionObjectSubs: function(object, subs, region) {
        var posCenter = this.getCenterPosOfRegion(region);
        object.x = posCenter.x;
        object.y = posCenter.y;
        subs.x = posCenter.x;
        subs.y = posCenter.y;
    },

    loadArrowMove: function() {
        this._arrowMove = new ArrowMove();
        this._map.addChild(this._arrowMove, MapConfig.Z_ORDER_ARROW);
    },

    calculateZOrderOfRegion: function(region) {
        return MapConfig.MAX_Z_ORDER_OBJECT - region.i*2 - region.j*2 - region.w - region.h;
    },

    getListObjectView: function() {
        return this._objectMgrView.getListObject();
    },

    getListObjectSubs: function () {
        return this._objectMgrView.getListSubs();
    },

    getObjectMgrData: function() {
        return ObjectMgrData.getInstance();
    },

    loadTroops: function(){
        return true;
    },

    setUserActions: function() {
        // set Touch
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ALL_AT_ONCE,
            swallowTouches: true,
            onTouchesBegan: this.onTouchesBegan.bind(this),
            onTouchesMoved: this.onTouchesMoved.bind(this),
            onTouchesEnded: this.onTouchesEnded.bind(this)
        }, this);
        // set Mouse Scroll
        if ('mouse' in cc.sys.capabilities) {
            cc.eventManager.addListener({
                    event: cc.EventListener.MOUSE,
                    swallowTouches: true,
                    onMouseScroll: function (event) {
                        var delta = -event.getScrollY()/MapConfig.ZOOM_MAX_DELTA;
                        //cc.log("On Mouse Scroll: ", delta);
                        event.getCurrentTarget().setScaleMap(delta, event.getLocation());
                        return true;
                    }
                }
                , this
            );
        }
    },

    setScaleMap: function(delta, touch) {
        if (this._scale + delta > MapConfig.MAX_SCALE)
            delta = 0;
        if (this._scale + delta < MapConfig.MIN_SCALE)
            delta = 0;
        this._scale += delta;
        // calculate newPoint (touchPoint after scaling)
        // Algorithm: transform the point, which is touched by mouse, from Screen's coordinate to Map's coordinate
        // then, we scale screen and set the newPoint at position of our mouse.
        var scale = this._scale;
        var map = this._map;
        var originSize = this._mapOriginSize;
        var newPoint;
        newPoint = {
            x: (touch.x - map.x + originSize.w * (scale - delta) / 2) / (scale - delta) * (scale) - originSize.w * (scale) / 2 + map.x,
            y: (touch.y - map.y + originSize.h * (scale - delta) / 2) / (scale - delta) * (scale) - originSize.h * (scale) / 2 + map.y
        };
        // scale map and move map in screen
        map.setScale(scale);
        if (map.x + map.width/2*scale < cc.winSize.width)
            map.x = cc.winSize.width - map.width/2*scale;
        if (map.x - map.width/2*scale > 0)
            map.x = map.width/2*scale;
        if (map.y + map.height/2*scale < cc.winSize.height)
            map.y = cc.winSize.height - map.height/2*scale;
        if (map.y - map.height/2*scale > 0)
            map.y = map.height/2*scale;
        // move to newPoint
        var distance = {
            x: -newPoint.x + touch.x,
            y: -newPoint.y + touch.y
        };
        this.moveMap(distance);
    },

    onTouchesBegan: function (touches) {
        this._flagOfEditMovingSpeed = true;
        this._movingSpeed.x = 0;
        this._movingSpeed.y = 0;
        this._flagOfEditMovingSpeed = false;

        var cell = this.getCellInMatrixMap(touches[0].getLocation());
        if (!selectedGroup.isNULL())
            if (selectedGroup.hasCell(cell)) {
                selectedGroup.showMovingSubs();
                selectedGroup.flagOfMove = true;
            }
        return true;
    },

    setGroupFromTouch: function(group, touches){
        var mapData = MapData.getInstance();
        var cell = this.getCellInMatrixMap(touches[0].getLocation());
        var typeID = mapData.getTypeIDFromCell(cell);
        var objectData = mapData.getObjectFromTypeID(typeID.type, typeID.id);
        var region = null, oldRegion = null;
        if (objectData != null) {
            region = {i: objectData.position.i, j: objectData.position.j, h: objectData.size.h, w: objectData.size.w};
            oldRegion = {i: objectData.position.i, j: objectData.position.j, h: objectData.size.h, w: objectData.size.w};
        }
        // set currGroup
        group.setAttributes(
            this.getSubsFromTypeID(typeID.type, typeID.id),
            this.getObjectFromTypeID(typeID.type, typeID.id),
            oldRegion,
            region,
            typeID.type,
            typeID.id
        );
        group.setArrow(this._arrowMove);
        //cc.log("cell: " + cell.i + " " + cell.j);
        //cc.log("create currentGroup " + typeID.type + " " + typeID.id);
        //if (region != null)
        //    cc.log("current Region " + region.i + " " + region.j + " " + region.w + " " + region.h);
    },

    onTouchesMoved: function(touches) {
        this._flagOfMovingScreen = true;
        var cell = this.getCellInMatrixMap(touches[0].getLocation());
        if (!selectedGroup.isNULL()) {
            if (selectedGroup.flagOfMove) {
                selectedGroup.goTo(cell);
                return true;
            }
        }
        this.moveMapAndSetVelocity(touches[0].getDelta());
        return true;
    },

    moveMapAndSetVelocity: function(delta) {
        this._flagOfEditMovingSpeed = true;
        this.moveMap(delta);
        // copy accelerationMoving
        this._movingSpeed.x = delta.x;
        this._movingSpeed.y = delta.y;
        this._movingSpeed.unitX = delta.x * MapConfig.MOVING_ACCELERATION;
        this._movingSpeed.unitY = delta.y * MapConfig.MOVING_ACCELERATION;
        this._flagOfEditMovingSpeed = false;
    },

    onTouchesEnded: function(touches) {
        var mapData = MapData.getInstance();
        selectedGroup.flagOfMove = false;
        if (this._flagOfMovingScreen == true) {
            this._flagOfMovingScreen = false;
            cc.log("Touch end with moving");
            if (!selectedGroup.isNULL())
                if (!mapData.checkOverlap(selectedGroup._newRegion, {type:selectedGroup._type, id:selectedGroup._id})) {
                    selectedGroup.showNormalSubs();
                    cc.log("move object1:");
                    mapData.moveObject(selectedGroup._oldRegion, selectedGroup._newRegion, {type:selectedGroup._type, id:selectedGroup._id});
                    selectedGroup.updateOldRegion();
                }
        }
        else {
            if (!selectedGroup.isNULL()) {
                if (!mapData.checkOverlap(selectedGroup._newRegion, {type:selectedGroup._type, id:selectedGroup._id})) {
                    selectedGroup.showNormalSubs();
                    cc.log("move object2:");
                    mapData.moveObject(selectedGroup._oldRegion, selectedGroup._newRegion, {type:selectedGroup._type, id:selectedGroup._id});
                    selectedGroup.updateOldRegion();
                } else {
                    selectedGroup.goBack();
                    selectedGroup.revertNewRegion();
                }
            }
            this.setGroupFromTouch(selectedGroup, touches);
        }
        return true;
    },

    moveMap: function(delta) {
        var map = this._map;
        delta = this.getDeltaMovingMap(delta);
        map.x += delta.x;
        map.y += delta.y;
    },

    getDeltaMovingMap: function(delta) {
        var map = this._map;
        var scale = this._scale;
        if (map.x + map.width/2*scale + delta.x <= cc.winSize.width)
            delta.x = 0;
        if (map.x - map.width/2*scale + delta.x >= 0)
            delta.x = 0;
        if (map.y + map.height/2*scale + delta.y <= cc.winSize.height)
            delta.y = 0;
        if (map.y - map.height/2*scale + delta.y >= 0)
            delta.y = 0;
        return delta;
    },

    getCellInMatrixMap: function(location) {
        // convert coordinate of touch to matrixMap's coordinate
        var tmp = this.transformScreenToMap(location);
        var t = this.transformMapToMMap(tmp);
        //cc.log(" getCellInMatrixMap, point= " + t.x + " " + t.y);
        // the formula here: https://stackoverflow.com/questions/39729815/converting-screen-coordinates-to-isometric-map-coordinates
        // 'MapConfig.MAP_SIZE.h/4' because isometric 's width is overlap if we if we look it in the vertical axis.
        var titleH = MapConfig.getCellSize().h*this._scale;
        var titleW = MapConfig.getCellSize().w*this._scale;
        var result = {
            i: Math.floor(((t.x-titleW*MapConfig.MAP_SIZE.w/4)/(titleW/2) + t.y/(titleH/2))),
            j: Math.floor((-(t.x-titleW*MapConfig.MAP_SIZE.w/4)/(titleW/2) + t.y/(titleH/2)))
        };
        //if (result.i < 0 || result.i >= MapConfig.MAP_SIZE.w)
        //    return null;
        //if (result.j < 0 || result.j >= MapConfig.MAP_SIZE.h)
        //    return null;
        return result;
    },

    getPosOfRegion: function(cell) {
        var titleH = MapConfig.getCellSize().h;
        var titleW = MapConfig.getCellSize().w;
        var location = {
            x: (cell.i - cell.j)*titleW/4 + titleW*MapConfig.MAP_SIZE.w/4,// because of a column is overlap 50% with another column (2 side: left and right)
            y: (cell.i + cell.j)*titleH/4
        };
        // convert coordinate of touch to matrixMap's coordinate
        // cc.log("test getPosOfRegion - matrixMap", location.x + " " + location.y);
        return this.transformLocationMatrixMapToMap(location);
    },

    getCenterPosOfRegion: function(region) {
        var posBot = this.getPosOfRegion(region);
        var posTop = this.getPosOfRegion({i: region.i + region.w, j: region.j + region.h});
        return {x: (posBot.x + posTop.x)/2, y: (posBot.y + posTop.y)/2};
    },

    // location: matrix map -> screen
    //transformMMapToScreen: function(location) {
    //    var result = {};
    //    var map = this._map;
    //    var mapSize = this._mapOriginSize;
    //    var matrixMap = this._matrixMap;
    //    var scale = this._scale;
    //    // from matrixMap to map
    //    result.x = location.x + matrixMap.x*scale;
    //    result.y = location.y + matrixMap.y*scale;
    //    // from map to Screen
    //    result.x += map.x - mapSize.w*scale/2;
    //    result.y += map.y - mapSize.h*scale/2;
    //    return result;
    //},
    // location: MatrixMap -> map
    transformLocationMatrixMapToMap: function(location) {
        var result = {};
        var matrixMap = this._matrixMap;
        // from matrixMap to map
        result.x = location.x + matrixMap.x;
        result.y = location.y + matrixMap.y;
        return result;
    },
    // location: screen->Map
    transformScreenToMap: function(location) {
        var result = {};
        var map = this._map;
        var mapSize = this._mapOriginSize;
        var scale = this._scale;
        result.x = location.x - map.x + mapSize.w*scale/2;
        result.y = location.y - map.y + mapSize.h*scale/2;
        return result;
    },
    // location: Map->MatrixMap
    transformMapToMMap: function(location){
        var result = {};
        var matrixMap = this._matrixMap;
        var scale = this._scale;
        result.x = location.x - matrixMap.x*scale;
        result.y = location.y - matrixMap.y*scale;
        return result;
    },

    getObjectFromTypeID: function(type, id) {
        if (type == MapConfig.NULL_CELL.type)
            return null;
        return this._objectMgrView.getObjectFromTypeID(type, id);
    },
    getSubsFromTypeID: function(type, id) {
        if (type == MapConfig.NULL_CELL.type)
            return null;
        return this._objectMgrView.getSubsFromTypeID(type, id);
    },
    // get center location of object in map
    showObjectInMap: function(objectView, cell) {

    },
    addTroop: function(troop_type, troop_view, zorder)
    {
        this._troop_batches[troop_type].addChild(troop_view, zorder);
    }
});

var MAP_VIEW_ONLY_ONE = null;
MapView.getInstance = function(){
    if(MAP_VIEW_ONLY_ONE == null){
        MAP_VIEW_ONLY_ONE = new MapView();
    }

    return MAP_VIEW_ONLY_ONE;
};