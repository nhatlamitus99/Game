var MapView = cc.Layer.extend({
    _map:null,
    // on client
    _scale: null,   // scale of current screen view map
    _mapOriginSize: null,   // size of screen after the first scaling
    _matrixMap: null,   // matrixMap (matrix of cell)

    ctor:function() {
        this._super();
        this.loadMapGUI();
        this.setUserActions();
        //this.testGetCellAndGetLocationFunctions(); // this function is used for testing
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
        // gia lap du lieu lay tu objectView
        var object = {
            sprite: new cc.Sprite('content/Art/Map/map_obj_bg/GRASS_3_Island.png'),
            i: 8,
            j: 2,
            h: 3,
            w: 3
        };
        var listObject = [object];
        // add object to map
        for (var i = 0; i < listObject.length; ++i) {
            var posBot = this.getPosOfCell(listObject[i]);
            var posTop = this.getPosOfCell(
                {
                    i:listObject[i].i+listObject[i].w,
                    j:listObject[i].j+listObject[i].h
                });
            var resPos = {
                x: (posBot.x + posTop.x)/2,
                y: (posBot.y + posTop.y)/2
            };
            this._map.addChild(listObject[i].sprite, 15);
            listObject[i].sprite.x = resPos.x;
            listObject[i].sprite.y = resPos.y;

        }
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
            onTouchesEnd: this.onTouchesEnd.bind(this)
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
        var touchLocation = touches[0].getLocation();
        // get cell in matrixMap
        var idOfCell = this.getCellInMatrixMap(touchLocation);
        if (idOfCell != null)
            cc.log("Cell: (i,j)= " + idOfCell.i + " " + idOfCell.j);
        else
            cc.log("No cell in this position");
        return true;
    },

    onTouchesMoved: function(touches) {
        var touch = touches[0];
        this.moveMap(touch.getDelta());
        return true;
    },

    onTouchesEnd: function(touches) {
        return true;
    },

    moveMap: function(delta) {
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
        //cc.log("sum", map.y + map.height/2*scale + delta.y);
        //cc.log("winsize", cc.winSize.height);
        map.x += delta.x;
        map.y += delta.y;
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