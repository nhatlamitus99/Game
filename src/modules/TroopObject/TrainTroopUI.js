

var TrainTroopUI = cc.Layer.extend({
    zOrder:1000,
    background:null,

    // methods
    ctor:function(){
        this._super();
        this.init();
    },
    init:function(){
        this.background = new cc.Scale9Sprite(train_troop_resource.BACKGROUND);
        this.addChild(this.background,this.zOrder);
        this.background.scaleX = 2.5;
        this.background.scaleY = 2.2;
        var shader = new cc.LayerColor(cc.color(0, 0, 0, 128), cc.winSize.width, cc.winSize.height);
        this.addChild(shader,this.zOrder-1);
    }
});

var TRAIN_TROOP_1 = null;
var TRAIN_TROOP_2 = null;
var TRAIN_TROOP_3 = null;
var TRAIN_TROOP_4 = null;

TrainTroopUI.getInstance = function(stt){
    if(stt<0 && stt>4){
        return null;
    }

    if(stt === 1){
        if(TRAIN_TROOP_1 == null) TRAIN_TROOP_1 = new TrainTroopUI();
        return TRAIN_TROOP_1;
    }
    else if(stt === 2){
        if(TRAIN_TROOP_2 == null) TRAIN_TROOP_2 = new TrainTroopUI();
        return TRAIN_TROOP_2;
    }
    else if(stt === 3){
        if(TRAIN_TROOP_3 == null) TRAIN_TROOP_3 = new TrainTroopUI();
        return TRAIN_TROOP_3;
    }
    else if(stt === 4){
        if(TRAIN_TROOP_4 == null) TRAIN_TROOP_4 = new TrainTroopUI();
        return TRAIN_TROOP_4;
    }

    return null;
};
