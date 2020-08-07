var TroopObjectGraphic = cc.Sprite.extend({
    active:true,    // sống / chết
    velocity:0,     // vector x
    zOrder:15,      // hiển thị
    type:1,         // kiểu lính
    appearPosition: cc.p(800, 300),
    rect:null,     // lấy size hình ảnh


    ctor:function(arg, type){
        this._super(arg.LEVEL_1[type].textureIdle[0]);

        this.x = this.appearPosition.x;
        this.y = this.appearPosition.y;

        var idleFrames = [];
        for(var i = 0; i < arg.LEVEL_1[type].textureIdle.length; i++){
            idleFrames.push(cc.spriteFrameCache.getSpriteFrame(arg.LEVEL_1[type].textureIdle[i]));
        }

        var animation = cc.Animation.create(idleFrames, 0.1);
        this.runAction(
            cc.Animate.create(animation).repeatForever()
        );
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
            this._state = BULLET_STATE_UNGRABBED;
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
            this._state = BULLET_STATE_UNGRABBED;
        }
        this._rect = spriteFrame.getRect();
        return true;
    },
})

// create
TroopObjectGraphic.create = function(arg, type){
    var troop = new TroopObjectGraphic(arg, type);
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