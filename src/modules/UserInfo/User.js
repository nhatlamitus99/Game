var User = cc.Class.extend({
    // attributes
    uId:null,
    username:null,
    pwd:null,
    name:null,
    level:null,
    ranking:null,
    vip:null,
    exp:null,

    ctor:function(){
        //this._super();

    },
    getUsername:function(){
        return this.username;
    },
    getUID:function(){
        return this.uId;
    },
    getName:function(){
        return this.name;
    },
    getLevel:function(){
        return this.level;
    },
    getRanking:function(){
        return this.ranking;
    },
    getExp:function(){
        return this.exp;
    },
    setUsername:function(value){
        this.username = value;
    },
    setUID:function(value){
        this.uId = value;
    },
    setAttributes:function(name,level,ranking,vip,exp){
        this.name = name;
        this.level = level;
        this.ranking = ranking;
        this.vip = vip;
        this.exp = exp;
    }

});


var CURR_USER = null;

User.getInstance = function(){
    if(CURR_USER === null){
        CURR_USER = new User();
    }

    return CURR_USER;
};