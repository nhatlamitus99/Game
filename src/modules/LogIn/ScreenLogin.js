var ScreenLogin = cc.Layer.extend({
    background:null,
    loginBox:null,
    logo:null,
    btnOk:null,
    loading:null,
    loading2:null,

    ctor:function() {
        this._super();
        cc.associateWithNative(this, cc.Layer);
        this.init();
    },
    init: function(){
        // set background
        this.background = new cc.Scale9Sprite(resLogin.BACKGROUND_VER_3);
        this.addChild(this.background,0);
        this.background.x = cc.winSize.width/2;
        this.background.y = cc.winSize.height/2;
        this.background.scaleX = LOGIN_CONFIG.SCALE_BACKGROUND_X;
        this.background.scaleY = LOGIN_CONFIG.SCALE_BACKGROUND_Y;


        //// user name edit box
        this.loginBox = new cc.EditBox(cc.size(LOGIN_CONFIG.LOGIN_BOX_WIDTH, LOGIN_CONFIG.LOGIN_BOX_HEIGHT), new cc.Scale9Sprite(resLogin.LOGIN_BOX));
        this.loginBox.setPlaceHolder("Username");
        this.loginBox.setPlaceholderFontColor(cc.color(255, 0, 0));
        this.loginBox.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
        this.loginBox.x = LOGIN_CONFIG.LOGIN_BOX_X;
        this.loginBox.y = LOGIN_CONFIG.LOGIN_BOX_Y;
        this.loginBox.setFontColor(cc.color(255, 0, 0));
        this.loginBox.setDelegate(this);
        this.addChild(this.loginBox,1);


        // set logo
        this.logo = new cc.Scale9Sprite(resLogin.LOGO);
        this.addChild(this.logo,1);
        this.logo.x = LOGIN_CONFIG.LOGO_X;
        this.logo.y = LOGIN_CONFIG.LOGO_Y;

        // OK Button
        this.btnOk = gv.commonButton1(resLogin.OK_BUTTON,
            LOGIN_CONFIG.OK_BUTTON_WIDTH, LOGIN_CONFIG.OK_BUTTON_HEIGHT, LOGIN_CONFIG.OK_BUTTON_X, LOGIN_CONFIG.OK_BUTTON_Y,"Login");
        this.btnOk.addClickEventListener(this.onSelectLogin.bind(this));
        this.addChild(this.btnOk,2);

        // loading
        this.loading = new cc.Scale9Sprite(resLogin.LOADING_BACKGROUND_BAR);
        this.addChild(this.loading,1);
        this.loading.x = LOGIN_CONFIG.LOADING_X;
        this.loading.y = LOGIN_CONFIG.LOADING_Y;
    },
    onSelectLogin:function()
    {
        var user = User.getInstance();
        user.setUsername("username_" + this.loginBox.string);
        user.setUID(parseInt(this.loginBox.string));
        cc.log("Start Connect!");
        gv.gameClient.connect();
    },
    onConnectSuccess:function()
    {
        cc.log("Connect Success!");
    },
    onConnectFail:function(text)
    {
        cc.log("Connect fail: " + text);
    },
    onFinishLogin:function()
    {
        cc.log("Finish Login !!!");
    },
    onUserInfo:function(name, gameInfo)
    {
        //cc.log("game data: " + gameInfo);
        var gameData = GameData.getInstance();
        gameData.loadDataFromServer(gameInfo);
        // on loading
        this.loading2 = new ccui.LoadingBar(resLogin.LOADING_BAR, 0);
        this.loading2.setDirection(ccui.LoadingBar.TYPE_LEFT);
        this.addChild(this.loading2,2);
        this.loading2.x = LOGIN_CONFIG.LOADING_X;
        this.loading2.y = LOGIN_CONFIG.LOADING_Y;

        this.schedule(this.doLoadingBar, 0.02);
    },

    // schedule properties
    doLoadingBar:function(){
        var percent = this.loading2.getPercent();
        percent = percent + 100;
        this.loading2.setPercent(percent);
        if(percent >= 100){
            this.unschedule(this.doLoadingBar);
            fr.view(GameScreen);
        }
    }

});
