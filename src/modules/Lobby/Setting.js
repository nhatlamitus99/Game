/**
 * Created by CPU12740-local on 8/4/2020.
 */

var SettingLayer = cc.Layer.extend({
    zOrder:0,
    background:null,

    // methods
    ctor:function(){
        this._super();
        this.init();
    },
    init:function(){
        this.background = new cc.Scale9Sprite(setting_resource.BACKGROUND);
        this.addChild(this.background,this.zOrder);
    }
});

var SETTING_INSTANCE = null;

SettingLayer.getInstance = function(){
    if(SETTING_INSTANCE === null){
        SETTING_INSTANCE = new SettingLayer();
    }
    return SETTING_INSTANCE;
};
