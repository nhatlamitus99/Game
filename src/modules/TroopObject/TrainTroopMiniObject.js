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

        this.cancel = gv.lobbyButton(train_troop_resource.CANCEL,this.width/2 + 23,this.height/2 + 23);
        this.addChild(this.cancel,2);

        this.label = gv.lobbyLabel("x" + this.count.toString(), this.width/2 - 13,this.height/2 + 18);
        this.addChild(this.label,2);

        this.setZoomScale(0.1);
        this.setPressedActionEnabled(true);
        this.setScale9Enabled(true);
        this.setUnifySizeEnabled(false);
        this.ignoreContentAdaptWithSize(false);
    },
    updateAmount:function(text){
        this.label.setString(text);
    }
});