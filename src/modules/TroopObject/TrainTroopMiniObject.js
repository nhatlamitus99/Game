var TrainTroopMiniObj = ccui.Button.extend({
    id:null,
    character:null,
    cancel:null,
    count:1,
    label:null,


    ctor:function(character,x,y,id){
        this._super(train_troop_resource.SMALL_SLOT);
        this.attr({
            x: x,
            y: y
        });

        this.id = id;

        this.character = new cc.Scale9Sprite(character);
        this.character.x = this.width/2; this.character.y = this.height/2;
        this.addChild(this.character,1);

        this.cancel = new cc.Scale9Sprite(train_troop_resource.CANCEL);
        this.cancel.x = this.width - this.cancel.width;
        this.cancel.y = this.height - this.cancel.height;
        this.addChild(this.cancel,2);

        this.label = gv.lobbyLabel("x" + this.count.toString(), this.width*0.3,this.height*0.9);
        this.addChild(this.label,2);

        this.setZoomScale(0.1);
        this.setPressedActionEnabled(true);
        this.setScale9Enabled(true);
        this.setUnifySizeEnabled(false);
        this.ignoreContentAdaptWithSize(false);
    },
    updateAmount:function(text){
        this.label.setString(text);
    },
    updateSize:function(width, height){
        var rate = height / this.height;
        this.width = width; this.height = height;

        this.character.scaleX = rate; this.character.scaleY = rate;
        this.character.x = width/2; this.character.y = height/2;

        this.cancel.scaleX = rate; this.cancel.scaleY = rate;
        this.cancel.x = this.width ;
        this.cancel.y = this.height ;

        this.label.x = width * 0.3;
        this.label.y = height * 0.85;
    }
});