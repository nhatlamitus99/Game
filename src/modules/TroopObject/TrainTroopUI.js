
var TrainTroopUI = cc.Layer.extend({
    id:null,
    zOrder:20,
    background:null,
    shader:null,
    previous:null,
    text:null,
    arrow:null,
    panel:null,
    listTroop:[],
    queueTroop:[],

    // methods
    ctor:function(id){
        this._super();
        this.id = id;
        this.init();

        //this._listener = cc.EventListener.create({
        //    event: cc.EventListener.TOUCH_ONE_BY_ONE,
        //    swallowTouches: true,
        //    onTouchBegan: function(touch,event){
        //        return true;
        //    },
        //    onTouchMoved: function(touch,event){},
        //    onTouchEnded: function(touch,event){}
        //});
        //
        //this._listener2 = cc.EventListener.create({
        //    event: cc.EventListener.MOUSE,
        //    swallowTouches: true,
        //    onMouseMove:function(event){return true;},
        //    onMouseScroll: function(event) {
        //        cc.log("TOUCH BEGAN ");
        //        return true;
        //    }
        //});

       // cc.eventManager.addListener(this._listener, this);
       // cc.eventManager.addListener(this._listener2, this);
    },
    init:function(){
        var size = cc.winSize;
        // background
        this.background = new cc.Scale9Sprite(train_troop_resource.BACKGROUND);
        this.addChild(this.background,this.zOrder);
        var rateStandard = 4.5 / 3;

        var width;
        var height;
        var rate = cc.winSize.width / cc.winSize.height;

        if (rateStandard < rate) {
            height = cc.winSize.height * 0.9;
            width = height * rateStandard;
        }
        else {
            width = cc.winSize.width * 0.9;
            height = width / rateStandard;
        }


        this.background.width = width;
        this.background.height = height;

        this.background.setPositionX(cc.winSize.width * 0.5);
        this.background.setPositionY(cc.winSize.height * 0.5);

        // name barrack
        var barrack_name = gv.lobbyLabel("Barrack "+ this.id.toString(),this.background.x ,this.background.height - 25);
        barrack_name.x = this.background.width/2;
        barrack_name.y = this.background.height * 0.95;
        this.background.addChild(barrack_name,this.zOrder+1);

        // text
        this.text = new cc.Scale9Sprite(train_troop_resource.TEXT);
        this.background.addChild(this.text,this.zOrder+1);
        this.text.width = this.background.width*0.9; this.text.height = this.background.height * 0.3;
        this.text.x = this.background.width/2; this.text.y =  this.background.height*3/4;



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
        this.panel = new cc.LayerColor(cc.color(0, 0, 0, 0), this.background.width * 0.92, this.background.height* 1/2);
        this.background.addChild(this.panel,this.zOrder + 1);
        this.panel.x = this.background.width * 0.04;
        this.panel.y = this.background.height * 0.07;

        for(var i = 0; i <= 11; i++){
            var troop = new TrainTroopObj(train_troop_resource.CHARACTERS[i],0, 0, i);
            troop.addClickEventListener(this.onSelectTroop.bind(this,i));
            troop.updateSize(this.panel.height/2.3);
            this.panel.addChild(troop,this.zOrder+2);
            this.listTroop.push(troop);
        }


        var padding_x = this.panel.width * 0.03;
        var pad_x = (this.panel.width - 6 * this.listTroop[0].width - 2*padding_x ) / 5;
        var pad_y = (this.panel.height - 2*this.listTroop[0].height)/3;
        var sWidth = this.listTroop[0].width;
        var sHeight = this.listTroop[0].height;
        for(var i = 0; i <= 11; i++){
            var i_y = i >= 6 ? 0 : 1;
            var i_x = i % 6;
            this.listTroop[i].setPosition(padding_x + sWidth * (i_x + 0.5) + (i_x) * pad_x, sHeight*(i_y + 0.5) +i_y * pad_y );
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
            this.text.addChild(this.arrow,this.zOrder+12);
            this.arrow.x = this.text.width * 0.35; this.arrow.y = this.text.height/2;
            this.arrow.width = this.text.width * 0.6;
            this.arrow.height = this.text.height * 0.3;
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
            this.text.addChild(troop, 3000);
            //troop.width = this.text.height*0.4;
            //troop.height = this.text.height*0.4;
            troop.updateSize(this.text.height*0.4, this.text.height*0.4);
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
        var size_obj = this.text.height*0.4;
        var startX = this.text.width/2;
        var pad_x = (this.text.width/2  - 5 * size_obj) / 6;
        if(this.queueTroop.length > 0){
            var count = 0;
            var j = -1;
            for(var k = 0; k < this.queueTroop.length; k++){
                if(this.queueTroop[k].count > 0){
                    count++;
                    if(j>=5) break;
                    if(!this.queueTroop[k].visible) this.queueTroop[k].visible = true;
                    if(j == -1){
                        this.queueTroop[k].x = this.text.width*0.7; this.queueTroop[k].y = this.text.height/2;
                    }
                    else{
                        this.queueTroop[k].x = startX  - (pad_x*j) - (size_obj)*(j); this.queueTroop[k].y = this.text.height/2;
                    }
                    j++;
                }

            }

            if(count == 0) this.arrow.visible = false;
        }
    },
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
