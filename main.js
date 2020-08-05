
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
        //if(ratio < 2){
        //    cc.view.setDesignResolutionSize(DESIGN_RESOLUTION_WIDTH,DESIGN_RESOLUTION_HEIGHT, cc.ResolutionPolicy.FIXED_HEIGHT);
        //}else{
        //    cc.view.setDesignResolutionSize(DESIGN_RESOLUTION_WIDTH,DESIGN_RESOLUTION_WIDTH/2, cc.ResolutionPolicy.SHOW_ALL);
        //}
        cc.view.setDesignResolutionSize(DESIGN_RESOLUTION_WIDTH,DESIGN_RESOLUTION_WIDTH/2, cc.ResolutionPolicy.SHOW_ALL);

        // The game will be resized when browser size change
        cc.view.resizeWithBrowserSize(true);
        //socket
        gv.gameClient = new GameClient();
        gv.poolObjects = new PoolObject();
        
        // testing area

        // test mapData
        //var mapData = new MapData();
        //mapData.customInit();
        //mapData.insertObject2Map(0, 0, 3, 3, 1, 1);
        //cc.log(mapData.checkOverlap(0, 0, 3, 3));

        // test resources
        //var resources = new ResourcesData([0, 0, 0]);
        //cc.log("increase Resources", resources.increaseResources([100, 100, 100]));
        //cc.log("decrease Resources", resources.decreaseResources([101, 100, 100]));
        //cc.log(resources.getResources());
        loginNetwork.connector = new loginNetwork.Connector(gv.gameClient);

        //fr.view(Lobby);
        // view mainScreen
         fr.view(GameScreen);
    }, this);
};
cc.game.run();