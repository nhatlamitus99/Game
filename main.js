
var gv = gv || {};

var DESIGN_RESOLUTION_WIDTH = 1136;
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

        // create new GameClass and class Logic
        var gameData = GameData.getInstance();
        // load data from server and add it to game Data
        var user = User.getInstance();
        var objectMgrData = ObjectMgrData.getInstance();
        // make mapData
        var mapData = MapData.getInstance();
        mapData.customInit();
        mapData._objectMgrData = objectMgrData;
        if (mapData.insertObject2Map({
            type: OBJECT_MGR_CONFIG.buildingType.mapObject,
            position: {i: 15, j: 15},
            size: {h: 4, w: 4}}) == false)
            cc.log("adding object 1 to mapData false");
        if (mapData.insertObject2Map({
                type: OBJECT_MGR_CONFIG.buildingType.mapObject,
                position: {i: 11, j: 11},
                size: {h: 4, w: 4}}) == false)
            cc.log("adding object 2 to mapData false");

        var resourcesData = ResourcesData.getInstance();
        resourcesData.setAttributes([0,0,0]);

        gameData.setAttributes(user, resourcesData, mapData, objectMgrData, null, null);
        // view mainScreen
         fr.view(GameScreen);
    }, this);
};

cc.game.run();