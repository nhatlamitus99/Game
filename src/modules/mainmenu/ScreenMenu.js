/**
 * Created by GSN on 7/6/2015.
 */

var ScreenMenu = cc.Layer.extend({
    _itemMenu:null,
    _beginPos:0,
    isMouseDown:false,

    ctor:function() {
        this._super();
        var size = cc.director.getVisibleSize();

        cc.audioEngine.playEffect("res/Music/mainMainMusic.wav", true)

        var light = cc.Sprite.create("res/game/animation/light/flare.jpg");
        light.setAnchorPoint(cc.p(0.5,0.5));
        light.setPosition(cc.p(0, 0));
        this.addChild(light);
        var light_scale = cc.ScaleTo.create(0,0.35,0.35);
        light.runAction(light_scale);

        var plane = cc.Sprite.create("res/game/animation/character/plane/myPlane.png");
        plane.setAnchorPoint(cc.p(0.5,0.5));
        plane.setPosition(cc.p(4*cc.winSize.width/5, 0));
        this.addChild(plane);
       



        // var btnNetwork = gv.commonButton(200, 64, cc.winSize.width/2, 2.6*size.height/5);
        // this.addChild(btnNetwork);
        // btnNetwork.addClickEventListener(this.onSelectNetwork.bind(this));

        // var btnLocalization = gv.commonButton(200, 64, cc.winSize.width/2, 1.8*size.height/5);
        // this.addChild(btnLocalization);
        // btnLocalization.addClickEventListener(this.onSelectLocalization.bind(this));

        // var btnDragonbones = gv.commonButton(200, 64, cc.winSize.width/2, size.height/5);
        // this.addChild(btnDragonbones);
        // btnDragonbones.addClickEventListener(this.onSelectDragonbones.bind(this));

        var btnNewGame = ccui.Button.create("res/Default/NewGame.png");
        btnNewGame.setPosition(size.width/2, size.height/2);
        this.addChild(btnNewGame);
        btnNewGame.runAction(cc.ScaleTo.create(0, 2, 2));
        btnNewGame.addClickEventListener(this.onSelectNetwork.bind(this));

        var btnOption = ccui.Button.create("res/Default/Option.png");
        btnOption.setPosition(size.width/2, size.height/2-100);
        this.addChild(btnOption);
        btnOption.runAction(cc.ScaleTo.create(0, 2, 2));
        btnOption.addClickEventListener(this.onSelectLocalization.bind(this));

        var btnAbout = ccui.Button.create("res/Default/About.png");
        btnAbout.setPosition(size.width/2, size.height/2-200);
        this.addChild(btnAbout);
        btnAbout.runAction(cc.ScaleTo.create(0, 2, 2));
        btnAbout.addClickEventListener(this.onSelectDragonbones.bind(this));
        

        


        
        plane.runAction(cc.Sequence(           
            cc.MoveTo.create(4, cc.p(4*cc.winSize.width/5, size.height)),
            cc.MoveTo.create(0, cc.p(1*cc.winSize.width/5, 0)),
            (cc.Spawn.create(
                cc.MoveTo.create(3, cc.p(4*cc.winSize.width/5, 0)),
                cc.MoveTo.create(3, cc.p(4*cc.winSize.width/5, 7*size.height/5))
            )),
            cc.MoveTo.create(0, cc.p(1*cc.winSize.width/5, 0)),
            cc.MoveTo.create(4, cc.p(4*cc.winSize.width/5, size.height)),
            cc.MoveTo.create(0, cc.p(1*cc.winSize.width/5, 0))
        ).repeatForever());

        light.runAction(cc.Sequence(       
            cc.DelayTime.create(2),
            cc.Spawn.create(
                cc.MoveTo.create(8, cc.p(4*cc.winSize.width/5, 0)),
                cc.MoveTo.create(8, cc.p(4*cc.winSize.width/5, 7*size.height/5)),
                cc.SkewTo.create(7, 45, 180) 
            ),
            cc.MoveTo.create(0, cc.p(0, 0)),
            cc.SkewTo.create(0, 0, 0) 
                     
            
        ).repeatForever());

        
        
       
        

        

    },
    onEnter:function(){
        this._super();
    },
    onSelectNetwork:function(sender)
    {
        cc.audioEngine.stopAllEffects();
        fr.view(ScreenNetwork);
    },
    onSelectLocalization:function(sender)
    {
        cc.audioEngine.stopAllEffects();
        fr.view(ScreenLocalization);
    },
    onSelectDragonbones:function(sender)
    {
        cc.audioEngine.stopAllEffects();
        fr.view(ScreenDragonbones);
    },
    

});