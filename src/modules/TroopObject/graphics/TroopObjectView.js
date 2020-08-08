var TroopObjectGraphic = cc.Sprite.extend({
    active:true,    // sống / chết
    velocity:0,     // vector x
    zOrder:15,      // hiển thị
    type:1,         // kiểu lính
    state:TC.TROOP_STATE.IDLE,        // hành động
    appearPosition: cc.p(800, 300),
    rect:null,     // lấy size hình ảnh


    ctor:function(type){
        this._super(cc.spriteFrameCache.getSpriteFrame(TC.ARM[type].LEVEL_1 + TC.idle_url + "/image0000.png"));

        var i = Math.floor(Math.random() *43);
        var j = Math.floor(Math.random() *43);
        var pos = fr.getCurrentScreen()._map.getPosOfCell({i:i, j:j});
        this.x = pos.x;
        this.y = pos.y;

        this.scaleX = 1/2;
        this.scaleY = 1/2;

        var idleFrames = [];

        for(var i = 0; i <= 29; i++){
            var name = "";
            if(i<10) name = "/image000" + i + ".png";
            else name = "/image00" + i + ".png";
            idleFrames.push(cc.spriteFrameCache.getSpriteFrame(TC.ARM[type].LEVEL_1 + TC.idle_url + name));
        }

        var animation = cc.Animation.create(idleFrames, 0.1);
;
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
})

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