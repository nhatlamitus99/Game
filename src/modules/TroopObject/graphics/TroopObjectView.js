var TroopObjectGraphic = cc.Sprite.extend({
    active:true,    // sống / chết
    velocity:0,     // vector x
    zOrder:10,      // hiển thị
    type:1,         // kiểu lính
    rect:null,     // lấy size hình ảnh


    ctor:function(troopSpeed, troopType){
        this._super();

        this.velocity = troopSpeed;
        this.type = troopType;
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
}

TroopObjectGraphic.preset = function(){

};