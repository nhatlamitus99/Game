var TroopObjectGraphic = cc.Sprite.extend({
    active:true,    // sống / chết
    velocity:0,     // vector x
    zOrder:15,      // hiển thị
    type:1,         // kiểu lính
    state:TC.TROOP_STATE.IDLE,        // hành động
    appearPosition: cc.p(800, 300),
    rect:null,     // lấy size hình ảnh
    direction:null, // 1-8
    anims:null,


    ctor:function(type){
        //this._super(cc.spriteFrameCache.getSpriteFrame(TC.ARM[type].LEVEL_1 + TC.idle_url + "/image0000.png"));
        this._super();
        this.type = type;

        var i = Math.floor(Math.random() *43);
        var j = Math.floor(Math.random() *43);
        var pos = fr.getCurrentScreen()._mapLayer.getPosOfCell({i:i, j:j});
        this.x = pos.x;
        this.y = pos.y;

        this.scaleX = fr.getCurrentScreen()._mapLayer._scale;
        this.scaleY = fr.getCurrentScreen()._mapLayer._scale;

        this.loadAnim(type);

        this.schedule(this.updateDirectionAction,1);
    },
    loadAnim: function(type)
    {
        this.anims = TroopAnimationManager.getInstance().idle_animations[type];

        //cc.animationCache.addAnimations(TROOP_ANIMATION.IDLE[type]);
        //
        //this.anims[1] = cc.animationCache.getAnimation("idle_1");
        //
        //this.anims[2] = cc.animationCache.getAnimation("idle_7");
        //this.anims[3] = cc.animationCache.getAnimation("idle_6");
        //this.anims[4] = cc.animationCache.getAnimation("idle_5");
        //this.anims[5] = cc.animationCache.getAnimation("idle_5");
        //this.anims[6] = cc.animationCache.getAnimation("idle_6");
        //this.anims[7] = cc.animationCache.getAnimation("idle_7");
        //
        //this.anims[8] = cc.animationCache.getAnimation("idle_8");

        for (var i = 1; i <= 8; i++)
        {
            this.anims[i].retain();
        }

    },
    update:function (dt){
        var x = this.x, y = this.y;
        this.x = x + this.velocity * dt;
        this.y = y + this.velocity * dt;

    },
    destroy:function(){
        this.active = false;
        this.visible = true;
    },
    collideRect:function () {
        return cc.rect(-this.rect.width / 2, -this.rect.height / 2, this.rect.width + 10, this.rect.height);
    },
    initWithTexture:function (aTexture) {
        if (this._super(aTexture)) {
            this._state = 1;
        }
        if (aTexture instanceof cc.Texture2D) {
            this._rect = cc.rect(0, 0, aTexture.width, aTexture.height);
        } else if ((aTexture instanceof HTMLImageElement) || (aTexture instanceof HTMLCanvasElement)) {
            this._rect = cc.rect(0, 0, aTexture.width, aTexture.height);
        }
        return true;
    },
    initWithSpriteFrame:function(spriteFrame){
        if(this._super(spriteFrame)){
            this._state = 1;
        }
        this._rect = spriteFrame.getRect();
        return true;
    },
    updateDirectionAction:function(){
        var animation;
        var action;
        this.direction = Math.floor(Math.random() * 8) + 1;
        this.stopAllActions();

        animation =  this.anims[this.direction];
        action = cc.animate(animation);

        switch(this.direction){
            case 1:{

                this.runAction(cc.sequence(action).repeatForever());
                break;
            }
            case 2:{
                //animation =  this.animCache.getAnimation("idle_7");
                //action = cc.animate(animation);
                this.runAction(cc.sequence(action).repeatForever());
                break;
            }
            case 3:{
                //animation =  this.animCache.getAnimation("idle_6");
                //action = cc.animate(animation);
                this.runAction(cc.sequence(action).repeatForever());
                break;
            }
            case 4:{
                //animation =  this.animCache.getAnimation("idle_5");
                //action = cc.animate(animation);
                this.runAction(cc.sequence(action).repeatForever());
                break;
            }
            case 5:{
                //animation =  this.animCache.getAnimation("idle_5");
                //action = cc.animate(animation);
                this.runAction(cc.sequence(action).repeatForever());
                break;
            }
            case 6:{
                //animation =  this.animCache.getAnimation("idle_6");
                //action = cc.animate(animation);
                this.runAction(cc.sequence(action).repeatForever());
                break;
            }
            case 7:{
                //animation =  this.animCache.getAnimation("idle_7");
                //action = cc.animate(animation);
                this.runAction(cc.sequence(action).repeatForever());
                break;
            }
            case 8:{
                //animation =  this.animCache.getAnimation("idle_8");
                //action = cc.animate(animation);
                this.runAction(cc.sequence(action).repeatForever());
                break;
            }
        }
        // end switch
    }
});

// create
TroopObjectGraphic.create = function(type){
    var troop = new TroopObjectGraphic(type);
    MW.CONTAINER.TROOPS.push(troop);
    return troop;
};

// properties
TroopObjectGraphic.troopWithTexture = function (aTexture, troopType, troopSpeed) {
    var troop = new TroopObjectGraphic(troopType, troopSpeed);
    troop.initWithTexture(aTexture);

    return troop;
};

TroopObjectGraphic.troopWithSpriteFrame = function(spriteFrame,troopType, troopSpeed){
    var troop = new TroopObjectGraphic(troopType,troopSpeed);
    troop.initWithSpriteFrame(spriteFrame);
    return troop;
};

TroopObjectGraphic.preset = function(){

};