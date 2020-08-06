
var TrainTroopUI = cc.Layer.extend({
    id:null,
    zOrder:1000,
    background:null,
    shader:null,
    previous:null,
    text:null,
    arrow:null,
    listTroop:[],
    queueTroop:[],

    // methods
    ctor:function(id){
        this._super();
        this.id = id;
        this.init();
    },
    init:function(){
        var size = cc.winSize;
        cc.log(size.width + " " + size.height);
        // background
        this.background = new cc.Scale9Sprite(train_troop_resource.BACKGROUND);
        this.addChild(this.background,this.zOrder);
        var rate1 = this.background.getContentSize().width / this.background.getContentSize().height;
        var rate2 = size.width / size.height;
        cc.log("RATE1 " + rate1 + " RATE2 " + rate2);
       // var ratio
        if (rate1 < rate2) {
            this.background.width = this.background.getContentSize().width * rate2 * 1.5;
            this.background.height = this.background.getContentSize().height * rate2 * 1.2;
        }
        else {
            this.background.width = this.background.getContentSize().width * rate1 * 1.2;
            this.background.height = this.background.getContentSize().height * rate1;
        }

        ////if (this.background)
        //this.background.width = 900;
        //this.background.height = 550;

        this.background.setPositionX(cc.winSize.width * 0.5);
        this.background.setPositionY(cc.winSize.height * 0.5);

        // name barrack
        var barrack_name = gv.lobbyLabel("Barrack "+ this.id.toString(),this.background.x ,this.background.height - 25);
        barrack_name.x = this.background.x - barrack_name.getContentSize().width/2;
        this.background.addChild(barrack_name,this.zOrder+1);

        // text
        this.text = new cc.Scale9Sprite(train_troop_resource.TEXT);
        this.addChild(this.text,this.zOrder+1);
        this.text.scaleX = this.background.width/(480); this.text.scaleY = 1.2;
        this.text.x = this.background.x; this.text.y = this.background.y + 135;

        // previous
        this.previous = gv.lobbyButton(train_troop_resource.PREVIOUS,0, this.background.height/2);
        this.background.addChild(this.previous,this.zOrder);

        // next
        this.next = gv.lobbyButton(train_troop_resource.FORWARD,this.background.width, this.background.height/2);
        this.background.addChild(this.next,this.zOrder);

        // close button
        this.close = gv.lobbyButton(train_troop_resource.CLOSE,this.background.width - 30, this.background.height - 25);
        this.background.addChild(this.close,this.zOrder+1);
        this.close.addClickEventListener(this.onClose.bind(this));

        // shader
        this.shader = new cc.LayerColor(cc.color(0, 0, 0, 128), cc.winSize.width*3, cc.winSize.height*3);
        this.addChild(this.shader,5);
        this.shader.x = -cc.winSize.width;
        this.shader.y = -cc.winSize.height;

        // list troop
        for(var i = 0; i <= 11; i++){
            var troop = new TrainTroopObj(train_troop_resource.CHARACTERS[i],0, 0, i);
            troop.addClickEventListener(this.onSelectTroop.bind(this,i));
            this.background.addChild(troop,this.zOrder+2);
            this.listTroop.push(troop);
        }

        var padding_x = this.background.width/30 + this.listTroop[0].width * 0.5;
        var pad_x = (this.background.width - 6 * this.listTroop[0].width - 2*padding_x ) / 5;
        var pad_y = (this.background.height*3/5 - 2*this.listTroop[0].height)/4;
        var sWidth = this.listTroop[0].width;
        var sHeight = this.listTroop[0].height;
        for(var i = 0; i <= 11; i++){
            var i_y = i >= 6 ? 0 : 1;
            var i_x = i % 6;
            this.listTroop[i].setPosition(padding_x + sWidth * (i_x + 0.5) + (i_x) * pad_x, sHeight*(i_y+0.8) +(i_y + 1) * pad_y );
        }
    },
    // event handler
    onClose:function(){
        this.visible = false;
    },
    onSelectTroop:function(id){
        // set arrow
        if(!this.arrow){
            this.arrow = new cc.Scale9Sprite(train_troop_resource.QUEUE);
            this.arrow.x = this.background.x - 50; this.arrow.y = this.background.y + 140;
            this.addChild(this.arrow,this.zOrder+1);
        }
        else{
            this.arrow.visible = true;
        }

        // check is existed
        var isExisted = false;
        for(var i = 0; i < this.queueTroop.length; i++){
            // da co
            if(id === this.queueTroop[i].id){
                // update function
                this.onIncreaseAmountTroop(i);
                isExisted = true;
                break;
            }
        }

        if(isExisted) return;
        else{
            var troop = new TrainTroopMiniObj(train_troop_resource.CHARACTERS_MINI[id],0,0,id);
            this.addChild(troop, this.zOrder + 2);
            troop.visible = false;
            troop.addClickEventListener(this.onDecreaseAmountTroop.bind(this,troop.id));
            this.queueTroop.push(troop);
        }

        // set show
        this.updateShowTrainTroop();
    },
    onDecreaseAmountTroop:function(id){
        var i = TroopManager.getIndexById(this.queueTroop,id);

        this.queueTroop[i].count--;
        if(this.queueTroop[i].count === 0) {
            this.queueTroop[i].visible = false;
            var temp = this.queueTroop[i];
            for(var k = i; k < this.queueTroop.length; k++){
                this.queueTroop[k] = this.queueTroop[k+1];
            }
            this.queueTroop[this.queueTroop.length - 1] = temp;
        }
        this.queueTroop[i].updateAmount("x" + this.queueTroop[i].count.toString());

        this.updateShowTrainTroop();
    },
    onIncreaseAmountTroop:function(i){
        this.queueTroop[i].count++;
        this.queueTroop[i].updateAmount("x" + this.queueTroop[i].count.toString());

        this.updateShowTrainTroop();
    },
    // ----------------
    updateShowTrainTroop:function(){
        if(this.queueTroop.length > 0){
            var count = 0;
            var j = -1;
            for(var k = 0; k < this.queueTroop.length; k++){
                if(this.queueTroop[k].count > 0){
                    count++;
                    if(j>=5) break;
                    if(!this.queueTroop[k].visible) this.queueTroop[k].visible = true;
                    if(j == -1){
                        this.queueTroop[k].x = this.background.x + 200; this.queueTroop[k].y = this.background.y + 140;
                    }
                    else{
                        this.queueTroop[k].x = this.background.x - j*70; this.queueTroop[k].y = this.background.y + 140;
                    }
                    j++;
                }

            }

            if(count == 0) this.arrow.visible = false;
        }
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
        if(TRAIN_TROOP_1 == null) TRAIN_TROOP_1 = new TrainTroopUI(1);
        return TRAIN_TROOP_1;
    }
    else if(stt === 2){
        if(TRAIN_TROOP_2 == null) TRAIN_TROOP_2 = new TrainTroopUI(2);
        return TRAIN_TROOP_2;
    }
    else if(stt === 3){
        if(TRAIN_TROOP_3 == null) TRAIN_TROOP_3 = new TrainTroopUI(3);
        return TRAIN_TROOP_3;
    }
    else if(stt === 4){
        if(TRAIN_TROOP_4 == null) TRAIN_TROOP_4 = new TrainTroopUI(4);
        return TRAIN_TROOP_4;
    }

    return null;
};
