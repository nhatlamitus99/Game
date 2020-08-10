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
        this._super();
        this.type = type;

        var i = Math.floor(Math.random() *43);
        var j = Math.floor(Math.random() *43);
        var pos = fr.getCurrentScreen()._mapLayer.getPosOfRegion({i:i, j:j});
        this.x = pos.x;
        this.y = pos.y;

        this.scaleX = fr.getCurrentScreen()._mapLayer._scale;
        this.scaleY = fr.getCurrentScreen()._mapLayer._scale;

        this.loadAnim(type);

       // this.updateDirectionAction();
       // this.schedule(this.updateDirectionAction,2);

        var pos2 = fr.getCurrentScreen()._mapLayer.getPosOfRegion({i: Math.floor(Math.random() *43), j: Math.floor(Math.random() *43)});
        this.move(pos2.x, pos2.y);
    },
    loadAnim: function(type)
    {
        this.anims = TroopAnimationManager.getInstance().idle_animations[type];
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
                this.runAction(cc.sequence(action).repeatForever());
                break;
            }
            case 3:{
                this.runAction(cc.sequence(action).repeatForever());
                break;
            }
            case 4:{
                this.runAction(cc.sequence(action).repeatForever());
                break;
            }
            case 5:{
                this.runAction(cc.sequence(action).repeatForever());
                break;
            }
            case 6:{
                this.runAction(cc.sequence(action).repeatForever());
                break;
            }
            case 7:{
                this.runAction(cc.sequence(action).repeatForever());
                break;
            }
            case 8:{
                this.runAction(cc.sequence(action).repeatForever());
                break;
            }
        }
        // end switch
    },
    move:function(x, y){
        var direct = -1;
        // xác đinh hướng đi
        if(x == this.x){
            if(y > this.y) direct = 8;
            else direct = 1;
        }
        else if(y == this.y){
            if(x > this.x) direct = 3;
            else direct = 6;
        }
        else if(x > this.x && y > this.y){
            direct = 2;
        }
        else if(x < this.x && y > this.y){
            direct = 7;
        }
        else if(x < this.x && y < this.y){
            direct = 5;
        }
        else{
            direct = 4;
        }
        this.direction = direct;
        this.anims = TroopAnimationManager.getInstance().run_animations[this.type];
        var animation =  this.anims[this.direction];
        var action = cc.animate(animation);
        var time = Math.sqrt((this.x-x)*(this.x-x) + (this.y-y)*(this.y-y))/60;
        cc.log(time);0
        this.runAction(cc.moveTo(time, x, y));
        if(direct >=2 && direct<=4) {
            this.scaleX*=-1;
        }
        this.runAction(cc.sequence(action).repeatForever());
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
