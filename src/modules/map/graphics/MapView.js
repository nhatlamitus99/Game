var MapView = cc.Layer.extend({
    _map:null,

    // on client
    _scale: null,   // scale of current screen view map
    _mapOriginSize: null,   // size of screen after the first scaling
    _matrixMap: null,   // matrixMap (matrix of cell)
    _objectMgrView: null,   // manager of object
    _troopMgrView: null, // troop manager

    // using for smoothly action
    _movingSpeed: {    // acceleration of Moving screen
        x: 0,
        y: 0,
        unitX: 0,   // x -= unitX each frame
        unitY: 0    // y -= unitY each frame
    },
    _scalingSpeed: 0,   // acceleration of Zoom screen

    // Using for synchronize
    _flagOfEditMovingSpeed: false,   // boolean value: true-touching, false- no touch
    _flagOfMovingScreen: false, // boolean value: true-screen was moving, false-screen was not moving

    ctor:function() {
        this._super();
        //this.giaLapLoadListObject();
        this._objectMgrView = new ObjectMgrView();
        //this._troopMgr = new ..
        this.loadMapGUI();
        this.setUserActions();
        this.schedule(this.updatePerFrame);
    },

    //onEnter: function() {
    //},
    loadMapGUI: function() {
        // load map's sprite from MainScene.json
        this.loadMapAndMatrixMap();
        // load building & troop to map
        this.loadBuilding();
        this.loadTroops();
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
        // add object to map
        for (var i = 0; i < listObject.length; ++i) {
            for (var j = 0; j < listObject[i].length; ++j) {
                var cell = objectMgrData.getCellOfObject(listObject[i][j].getType(), listObject[i][j].getID());
                cc.log("loadBuilding, type - id = " + listObject[i][j].getType() + listObject[i][j].getID());
                var posBot = this.getPosOfCell(cell);
                var posTop = this.getPosOfCell({
                    i: cell.i + cell.w,
                    j: cell.j + cell.h
                });
                listObject[i][j].scale = this._scale;
                this._map.addChild(listObject[i][j], 15);
                listObject[i][j].x = (posBot.x + posTop.x) / 2;
                listObject[i][j].y = (posBot.y + posTop.y) / 2;
            }
        }
    },
    getListObjectView: function() {
        return this._objectMgrView.getListObject();
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
                        var delta = -event.getScrollY()/MapConfig.ZOOM_MAXDELTA;
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
        var originSize= this._mapOriginSize;
        var newPoint = {
            x: (touch.x - map.x + originSize.w*(scale-delta)/2)/(scale-delta)*(scale) - originSize.w*(scale)/2 + map.x,
            y: (touch.y - map.y + originSize.h*(scale-delta)/2)/(scale-delta)*(scale) - originSize.h*(scale)/2 + map.y
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
        this._map.stopAllActions();
        this._movingSpeed.x = 0;
        this._movingSpeed.y = 0;
        this._flagOfEditMovingSpeed = false;
        return true;
    },

    onTouchesMoved: function(touches) {
        this._flagOfMovingScreen = true;
        this._flagOfEditMovingSpeed = true;
        var touch = touches[0];
        var delta = touch.getDelta();
        this.moveMap(delta);
        // copy accelerationMoving
        this._movingSpeed.x = delta.x;
        this._movingSpeed.y = delta.y;
        this._movingSpeed.unitX = delta.x * MapConfig.MOVING_ACCELERATION;
        this._movingSpeed.unitY = delta.y * MapConfig.MOVING_ACCELERATION;
        this._flagOfEditMovingSpeed = false;
        return true;
    },

    onTouchesEnded: function(touches) {
        // if screen moving -> no select object;
        if (this._flagOfMovingScreen == true) {
            this._flagOfMovingScreen = false;
        } else { // else select object at touch's position
            var touchLocation = touches[0].getLocation();
            // get cell in matrixMap
            var cell = this.getCellInMatrixMap(touchLocation);
            if (cell != null) {
                // get object's type-id from MapLogic
                var mapData = MapData.getInstance();
                var typeID = mapData.getTypeIDFromCell(cell);
                cc.log("Cell: (i,j)= " + cell.i + " " + cell.j + " ; type-id: " + typeID.type + " " + typeID.id);
                // get objectView from ObjectMgr
                // ...
            } else {
                cc.log("No cell in this position");
            }
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
        var titleH = MapConfig.getCellSize().h*this._scale;
        var titleW = MapConfig.getCellSize().w*this._scale;
        // convert coordinate of touch to matrixMap's coordinate
        var t = this.transformLocationScreenToMatrixMap(location);
        //cc.log(" getCellInMatrixMap, point= " + t.x + " " + t.y);
        // the formula here: https://stackoverflow.com/questions/39729815/converting-screen-coordinates-to-isometric-map-coordinates
        // 'MapConfig.MAP_SIZE.h/4' because isometric 's width is overlap if we if we look it in the vertical axis.
        var result = {
            i: Math.floor(((t.x-titleW*MapConfig.MAP_SIZE.w/4)/(titleW/2) + t.y/(titleH/2))),//Math.floor((t.y)/(titleH)+(t.x)/(2*titleW)),
            j: Math.floor((-(t.x-titleW*MapConfig.MAP_SIZE.w/4)/(titleW/2) + t.y/(titleH/2)))//Math.floor((t.y)/(titleH)-(t.x)/(2*titleW))
        };
        if (result.i < 0 || result.i >= MapConfig.MAP_SIZE.w)
            return null;
        if (result.j < 0 || result.j >= MapConfig.MAP_SIZE.h)
            return null;
        return result;
    },

    getPosOfCell: function(cell) {
        var titleH = MapConfig.getCellSize().h;
        var titleW = MapConfig.getCellSize().w;
        var location = {
            x: (cell.i - cell.j)*titleW/4 + titleW*MapConfig.MAP_SIZE.w/4,// because of a column is overlap 50% with another column (2 side: left and right)
            y: (cell.i + cell.j)*titleH/4
        };
        // convert coordinate of touch to matrixMap's coordinate
        // cc.log("test getPosOfCell - matrixMap", location.x + " " + location.y);
        return this.transformLocationMatrixMapToMap(location);
    },

    transformLocationMatrixMapToScreen: function(location) {
        var result = {};
        var map = this._map;
        var mapSize = this._mapOriginSize;
        var matrixMap = this._matrixMap;
        var scale = this._scale;
        // from matrixMap to map
        result.x = location.x + matrixMap.x*scale;
        result.y = location.y + matrixMap.y*scale;
        // from map to Screen
        result.x += map.x - mapSize.w*scale/2;
        result.y += map.y - mapSize.h*scale/2;
        return result;
    },

    transformLocationMatrixMapToMap: function(location) {
        var result = {};
        var matrixMap = this._matrixMap;
        // from matrixMap to map
        result.x = location.x + matrixMap.x;
        result.y = location.y + matrixMap.y;
        return result;
    },

    transformLocationScreenToMatrixMap: function(location) {
        var result = {};
        var map = this._map;
        var mapSize = this._mapOriginSize;
        var matrixMap = this._matrixMap;
        var scale = this._scale;
        // from screen to map
        result.x = location.x - map.x + mapSize.w*scale/2;
        result.y = location.y - map.y + mapSize.h*scale/2;
        // from map to matrixMap
        result.x -= matrixMap.x*scale;
        result.y -= matrixMap.y*scale;
        return result;
    }
});


var MAP_ONLY_ONE = null;

MapView.getInstance = function(){
    if(MAP_ONLY_ONE == null){
        MAP_ONLY_ONE = new MapView();
    }

    return MAP_ONLY_ONE;
}