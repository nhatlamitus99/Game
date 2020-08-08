var Lobby  = cc.Layer.extend({
    attack:null,
    guild:null,
    guildFight:null,
    speaker:null,
    avatar:null,
    exp:null,
    username:null,
    gold:null,
    elixir:null,
    g:null,
    // button
    letter:null,
    kho:null,
    bag:null,
    setting:null,
    shop:null,
    // info
    friend:null,
    army:null,
    builder:null,
    shield:null,
    // resources
    maxGold:null,
    currGold:null,
    maxElixir:null,
    currElixir:null,
    currG:null,
    // size
    _height:null,
    _width:null,
    // shop ui
    shopUI:null,


    ctor:function(){
        this._super();
        this.init();
    },
    init:function(){
        this._width = cc.winSize.width;
        this._height = cc.winSize.height;

        // gold bar
        this.showGold();
        // elixir bar
        this.showElixir();
        // g bar
        this.showG();
        // builder
        this.showBuilder();
        // army
        this.showArmy();
        // defense
        this.showDefense();
        // user
        this.showUser();
        // other UI
         this.showOtherUI();
    },
    // on shows lobby
    showGold:function(){
        var gold_bar = new cc.Sprite(); gold_bar.initWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame(lobby_resources.BG_BAR_2));
        gold_bar.x = this._width - 130;
        gold_bar.y = this._height - 43;
        gold_bar.scaleX = 1.5;
        this.addChild(gold_bar,1);
        this.gold = new ccui.LoadingBar("GUIs/Main_Gui/" + lobby_resources.GOLD_BAR, 50);
        this.gold.setDirection(ccui.LoadingBar.TYPE_RIGHT);
        this.gold.x = this._width - 132;
        this.gold.y = this._height - 40;
        this.gold.scaleX = 1.5;
        this.addChild(this.gold,2);

        var gold_icon = new cc.Sprite(); gold_icon.initWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame(lobby_resources.GOLD_ICON));
        gold_icon.x = this._width - 20;
        gold_icon.y = this._height - 40;
        this.addChild(gold_icon, 2);

        this.maxGold = gv.lobbyLabel("Max: 2.500.000",this._width-130, this._height-20);
        this.addChild(this.maxGold,1);
        this.currGold = gv.lobbyLabel("1,250,000", this._width - 100, this._height - 42);
        this.addChild(this.currGold,3);
    },
    showElixir:function(){
        var elixir_bar = new cc.Sprite(); elixir_bar.initWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame(lobby_resources.BG_BAR_2));
        elixir_bar.x = this._width - 130;
        elixir_bar.y = this._height - 88;
        elixir_bar.scaleX = 1.5;
        this.addChild(elixir_bar,1);
        this.elixir = new ccui.LoadingBar("GUIs/Main_Gui/" + lobby_resources.ELIXIR_BAR, 50);
        this.elixir.setDirection(ccui.LoadingBar.TYPE_RIGHT);
        this.elixir.x = this._width - 132;
        this.elixir.y = this._height - 85;
        this.elixir.scaleX = 1.5;
        this.addChild(this.elixir,2);

        var elixir_icon = new cc.Sprite(); elixir_icon.initWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame(lobby_resources.ELIXIR_ICON));
        elixir_icon.x = this._width - 20;
        elixir_icon.y = this._height - 85;
        this.addChild(elixir_icon, 2);

        this.maxElixir = gv.lobbyLabel("Max: 2.500.000",this._width-130,this._height - 65);
        this.addChild(this.maxElixir,1);
        this.currElixir = gv.lobbyLabel("1,250,000", this._width - 100, this._height - 87);
        this.addChild(this.currElixir,3);
    },
    showG:function(){
        var g_bar = new cc.Sprite(); g_bar.initWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame(lobby_resources.BG_BAR_4));
        g_bar.x = this._width - 130;
        g_bar.y = this._height - 125;
        g_bar.scaleX = 1.5;
        g_bar.scaleY = 0.9;
        this.addChild(g_bar);

        this.g = new ccui.LoadingBar("GUIs/Main_Gui/" + lobby_resources.G_BAR, 50);
        this.g.setDirection(ccui.LoadingBar.TYPE_RIGHT);
        this.g.x = this._width - 133;
        this.g.y = this._height - 124;
        this.g.scaleX = 1.5;
        this.g.scaleY = 0.9;
        this.addChild(this.g,2);

        var g_icon = new cc.Sprite(); g_icon.initWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame(lobby_resources.G_ICON));
        g_icon.x = this._width - 20;
        g_icon.y = this._height - 125;
        this.addChild(g_icon, 2);

        var add_g = gv.lobbyButton("GUIs/Main_Gui/" + lobby_resources.ADD_BUTTON, this._width - 210, this._height - 124);
        add_g.scaleX = 1.1;
        add_g.scaleY = 1.1;
        this.addChild(add_g,2);

        var g = gv.lobbyLabel("10,000",this._width - 95,this._height - 125);
        this.addChild(g,3);
    },
    showBuilder:function(){
        var bg_builder = new cc.Sprite(); bg_builder.initWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame(lobby_resources.BG_BAR_1));
        bg_builder.x = this._width/2;
        bg_builder.y = this._height - 40;
        this.addChild(bg_builder,1);
        var add_builder = gv.lobbyButton("GUIs/Main_Gui/" + lobby_resources.ADD_BUTTON,this._width/2 + 40, this._height - 40);
        this.addChild(add_builder,2);
        this.builder = new cc.Sprite(); this.builder.initWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame(lobby_resources.BUILDER_ICON));
        this.builder.x = this._width/2 - 40;
        this.builder.y = this._height - 40;
        this.addChild(this.builder, 2);

        // text builder
        var builder_text = gv.lobbyLabel("Builder",this._width/2,this._height - 15);
        this.addChild(builder_text,1);

        // amount builder
        var amount_builder = gv.lobbyLabel("2/2",this._width/2,this._height - 40);
        this.addChild(amount_builder,3);
    },
    showArmy:function(){
        var bg_army = new cc.Sprite(); bg_army.initWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame(lobby_resources.BG_BAR_1));
        bg_army.x = this._width/2 - 150;
        bg_army.scaleX = 1.3;
        bg_army.y = this._height - 40;
        this.addChild(bg_army,1);
        var add_army = gv.lobbyButton("GUIs/Main_Gui/" + lobby_resources.ADD_BUTTON,this._width/2 - 130 + 40, this._height - 40);
        this.addChild(add_army,2);

        this.army = new cc.Sprite(); this.army.initWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame(lobby_resources.ARMY_ICON));
        this.army.x = this._width/2 - 170 - 40;
        this.army.y = this._height - 40;
        this.addChild(this.army, 2);

        // text builder
        var army_text = gv.lobbyLabel("Army",this._width/2 - 150,this._height - 15);
        this.addChild(army_text,1);

        // amount troop
        var amount_troop = gv.lobbyLabel("20/20",this._width/2 - 150,this._height - 40);
        this.addChild(amount_troop,3);
    },
    showDefense:function(){
        var bg_defense = new cc.Sprite(); bg_defense.initWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame(lobby_resources.BG_BAR_1));
        bg_defense.x = this._width/2 + 150;
        bg_defense.scaleX = 1.3;
        bg_defense.y = this._height - 40;
        this.addChild(bg_defense,1);
        var add_shield = gv.lobbyButton("GUIs/Main_Gui/" + lobby_resources.ADD_BUTTON,this._width/2 + 210, this._height - 40);
        this.addChild(add_shield,2);

        this.shield = new cc.Sprite(); this.shield.initWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame(lobby_resources.SHIELD_ICON));
        this.shield.x = this._width/2 + 130 - 40;
        this.shield.y = this._height - 40;
        this.addChild(this.shield, 2);

        var shield_text = gv.lobbyLabel("Shield",this._width/2 + 150,this._height - 15);
        this.addChild(shield_text,1);

        // info defense
        var info_defense = gv.lobbyLabel("NONE",this._width/2 + 150,this._height - 40);
        this.addChild(info_defense,3);
    },
    showUser:function(){
        // username
        var username = gv.lobbyLabel("Username",140,this._height - 30);
        this.addChild(username,3);

        // avatar
        this.avatar = new cc.Sprite(); this.avatar.initWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame(lobby_resources.BG_EXP));
        this.avatar.x = 60;
        this.avatar.y = this._height - 90;
        this.avatar.scaleX = 1.3;
        this.avatar.scaleY = 1.3;
        this.addChild(this.avatar,1);

        // exp bar
        var bg_exp_bar = new cc.Sprite(); bg_exp_bar.initWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame(lobby_resources.EXP_BG_BAR));
        bg_exp_bar.x = 140;
        bg_exp_bar.y = this._height - 70;
        bg_exp_bar.scaleX = 1.5;
        this.addChild(bg_exp_bar,-1);
        this.exp = new ccui.LoadingBar("GUIs/Main_Gui/" + lobby_resources.EXP_BAR, 50);
        this.exp.setDirection(ccui.LoadingBar.TYPE_LEFT);
        this.exp.x = 140;
        this.exp.y = this._height - 70;
        this.exp.scaleX = 1.5;
        this.addChild(this.exp,0);

        var exp_icon = new cc.Sprite(); exp_icon.initWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame(lobby_resources.EXP_ICON));
        exp_icon.x = 210;
        exp_icon.y = this._height - 65;
        this.addChild(exp_icon,2);

        var amount_exp = gv.lobbyLabel("1412",145,this._height - 70);
        this.addChild(amount_exp,3);

        var level = gv.lobbyLabel("9",210,this._height - 67);
        this.addChild(level,3);

        // ranking bar
        this.ranking = new cc.Sprite(); this.ranking.initWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame(lobby_resources.RANKING_BAR));
        this.ranking.x = 140;
        this.ranking.y = this._height - 110;
        this.ranking.scaleX = 1.5;
        this.addChild(this.ranking,0);
        var ranking_icon = new cc.Sprite(); ranking_icon.initWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame(lobby_resources.RANKING));
        ranking_icon.x = 210;
        ranking_icon.y = this._height - 107;
        this.addChild(ranking_icon,2);

        var amount_ranking = gv.lobbyLabel("257",145,this._height - 110);
        this.addChild(amount_ranking,3);
    },
    showOtherUI:function(){
        // fight
        this.attack = gv.lobbyButton("GUIs/Main_Gui/" + lobby_resources.ATTACK, LOBBY_CFG.ATTACK_X,LOBBY_CFG.ATTACK_Y);
        this.addChild(this.attack,1);
        var battle_text = gv.lobbyLabel("BATTLE",LOBBY_CFG.ATTACK_X, LOBBY_CFG.ATTACK_Y - 30);
        this.addChild(battle_text,3);

        // guild
        this.guild = gv.lobbyButton("GUIs/Main_Gui/" + lobby_resources.GUILD, LOBBY_CFG.GUILD_X, LOBBY_CFG.GUILD_Y);
        this.addChild(this.guild,1);

        // guild fighting
        this.guildFight = gv.lobbyButton("GUIs/Main_Gui/" + lobby_resources.GUILD_FIGHT, LOBBY_CFG.GUILD_FIGHT_X, LOBBY_CFG.GUILD_FIGHT_Y);
        this.addChild(this.guildFight,1);

        // shop
        this.shop = gv.lobbyButton("GUIs/Main_Gui/" + lobby_resources.SHOP,this._width - 70, 60);
        this.addChild(this.shop,1);
        this.shop.addClickEventListener(this.onShopClick.bind(this));
        var shop_text = gv.lobbyLabel("SHOP",this._width - 70, 30);
        this.addChild(shop_text,3);

        // setting
        this.setting = gv.lobbyButton("GUIs/Main_Gui/" + lobby_resources.SETTING, this._width - 50, 140);
        this.addChild(this.setting,1);

        // kho
        this.kho = gv.lobbyButton("GUIs/Main_Gui/" + lobby_resources.KHO, this._width - 50, 200);
        this.addChild(this.kho,1);
        this.kho.addClickEventListener(this.onKhoClick.bind(this));

        // friend
        this.friend = gv.lobbyButton("GUIs/Main_Gui/" + lobby_resources.SETTING, this._width - 150, 45);
        this.addChild(this.friend,1);
    },

    // event handler
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
        fr.getCurrentScreen()._map._map.addChild(troop,15);
    }
});



