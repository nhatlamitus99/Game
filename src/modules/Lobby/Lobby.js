var width =  cc.view.getFrameSize().width;
var height = cc.view.getFrameSize().height;



var Lobby  = cc.Layer.extend({
    user:{
        panel:null,
        username: null,
        avatar:null,
        bg_exp_bar:null,
        exp_bar:null,
        icon_exp:null,
        exp:null,
        level:null,
        rank_bar:null,
        rank_icon:null,
        rank:null
    },
    battle:{
        panel:null,
        attack:null,
        guild:null,
        guild_battle:null
    },
    utils:{
        panel:null,
        shop:null,
        friends:null,
        setting:null,
        kho:null
    },
    resources:{
        bg_gold_bar:null,
        gold_bar:null,
        gold_icon:null,
        curr_gold:null,
        max_gold:null,
        bg_elixir_bar:null,
        elixir_bar:null,
        elixir_icon:null,
        curr_elixir:null,
        max_elixir:null,
        bg_g_bar:null,
        g_bar:null,
        g_icon:null,
        curr_g:null,
        add_g:null
    },
    info_game:{
        army_label:null,
        army_bg_bar:null,
        army_icon:null,
        army_add:null,
        army_info:null,
        builder_label:null,
        builder_bg_bar:null,
        builder_icon:null,
        builder_add:null,
        builder_info:null,
        shield_label:null,
        shield_bg_bar:null,
        shield_icon:null,
        shield_add:null,
        shield_info:null
    },
    ctor:function(){
        this._super();
        this.init();
    },
    init:function(){
        cc.log(width + " : " + height);
        this.setUser();
        this.setBattle();
        this.setUtils();
        this.setResources();
        this.setGameInfo();
    },
    setUser:function(){
        // set panel
        this.user.panel = new cc.LayerColor(cc.color(0,0,0,0),width*0.3, height/3);
        this.addChild(this.user.panel,0);
        this.user.panel.x = 0;
        this.user.panel.y = height*2/3;
        // username
        this.user.username = gv.lobbyLabel("Username",this.user.panel.width*0.55,this.user.panel.height*0.8);
        this.user.panel.addChild(this.user.username,3);
        // avatar
        this.user.avatar = new cc.Sprite(); this.user.avatar.initWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame(lobby_resources.BG_EXP));
        this.user.panel.addChild(this.user.avatar,5);
        this.user.avatar.x = this.user.panel.width/5;
        this.user.avatar.y = this.user.panel.height/2;
        this.user.avatar.scaleX = 1.3;
        this.user.avatar.scaleY = 1.3;
        // exp bar
        this.user.bg_exp_bar = new cc.Sprite(); this.user.bg_exp_bar.initWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame(lobby_resources.EXP_BG_BAR));
        this.user.bg_exp_bar.x = this.user.panel.width/2;
        this.user.bg_exp_bar.y = this.user.panel.height*0.6;
        this.user.bg_exp_bar.scaleX = 1.5;
        this.user.panel.addChild(this.user.bg_exp_bar,1);
        this.user.exp_bar = new ccui.LoadingBar("GUIs/Main_Gui/" + lobby_resources.EXP_BAR, 50);
        this.user.exp_bar.setDirection(ccui.LoadingBar.TYPE_LEFT);
        this.user.exp_bar.x = this.user.panel.width/2;
        this.user.exp_bar.y = this.user.panel.height*0.6;
        this.user.exp_bar.scaleX = 1.5;
        this.user.panel.addChild(this.user.exp_bar,2);
        this.user.icon_exp = new cc.Sprite(); this.user.icon_exp.initWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame(lobby_resources.EXP_ICON));
        this.user.icon_exp.x = this.user.panel.width*0.8;
        this.user.icon_exp.y = this.user.panel.height*0.61;
        this.user.panel.addChild(this.user.icon_exp,3);
        this.user.exp = gv.lobbyLabel("1412",this.user.panel.width*0.5,this.user.panel.height*0.6);
        this.user.panel.addChild(this.user.exp,3);
        this.user.level = gv.lobbyLabel("9",this.user.panel.width*0.8,this.user.panel.height*0.6);
        this.user.panel.addChild(this.user.level,3);
        // ranking bar
        this.user.rank_bar = new cc.Sprite(); this.user.rank_bar.initWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame(lobby_resources.RANKING_BAR));
        this.user.rank_bar.x = this.user.panel.width/2;
        this.user.rank_bar.y = this.user.panel.height*0.4;
        this.user.rank_bar.scaleX = 1.5;
        this.user.panel.addChild(this.user.rank_bar,1);
        this.user.rank_icon = new cc.Sprite(); this.user.rank_icon.initWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame(lobby_resources.RANKING));
        this.user.rank_icon.x = this.user.panel.width * 0.8;
        this.user.rank_icon.y = this.user.panel.height * 0.41;
        this.user.panel.addChild(this.user.rank_icon,2);
        this.user.rank = gv.lobbyLabel("257",this.user.panel.width*0.5,this.user.panel.height*0.4);
        this.user.panel.addChild(this.user.rank,2);


        var sprite = new cc.Sprite("GUIs/Main_Gui/" + lobby_resources.ATTACK);
       // this.addChild(sprite);
       // sprite.setPosition(300, 300);
        //sprite.setScale(-1, 1);
    },
    setBattle:function(){
        // set panel
        this.battle.panel = new cc.LayerColor(cc.color(0,0,0,0),width*0.3, height*0.5);
        this.addChild(this.battle.panel,0);
        this.battle.panel.x = 0;
        this.battle.panel.y = 0;
        // fight
        this.battle.attack = gv.lobbyButton("GUIs/Main_Gui/" + lobby_resources.ATTACK, this.battle.panel.width*0.2,this.battle.panel.height*0.2);
        this.battle.panel.addChild(this.battle.attack,1);
        //var battle_text = gv.lobbyLabel("BATTLE",LOBBY_CFG.ATTACK_X, LOBBY_CFG.ATTACK_Y - 30);
        //this.battle.panel.addChild(battle_text,3);
        // guild
        this.battle.guild = gv.lobbyButton("GUIs/Main_Gui/" + lobby_resources.GUILD, this.battle.panel.width*0.15,this.battle.panel.height*0.45);
        this.battle.panel.addChild(this.battle.guild,1);
        // guild fighting
        this.battle.guild_battle = gv.lobbyButton("GUIs/Main_Gui/" + lobby_resources.GUILD_FIGHT, this.battle.panel.width*0.15,this.battle.panel.height*0.65);
        this.battle.panel.addChild(this.battle.guild_battle,1);
    },
    setUtils:function(){
        // set panel
        this.utils.panel = new cc.LayerColor(cc.color(0,0,0,0),width*0.3, height*0.5);
        this.addChild(this.utils.panel,0);
        this.utils.panel.x = width*0.7;
        this.utils.panel.y = 0;
        // shop
        this.utils.shop = gv.lobbyButton("GUIs/Main_Gui/" + lobby_resources.SHOP,this.utils.panel.width *0.75, this.utils.panel.height*0.2);
        this.utils.panel.addChild(this.utils.shop,1);
        this.utils.shop.addClickEventListener(this.onShopClick.bind(this));
        //var shop_text = gv.lobbyLabel("SHOP",this._width - 70, 30);
        //this.addChild(shop_text,3);
        // setting
        this.utils.setting = gv.lobbyButton("GUIs/Main_Gui/" + lobby_resources.SETTING, this.utils.panel.width *0.8, this.utils.panel.height*0.45);
        this.utils.panel.addChild(this.utils.setting,1);
        // kho
        this.utils.kho = gv.lobbyButton("GUIs/Main_Gui/" + lobby_resources.KHO, this.utils.panel.width *0.8, this.utils.panel.height*0.65);
        this.utils.panel.addChild(this.utils.kho,1);
        this.utils.kho.addClickEventListener(this.onKhoClick.bind(this));
        // friend
        this.utils.friends = gv.lobbyButton("GUIs/Main_Gui/" + lobby_resources.SETTING, this.utils.panel.width *0.45, this.utils.panel.height*0.15);
        this.utils.panel.addChild(this.utils.friends,1);
    },
    setResources:function(){
        // set panel
        this.resources.panel = new cc.LayerColor(cc.color(0,0,0,0),width*0.3, height*0.4);
        this.addChild(this.resources.panel,0);
        this.resources.panel.x = width*0.7;
        this.resources.panel.y = height*0.6;
        //
        // GOLD
        this.resources.bg_gold_bar = new cc.Sprite(); this.resources.bg_gold_bar.initWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame(lobby_resources.BG_BAR_2));
        this.resources.bg_gold_bar.x = this.resources.panel.width * 0.55;
        this.resources.bg_gold_bar.y = this.resources.panel.height * 0.8;
        this.resources.bg_gold_bar.scaleX = 1.5;
        this.resources.panel.addChild(this.resources.bg_gold_bar,1);
        this.resources.gold_bar = new ccui.LoadingBar("GUIs/Main_Gui/" + lobby_resources.GOLD_BAR, 50);
        this.resources.gold_bar.setDirection(ccui.LoadingBar.TYPE_RIGHT);
        this.resources.gold_bar.x = this.resources.panel.width * 0.53;
        this.resources.gold_bar.y = this.resources.panel.height * 0.81;
        this.resources.gold_bar.scaleX = 1.5;
        this.resources.panel.addChild(this.resources.gold_bar,2);
        this.resources.gold_icon = new cc.Sprite(); this.resources.gold_icon.initWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame(lobby_resources.GOLD_ICON));
        this.resources.gold_icon.x = this.resources.panel.width * 0.93;
        this.resources.gold_icon.y = this.resources.panel.height * 0.82;
        this.resources.panel.addChild(this.resources.gold_icon, 2);
        this.resources.max_gold = gv.lobbyLabel("Max: 2.500.000",this.resources.panel.width * 0.55, this.resources.panel.height * 0.9);
        this.resources.panel.addChild(this.resources.max_gold, 1);
        this.resources.curr_gold = gv.lobbyLabel("1,250,000",this.resources.panel.width * 0.62, this.resources.panel.height * 0.81);
        this.resources.panel.addChild(this.resources.curr_gold, 3);
        //
        // END GOLD ----------------------------------------------------------------------
        //
        // ELIXIR
        this.resources.bg_elixir_bar = new cc.Sprite(); this.resources.bg_elixir_bar.initWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame(lobby_resources.BG_BAR_2));
        this.resources.bg_elixir_bar.x = this.resources.panel.width * 0.55;
        this.resources.bg_elixir_bar.y = this.resources.panel.height * 0.6;
        this.resources.bg_elixir_bar.scaleX = 1.5;
        this.resources.panel.addChild(this.resources.bg_elixir_bar,1);
        this.resources.elixir_bar = new ccui.LoadingBar("GUIs/Main_Gui/" + lobby_resources.ELIXIR_BAR, 50);
        this.resources.elixir_bar.setDirection(ccui.LoadingBar.TYPE_RIGHT);
        this.resources.elixir_bar.x = this.resources.panel.width * 0.53;
        this.resources.elixir_bar.y = this.resources.panel.height * 0.61;
        this.resources.elixir_bar.scaleX = 1.5;
        this.resources.panel.addChild(this.resources.elixir_bar,2);
        this.resources.elixir_icon = new cc.Sprite(); this.resources.elixir_icon.initWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame(lobby_resources.ELIXIR_ICON));
        this.resources.elixir_icon.x = this.resources.panel.width * 0.93;
        this.resources.elixir_icon.y = this.resources.panel.height * 0.62;
        this.resources.panel.addChild(this.resources.elixir_icon, 2);
        this.resources.max_elixir = gv.lobbyLabel("Max: 2.500.000",this.resources.panel.width * 0.55, this.resources.panel.height * 0.7);
        this.resources.panel.addChild(this.resources.max_elixir, 1);
        this.resources.curr_gold = gv.lobbyLabel("1,250,000",this.resources.panel.width * 0.62, this.resources.panel.height * 0.61);
        this.resources.panel.addChild(this.resources.curr_gold, 3);
        //
        // END ELIXIR ----------------------------------------------------------------------
        //
        // G
        this.resources.bg_g_bar = new cc.Sprite(); this.resources.bg_g_bar.initWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame(lobby_resources.BG_BAR_4));
        this.resources.bg_g_bar.x = this.resources.panel.width * 0.55;
        this.resources.bg_g_bar.y = this.resources.panel.height * 0.45;
        this.resources.bg_g_bar.scaleX = 1.5;
        this.resources.bg_g_bar.scaleY = 0.9;
        this.resources.panel.addChild(this.resources.bg_g_bar,1);
        this.resources.g_bar = new ccui.LoadingBar("GUIs/Main_Gui/" + lobby_resources.G_BAR, 50);
        this.resources.g_bar.setDirection(ccui.LoadingBar.TYPE_RIGHT);
        this.resources.g_bar.x = this.resources.panel.width * 0.54;
        this.resources.g_bar.y = this.resources.panel.height * 0.455;
        this.resources.g_bar.scaleX = 1.5;
        this.resources.g_bar.scaleY = 0.9;
        this.resources.panel.addChild(this.resources.g_bar,2);
        this.resources.g_icon = new cc.Sprite(); this.resources.g_icon.initWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame(lobby_resources.G_ICON));
        this.resources.g_icon.x = this.resources.panel.width * 0.93;
        this.resources.g_icon.y = this.resources.panel.height * 0.45;
        this.resources.panel.addChild(this.resources.g_icon, 2);
        this.resources.add_g = gv.lobbyButton("GUIs/Main_Gui/" + lobby_resources.ADD_BUTTON, this.resources.panel.width * 0.26, this.resources.panel.height * 0.45);
        this.resources.add_g.scaleX = 1.1;
        this.resources.add_g.scaleY = 1.1;
        this.resources.panel.addChild(this.resources.add_g,2);
        this.resources.curr_g = gv.lobbyLabel("10,000",this.resources.panel.width * 0.62, this.resources.panel.height * 0.45);
        this.resources.panel.addChild(this.resources.curr_g,3);
        // END G ------------------------------------------------------------------------------
        //
    },
    setGameInfo:function(){
        // set panel
        this.info_game.panel = new cc.LayerColor(cc.color(0,0,0,0),width*0.4, height*0.2);
        this.addChild(this.info_game.panel,0);
        this.info_game.panel.x = width*0.3;
        this.info_game.panel.y = height*0.8;
        //
        // BUILDER
        this.info_game.builder_bg_bar = new cc.Sprite(); this.info_game.builder_bg_bar.initWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame(lobby_resources.BG_BAR_1));
        this.info_game.builder_bg_bar.x = this.info_game.panel.width/2;
        this.info_game.builder_bg_bar.y = this.info_game.panel.height*0.7;
        this.info_game.panel.addChild(this.info_game.builder_bg_bar,1);
        this.info_game.builder_add = gv.lobbyButton("GUIs/Main_Gui/" + lobby_resources.ADD_BUTTON,this.info_game.panel.width/2 + this.info_game.builder_bg_bar.width*0.45, this.info_game.panel.height*0.7);
        this.info_game.panel.addChild(this.info_game.builder_add,2);
        this.info_game.builder_add = new cc.Sprite(); this.info_game.builder_add.initWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame(lobby_resources.BUILDER_ICON));
        this.info_game.builder_add.x = this.info_game.panel.width/2 - this.info_game.builder_bg_bar.width*0.45;
        this.info_game.builder_add.y = this.info_game.panel.height*0.7;
        this.info_game.panel.addChild(this.info_game.builder_add, 2);
        this.info_game.builder_label = gv.lobbyLabel("Builder",this.info_game.panel.width/2, this.info_game.panel.height*0.9);
        this.info_game.panel.addChild(this.info_game.builder_label,1);
        this.info_game.builder_info = gv.lobbyLabel("2/2",this.info_game.panel.width/2, this.info_game.panel.height*0.7);
        this.info_game.panel.addChild(this.info_game.builder_info,3);
        // END BUILDER ----------------------------
        //
        //
        // ARMY
        this.info_game.army_bg_bar = new cc.Sprite(); this.info_game.army_bg_bar.initWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame(lobby_resources.BG_BAR_1));
        this.info_game.army_bg_bar.x = this.info_game.panel.width*0.15;
        this.info_game.army_bg_bar.y = this.info_game.panel.height*0.7;
        this.info_game.army_bg_bar.scaleX = 1;
        this.info_game.panel.addChild(this.info_game.army_bg_bar,1);
        this.info_game.army_add = gv.lobbyButton("GUIs/Main_Gui/" + lobby_resources.ADD_BUTTON,this.info_game.panel.width*0.15 + this.info_game.army_bg_bar.width*0.45, this.info_game.panel.height*0.7);
        this.info_game.panel.addChild( this.info_game.army_add,2);
        this.info_game.army_icon = new cc.Sprite(); this.info_game.army_icon.initWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame(lobby_resources.ARMY_ICON));
        this.info_game.army_icon.x = this.info_game.panel.width*0.15 - this.info_game.army_bg_bar.width*0.45;
        this.info_game.army_icon.y = this.info_game.panel.height*0.7;
        this.info_game.panel.addChild(this.info_game.army_icon, 2);
        this.info_game.army_label = gv.lobbyLabel("Army",this.info_game.panel.width*0.15,this.info_game.panel.height*0.9);
        this.info_game.panel.addChild(this.info_game.army_label,1);
        this.info_game.army_info = gv.lobbyLabel("20/20",this.info_game.panel.width*0.15,this.info_game.panel.height*0.7);
        this.info_game.panel.addChild(this.info_game.army_info,3);
        // END ARMY ------------------------------------
        //
        //
        // SHIELD
        this.info_game.shield_bg_bar = new cc.Sprite(); this.info_game.shield_bg_bar.initWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame(lobby_resources.BG_BAR_1));
        this.info_game.shield_bg_bar.x = this.info_game.panel.width*0.85;
        this.info_game.shield_bg_bar.y = this.info_game.panel.height*0.7;
        this.info_game.shield_bg_bar.scaleX = 1;
        this.info_game.panel.addChild(this.info_game.shield_bg_bar,1);
        this.info_game.shield_add = gv.lobbyButton("GUIs/Main_Gui/" + lobby_resources.ADD_BUTTON,this.info_game.panel.width*0.85 + this.info_game.army_bg_bar.width*0.45, this.info_game.panel.height*0.7);
        this.info_game.panel.addChild( this.info_game.shield_add,2);
        this.info_game.shield_icon = new cc.Sprite(); this.info_game.shield_icon.initWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame(lobby_resources.SHIELD_ICON));
        this.info_game.shield_icon.x = this.info_game.panel.width*0.85 - this.info_game.army_bg_bar.width*0.45;
        this.info_game.shield_icon.y = this.info_game.panel.height*0.7;
        this.info_game.panel.addChild(this.info_game.shield_icon, 2);
        this.info_game.shield_label = gv.lobbyLabel("Shield",this.info_game.panel.width*0.85,this.info_game.panel.height*0.9);
        this.info_game.panel.addChild(this.info_game.shield_label,1);
        this.info_game.shield_info = gv.lobbyLabel("NONE",this.info_game.panel.width*0.85,this.info_game.panel.height*0.7);
        this.info_game.panel.addChild(this.info_game.shield_info,3);
        //
        // END SHIELD ----------------------------------------------------------------       
    },
    // event click handler
    onShopClick:function()
    {
        // ui
        if(!this.shopUI)
        {
            //this.shopUI = TrainTroopUI.getInstance(1);
            //this.addChild(this.shopUI, this.shopUI.zOrder);
            this.shopUI = new ScreenShop();
            this.addChild(this.shopUI, this.shopUI.zOrder + 1000);
        }
        else
        {
            this.shopUI.visible = true;
        }
    },
    onKhoClick: function(){
        var i = Math.floor(Math.random() * 4);     // returns a random integer from 0 to 9
        var troop = TroopObjectGraphic.create(i);
        fr.getCurrentScreen()._mapLayer.addTroop(i, troop, MapConfig.MAX_Z_ORDER_TROOP);
    }
});