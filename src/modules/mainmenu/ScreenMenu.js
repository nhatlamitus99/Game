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


        var btnNetwork = gv.commonButton(200, 64, cc.winSize.width/2, 2.6*size.height/5,"New Game");
        this.addChild(btnNetwork);
        btnNetwork.addClickEventListener(this.onSelectNetwork.bind(this));

        var btnLocalization = gv.commonButton(200, 64, cc.winSize.width/2, 1.8*size.height/5,"Option");
        this.addChild(btnLocalization);
        btnLocalization.addClickEventListener(this.onSelectLocalization.bind(this));

        var btnDragonbones = gv.commonButton(200, 64, cc.winSize.width/2, size.height/5,"About");
        this.addChild(btnDragonbones);
        btnDragonbones.addClickEventListener(this.onSelectDragonbones.bind(this));

        var plane = cc.Sprite.create("res/game/animation/character/plane/logoBack.png");
        plane.setAnchorPoint(cc.p(0.5,0.5));
        plane.setPosition(cc.p(750,100));
        this.addChild(plane);

        var plane_scale = cc.ScaleTo.create(0.5,0.5,0.5);
        plane.runAction(plane_scale);


        var plane_action_1 = cc.MoveTo.create(4, cc.p(750, 500));
        plane.runAction(plane_action_1);
       
        // var plane_action_2 = cc.MoveTo.create(4, cc.p(250, 500));
        // plane.runAction(plane_action_2);
        // var plane_action_3 = cc.MoveTo.create(4, cc.p(250, 100));
        // plane.runAction(plane_action_3);

        

    },
    onEnter:function(){
        this._super();
    },
    onSelectNetwork:function(sender)
    {
        fr.view(ScreenNetwork);
    },
    onSelectLocalization:function(sender)
    {
        fr.view(ScreenLocalization);
    },
    onSelectDragonbones:function(sender)
    {
        fr.view(ScreenDragonbones);
    },
    

});