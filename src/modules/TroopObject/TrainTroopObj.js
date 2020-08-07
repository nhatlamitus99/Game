var TrainTroopObj = ccui.Button.extend({
    id:null,
    character:null,
    bg:null,
    info:null,
    icon:null,
    cost:null,
    queue:[],


    ctor:function(character,x,y,id){
        this._super(train_troop_resource.SLOT);

        this.id = id;

        this.character = new cc.Scale9Sprite(character);
        this.addChild(this.character,1);

        this.bg = new cc.Scale9Sprite(train_troop_resource.BG_COST);
        this.addChild(this.bg,2);

        this.icon = new cc.Scale9Sprite(train_troop_resource.ELIXIR_ICON);
        this.addChild(this.icon,3);

        this.info = gv.lobbyButton(train_troop_resource.INFO,this.width/2 + 32,this.height/2 + 32);
        this.addChild(this.info,3);

        var temp = Math.floor(Math.random() * 1000) + 40;
        this.cost = gv.lobbyLabel(temp.toString(), this.width/2, this.height/2-35);
        this.addChild(this.cost,3);

        this.setZoomScale(0.1);
        this.setPressedActionEnabled(true);
        this.setScale9Enabled(true);
        this.setUnifySizeEnabled(false);
        this.ignoreContentAdaptWithSize(false);
    },
    updateSize: function(size){
        var rate = size / this.height;

        this.width  *= rate;
        this.height *= rate;

        this.character.scaleX = rate;
        this.character.scaleY = rate;
        this.character.x = this.width/2;
        this.character.y = this.height/2;

        this.bg.scaleX *= rate;
        this.bg.scaleY *= rate;
        this.bg.x = this.width/2;
        this.bg.y = this.bg.height;

        this.icon.scaleX *= rate;
        this.icon.scaleY *= rate;
        this.icon.x = this.width - this.icon.width*1.2;
        this.icon.y = this.bg.height;

        this.info.scaleX *= rate;
        this.info.scaleY *= rate;
        this.info.x = this.width - this.info.width*0.7;
        this.info.y = this.height - this.info.height*0.7;

        this.cost.x = this.width*0.4;
        this.cost.y = this.bg.height;
    }
});