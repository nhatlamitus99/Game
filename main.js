
var gv = gv || {};

var DESIGN_RESOLUTION_WIDTH = 960;
var DESIGN_RESOLUTION_HEIGHT = 640;

cc.game.onStart = function () {
    if (!cc.sys.isNative && document.getElementById("cocosLoading")) //If referenced loading.js, please remove it
        document.body.removeChild(document.getElementById("cocosLoading"));
    // Pass true to enable retina display, disabled by default to improve performance
    cc.view.enableRetina(true);
    // Adjust viewport meta
    cc.view.adjustViewPort(true);
    jsb.fileUtils.addSearchPath(fr.NativeService.getFolderUpdateAssets(), true);
    jsb.fileUtils.addSearchPath(fr.NativeService.getFolderUpdateAssets() + "/res", true);
    cc.loader.resPath = "res";
    cc.LoaderScene.preload(g_resources, function () {
        //hide fps
        cc.director.setDisplayStats(true);
        // Setup the resolution policy and design resolution size
        var frameSize = cc.view.getFrameSize();
        var ratio = frameSize.width/frameSize.height;

        if(ratio < 2){
            cc.view.setDesignResolutionSize(DESIGN_RESOLUTION_WIDTH,DESIGN_RESOLUTION_HEIGHT, cc.ResolutionPolicy.FIXED_HEIGHT);
        }else{
            cc.view.setDesignResolutionSize(DESIGN_RESOLUTION_WIDTH,DESIGN_RESOLUTION_WIDTH/2, cc.ResolutionPolicy.SHOW_ALL);
        }

        // The game will be resized when browser size change
        cc.view.resizeWithBrowserSize(true);
        //socket
        gv.gameClient = new GameClient();
        gv.poolObjects = new PoolObject();
        loginNetwork.connector = new loginNetwork.Connector(gv.gameClient);

        //// make mapData
        //var mapData = MapData.getInstance();
        //var objectMgrData = ObjectMgrData.getInstance();
        //mapData.customInit();
        //mapData._objectMgrData = objectMgrData;
        //if (mapData.insertObject2Map({
        //        type: OBJECT_MGR_CONFIG.buildingType.mapObject,
        //        position: {i: 0, j: 0},
        //        size: {h: 2, w: 2}}) == false
        //) cc.log("adding object 1 to mapData false");
        //if (mapData.insertObject2Map({
        //        type: OBJECT_MGR_CONFIG.buildingType.mapObject,
        //        position: {i: 4, j: 0},
        //        size: {h: 4, w: 4}}) == false
        //) cc.log("adding object 2 to mapData false");
        //if (mapData.insertObject2Map({
        //        type: OBJECT_MGR_CONFIG.buildingType.mapObject,
        //        position: {i: 0, j: 4},
        //        size: {h: 3, w: 3}}) == false
        //) cc.log("adding object 3 to mapData false");
        //if (mapData.insertObject2Map({
        //        type: OBJECT_MGR_CONFIG.buildingType.mapObject,
        //        position: {i: 4, j: 4},
        //        size: {h: 5, w: 5}}) == false
        //) cc.log("adding object 4 to mapData false");
        //if (mapData.insertObject2Map({
        //        type: OBJECT_MGR_CONFIG.buildingType.mapObject,
        //        position: {i: 3, j: 3},
        //        size: {h:1, w:1}}) == false
        //) cc.log("adding object 5 to mapData false");

        // load Config
        CONFIG_DATA.load();

        // view mainScreen
        fr.view(ScreenLogin);
    }, this);
};

cc.game.run();